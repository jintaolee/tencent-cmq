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


export class CMQ {
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
    constructor(endpoint: string, version: string, credential: Credential, region: string, profile?: ClientProfile) {
        this.apiVersion = version;
        this.endpoint = endpoint;
        this.credential = credential;
        this.region = region;
        this.profile = profile || null;
        this.client = new AbstractClient(endpoint, version, credential, region, this.profile);
    }

    public async sendMessage(queueName: string, msgBody: string): Promise<SendMessageResponse> {
        const that = this;
        const res = await that.client.doRequest('SendMessage', { queueName, msgBody: encodeURIComponent(msgBody) })
        return res as SendMessageResponse;
    }

    public async receiveMessage(queueName: string, pollingWaitSeconds: number): Promise<ReceiveMessageResponse> {
        const that = this;
        const res = await that.client.doRequest('ReceiveMessage', { queueName, pollingWaitSeconds })
        return res as ReceiveMessageResponse;
    }

    public async deleteMessage(queueName: string, receiptHandle: string): Promise<DeleteMessageResponse> {
        const that = this;
        const res = await that.client.doRequest('DeleteMessage', { queueName, receiptHandle })
        return res as DeleteMessageResponse;
    }

    public async createQueue(queueName: string, pollingWaitSeconds: number): Promise<CreateQueueResponse> {
        const that = this;
        const res = await that.client.doRequest('CreateQueue', { queueName, pollingWaitSeconds })
        return res as CreateQueueResponse;
    }

    public async deleteQueue(queueName: string): Promise<DeleteQueueResponse> {
        const that = this;
        const res = await that.client.doRequest('DeleteQueue', { queueName })
        return res as DeleteQueueResponse;
    }


}