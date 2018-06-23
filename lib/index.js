"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
class CMQ {
    /**
    * 实例化client对象
    * @param {string} endpoint 接入点域名
    * @param {string} version 产品版本
    * @param {Credential} credential 认证信息实例
    * @param {string} region 产品地域
    * @param {ClientProfile} profile 可选配置实例
    */
    constructor(endpoint, version, credential, region, profile) {
        this.apiVersion = version;
        this.endpoint = endpoint;
        this.credential = credential;
        this.region = region;
        this.profile = profile || null;
        this.client = new common_1.AbstractClient(endpoint, version, credential, region, this.profile);
    }
    sendMessage(queueName, msgBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            const res = yield that.client.doRequest('SendMessage', { queueName, msgBody: encodeURIComponent(msgBody) });
            return res;
        });
    }
    receiveMessage(queueName, pollingWaitSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            const res = yield that.client.doRequest('ReceiveMessage', { queueName, pollingWaitSeconds });
            return res;
        });
    }
    deleteMessage(queueName, receiptHandle) {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            const res = yield that.client.doRequest('DeleteMessage', { queueName, receiptHandle });
            return res;
        });
    }
    createQueue(queueName, pollingWaitSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            const res = yield that.client.doRequest('CreateQueue', { queueName, pollingWaitSeconds });
            return res;
        });
    }
    deleteQueue(queueName) {
        return __awaiter(this, void 0, void 0, function* () {
            const that = this;
            const res = yield that.client.doRequest('DeleteQueue', { queueName });
            return res;
        });
    }
}
exports.CMQ = CMQ;
