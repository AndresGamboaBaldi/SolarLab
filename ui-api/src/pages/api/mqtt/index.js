import * as mqtt from 'mqtt'; // import everything inside the mqtt module and give it the namespace "mqtt"

import { host } from '../../../utils/config';

//MQTT methods
var client = mqtt.connect(`mqtt://${host}`);

client.on('error', function (error) {
	console.log("Can't connect" + error);
});

export default function handler(req, res) {
	if (req.method === 'POST') {
		responseESP(req.body);
		res.status(200).json(req.body);
	} else {
		return res.status(400).json({ error: 'Metodo Incorrecto' });
	}
}

function responseESP(action) {
	//client.publish('test/upb', JSON.stringify({ action: action }));
	client.publish('test/upb', JSON.stringify(action));
}
