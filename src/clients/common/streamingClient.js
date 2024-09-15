import PubSubProducer from '../../services/pubSubProducer';

/**
 * A source of streaming information.
 * In the future will be used to expose mission replays over
 * the same API that is used for live telemetry.
 */
class StreamingClient extends PubSubProducer {
    constructor(uri) {
        super();
        this.uri = uri;
        this.connected = false;
    }

    // Base class methods to connect/disconnect to a stream source.
    connect() {}
    disconnect() {}
}

export default StreamingClient;
