import React from "react";
import { Message } from 'primereact/message';


export function TransactionErrorMessage({ message }) {
  return (
    <div className="mt-3 text-center" role="alert">
      <Message severity="error" text={`Error sending transaction: ${message.substring(0, 100)}`} />
    </div>
  );
}
