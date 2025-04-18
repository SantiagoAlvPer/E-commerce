"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = createEvent;
function createEvent(source, topic, payload, snapshot) {
    return {
        eventId: `evt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date(),
        source,
        topic,
        payload,
        snapshot
    };
}
//# sourceMappingURL=baseEvent.js.map