const mqttSingleton = require("./mqtt");
const notifier = require("node-notifier");

const mqttClient = mqttSingleton.getMqttClient();

const handleMessage = (topic, payload) => {
  const parsedPayload = JSON.parse(payload);
  const message = parsedPayload ? "Light on" : "Light off";
  notifier.notify({
    title: `${topic}`,
    message: `${message}`,
  });
};
mqttClient.on("message", handleMessage);
