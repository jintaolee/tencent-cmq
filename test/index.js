var test = require('tap').test;
var cmq = require('../index');

test('test send  message', async function (t) {
    try {
        let endpoint = 'cmq-queue-sh.api.qcloud.com';
        let version = 'v2';
        let credential = {
            secretId: '',
            secretKey: '',
            token: '',
        }
        let region = 'sh';
        let CMQ = new cmq.CMQ(endpoint, version, credential, region)
        let ret = await CMQ.sendMessage('npi-project-queue', 'test Message');
        t.equal(ret.code, 0)
        t.end()
    } catch (error) {
        t.ifError(error, 'Interval parse error');
    }
})


test('test receive  message', async function (t) {
    try {
        let endpoint = 'cmq-queue-sh.api.qcloud.com';
        let version = 'v2';
        let credential = {
            secretId: '',
            secretKey: '',
            token: '',
        }
        let region = 'sh';
        let CMQ = new cmq.CMQ(endpoint, version, credential, region)
        let ret = await CMQ.receiveMessage('npi-project-queue', 10);
        console.log(ret)
        t.equal(ret.code, 0)
        t.end()
    } catch (error) {
        t.ifError(error, 'Interval parse error');
    }
})

test('test delete  message', async function (t) {
    try {
        let endpoint = 'cmq-queue-sh.api.qcloud.com';
        let version = 'v2';
        let credential = {
            secretId: '',
            secretKey: '',
            token: '',
        }
        let region = 'sh';
        let CMQ = new cmq.CMQ(endpoint, version, credential, region)
        let ret = await CMQ.deleteMessage('npi-project-queue', '8077811077113597120');
        t.equal(ret.code, 0)
        t.end()
    } catch (error) {
        t.ifError(error, 'Interval parse error');
    }
})