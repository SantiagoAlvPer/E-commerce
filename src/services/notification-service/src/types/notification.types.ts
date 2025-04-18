export interface NotificationPayload {
    to: string;
    subject: string;
    content: string;
  }
  
  export interface NotificationSnapshot {
    status: 'SENT' | 'FAILED';
    sentAt: Date;
    error?: string;
  }
  
  export interface UserWelcomeEvent {
    source: 'UserService';
    topic: 'notifications';
    payload: NotificationPayload;
  }
  
  import { EventDocument } from '../../../../shared/events/event.model';