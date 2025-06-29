import React from 'react';
import { Tag } from 'primereact/tag';

// Funktion zur Auswahl der Farbe je nach Seltenheit
const getSeverityByRarity = (rarity) => {
  switch (rarity) {
    case 'Gewöhnlich':
      return 'success';   // grün
    case 'Ungewöhnlich':
      return 'info';      // blau
    case 'Selten':
      return 'warning';   // gelb
    case 'Legendär':
      return 'danger';    // rot
    case 'Episch':
      return null;        // grau / Standard
    case 'Mythisch':
      return 'danger';    // ebenfalls rot oder frei definierbar
    default:
      return null;
  }
};

const RarityTag = ({ rarity }) => {
  const severity = getSeverityByRarity(rarity);

  return (
    <Tag value={rarity} severity={severity} />
  );
};

export default RarityTag;
