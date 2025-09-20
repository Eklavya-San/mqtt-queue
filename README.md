# MQTT Queue Listener & Simulator

> A lightweight Node.js MQTT client that subscribes to topics, logs real-time messages, and includes a built-in simulator for testing. Perfect for learning MQTT, smart home systems, or message queuing.

Built with:

- ✅ MQTT.js
- ✅ dotenv (config via `.env`)
- ✅ Day.js (timestamps)
- ✅ Modular logging & config

---

## Project Structure

```
mqtt-queue/
├── src/
│   ├── config/
│   │   ├── config.js    # MQTT broker settings
│   │   └── logger.js    # Custom logger (debug, info, warn, error)
│   ├── services/
│   │   ├── mqtt.js      # Singleton MQTT client (subscribe/handle)
│   │   └── index.js     # Main listener logic
│   └── index.js         # App entry point
├── tests/
│   └── simulator.js     # Publishes mock light ON/OFF events
├── .env                 # Environment variables (copy from .env.example)
├── .env.example         # Template for env vars
├── package.json
└── README.md
```

---

## Getting Started

### 1. Clone & Install

```bash
git clone git@github.com:Eklavya-San/mqtt-queue.git
cd mqtt-queue
pnpm install  # pnpm install
```

### 2. Configure Environment

Copy the example and fill in your MQTT broker details:

```bash
cp .env.example .env
```

Edit `.env`:

```env
MQTT_HOST=broker.emqx.io
MQTT_PORT=1883
MQTT_TOPICS=hall_light,bedroom_light
NODE_ENV=development
```

> You can use public brokers like `broker.emqx.io` or `test.mosquitto.org` for testing.

### 3. Start the Listener

```bash
pnpm run dev
```

You’ll see logs like:

```
 hall_light is now: true
 bedroom_light is now: false
```

### 4. (Optional) Start the Simulator

In another terminal:

```bash
node tests/simulator.js
```

It will publish alternating `true`/`false` to your topics every 5 seconds.

---

## Features

- **Singleton MQTT Client**: Reusable, reconnects automatically.
- **Buffer Handling**: Correctly parses MQTT payloads to JSON booleans.
- **Configurable Topics**: Define via `.env` — no code changes needed.
- **Simulator Included**: Test without real hardware.
- **Clean Logging**: Timestamps, topic names, and parsed values.

---

## Environment Variables copy from sample `.env.example`

---

## Testing with Public Tools

Subscribe live using [MQTT Explorer](https://mqtt-explorer.com/) or online client:

https://www.emqx.com/en/mqtt-client

Subscribe to your topic (e.g., `hall_light`) to see messages in real-time.

---

## 📄 License

MIT — See [LICENSE](LICENSE) for details.

---
