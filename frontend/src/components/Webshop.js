import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export function Webshop({ transferTokens, tokenSymbol, state }) {
    return (
        <div class="flex flex-row flex-wrap justify-content-around">
            <div className="card w-25rem mt-2">
                <Card>
                    <div className="text-center text-900 text-3xl font-medium text">T-Shirt</div>
                    <img className="w-full mt-4" src="https://scarlet-raw-dormouse-438.mypinata.cloud/ipfs/bafybeift6ippub5yk5tevsc7hdj5cvdyedm4muajovesafw5l25klgdqqi"></img>
                    <div className="mt-2 text-xl font-medium">Preis: 100 MC</div>
                    <form
                        onSubmit={(event) => {
                        // This function just calls the transferTokens callback with the
                        // form's data.
                        event.preventDefault();

                        const formData = new FormData(event.target);
                        const to = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
                        const amount = 100;

                        if (to && amount) {
                            transferTokens(to, amount);
                        }
                        }}
                    >
                    {state.balance.gte(100) ? (
                        <Button className="mt-4" label="Kaufen" type="submit"/>
                    ) : 
                    (
                        <Button className="mt-4" label="Nicht genügend MC" disabled />
                    )}
                    </form>
                </Card>
            </div>
            <div className="card w-25rem mt-2">
                <Card>
                    <div className="text-center text-900 text-3xl font-medium text">Pullover</div>
                    <img className="w-full mt-4" src="https://scarlet-raw-dormouse-438.mypinata.cloud/ipfs/bafkreidpegn35ihpbonsafesp2idh64qyfj6s2cetu64nursgqhzdlckzm"></img>
                    <div className="mt-2 text-xl font-medium">Preis: 200 MC</div>
                    <form
                        onSubmit={(event) => {
                        // This function just calls the transferTokens callback with the
                        // form's data.
                        event.preventDefault();

                        const formData = new FormData(event.target);
                        const to = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
                        const amount = 200;

                        if (to && amount) {
                            transferTokens(to, amount);
                        }
                        }}
                    >
                    {state.balance.gte(200) ? (
                        <Button className="mt-4" label="Kaufen" type="submit"/>
                    ) : 
                    (
                        <Button className="mt-4" label="Nicht genügend MC" disabled />
                    )}
                    </form>
                </Card>
            </div>
            <div className="card w-25rem mt-2">
                <Card>
                    <div className="text-center text-900 text-3xl font-medium text">Tasse</div>
                    <img className="w-full mt-4" src="https://scarlet-raw-dormouse-438.mypinata.cloud/ipfs/bafybeieh6svd2dbmhzuj77gjl54dp4lklksnu65azrel6nrcprankejkmy"></img>
                    <div className="mt-2 text-xl font-medium">Preis: 50 MC</div>
                    <form
                        onSubmit={(event) => {
                        // This function just calls the transferTokens callback with the
                        // form's data.
                        event.preventDefault();

                        const formData = new FormData(event.target);
                        const to = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
                        const amount = 50;

                        if (to && amount) {
                            transferTokens(to, amount);
                        }
                        }}
                    >
                    {state.balance.gte(50) ? (
                        <Button className="mt-4" label="Kaufen" type="submit"/>
                    ) : 
                    (
                        <Button className="mt-4" label="Nicht genügend MC" disabled />
                    )}
                    </form>
                </Card>
            </div>
            <div className="card w-25rem mt-2">
                <Card>
                    <div className="text-center text-900 text-3xl font-medium text">Cap</div>
                    <img className="w-full mt-4" src="https://scarlet-raw-dormouse-438.mypinata.cloud/ipfs/bafkreifguj7xtett6mm6p43mxrjlsjl4lk74pwiecplmaoqljcgo6nswpy"></img>
                    <div className="mt-2 text-xl font-medium">Preis: 110 MC</div>
                    <form
                        onSubmit={(event) => {
                        // This function just calls the transferTokens callback with the
                        // form's data.
                        event.preventDefault();

                        const formData = new FormData(event.target);
                        const to = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
                        const amount = 110;

                        if (to && amount) {
                            transferTokens(to, amount);
                        }
                        }}
                    >
                    {state.balance.gte(110) ? (
                        <Button className="mt-4" label="Kaufen" type="submit"/>
                    ) : 
                    (
                        <Button className="mt-4" label="Nicht genügend MC" disabled />
                    )}
                    </form>
                </Card>
            </div>
        </div>
    )
}