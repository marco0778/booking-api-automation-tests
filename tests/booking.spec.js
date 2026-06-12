const { test, expect } = require('@playwright/test');
const { getPath, generateCurlRevamp } = require('../utils/api-helper-curls');
const { testCases } = require('../utils/booking-cases');
const { baseURL } = require('../utils/apiClient');
const fs = require('fs');

const tokenPath = getPath('storage', 'auth.json');
const tokenFile = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
const token = `${tokenFile.tokenType}${tokenFile.accessToken}`;


test.describe('API Tests Booking', () => {
    for (const testCase of testCases) {
        test(`${testCase.description}`, async ({ request }) => {

            const baseUrl = await baseURL();

            const bodyRequest = {
                ...(testCase.title !== undefined && {
                    title: testCase.title
                }),
                ...(testCase.date !== undefined && {
                    date: testCase.date
                })
            };

            // console.log(testCase.email);

            const baseHeaders = test.info().project.use.extraHTTPHeaders;

            const headers = {
                ...baseHeaders,
                'Authorization': `${token}`
            };

            const response = await baseUrl.post(`/bookings`, {
                headers,
                data: bodyRequest
            });

            const body = await response.json();
            const bodyText = await response.text();
            const status = await response.status();
            console.log("Response API", body);

            expect(testCase.expectStatus).toBe(status);
            expect(bodyText).toContain(testCase.expectMessage);

            const curl = generateCurlRevamp(`${baseUrl}/bookings`, {}, headers, JSON.stringify(bodyRequest, null, 2));

            test.info().annotations.push(
                {
                    type: 'apiURL',
                    description: curl
                });

            test.info().annotations.push(
                {
                    type: 'apiResponse',
                    description: JSON.stringify(body)
                });

        });
    }

});