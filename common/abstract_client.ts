import { Credential } from './credential';
import { sdkVersion } from "./sdk_version";
import { ClientProfile } from "./profile/client_profile";
import { Sign } from "./sign";
import { HttpConnection } from "./http/http_connection";

/**
 * @inner
 */
export class AbstractClient {
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
    constructor(endpoint: string, version: string, credential: Credential, region: string, profile?: ClientProfile) {
        this.path = "/v2/index.php";

        /**
         * 认证信息实例
         * @type {Credential || null}
         */
        this.credential = credential || null;

        /**
         * 产品地域
         * @type {string || null}
         */
        this.region = region || null;
        this.sdkVersion = "SDK_NODEJS_" + sdkVersion;
        this.apiVersion = version;
        this.endpoint = endpoint;

        /**
         * 可选配置实例
         * @type {ClientProfile}
         */
        this.profile = profile || new ClientProfile();
    }

    /**
     * @inner
     */
    getEndpoint() {
        return this.profile.httpProfile.endpoint || this.endpoint;
    }

    /**
     * @inner
     */
    succRequest(resp, cb, data) {
        resp.deserialize(data);
        cb(null, resp);
    }

    /**
     * @inner
     */
    failRequest(errMsg, cb) {
        cb(errMsg, null);
    }

    /**
     * @inner
     */
    request(action, req, resp, cb) {
        this.doRequest(action, req).then(data => this.succRequest(resp, cb, data), error => this.failRequest(error, cb));
    }

    /**
     * @inner
     */
    doRequest(action, req) {
        let params = this.mergeData(req);
        params = this.formatRequestData(action, params);
        let optional = {
            timeout: this.profile.httpProfile.reqTimeout * 1000
        };
        return new Promise(
            (resolve, reject) => {
                HttpConnection.doRequest(this.profile.httpProfile.reqMethod,
                    this.profile.httpProfile.protocol + this.getEndpoint() + this.path,
                    params, (error, response, data) => {
                        if (error) {
                            reject(error.message);
                        } else if (response.statusCode !== 200) {
                            reject(response.statusCode.toString() + response.statusMessage);
                        } else {
                            data = JSON.parse(data);
                            resolve(data);
                        }
                    },  // callback
                    optional) // doRequest

            })
    }

    /**
     * @inner
     */
    mergeData(data, prefix = "") {
        let ret = {};
        for (let k in data) {
            if (data[k] === null) {
                continue;
            }
            if (data[k] instanceof Array || data[k] instanceof Object) {
                Object.assign(ret, this.mergeData(data[k], prefix + k + "."));
            } else {
                ret[prefix + k] = data[k];
            }
        }
        return ret;
    }

    /**
     * @inner
     */
    formatRequestData(action, params) {
        params.Action = action;
        params.RequestClient = this.sdkVersion;
        params.Nonce = Math.round(Math.random() * 65535);
        params.Timestamp = Math.round(Date.now() / 1000);
        params.Version = this.apiVersion;

        if (this.credential.secretId) {
            params.SecretId = this.credential.secretId;
        }

        if (this.region) {
            params.Region = this.region;
        }

        if (this.credential.token) {
            params.Token = this.credential.token;
        }

        if (this.profile.signMethod) {
            params.SignatureMethod = this.profile.signMethod;
        }
        let signStr = this.formatSignString(params);

        params.Signature = Sign.sign(this.credential.secretKey, signStr, this.profile.signMethod);
        return params;
    }

    /**
     * @inner
     */
    formatSignString(params) {
        let strParam = "";
        let keys = Object.keys(params);
        keys.sort();
        for (let k in keys) {
            //k = k.replace(/_/g, '.');
            strParam += ("&" + keys[k] + "=" + params[keys[k]]);
        }
        let strSign = this.profile.httpProfile.reqMethod.toLocaleUpperCase() + this.getEndpoint() +
            this.path + "?" + strParam.slice(1);
        return strSign;
    }

}
