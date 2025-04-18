import { HttpStatus } from '@nestjs/common';
export declare class ResponseAdapter {
    static set<T>(code: HttpStatus, data: T, message: string, status?: boolean): {
        code: HttpStatus;
        data: T;
        message: string;
        status: boolean;
        timestamp: string;
    };
}
