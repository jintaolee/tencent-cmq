/**
 * @inner
 */
export declare class TencentCloudSDKHttpException extends Error {
    requestId: string;
    constructor(error: any, requestId?: string);
    getMessage(): string;
    getRequestId(): string;
    toString(): string;
    toLocaleString(): string;
}
