tencent-cmq
================
Node.js library for tencent CMQ.

Setup
========
```bash
npm install tencent-cmq
```

Usage
========

Simple expression.

```javascript
var sc = require('tencent-cmq');

发送消息

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
        let ret = await CMQ.sendMessage('queueName', 'test Message');
        console.log(ret)
    } catch (error) {
       console.log(error)
    }
 
 
 