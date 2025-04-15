import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventId: { type: String, required: true },
    timestamp: { type: String, required: true },
    source: { type: String, required: true },
    topic: { type: String, required: true },
    payload: { type: Object, required: true },
    snapshot: { type: Object, required: true }
  });
  
  export const EventModel = mongoose.model('Event', eventSchema);