import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';


const PINATA_API_KEY = "DEIN_PINATA_API_KEY";
const PINATA_SECRET_API_KEY = "DEIN_PINATA_SECRET_API_KEY";

export function MintAwards() {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hier kannst du mit selectedAward weiterarbeiten
        console.log('Ausgewähltes Objekt:', selectedAward);
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
            <Button type="submit" label="Weiter" className="p-ml-2 mt-4" />
            </div>
        </form>
    );
}
