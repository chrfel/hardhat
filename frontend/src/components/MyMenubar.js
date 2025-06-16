import React from "react";
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Link } from 'react-router-dom';

export function MyMenubar() {
    const items = [
        {
            label: 'Startseite',
            icon: 'pi pi-home',
            template: (item, options) => (
                <Link to="/" className="flex align-items-center p-menuitem-link">
                    <span className={item.icon} />
                    <span className="mx-2">{item.label}</span>
                </Link>
            )
        },
        {
            label: 'Shop',
            icon: 'pi pi-shopping-cart',
            template: (item, options) => (
                <Link to="/shop" className="flex align-items-center p-menuitem-link">
                    <span className={item.icon} />
                    <span className="mx-2">{item.label}</span>
                </Link>
            )
        },
        {
            label: 'Auszeichnungen',
            icon: 'pi pi-trophy',
            template: (item, options) => (
                <Link to="/awards" className="flex align-items-center p-menuitem-link">
                    <span className={item.icon} />
                    <span className="mx-2">{item.label}</span>
                </Link>
            )
        }
    ];

    const start = (
        <Link to="/">
            <img
                alt="logo"
                src="https://scarlet-raw-dormouse-438.mypinata.cloud/ipfs/bafkreiblz77fxmhyxwdlqs6oiips34tkzjewstqsobu7bizufeiaepkpzi"
                height="40"
                className="mr-2"
            />
        </Link>
    );

    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Suche" type="text" className="w-8rem sm:w-auto" />
            <Avatar icon="pi pi-user" shape="circle" />
        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    );
}
