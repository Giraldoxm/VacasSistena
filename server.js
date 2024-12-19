const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Configuración de la base de datos
const dbURI = 'mongodb+srv://Santiago:santi_30@qrdb.tpryn72.mongodb.net/?retryWrites=true&w=majority&appName=qrdb';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error de conexión', err));

// Middleware
app.use(bodyParser.json());

// Modelo de Vacas
const vacaSchema = new mongoose.Schema({
  nombre: String,
  raza: String,
  caracteristicas: String,
  fotoBase64: String
});
const Vaca = mongoose.model('Vaca', vacaSchema);

// Ruta para agregar una vaca
app.post('/addVaca', async (req, res) => {
  const { nombre, raza, caracteristicas, fotoBase64 } = req.body;

  const nuevaVaca = new Vaca({ nombre, raza, caracteristicas, fotoBase64 });
  await nuevaVaca.save();

  res.status(201).send({ message: 'Vaca registrada' });
});

// Ruta para obtener las vacas
app.get('/vacas', async (req, res) => {
  const vacas = await Vaca.find();
  res.json(vacas);
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
