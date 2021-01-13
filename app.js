const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


const productRoutes = require('./api/routes/products');
const userRoutes = require('./api/routes/users');
//połączenie z bazą danych
mongoose.connect(
  'mongodb+srv://admin:'+ 
    process.env.ATLAS_PWD +
    '@Cluster0.okblc.mongodb.net/sklep?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  }
);


//katalog static
app.use("/uploads", express.static('uploads'));

//logger
app.use(morgan('combined'));

//body-parser
app.use(bodyParser.json());

//routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
//obsługa błędów
app.use((req, res, next) => {
  const error = new Error('Nie znaleziono');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      wiadomosc: error.message,
    },
  });
});

module.exports = app;
