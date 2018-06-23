/**
 * http可选参数类
 * @class
 */
export declare class HttpProfile {
    reqMethod: string;
    endpoint: string;
    protocol: string;
    reqTimeout: number;
    /**
     * @param {string} protocol 协议，目前支持（https://）
     * @param {string} endpoint 接入点域名，形如（cvm.ap-shanghai.tencentcloud.com）
     * @param {string} reqMethod  请求方法，目前支持（POST GET）
     * @param {number} reqTimeout 请求超时时间，默认60s
     */
    constructor(protocol?: string, endpoint?: string, reqMethod?: string, reqTimeout?: number);
}
