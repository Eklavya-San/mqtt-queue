const mqtt = require("mqtt");
const { debug, error: _error } = require("./config/logger");
const { mqttHost, mqttPort, mqttTopics } = require("./config/config");
const mqttBroker = `mqtt://${mqttHost}:${mqttPort}`;
const topics = mqttTopics.split(",").map((topic) => topic.trim());

const mqttClient = mqtt.connect(mqttBroker, {
  keepalive: 60,
  reconnectPeriod: 30000,
});

mqttClient.on("connect", () => {
  debug(`Connected to mqtt broker`);
});

mqttClient.on("disconnect", () => {
  debug(`Disconnect to mqtt broker`);
});

mqttClient.subscribe(topics, (err) => {
  if (err) {
    _error(`Failed to subscribe to MQTT topic: ${err.message}`);
  } else {
    debug(`Subscribed to ${topics}`);
  }
});
