export declare class Producer {
    private producer;
    private sentEventIds;
    private isConnected;
    constructor();
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    private ensureConnection;
    send(topic: string, message: any): Promise<void>;
}
