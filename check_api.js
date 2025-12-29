const http = require('http');

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/special-products/on-sale',
    method: 'GET',
};

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    let data = '';

    res.on('data', d => {
        data += d;
    });

    res.on('end', () => {
        console.log('Response:', data.substring(0, 500)); // Log first 500 chars
    });
});

req.on('error', error => {
    console.error(error);
});

req.end();
