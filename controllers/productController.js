const path = require('path');
const db = require('../database/models');

module.exports = {
    product: async (req, res) => {
        try {
            const games = await db.Game.findAll();
            res.render("products/productos", { games });
        } catch (error) {
            console.log(error);
            res.redirect('/');
        }
    },

    detail: async (req, res) => {
        try {
            const id = req.params.id;
            // Aquí luego buscarás el producto en la BD usando el id
            res.render("products/detail", { id });
        } catch (error) {
            console.log("Error al cargar detalle:", error);
            res.redirect('/');
        }
    },
     list: async (req, res) => {
    try {
      const games = await db.Game.findAll();
      res.render('products/productos', { games });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error obteniendo los juegos');
    }
  }
};