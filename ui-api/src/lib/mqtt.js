import * as mqtt from 'mqtt';

const globalForMqtt = global;

const connectMqtt = () => {
	const client = mqtt.connect(`mqtt://${process.env.HOST}`, {
		clientId: 'SolarLab',
	});
	client.on('connect', function () {
		console.log('Subscribing');
		mqttClient.subscribe('solarlab/server');
	});
	client.on('message', function (topic, message) {
		console.log(message.toString());
	});
	return client;
};

export const mqttClient = globalForMqtt.mqtt || connectMqtt();

if (process.env.NODE_ENV !== 'production') globalForMqtt.mqtt = mqttClient;

export default mqttClient;
