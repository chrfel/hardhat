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

// This is the entry point of your application, but it just renders the Dapp
// react component. All of the logic is contained in it.

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PrimeReactProvider>
    <MyMenubar></MyMenubar>
    <Dapp />
    </PrimeReactProvider>
  </React.StrictMode>
);
