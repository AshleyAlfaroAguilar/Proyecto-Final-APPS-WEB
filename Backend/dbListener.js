const { Client } = require('pg');
const socketio = require('./socketio');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'FRIENDS',
  password: '1234567',
  port: 5433,
});

client.connect();

// cambios en la tabla
client.query('LISTEN table_update');

client.on('notification', async (msg) => {
    if (msg.channel === 'table_update') {
        const payload = JSON.parse(msg.payload);
        console.log('Cambio detectado desde PostgreSQL:', payload);
        socketio.emitChange(payload);
      }
});

// Crear el trigger en PostgreSQL
const createTriggerFunction = `
CREATE OR REPLACE FUNCTION notify_table_update()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('table_update', json_build_object(
    'table', TG_TABLE_NAME,
    'old', OLD,
    'new', NEW,
    'operation', TG_OP
  )::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS my_friends_update_trigger ON my_friends;
CREATE TRIGGER my_friends_update_trigger
AFTER UPDATE ON my_friends
FOR EACH ROW EXECUTE FUNCTION notify_table_update();
`;

client.query(createTriggerFunction)
  .then(() => console.log('Trigger creado exitosamente'))
  .catch(err => console.error('Error al crear trigger:', err));

module.exports = client;