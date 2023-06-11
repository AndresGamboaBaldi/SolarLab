import * as mqtt from 'mqtt'; // import everything inside the mqtt module and give it the namespace "mqtt"

//MQTT methods
var client = mqtt.connect(`mqtt://${process.env.HOST}`);

client.on('error', function (error) {
	console.log('Connection Error to Broker MQTT');
});

export default function handler(req, res) {
	const topicCbba = 'solarlab/esp32/cbba';
	const topicScz = 'solarlab/esp32/scz';
	const topicLpz = 'solarlab/esp32/lpz';
	if (req.method === 'POST') {
		if (req.body.department == 'Cochabamba') {
			responseESP(req.body, topicCbba);
		} else if (req.body.department == 'La Paz') {
			responseESP(req.body, topicLpz);
		} else if (req.body.department == 'Santa Cruz') {
			responseESP(req.body, topicScz);
		} else if (req.body.department == 'All') {
			responseESP(req.body, topicCbba);
			responseESP(req.body, topicLpz);
			responseESP(req.body, topicScz);
		}

		res.status(200).json({ status: true });
	} else {
		return res.status(500).json({ error: 'HTTP Method not Valid' });
	}
}

function responseESP(action, topic) {
	client.publish(topic, JSON.stringify(action), { qos: 2 });
}
