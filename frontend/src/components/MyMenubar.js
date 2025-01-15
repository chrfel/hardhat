import React from "react";
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  


export function MyMenubar() {
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        {
            label: 'Startseite',
            icon: 'pi pi-home'
        }
    ];

    const start = <img alt="logo" src="https://scarlet-raw-dormouse-438.mypinata.cloud/ipfs/bafkreiblz77fxmhyxwdlqs6oiips34tkzjewstqsobu7bizufeiaepkpzi" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Suche" type="text" className="w-8rem sm:w-auto" />
        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    )
}
