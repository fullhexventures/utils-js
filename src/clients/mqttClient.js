import Logger from '../services/logger';
import StreamingClient from './common/streamingClient';
import mqtt from 'mqtt';

/**
 * MqttStreamSource
 * A streaming data source that receives data in real-time
 * from an MQTT broker.
 */
class MQTTClient extends StreamingClient {
    constructor(uri, username, password, useAuth, topics) {
        super(uri, false);
        this.useAuth = useAuth;
        this.username = username;
        this.password = password;
        this.mqtt = null;
        this.topics = topics || [];
    }

    connect() {
        super.connect();
        // Initialize connection to the MQTT broker
        Logger.info(`MQTT Connecting on ${this.uri}`);
        Logger.info(`MQTT useAuth: ${this.useAuth}`);
        if (this.useAuth) {
            this.mqtt = mqtt.connect(this.uri, {
                username: this.username,
                password: this.password,
            });
        } else {
            this.mqtt = mqtt.connect(this.uri);
        }

        this.mqtt.on('close', () => {
            this.online = false;
            Logger.debug('Lost connection to MQTT');
            this.publish('online', this.online);
        });

        this.mqtt.on('connect', () => {
            this.online = true;
            Logger.debug('Gained connection to MQTT');

            // Subscribe to all the important vessel data.
            for (const topic of this.topics) {
                this.mqtt.subscribe(topic, () => {});
            }
            this.publish('online', this.online);
        });

        this.mqtt.on('close', () => {
            this.online = false;
            this.publish('online', this.online);
        });
        this.mqtt.on('disconnect', () => {
            this.online = false;
            this.publish('online', this.online);
        });
        this.mqtt.on('offline', () => {
            this.online = false;
            this.publish('online', this.online);
        });

        this.mqtt.on('message', (topic, message) => {
            const jsonMessage = JSON.parse(new TextDecoder().decode(message));
            this.publish(topic, jsonMessage);
        });

        this.connected = true;
        this.publish('connected', this.connected);
    }

    disconnect() {
        super.disconnect();

        this.mqtt.end();
        this.mqtt = null;

        this.connected = false;
        this.publish('connected', this.connected);
    }
}

export { MQTTClient };
