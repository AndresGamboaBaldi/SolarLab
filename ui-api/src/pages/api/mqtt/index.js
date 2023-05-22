import * as mqtt from 'mqtt'; // import everything inside the mqtt module and give it the namespace "mqtt"

//MQTT methods
var client = mqtt.connect(`mqtt://${process.env.HOST}`);

client.on('error', function (error) {
	console.log('Connection Error to Broker MQTT');
});

export default function handler(req, res) {
	if (req.method === 'POST') {
		responseESP(req.body);
		res.status(200).json({ status: true });
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}

function responseESP(action) {
	client.publish('test/upb', JSON.stringify(action), { qos: 2 });
}
