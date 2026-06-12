const { test, expect } = require('@playwright/test');
const { baseURL } = require('../utils/apiClient');
const { getPath, getBookingById, generateRandomTimePlus7 } = require('../utils/api-helper-curls');
const fs = require('fs');

const tokenPath = getPath('storage', 'auth.json');
const tokenFile = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
const token = `${tokenFile.tokenType}${tokenFile.accessToken}`;
const unique = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

for (let index = 1; index < 11; index++) {
    test(`Test end to end Booking Flow ${index}`, async () => {
        const url = await baseURL();
        const requestHeaders = { 'Authorization': `${token}` };
        const date = generateRandomTimePlus7();

        // STEP 1: Create booking  
        const res_booking = await url.post(`/bookings`,
            {
                headers: requestHeaders,
                data: {
                    title: `BOOK-TEST-${unique}`,
                    date
                }
            }
        );

        let body_create_booking;

        try {
            body_create_booking = await res_booking.json();
        } catch (error) {
            body_create_booking = await res_booking.text();
        }


        console.log("Created Booking response : \n", JSON.stringify(body_create_booking, null, 2));
        expect(res_booking.status()).toBe(200);

        // STEP 2: Get booking
        const bookingIdFromCreate = body_create_booking.id;
        const titleFromCreate = body_create_booking.title;
        console.log(`Your booking ID is : ${bookingIdFromCreate}`);
        const getBookingAfterCreate = await getBookingById(bookingIdFromCreate, requestHeaders);
        expect(getBookingAfterCreate.status()).toBe(200);

        // STEP 3: Update booking
        const res_update = await url.put(`/bookings/${bookingIdFromCreate}`,
            {
                headers: requestHeaders,
                data: {
                    title: `BOOK-TEST-${unique}-update`,
                    date
                }

            }
        );

        const bodyUpdateBooking = await res_update.json();
        expect(bodyUpdateBooking.id).toBe(bookingIdFromCreate);
        expect(bodyUpdateBooking.title).toContain('update');
        // expect(bodyUpdateBooking.date).toBe(res_update.data.date);
        expect(res_update.status()).toBe(200);
        console.log("Updated Booking response : ", JSON.stringify(bodyUpdateBooking, null, 2));

        // STEP 4: Get updated booking
        const getBookingAfterUpdate = await getBookingById(bookingIdFromCreate, requestHeaders);
        expect(getBookingAfterUpdate.status()).toBe(200);
        console.log(`Your booking ID of : ${bookingIdFromCreate} is successfully updated`);

        // STEP 5: Delete booking  
        const response_delete = await url.delete(`bookings/${bookingIdFromCreate}`, {
            headers: requestHeaders
        });

        const body_delete_status = await response_delete.status();
        const body_delete_statusText = await response_delete.statusText();
        expect(body_delete_status).toBe(200);
        console.log(`Status of deletion is : ${body_delete_status} with text ${body_delete_statusText}`);

        // STEP 6: Verify 400
        const getDetailBookingIdafterDeletion = await getBookingById(bookingIdFromCreate, requestHeaders);
        await expect(getDetailBookingIdafterDeletion.status()).toBe(400);
        console.log(`The Booking Title of ${titleFromCreate} is no longer exists.`);
    });

}