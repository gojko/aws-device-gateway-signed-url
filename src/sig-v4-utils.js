/*global module, require */
var CryptoJS = require('crypto-js'),
	SigV4Utils = {};
module.exports = SigV4Utils;

SigV4Utils.sign = function (key, msg) {
	'use strict';
	var hash = CryptoJS.HmacSHA256(msg, key);
	return hash.toString(CryptoJS.enc.Hex);
};

SigV4Utils.sha256 = function (msg) {
	'use strict';
	var hash = CryptoJS.SHA256(msg);
	return hash.toString(CryptoJS.enc.Hex);
};

SigV4Utils.getSignatureKey = function (key, dateStamp, regionName, serviceName) {
	'use strict';
	var kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + key),
		kRegion = CryptoJS.HmacSHA256(regionName, kDate),
		kService = CryptoJS.HmacSHA256(serviceName, kRegion),
		kSigning = CryptoJS.HmacSHA256('aws4_request', kService);
	return kSigning;
};
