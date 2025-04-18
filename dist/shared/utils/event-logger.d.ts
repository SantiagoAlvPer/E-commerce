export declare class EventLogger {
    private uri;
    private isConnected;
    constructor();
    connect(): Promise<void>;
    saveEvent(event: {
        source: string;
        topic: string;
        payload: any;
        snapshot: any;
    }): Promise<void>;
}
