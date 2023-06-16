import * as mqtt from 'mqtt';

const globalForMqtt = global;

import socket from './socket';

const connectMqtt = () => {
	const client = mqtt.connect(`mqtt://${process.env.HOST}`, {
		clientId: 'SolarLab',
	});
	client.on('connect', function () {
		console.log('MQTT Broker Connected');
		mqttClient.subscribe('solarlab/server');
	});
	client.on('message', function (topic, message) {
		socket.emit('esp32', message.toString());
	});
	return client;
};

export const mqttClient = globalForMqtt.mqtt || connectMqtt();

if (process.env.NODE_ENV !== 'production') globalForMqtt.mqtt = mqttClient;

export default mqttClient;
