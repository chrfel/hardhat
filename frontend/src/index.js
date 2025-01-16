import React from "react";
import ReactDOM from "react-dom/client";
import { Dapp } from "./components/Dapp";
import { MyMenubar } from "./components/MyMenubar"
// We import bootstrap here, but you can remove if you want
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import { Card } from 'primereact/card';

// This is the entry point of your application, but it just renders the Dapp
// react component. All of the logic is contained in it.

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PrimeReactProvider>
    <MyMenubar></MyMenubar>
    <div className="flex flex-column align-items-center mt-2">
      <img src="snare.gif" height="60px"></img>
    </div>
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
    <Dapp />
    </PrimeReactProvider>
  </React.StrictMode>
);
