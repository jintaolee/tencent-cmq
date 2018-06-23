import { HttpProfile } from "./http_profile";
/**
 * 可选参数类
 * @class
 */
export declare class ClientProfile {
    signMethod: string;
    httpProfile: HttpProfile;
    /**
     * @param {string} signMethod 签名方法，当前支持(HmacSHA1 HmacSHA256)
     * @param {HttpProfile} httpProfile http相关选项实例
     */
    constructor(signMethod?: string, httpProfile?: HttpProfile);
}
