import React from "react";

import { NetworkErrorMessage } from "./NetworkErrorMessage";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';


export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  return (
    <div className="container">
      <div className="card p-5">
        <Card>
          <div className="text-center text-900 text-3xl font-medium text">Herzlich Willkommmen!</div>
          <div className="mt-4 text-center">
            Schön, dass du hier bist! Tauche ein in die Welt unseres Vereins und entdecke, was uns antreibt: die Leidenschaft für Musik, Gemeinschaft und Kreativität.
            Hier kannst du mit unseren exklusiven "MusicCoins" dein Lieblings-Merch erwerben – von stylishen T-Shirts und kuscheligen Pullis bis hin zu praktischen Tassen, die nicht nur deinen Kaffee wärmen, sondern auch dein Herz.
            Bleib neugierig, stöbere in unserem Sortiment und zeige mit deinem Merch, dass du Teil unserer musikalischen Familie bist.
            Viel Spaß beim Entdecken und Shoppen – wir freuen uns, dich dabei zu haben! 🎶
          </div>
        </Card>
      </div>
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
