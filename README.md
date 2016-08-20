Utility function that produces a signed websocket URL for AWS IOT Device Gateway, allowing browsers to connect directly to AWS IOT data pipelines. 

The code is mostly extracted from [AWS IOT websocket MQTT Sample](https://github.com/awslabs/aws-iot-examples/tree/master/mqttSample), and packaged as a NPM library for convenient use. 

Here is a list of changes from the original code:
* removed UI dependencies so it can easily be used with a different UI, 
* extended the signature function to support session tokens, for easy Cognito support

The original code copyright is by Amazon.com, Inc. or its affiliates.

## Signature structure

See the [IOT Protocols Guide](http://docs.aws.amazon.com/iot/latest/developerguide/protocols.html) and [Signature V4 Signing Process](http://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) for more information on the structure of the signed URL.


## Usage

```js
var signUrl = require('aws-device-gateway-signed-url');
signedUrl = signUrl (params);
```

`params` is a key-value hash containing the following keys:

* `regionName`: AWS region, for example, `us-east-1`
* `endpoint`: AWS device gateway endpoint URL. (see `Retrieving your endpoint URL` below)
* `secretKey`: AWS access Secret key 
* `accessKey`: AWS access key ID
* `sessionToken`: _optional_ an AWS Session Token (from STS, Cognito, or assumed role)
* `expires`: _optional_ seconds until the signed url expires. default is `86400`, 1 day

## Retrieving your endpoint URL

Each AWS account has an associated IOT device gateway endpoint. Use the following AWS CLI command to discover your endpoint URL

```bash
aws iot describe-endpoint --query endpointAddress --output text
```
