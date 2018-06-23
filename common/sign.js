"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tencent_cloud_sdk_exception_1 = require("./exception/tencent_cloud_sdk_exception");
const crypto = require("crypto");
/**
 * @inner
 */
class Sign {
    static sign(secretKey, signStr, signMethod) {
        let signMethodMap = {
            HmacSHA1: "sha1",
            HmacSHA256: "sha256"
        };
        if (!signMethodMap.hasOwnProperty(signMethod)) {
            throw new tencent_cloud_sdk_exception_1.TencentCloudSDKHttpException("signMethod invalid, signMethod only support (HmacSHA1, HmacSHA256)");
        }
        let hmac = crypto.createHmac(signMethodMap[signMethod], secretKey || "");
        return hmac.update(Buffer.from(signStr, 'utf8')).digest('base64');
    }
}
exports.Sign = Sign;
