import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';


export function Mint({ mintTokens, tokenSymbol }) {
  return (
    <div>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const to = formData.get("to");
          const amount = formData.get("amount");

          if (to && amount) {
            mintTokens(to, amount);
          }
        }}
      >
        <div className="card flex justify-content-center">
          <InputText keyfilter="int" placeholder="Anzahl MC" name="amount" />
        </div>
        <div className="card flex justify-content-center mt-2">
          <InputText placeholder="Adresse" name="to" />
        </div>
        <div className="form-group mt-4">
          <Button label="Senden" type="submit"/>
        </div>
      </form>
    </div>
  );
}
