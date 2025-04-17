import { Document } from 'mongoose';

export interface IBaseEvent {
    eventId: string;
    timestamp: Date;
    source: string;
    topic: string;
    payload: Record<string, any>;
    snapshot?: Record<string, any>;
  }
  
  /**
   * Interfaz para documentos MongoDB que extiende IBaseEvent y Document
   */
  export interface IBaseEventDocument extends IBaseEvent, Document {}
  
  /**
   * Tipo genérico para eventos con payload específico
   */
  export type TypedEvent<T> = IBaseEvent & {
    payload: T;
  };
  
  /**
   * Función helper para crear eventos consistentes
   */
  export function createEvent(
    source: string,
    topic: string,
    payload: Record<string, any>,
    snapshot?: Record<string, any>,
  ): IBaseEvent {
    return {
      eventId: `evt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date(),
      source,
      topic,
      payload,
      snapshot
    };
  }