import { Credential } from './credential';
import { ClientProfile } from "./profile/client_profile";
/**
 * @inner
 */
export declare class AbstractClient {
    path: string;
    credential: Credential;
    region: string;
    sdkVersion: string;
    apiVersion: string;
    endpoint: string;
    profile: ClientProfile;
    /**
     * 实例化client对象
     * @param {string} endpoint 接入点域名
     * @param {string} version 产品版本
     * @param {Credential} credential 认证信息实例
     * @param {string} region 产品地域
     * @param {ClientProfile} profile 可选配置实例
     */
    constructor(endpoint: string, version: string, credential: Credential, region: string, profile?: ClientProfile);
    /**
     * @inner
     */
    getEndpoint(): string;
    /**
     * @inner
     */
    succRequest(resp: any, cb: any, data: any): void;
    /**
     * @inner
     */
    failRequest(errMsg: any, cb: any): void;
    /**
     * @inner
     */
    request(action: any, req: any, resp: any, cb: any): void;
    /**
     * @inner
     */
    doRequest(action: any, req: any): Promise<{}>;
    /**
     * @inner
     */
    mergeData(data: any, prefix?: string): {};
    /**
     * @inner
     */
    formatRequestData(action: any, params: any): any;
    /**
     * @inner
     */
    formatSignString(params: any): string;
}
