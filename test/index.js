var test = require('tap').test;
var cmq = require('../index');
const env = process.env;
let endpoint = env.CMQ_ENDPOINT || 'cmq-queue-sh.api.qcloud.com';
let version = 'v2';
let credential = {
    secretId: env.CMQ_SECRET_ID || '',
    secretKey: env.CMQ_SECRET_KEY || '',
    token: '',
}
let region = env.CMQ_REGION || 'sh';
let queueName = env.CMQ_QUEUE_NAME || 'npi-project-queue'

test('test send  message', async function (t) {
    try {
        let CMQ = new cmq.CMQ(endpoint, version, credential, region)
        let ret = await CMQ.sendMessage(queueName, 'test Message');
        t.equal(ret.code, 0)
        t.end()
    } catch (error) {
        t.ifError(error, 'Interval parse error');
    }
})


test('test receive  message', async function (t) {
    try {
        let CMQ = new cmq.CMQ(endpoint, version, credential, region)
        let ret = await CMQ.receiveMessage(queueName, 10);
        console.log(ret)
        t.equal(ret.code, 0)
        t.end()
    } catch (error) {
        t.ifError(error, 'Interval parse error');
    }
})

test('test delete  message', async function (t) {
    try {
        let CMQ = new cmq.CMQ(endpoint, version, credential, region)
        let ret = await CMQ.deleteMessage(queueName, '8077811077113597120');
        t.equal(ret.code, 0)
        t.end()
    } catch (error) {
        t.ifError(error, 'Interval parse error');
    }
})