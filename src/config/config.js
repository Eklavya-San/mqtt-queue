const dotenv = require("dotenv");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");

const loadEnv = () => {
  const envPaths = [
    path.join(process.execPath, "..", ".env"), // Next to executable
    path.join(process.cwd(), ".env"), // Current working directory
    path.join(process.env.PORTABLE_ENV_PATH || "", ".env"), // Custom env path];
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath });
      return true;
    }
  }
  return false;
};

loadEnv();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    MQTT_HOST: Joi.string().description("Mqtt broker ip").required(),
    MQTT_PORT: Joi.string().description("Mqtt broker port").required(),
    MQTT_TOPICS: Joi.string().description("Mqtt broker topics").required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  mqttHost: envVars.MQTT_HOST,
  mqttPort: envVars.MQTT_PORT,
  mqttTopics: envVars.MQTT_TOPICS,
  nodeEnv: envVars.NODE_ENV,
};
