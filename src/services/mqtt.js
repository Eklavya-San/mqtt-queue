const mqtt = require("mqtt");
const dayjs = require("dayjs");
const { debug, error: _error, info, warn } = require("../config/logger");
const { mqttHost, mqttPort, mqttTopics } = require("../config/config");
const mqttBroker = `mqtt://${mqttHost}:${mqttPort}`;
const topics = mqttTopics.split(",").map((topic) => topic.trim());

let mqttClient = null;
/**
 * Get singleton mqtt client object.
 * @returns {mqtt.MqttClient} mqttClient Object
 */
const getMqttClient = () => {
  try {
    if (mqttClient !== null) return mqttClient;
    mqttClient = mqtt.connect(mqttBroker, {
      keepalive: 60,
      reconnectPeriod: 30000,
    });

    mqttClient.on("connect", () => {
      info(`Connected to mqtt broker ${dayjs().format()}`);

      // subscribe after connecting
      mqttClient.subscribe(topics, (err) => {
        if (err) {
          _error(
            `Failed to subscribe to MQTT topic: ${
              err.message
            } ${dayjs().format()}`
          );
        } else {
          info(`Subscribed to ${topics}`);
        }
      });
    });

    mqttClient.on("disconnect", () => {
      warn(`Disconnected from mqtt broker  ${dayjs().format()}`);
    });
    return mqttClient;
  } catch (error) {
    _error(`Failed to get mqtt client please try again`);
    mqttClient = null;
    throw error;
  }
};

module.exports = {
  getMqttClient,
};
