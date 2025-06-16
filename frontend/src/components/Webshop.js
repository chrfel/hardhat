import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export function Webshop({ transferTokens, tokenSymbol, state, OWNER }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <div class="flex flex-row flex-wrap justify-content-around">
            {data.map((item, index) => (
                <div className="card w-25rem mt-2">
                <Card>
                    <div className="text-center text-900 text-3xl font-medium text">{item.title}</div>
                    <img className="w-full mt-4" src={item.image}></img>
                    <div className="mt-2 text-xl font-medium">Preis: {item.price} MC</div>
                    <form
                        onSubmit={(event) => {
                        // This function just calls the transferTokens callback with the
                        // form's data.
                        event.preventDefault();

                        const formData = new FormData(event.target);
                        const to = OWNER;
                        const amount = item.price;

                        if (to && amount) {
                            transferTokens(to, amount, "#1 T-Shirt");
                        }
                        }}
                    >
                    {state.balance.gte(item.price) ? (
                        <Button className="mt-4" label="Kaufen" type="submit"/>
                    ) : 
                    (
                        <Button className="mt-4" label="Nicht genügend MC" disabled />
                    )}
                    </form>
                </Card>
            </div>
            ))}
        </div>
    )
}