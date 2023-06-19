const express = require('express');
const mongoose = require('mongoose');
const Schrauben = require('./schraubenModel');

const app = express();

// Verbindung zur MongoDB-Datenbank herstellen
mongoose.connect('mongodb+srv://Martin:' + encodeURIComponent('Jappy1994!') + '@cluster0.lp67urt.mongodb.net/<database>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route für den Abruf von Verkäufen basierend auf der Produkt-ID
app.get('/sales/:id', (req, res) => {
  Schrauben.find({ produkt_id: req.params.id })
    .then(schrauben => {
      res.json(schrauben);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    });
});

// Route für den Abruf aller Verkäufe
app.get('/sales', (req, res) => {
  Schrauben.find()
    .then(schrauben => {
      res.json(schrauben);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
