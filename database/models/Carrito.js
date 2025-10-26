module.exports = (sequelize, DataTypes) => {
  const Carrito = sequelize.define(
    "Carrito",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        defaultValue: sequelize.literal('GETDATE()')
      }
    },
    {
      tableName: "carrito",
      timestamps: false
    }
  );

  Carrito.associate = function (models) {
    Carrito.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "usuario"
    });
    Carrito.belongsTo(models.Game, {
      foreignKey: "producto_id",
      as: "game"
    });
  };

  return Carrito;
};
