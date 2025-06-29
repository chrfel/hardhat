import React from "react";
import { ethers } from "ethers";

import MusicNFTArtifact from "../../contracts/MusicNFT.json";
import contractAddress from "../../contracts/contract-address.json";

import { NoWalletDetected } from "../NoWalletDetected";
import { ConnectWallet } from "../ConnectWallet";
import { Loading } from "../Loading";
import { TransactionErrorMessage } from "../TransactionErrorMessage";
import { WaitingForTransactionMessage } from "../WaitingForTransactionMessage";
import { NoNFTMessage } from "./NoNFTMessage";
import { MintAwards } from "./MintAwards";

import { Card } from "primereact/card";

const HARDHAT_NETWORK_ID = "11155111";
const OWNER = '0x9555cb8e627ecdcdf05414be286e89b8fc717980';
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;


export class Awards extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      selectedAddress: undefined,
      tokenData: undefined,
      userNFTs: [],
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,
    };
    this.state = this.initialState;
  }

  render() {
    if (window.ethereum === undefined) {
      return <NoWalletDetected />;
    }

    if (!this.state.selectedAddress) {
      return (
        <ConnectWallet
          connectWallet={() => this._connectWallet()}
          networkError={this.state.networkError}
          dismiss={() => this._dismissNetworkError()}
        />
      );
    }

    if (!this.state.tokenData || !this.state.userNFTs) {
      return <Loading />;
    }

    return (
      <div className="container">
        <div className="card p-5">
          <Card>
            <div className="text-center text-900 text-3xl font-medium text">SFZ Auszeichnungen</div>
            {this.state.selectedAddress != OWNER && this.state.userNFTs.length === 0 && (
              <div className="mt-4">
              <div className="text-center">
                <NoNFTMessage />
              </div>
              </div>
              
            )}
            {this.state.selectedAddress != OWNER && this.state.userNFTs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {this.state.userNFTs.map((nft) => (
                  <Card
                    key={nft.tokenId}
                    title={`#${nft.tokenId}`}
                    subTitle="MusicNFT"
                    className="shadow-md"
                  >
                    <img
                      src={nft.metadata.image || "/placeholder.png"}
                      alt={`NFT #${nft.tokenId}`}
                      className="w-full h-auto rounded-md"
                    />
                    <p>{nft.metadata.name}</p>
                  </Card>
                ))}
              </div>
            )}
            {this.state.selectedAddress == OWNER &&  (
              <MintAwards />
            )}
          </Card>
        </div>
      </div>
    );
  }

  async _connectWallet() {
    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    this._checkNetwork();

    this._initialize(selectedAddress);

    // Listen for account changes
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      this._stopPollingData();
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state 
      if (newAddress === undefined) {
        return this._resetState();
      }

      this._initialize(newAddress);
    });
  }

  async _initialize(userAddress) {
    this.setState({
      selectedAddress: userAddress,
    });

    // Für Leseoperationen: externer Provider (Infura, Alchemy, etc.)
    this._readProvider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/YHMO9gpPv-FEFAoI0qkmA");
    // Für Transaktionen: User-Wallet
    this._provider = new ethers.providers.Web3Provider(window.ethereum);

    this._contract = new ethers.Contract(
      contractAddress.NFT,
      MusicNFTArtifact.abi,
      this._provider.getSigner(0)
    );

    this._startPollingData();
  }

  async _updateBalance() {
    const tokenData = {
      name: await this._contract.name(),
      symbol: await this._contract.symbol(),
    };

    const balance = await this._contract.balanceOf(this.state.selectedAddress);
    const userNFTs = [];

    for (let i = 0; i < balance; i++) {
      const tokenId = await this._contract.tokenOfOwnerByIndex(this.state.selectedAddress, i);
      const tokenUri = await this._contract.tokenURI(tokenId);

      // Hole Metadaten von URI (vorausgesetzt es ist ein öffentlich erreichbarer HTTP-Link oder IPFS Gateway)
      let metadata = {};
      try {
        const response = await fetch(tokenUri);
        metadata = await response.json();
      } catch (err) {
        metadata = { name: "Unbekannter Titel", image: "/placeholder.png" };
      }

      userNFTs.push({
        tokenId: tokenId.toString(),
        tokenUri,
        metadata,
      });
    }

    this.setState({
      tokenData,
      userNFTs,
    });
  }

  async _safeMint(toAddress, metadataURI) {
    try {
      // Reset mögliche vorherige Fehler
      this._dismissTransactionError();

      // Transaktion ausführen
      const tx = await this._token.safeMint(toAddress, metadataURI);
      this.setState({ txBeingSent: tx.hash });

      // Warten bis bestätigt
      const receipt = await tx.wait();

      if (receipt.status === 0) {
        throw new Error("Transaktion fehlgeschlagen");
      }

      // Transaktion erfolgreich, du kannst hier ggf. Status aktualisieren
      console.log("Minted!", receipt);

      // Optional: Balance oder Tokens neu laden
      await this._updateBalance();

    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      console.error("Fehler bei safeMint:", error);
      this.setState({ transactionError: error });
    } finally {
      this.setState({ txBeingSent: undefined });
    }
  }


  _startPollingData() {
    this._pollDataInterval = setInterval(() => this._updateBalance(), 1000);

    // We run it once immediately so we don't have to wait for it
    this._updateBalance();
  }

   // This method just clears part of the state.
  _dismissTransactionError() {
    this.setState({ transactionError: undefined });
  }

  // This method just clears part of the state.
  _dismissNetworkError() {
    this.setState({ networkError: undefined });
  }

  // This is an utility method that turns an RPC error into a human readable
  // message.
  _getRpcErrorMessage(error) {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  }

  // This method resets the state
  _resetState() {
    this.setState(this.initialState);
  }

  async _switchChain() {
    const chainIdHex = `0x${parseInt(HARDHAT_NETWORK_ID).toString(16)}`;
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }],
    });
    await this._initialize(this.state.selectedAddress);
  }

  // This method checks if the selected network is Localhost:8545
  _checkNetwork() {
    if (window.ethereum.networkVersion !== HARDHAT_NETWORK_ID) {
      this._switchChain();
    }
  }
}
