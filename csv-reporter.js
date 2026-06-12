// const bodyParser = require('body-parser');
// const { response } = require('express');
const fs = require('fs');
// const { url } = require('inspector');
const { parse } = require('json2csv');

class CsvReporter {
    constructor() {
        this.results = [];
    }



    onTestEnd(test, result) {
        const apiResponse = test.annotations.find(a => a.type === 'apiResponse')?.description || '';
        const apiRequest = test.annotations.find(a => a.type === 'apiRequest')?.description || '';
        const apiURL = test.annotations.find(a => a.type === 'apiURL')?.description || '';
        const apiHeaders = test.annotations.find(a => a.type === 'apiHeaders')?.description || '';

        let combinedRequest = {};

        try {
            combinedRequest = {
                url: apiURL ? JSON.parse(apiURL) : {},
                headers: apiHeaders ? JSON.parse(apiHeaders) : {},
                body: apiRequest ? JSON.parse(apiRequest) : {}
            };
        } catch (error) {
            combinedRequest = { url: apiURL, headers: apiHeaders, body: apiRequest };
        }

        this.results.push({
            title: test.title,
            status: result.status,
            duration: result.duration,
            error: result.error ? result.error.message : '',
            //headers: apiHeaders ? apiHeaders.description : '',
            request: JSON.stringify(combinedRequest),
            url: apiURL,
            response: apiResponse
        });
    }

    onEnd() {
        const fields = ['title', 'status', 'duration', 'error', 'url', 'request', 'response'];
        const csv = parse(this.results, { fields });

        fs.writeFileSync('playwright-results.csv', csv);
        console.log('✅ Test results saved to playwright-results.csv');
    }
}

module.exports = CsvReporter;
