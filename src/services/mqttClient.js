import mqtt from 'mqtt';

let client = null;

// Function to connect mqtt given a topic
export const connectClient = (topic, onMessageCallback) => {

  //config for mqtt client
  const clientId = 'clientId-' + Math.random().toString(16).substr(2, 8);

  client = mqtt.connect(import.meta.env.VITE_MQTT_URL, {
    username: import.meta.env.VITE_MQTT_USERNAME,
    password: import.meta.env.VITE_MQTT_PASSWORD,
    clientId: clientId,
    protocol: 'wss',
    rejectUnauthorized: true,
  });

  // connect to client
  client.on('connect', () => {
    console.log('Connected to broker');
    client.subscribe(topic, (err) => {
      if (err) {
        console.error(`Failed to subscribe: ${err.message}`);
      } else {
        console.log(`Subscribed to topic: ${topic}`);
      }
    });
  });

  // May need to adjust for messaging
  ////////////////////////////////////
  client.on('message', (receivedTopic, message) => {
    if (receivedTopic === topic) {
      const data = JSON.parse(message.toString());
      // console.log('Received data:', data);
      onMessageCallback(data);
    }
  });

  client.on('error', (error) => {
    console.error('MQTT Client Error:', error);
  });
};

// End session 
export const disconnectClient = () => {
  if (client) {
    client.end();
    console.log('Disconnected from MQTT broker');
  }
};
