'use strict';
exports.handler = (event, context, callback) => {
    /*
     * Extract request object in order to preserve httpVersion field.
     * This is necessary in order to match the client's httpVersion. Please
     * refer to your CloudFront Distribution's HttpVersion configuration for whether to
     * specify HTTP 1.1, 2.0 or match-viewer.
     */
    const request = event.Records[0].cf.request;

    /*
     * Generate HTTP response using 200 status code with a simple body.
     */
    const response = {
        status: '200',
        statusDescription: 'HTTP OK',
        httpVersion: request.httpVersion,
        body: request.clientIp,
        headers: {
            'cache-control': [{
                key: 'Cache-Control',
                value: 'no-cache'
            }],
            'content-type': [{
                key: 'Content-Type',
                value: 'text/plain'
            }],
            'content-encoding': [{
                key: 'Content-Encoding',
                value: 'UTF-8'
            }],
        },
    };

    callback(null, response);
};
