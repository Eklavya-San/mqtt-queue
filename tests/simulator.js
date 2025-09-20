const mqtt = require("mqtt");
const { mqttHost, mqttPort } = require("../src/config/config");
const logger = require("../src/config/logger");

const mqttBroker = `mqtt://${mqttHost}:${mqttPort}`;

const mqttClient = mqtt.connect(mqttBroker, {
  keepalive: 60,
  reconnectPeriod: 30000,
});

const flipSwitch = (arg) => {
  return !arg;
};

let light = false;

mqttClient.on("connect", async () => {
  logger.info("Simulator connected. Publishing light events every 10s...");
  const topics = ["hall_light", "bedroom_light"];
  setInterval(async () => {
    await Promise.all(
      topics.map((topic) => {
        mqttClient.publish(topic, JSON.stringify(light));
      })
    );
    light = flipSwitch(light);
  }, 10000);
});
