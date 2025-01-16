import React from "react";

import { NetworkErrorMessage } from "./NetworkErrorMessage";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';


export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  return (
    <div className="container">
      <div className="card p-5">
        <Card>
          <div className="text-center text-900 text-3xl font-medium text">Wallet verbinden</div>
          <div className="mt-4 text-center">
            Um den Shop und die Produkte sehen zu können musst du dich mit deiner Wallet anmelden!
          </div>
          <div className="flex flex-row justify-content-center mt-3">
            <Button label="Wallet verbinden" onClick={connectWallet}/>
          </div>
        </Card>
      </div>
    </div>
  );
}
