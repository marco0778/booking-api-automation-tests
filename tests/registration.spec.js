const { test, expect } = require('@playwright/test');
const { getPath, generateCurlRevamp } = require('../utils/api-helper-curls');
const { testCases } = require('../utils/registration-cases');

const endpoint = 'http://localhost:3000/auth/register';

test.describe('API Tests Registration', () => {
    for (const testCase of testCases) {
        test(`${testCase.description}`, async ({ request }) => {

            const bodyRequest = {
                // page: testCase.page ?? 1,
                // limit: testCase.limit ?? 5,
                // order: testCase.order ?? 'ASC',
                ...(testCase.email !== undefined && {
                    email: testCase.email
                }),
                ...(testCase.password !== undefined && {
                    password: testCase.password
                })
            };

            console.log(testCase.email);

            const baseHeaders = test.info().project.use.extraHTTPHeaders;

            const headers = {
                ...baseHeaders,
            };

            // console.log("HEADERS", JSON.stringify(headers));
            // console.log("BODY", JSON.stringify(bodyRequest));

            const response = await request.post(endpoint, {
                headers,
                data : bodyRequest
            });

            const body = await response.json();
            const bodyText = await response.text();
            // console.log("Response API", body);

            expect(testCase.expectStatus).toContain(response.status());
            expect(bodyText).toContain(testCase.expectMessage);

            const curl = generateCurlRevamp(endpoint,{}, headers, JSON.stringify(bodyRequest,null,2));

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
