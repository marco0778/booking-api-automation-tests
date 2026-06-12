const getUnique = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const now = new Date();
const oneYearinms = 365 * 24 * 60 * 60 * 1000;
const randomFutureMs = now.getTime() + Math.floor(Math.random() * oneYearinms);
const randomDate = new Date(randomFutureMs);
const utc7Date = new Date(randomDate.getTime() + (7 * 60 * 60 * 1000));
const isoStr = utc7Date.toISOString(); // Format: YYYY-MM-DDTHH:mm:ss.sssZ
const timestampPlus7 = isoStr.slice(0, 19) + "+07:00";

exports.testCases = [
  { description: 'Create Booking', title: `Testing${getUnique()}`, date: `${timestampPlus7}`, expectStatus: 200, expectMessage: `createdAt` },
  { description: 'Booking Title is empty', title: ``, date: `${timestampPlus7}`, expectStatus: 400, expectMessage: `Title is required` },
  { description: 'Booking Date is empty', title: `Testing${getUnique()}`, date: ``, expectStatus: 400, expectMessage: `Date is required` },
  { description: 'Choose previous Booking Date than today', title: `Testing${getUnique()}`, date: `2025-06-08T17:45:22+07:00`, expectStatus: 400, expectMessage: `You should not choose previous date` },
];