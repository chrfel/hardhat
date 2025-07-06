import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import { Card } from "primereact/card";

import { Shop } from "./components/Shop/Shop";
import { Awards } from "./components/Awards/Awards";
import { MyMenubar } from "./components/MyMenubar";

// Beispiel-Komponenten für die Seiten
function Home() {
  return (
    <div className="p-5">
      {/* Hero Section */}
      <div className="surface-0 text-center py-6 px-4 shadow-2 border-round mb-5">
        <div className="text-4xl">🎶</div>
        <h1 className="text-4xl font-bold text-900 mb-2">Willkommen im SFZ Belohnungssystem!</h1>
        <p className="text-xl text-700">Deine Plattform für Anerkennung, Gemeinschaft und coole Prämien.</p>
      </div>

      {/* Info Section */}
      <div className="grid mb-5">
        <div className="col-12 md:col-6">
          <Card title="🎵 Was ist das hier?">
            <p>
              In unserem Belohnungssystem kannst du MusicCoins sammeln und gegen tolle Prämien eintauschen.
              Ob du aktiv musizierst, dich im Verein engagierst oder bei Aktionen hilfst – hier zahlt sich dein Einsatz aus!
            </p>
          </Card>
        </div>
        <div className="col-12 md:col-6">
          <Card title="🛍️ Was gibt’s zu holen?">
            <p>
              Stylishe T-Shirts, kuschelige Pullis, praktische Tassen und vieles mehr – alles exklusiv für dich!
              Entdecke den <strong>Shop</strong> und sichere dir deine Wunschprämien.<br></br>
              Zusätzlich kannst du wertvolle <strong>Auszeichnungen</strong> erhalten.
            </p>
          </Card>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="surface-ground p-4 border-round shadow-2 text-center">
        <h2 className="text-2xl font-semibold text-900 mb-3">Mach mit & verdiene MusicCoins und Auszeichnungen!</h2>
        <p className="text-700 mb-4">
          Dein Engagement im Spielmanns- und Fanfarenzug wird belohnt. Sammle Coins und Auszeichnungen für:
        </p>
        <ul className="list-none p-0 m-0 text-left md:text-center text-700 font-medium">
          <li className="mb-2"><i className="pi pi-check-circle text-green-500 mr-2"></i>Teilnahme an Proben & Auftritten</li>
          <li className="mb-2"><i className="pi pi-check-circle text-green-500 mr-2"></i>Hilfe bei Veranstaltungen</li>
          <li className="mb-2"><i className="pi pi-check-circle text-green-500 mr-2"></i>Team-Engagement und mehr</li>
        </ul>
      </div>

      {/* Footer-Block */}
      <div className="mt-6 text-center text-sm text-600">
        🎶 SFZ Belohnungssystem – Musik verbindet. | © 2025 Spielmanns- und Fanfarenzug
      </div>
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
