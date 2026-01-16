const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;


// Permite que el servidor entienda JSON
app.use(express.json());

// Habilita CORS para evitar bloqueos desde el frontend
app.use(cors());

// ---------- RUTAS ----------

// Ruta para obtener TODOS los personajes
// Endpoint: http://localhost:3000/characters
// Método: GET
app.get("/characters", async (req, res) => {
  try {
    // Petición a la API externa de Rick and Morty
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );

    // Enviamos solo los resultados como JSON
    res.json(response.data.results);
  } catch (error) {
    // Control de errores
    res.status(500).json({
      message: "Error al obtener los personajes",
    });
  }
});

// Ruta para obtener un personaje por nombre
// Endpoint: http://localhost:3000/characters/:name
// Método: GET
app.get("/characters/:name", async (req, res) => {
  // Extraemos el parámetro dinámico de la URL
  const { name } = req.params;

  try {
    // Petición a la API externa filtrando por nombre
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${name}`
    );

    // Enviamos el resultado como JSON
    res.json(response.data.results);
  } catch (error) {
    // Si no se encuentra el personaje
    res.status(404).json({
      message: "Personaje no encontrado",
    });
  }
});

// ---------- LEVANTAR SERVIDOR ----------

// Ponemos el servidor a escuchar
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
