const sequelize = require('./models/index');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');

   
    await sequelize.sync({ force: false }); 
    console.log('Modelo sincronizado correctamente con la base de datos.');
  } catch (error) {
    console.error('Error al conectar o sincronizar:', error);
  }
})();
