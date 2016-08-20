/*global require, module*/
var moment = require('moment'),
	SigV4Utils = require('./sig-v4-utils');
module.exports = function computeUrl(options) {
	'use strict';
	var time = moment.utc(),
		dateStamp = time.format('YYYYMMDD'),
		amzdate = dateStamp + 'T' + time.format('HHmmss') + 'Z',
		service = 'iotdevicegateway',
		region = options.regionName,
		secretKey = options.secretKey,
		accessKey = options.accessKey,
		sessionToken = options.sessionToken,
		expires = options.expires || '86400',
		algorithm = 'AWS4-HMAC-SHA256',
		method = 'GET',
		canonicalUri = '/mqtt',
		host = options.endpoint,
		credentialScope = dateStamp + '/' + region + '/' + service + '/' + 'aws4_request',
		canonicalQuerystring = 'X-Amz-Algorithm=AWS4-HMAC-SHA256' +
			'&X-Amz-Credential=' + encodeURIComponent(accessKey + '/' + credentialScope) +
			'&X-Amz-Date=' + amzdate +
			'&X-Amz-Expires=' + expires +
			'&X-Amz-SignedHeaders=host',
		canonicalHeaders = 'host:' + host + '\n',
		payloadHash = SigV4Utils.sha256(''),
		canonicalRequest = method + '\n' + canonicalUri + '\n' + canonicalQuerystring + '\n' + canonicalHeaders + '\nhost\n' + payloadHash,
		stringToSign = algorithm + '\n' +  amzdate + '\n' +  credentialScope + '\n' +  SigV4Utils.sha256(canonicalRequest),
		signingKey = SigV4Utils.getSignatureKey(secretKey, dateStamp, region, service),
		signature = SigV4Utils.sign(signingKey, stringToSign);

	canonicalQuerystring += '&X-Amz-Signature=' + signature;

	if (sessionToken) {
		canonicalQuerystring += '&X-Amz-Security-Token=' + encodeURIComponent(sessionToken);
	}
	return 'wss://' + host + canonicalUri + '?' + canonicalQuerystring;
};


