const path = require('path');
const fs = require('fs');
const { baseURL } = require('../utils/apiClient');

export function generateCurl(url, params, headers, body = "") {
    const qs = new URLSearchParams(params).toString();

    let curl = `curl --location '${url}?${qs}' \\`;

    for (const [key, value] of Object.entries(headers)) {
        curl += `\n--header '${key}: ${value}' \\`;
    }

    curl += `\n--data '${body}'`;

    return curl;
}

export function generateCurlRevamp(url, params, headers, body = "") {

    const queryLines = Object.entries(params)
        .filter(([_, value]) =>
            value !== undefined &&
            value !== null
        )
        .map(([key, value]) =>
            `${key}=${encodeURIComponent(value)}`
        );

    let curl =
        `curl --location '${url}?\\
${queryLines.join('&\\\n')}
' \\`;

    for (const [key, value] of Object.entries(headers)) {
        curl += `\n--header '${key}: ${value}' \\`;
    }

    if (body && body !== "{}") {
        curl += `\n--data '${JSON.stringify(body, null, 2)}'`;
    }

    return curl;
}

export function generateTimeStampPlus7() {
    const now = new Date();
    // Convert to +07:00 (e.g. Jakarta timezone)
    const offsetMinutes = 7 * 60; // +07:00
    const localTime = new Date(now.getTime() + offsetMinutes * 60 * 1000);
    const iso = localTime.toISOString().split('.')[0];
    // Format to ISO 8601 with +07:00
    const xTimestamp = iso + '+07:00';
    console.log(xTimestamp);
    return xTimestamp;
}

export function generateRandomTimePlus7() {
    const now = new Date();
    const oneYearinms = 365 * 24 * 60 * 60 * 1000;
    const randomFutureMs = now.getTime() + Math.floor(Math.random() * oneYearinms);
    const randomDate = new Date(randomFutureMs);
    const utc7Date = new Date(randomDate.getTime() + (7 * 60 * 60 * 1000));
    const isoStr = utc7Date.toISOString(); // Format: YYYY-MM-DDTHH:mm:ss.sssZ

    // Replace the trailing 'Z' with '+07:00'
    const timestampPlus7 = isoStr.slice(0, 19) + "+07:00";
    console.log(timestampPlus7);
    return timestampPlus7;
}

export function generate_xExternalId() {
    const timestamp = Date.now().toString(); // usually ~13 digits

    // We want total length = 36 digits
    const remainingLength = 36 - timestamp.length;

    // Generate remaining random digits
    let randomPart = '';
    for (let i = 0; i < remainingLength; i++) {
        randomPart += Math.floor(Math.random() * 10);
    }

    // Combine timestamp + randomPart
    const uniqueCode = timestamp + randomPart;

    return uniqueCode;
}

export function generateInt4Digits() {
    // generate random number 1–9999
    const randomNum = Math.floor(Math.random() * 9999) + 1;

    return `${randomNum}`;
}

export function getBase64(imagePath = "") {
    const ext = path.extname(imagePath).toLowerCase();

    const mimeMap = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
        ".pdf": "application/pdf"
    };


    const mimeType = mimeMap[ext];
    if (!mimeType) {
        throw new Error(`Unsupported image type: ${ext}`);
    }

    const buffer = fs.readFileSync(imagePath);
    const base64 = buffer.toString("base64");

    const dataUri = `data:${mimeType};base64,${base64}`;

    return `${dataUri}`;

}

export function getBase64Plain(imagePath = "") {
    const ext = path.extname(imagePath).toLowerCase();

    const mimeMap = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
        ".pdf": "application/pdf"
    };


    const mimeType = mimeMap[ext];
    if (!mimeType) {
        throw new Error(`Unsupported image type: ${ext}`);
    }

    const buffer = fs.readFileSync(imagePath);
    const base64 = buffer.toString("base64");

    return `${base64}`;

}

export function getPath(folder = '', fileName = '') {
    return path.resolve(
        __dirname,
        `../${folder}/${fileName}`
    );
}

export function generateReferenceNumber(prefix = "00000000") {
    // generate random number 1–9999
    const randomNum = Math.floor(Math.random() * 9999) + 1;

    // pad dengan leading zero supaya selalu 4 digit
    const suffix = randomNum.toString().padStart(4, "0");

    return `${prefix}${suffix}`;
}

export function generateRandomNumber(prefix = "1") {
    // generate random number 1–9999
    const randomNum = Math.floor(Math.random() * 9999) + 1;

    // pad dengan leading zero supaya selalu 4 digit
    const suffix = randomNum.toString().padStart(4, "0");

    return `${prefix}${suffix}`;
}

export async function getBookingById(bookingId, headersData) {
    const url = await baseURL();

    const response = await url.get(`/bookings/${bookingId}`, { headers: headersData });
    const body = await response.status();
    const body_response = await response.json();

    console.log(`Status of Get By Booking ID is : ${body}`);
    console.log(JSON.stringify(body_response, null, 2));
    return response;
}