import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import {v4 as uuidv4} from 'uuid';


const PINATA_API_KEY = "405f540990ab67ee1b60";
const PINATA_SECRET_API_KEY = "1a6faf311955314282be7e36f5faea95e1dcc1316ed1c7ae4bdb3e0c86fce7dc";

export function MintAwards({ mintAward }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedAward, setSelectedAward] = useState(null);
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(() => {
        fetch('https://ipfs.io/ipfs/bafkreigrgrklpopo7h7hkhotaxuwxk2q4pu2jnstamfymbihxfp67ntrku')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Fehler beim Laden der JSON-Datei');
                }
                return response.json();
            })
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Fehler:', error);
                setLoading(false);
            });
    }, []);

    const handleSelectChange = (e) => {
        const title = e.target.value;
        setSelectedTitle(title);
        const award = data.find(item => item.title === title);
        setSelectedAward(award);
    };

    // Hilfsfunktion zum Upload an Pinata
    async function uploadToPinata(award) {
        const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_SECRET_API_KEY,
            },
            body: JSON.stringify({
                pinataMetadata: { name: award.title + '_' + uuidv4()},
                pinataContent: award,
            }),
        });
        if (!response.ok) {
            throw new Error("Fehler beim Upload zu Pinata");
        }
        const data = await response.json();
        console.log(data)
        return data.IpfsHash; // Die neue CID
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAward) return;
        const formData = new FormData(e.target);
        const to = formData.get("to");

        try {
            // Award-Objekt zu Pinata hochladen
            const cid = await uploadToPinata(selectedAward);
            const url = `ipfs://${cid}`;
            // NFT minten mit neuer CID
            mintAward(to, url);
        } catch (err) {
            alert("Fehler beim Upload oder Minten: " + err.message);
        }
    };

    if (loading) return <div>Lädt...</div>;
    if (!data) return <div>Keine Daten gefunden</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div className="text-center text-900 text-xl font-medium text mt-4 mb-4">MusicNFT minten</div>
            <div className="text-center">
                <Dropdown
                    id="award-dropdown"
                    value={selectedAward}
                    onChange={(e) => {
                        setSelectedAward(e.value);
                        setSelectedTitle(e.value ? e.value.title : '');
                    }}
                    options={data}
                    optionLabel="title"
                    placeholder="Bitte auswählen"
                    className="p-ml-2"
                    required
                />
            </div>
            <div className="text-center">
            {selectedAward && (
                <div style={{ marginTop: '1rem' }}>
                    <Card title={selectedAward.title}>
                        <p>{selectedAward.description}</p>
                        <img
                            src={`https://ipfs.io/ipfs/${selectedAward.image.replace('ipfs://', '')}`}
                            alt={selectedAward.title}
                            style={{ width: '150px', marginTop: '1rem' }}
                            className="mt-4 mb-4"
                        />
                            {selectedAward.attributes.map((attr, idx) => (
                                <div key={idx}>
                                    <strong>{attr.trait_type}:</strong> {attr.value}
                                </div>
                            ))}
                    </Card>
                </div>
            )}
            <div className="card flex justify-content-center mt-4">
                      <InputText placeholder="Adresse" name="to" />
            </div>
            <Button type="submit" label="Weiter" className="p-ml-2 mt-4" />
            </div>
        </form>
    );
}
