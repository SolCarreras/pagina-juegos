const db = require("../database/models");

module.exports = {
  // Mostrar carrito
  viewCart: async (req, res) => {
    try {
      const usuarioId = req.session?.userId || 28; // temporal: reemplazá por id de sesión
      const items = await db.Carrito.findAll({
        where: { usuario_id: usuarioId },
        include: [{ model: db.Game, as: "game" }]
      });

      const total = items.reduce((acc, item) => {
        return acc + (item.game?.price || 0) * item.quantity;
      }, 0);

      res.render("products/cart", { title: "Tu carrito", cart: items, total });
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
      res.status(500).send("Error al cargar el carrito.");
    }
  },

  // Agregar producto al carrito (si existe: aumentar cantidad, sino crear)
  addToCart: async (req, res) => {
    try {
      const productoId = req.body.id;           // coincide con tu input hidden name="id"
      const usuarioId = req.session?.userId || 28; // temporal

      if (!productoId) {
        console.log("No se recibió productoId");
        return res.status(400).send("Falta id del producto");
      }

      // validar producto y usuario
      const game = await db.Game.findByPk(productoId);
      if (!game) {
        console.log("Juego no encontrado:", productoId);
        return res.status(404).send("Juego no encontrado");
      }
      const user = await db.Usuario.findByPk(usuarioId);
      if (!user) {
        console.log("Usuario no encontrado:", usuarioId);
        return res.status(404).send("Usuario no encontrado");
      }

      // buscar si ya hay un item con ese producto para ese usuario
      let item = await db.Carrito.findOne({
        where: { usuario_id: usuarioId, producto_id: productoId }
      });

      if (item) {
        item.quantity = item.quantity + 1;
        await item.save();
        console.log("Cantidad incrementada en carrito:", productoId);
      } else {
        await db.Carrito.create({
          usuario_id: usuarioId,
          producto_id: productoId,
          quantity: 1
        });
        console.log("Nuevo item creado en carrito:", productoId);
      }

      res.redirect("/cart");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      res.status(500).send("Error al agregar al carrito.");
    }
  },

  // Eliminar solo una unidad (usa item.id -> fila del carrito)
  removeOne: async (req, res) => {
    try {
      const itemId = req.params.id;
      const item = await db.Carrito.findByPk(itemId);

      if (!item) return res.status(404).send("Producto no encontrado.");

      if (item.quantity > 1) {
        item.quantity -= 1;
        await item.save();
      } else {
        await item.destroy();
      }

      res.redirect("/cart");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      res.status(500).send("Error al eliminar producto.");
    }
  },

  // Vaciar carrito (pagar y vaciar)
  clearCart: async (req, res) => {
    try {
      const usuarioId = req.session?.userId || 28; // temporal
      await db.Carrito.destroy({ where: { usuario_id: usuarioId } });
      res.redirect("/cart");
    } catch (error) {
      console.error("Error al vaciar carrito:", error);
      res.status(500).send("Error al vaciar carrito.");
    }
  }
};
