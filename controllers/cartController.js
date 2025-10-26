const db = require("../database/models");

module.exports = {
  // Mostrar carrito
 viewCart: async (req, res) => {
  try {
    const items = await db.Carrito.findAll({
      include: [{ model: db.Game, as: "game" }]
    });

    // Calcular total 💰
    const total = items.reduce((acc, item) => {
      return acc + (item.game?.price || 0) * item.quantity;
    }, 0);

    res.render("cart", { title: "Tu carrito", cart: items, total });
  } catch (error) {
    console.error("Error al cargar el carrito:", error);
    res.status(500).send("Error al cargar el carrito.");
  }
},


  // Agregar producto al carrito
  addToCart: async (req, res) => {
    try {
      const { id } = req.body;
        console.log("🎮 ID del juego recibido:", id); // 👈 importante


      await db.Carrito.create({
        producto_id: id,
        usuario_id: 28, // 🔸 temporal, hasta conectar el login
        quantity: 1
      });
      res.redirect("/cart");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      res.status(500).send("Error al agregar al carrito.");
    }
  },

  // Eliminar solo una unidad
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
};
