const { request } = require('@playwright/test');

exports.baseURL = async () => {
    const apiContext = await request.newContext({
        baseURL: 'http://localhost:3000'
    });

    return apiContext;

}