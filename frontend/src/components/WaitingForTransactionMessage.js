import React from "react";
import { Message } from 'primereact/message';


export function WaitingForTransactionMessage({ txHash }) {
  return (
    <div className="mt-3 text-center" role="alert">
      <Message severity="info" text={`Waiting for transaction ${txHash} to be mined`} />
    </div>
  );
}
