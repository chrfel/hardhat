import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import { Card } from "primereact/card";

import { Shop } from "./components/Shop";
import { Awards } from "./components/Awards";
import { MyMenubar } from "./components/MyMenubar";

// Beispiel-Komponenten für die Seiten
function Home() {
  return (
    <div className="card p-5">
      <Card>
        <div className="text-center text-900 text-3xl font-medium text">Herzlich Willkommmen!</div>
        <div className="text-center text-900 text-xl font-medium text mt-2">im SFZ Belohnungssystem</div>
        <div className="mt-4 text-center">
          Schön, dass du hier bist! Tauche ein in die Welt unseres Vereins und entdecke, was uns antreibt: die Leidenschaft für Musik, Gemeinschaft und Kreativität.
          Hier kannst du mit unseren exklusiven "MusicCoins" dein Lieblings-Merch erwerben – von stylishen T-Shirts und kuscheligen Pullis bis hin zu praktischen Tassen, die nicht nur deinen Kaffee wärmen, sondern auch dein Herz.
          Viel Spaß beim Entdecken und Shoppen – wir freuen uns, dich dabei zu haben! 🎶
        </div>
      </Card>
    </div>
  );
}

function ShopC() {
  return <Shop />
}

function AwardsC() {
  return <Awards/>
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <Router>
        <MyMenubar />

        <div className="flex flex-column align-items-center mt-2">
          <img src="snare.gif" height="60px" alt="Logo" />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopC />} />
          <Route path="/awards" element={<AwardsC />} />
        </Routes>

      </Router>
    </PrimeReactProvider>
  </React.StrictMode>
);
