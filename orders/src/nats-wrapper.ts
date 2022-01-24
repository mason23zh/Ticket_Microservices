import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  // expose the client
  get client() {
    if (!this._client) {
      throw new Error("Connot access NATS client before connecting.");
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    // Create a promise
    return new Promise<void>((resolve, reject) => {
      this.client!.on("connect", () => {
        console.log("Connected to NATS");
        resolve();
      });
      // handle connection error
      this.client!.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
