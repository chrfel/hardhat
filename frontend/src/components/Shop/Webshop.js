import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';

export function Webshop({ transferTokens, tokenSymbol, state, OWNER }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
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
    fetch('https://scarlet-raw-dormouse-438.mypinata.cloud/ipfs/bafkreic3rpul3jwlrpr4mqz6c63ttnuutsnm5ja2z72s2krd2ontchc7ni') // ✅ URL deiner JSON-Datei
      .then((response) => {
        if (!response.ok) {
          throw new Error('Fehler beim Laden der JSON-Datei');
        }
        return response.json(); // 👈 JSON parsen
      })
      .then((json) => {
        setData(json); // 👈 Daten setzen
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fehler:', error);
        setLoading(false);
      });
    }, []);

    if (loading) return <div>Lädt...</div>;
    if (!data) return <div>Keine Daten gefunden</div>;

    const dataTemplate = (data) => {
            return (
                <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                    <div className="mb-3">
                        <img src={data.image} alt={data.title} className="w-6 shadow-2" />
                    </div>
                    <div>
                        <h4 className="mb-1">{data.title}</h4>
                        <h6 className="mt-0 mb-3">{data.price} MC</h6>
                        <Tag value="Verfügbar" severity="success"></Tag>
                        <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                            <form
                                onSubmit={(event) => {
                                // This function just calls the transferTokens callback with the
                                // form's data.
                                event.preventDefault();

                                const formData = new FormData(event.target);
                                const to = OWNER;
                                const amount = data.price;

                                if (to && amount) {
                                    transferTokens(to, amount, "#1 T-Shirt");
                                }
                                }}
                            >
                            {state.balance.gte(data.price) ? (
                                <Button icon="pi pi-shopping-cart" className="p-button p-button-rounded" type="submit"/>
                            ) : 
                            (
                                <Button icon="pi pi-shopping-cart" className="p-button p-button-rounded" disabled />
                            )}
                            </form>
                        </div>
                    </div>
                </div>
            );
        };

    return (
        <div className="card">
            <Carousel value={data} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
            autoplayInterval={3000} itemTemplate={dataTemplate} />
        </div>
    )
}