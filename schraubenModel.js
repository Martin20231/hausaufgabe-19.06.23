const mongoose = require('mongoose');

// Definiere das Schema für den Verkauf
const VerkaufSchema = new mongoose.Schema({
  schrauben_typ: {
    type: String,
    required: true
  },
  verkaufsdatum: {
    type: Date,
    required: true
  },
  menge: {
    type: Number,
    required: true
  },
  preis_pro_einheit: {
    type: Number,
    required: true
  },
  produkt_id: {
    type: String,
    required: true
  }
});

// Virtuelles Feld "gesamtpreis" basierend auf Menge und Preis pro Einheit
VerkaufSchema.virtual('gesamtpreis').get(function () {
  return this.menge * this.preis_pro_einheit;
});

// Konfiguriere das Schema, um virtuelle Felder in den Objekten und JSON-Darstellungen zu berücksichtigen
VerkaufSchema.set('toObject', { virtuals: true });
VerkaufSchema.set('toJSON', { virtuals: true });

// Erzeuge ein Mongoose-Modell mit dem Schema und dem Kollektionsnamen 'schrauben'
const schraubenModel = mongoose.model('Schraube', VerkaufSchema, 'schrauben');

// Exportiere das Modell, um es in anderen Dateien zu verwenden
module.exports = schraubenModel;
