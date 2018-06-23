import { AbstractClient, Credential, ClientProfile } from './common';
export interface SendMessageResponse {
    code: number;
    message: string;
    requestId: string;
    msgId: string;
}
export interface ReceiveMessageResponse {
    code: number;
    message: string;
    requestId: string;
    msgBody?: string;
    msgId?: string;
    receiptHandle?: string;
    enqueueTime?: number;
    firstDequeueTime?: number;
    nextVisibleTime?: number;
    dequeueCount?: number;
    clientRequestId?: number;
}
export interface DeleteMessageResponse {
    code: number;
    message: string;
    requestId: string;
}
export interface CreateQueueResponse {
    code: number;
    message: string;
    requestId: string;
    queueId: string;
}
export interface DeleteQueueResponse {
    code: number;
    message: string;
    requestId: string;
}
export declare class CMQ {
    credential: Credential;
    region: string;
    apiVersion: string;
    endpoint: string;
    profile: ClientProfile;
    client: AbstractClient;
    /**
    * 实例化client对象
    * @param {string} endpoint 接入点域名
    * @param {string} version 产品版本
    * @param {Credential} credential 认证信息实例
    * @param {string} region 产品地域
    * @param {ClientProfile} profile 可选配置实例
    */
    constructor(endpoint: string, version: string, credential: Credential, region: string, profile?: ClientProfile);
    sendMessage(queueName: string, msgBody: string): Promise<SendMessageResponse>;
    receiveMessage(queueName: string, pollingWaitSeconds: number): Promise<ReceiveMessageResponse>;
    deleteMessage(queueName: string, receiptHandle: string): Promise<DeleteMessageResponse>;
    createQueue(queueName: string, pollingWaitSeconds: number): Promise<CreateQueueResponse>;
    deleteQueue(queueName: string): Promise<DeleteQueueResponse>;
}
