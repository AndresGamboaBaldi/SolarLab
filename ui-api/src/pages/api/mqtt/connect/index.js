import mqttClient from '@/lib/mqtt';

export default function handler(req, res) {
	if (req.method === 'GET') {
		try {
			//MQTT methods
			mqttClient.on('connect', function () {
				console.log('Subscribing');
				mqttClient.subscribe('solarlab/server');
			});
			mqttClient.on('message', function (topic, message) {
				console.log(message.toString());
			});
			res.status(200).json({ status: true });
		} catch (error) {
			res.status(400).json({ status: false, error: error });
		}
	} else {
		return res
			.status(500)
			.json({ error: 'HTTP Method not Valid', status: false });
	}
}
