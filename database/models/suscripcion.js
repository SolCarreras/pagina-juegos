module.exports = (sequelize, DataTypes) => {
  const Suscripcion = sequelize.define(
    "Suscripcion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      fecha_suscripcion: {
        type: DataTypes.DATEONLY, // 👈 solo guarda la fecha (no la hora)
        allowNull: false,
        defaultValue: sequelize.literal('GETDATE()') // 👈 fecha actual desde SQL Server
      }
    },
    {
      tableName: "Suscripciones",
      timestamps: false
    }
  );

  return Suscripcion;
};

