const { request } = require('@playwright/test');
const fs = require('fs');
const { getPath } = require('./utils/api-helper-curls');


async function globalSetup() {
    const requestContext = await request.newContext();

    const urlToken = 'http://localhost:3000/auth/login';
    const payloadReqToken = {
        "email": "maureecemarco01@rocketmail.com",
        "password": "Testing123!@"
        // "email": "marco@ifortepay.id",
        // "password": "Testing123!@"
    };

    const responseToken = await requestContext.post(urlToken, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: payloadReqToken
    })

    const bodyResponse = await responseToken.json();
    const tokenType = 'Bearer ';
    const accessToken = bodyResponse?.token;
    const savePath = getPath('storage','auth.json');

    //return respToken;
    fs.writeFileSync(savePath, JSON.stringify({ tokenType, accessToken }, null, 2));
    console.log('✅ Token berhasil disimpan ke auth-json.json');
    await requestContext.dispose();
}

module.exports = globalSetup;