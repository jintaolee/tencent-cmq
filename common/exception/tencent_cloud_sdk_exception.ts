/**
 * @inner
 */
export class TencentCloudSDKHttpException extends Error {
    requestId: string;
    constructor(error, requestId = "") {
        super(error);
        this.requestId = requestId || '';
    }

    getMessage() {
        return this.message;
    }

    getRequestId() {
        return this.requestId;
    }

    toString() {
        return "[TencentCloudSDKException]" + "message:" + this.getMessage() + "  requestId:" + this.getRequestId();
    }

    toLocaleString() {
        return "[TencentCloudSDKException]" + "message:" + this.getMessage() + "  requestId:" + this.getRequestId();
    }
}

