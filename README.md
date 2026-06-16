# Booking API Automation Tests

API Automation Test Suite built using Playwright to test the Booking API application.

This project demonstrates API automation testing practices including data-driven testing, authentication handling, CRUD validation, end-to-end flow testing, and custom reporting.

---

## Project Overview

This automation suite validates the functionality of the Booking API backend project.

Covered areas include:

* User Registration
* User Login
* Booking Creation
* Booking Retrieval
* Booking Update
* Booking Deletion
* End-to-End Booking Flow

---

## Tech Stack

### Automation Framework

* Playwright

### Language

* JavaScript

### Reporting

* Playwright HTML Report
* CSV Custom Report

---

## Test Coverage

### Authentication

#### Registration

Positive Test Cases

* Valid registration

Negative Test Cases

* Empty email
* Empty password
* Invalid email format
* Password less than 8 characters
* Duplicate email

---

### Login

Positive Test Cases

* Valid login

Negative Test Cases

* Unregistered email
* Invalid password
* Empty email
* Empty password

---

### Booking

Positive Test Cases

* Create booking
* Get booking by ID
* Search booking by title
* Update booking
* Delete booking

Negative Test Cases

* Missing title
* Missing date
* Invalid booking ID
* Unauthorized access

---

## End-to-End Flow

The following business flow is automated:

```text
Register User
        ↓
Login User
        ↓
Create Booking
        ↓
Get Booking
        ↓
Update Booking
        ↓
Delete Booking
        ↓
Verify Booking Deleted
```

This flow simulates a complete user journey and validates API integration across multiple endpoints.

---

## Framework Structure

```text
booking-automation-playwright
│
├── tests
│   ├── registration.spec.js
│   ├── login.spec.js
│   ├── booking.spec.js
│   └── end2endBooking.spec.js
│
├── utils
│   ├── apiClient.js
│   ├── api-helper-curls.js
│   ├── registration-cases.js
│   ├── login-cases.js
│   └── booking-cases.js
│
├── storage
│
├── global-setup.js
├── csv-reporter.js
└── playwright.config.js
```

---

## Testing Approach

### Data Driven Testing

Test cases are separated from test scripts to improve maintainability.

Example:

```javascript
for (const testCase of testCases) {
    test(testCase.description, async () => {
        ...
    });
}
```

Benefits:

* Easy maintenance
* Easy test case expansion
* Reduced code duplication

---

### Authentication Handling

JWT token is generated automatically before executing booking-related test cases.

The token is then reused for authenticated API requests.

---

### Custom Reporting

The framework supports:

* Playwright HTML Report
* CSV Test Report

Generated reports can be used for test execution tracking and result analysis.

---

## Installation

Clone repository:

```bash
git clone https://github.com/marco0778/booking-api-automation-tests.git
```

Install dependencies:

```bash
npm install
```

---

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run specific test:

```bash
npx playwright test tests/login.spec.js
```

Run headed mode:

```bash
npx playwright test --headed
```

Generate HTML report:

```bash
npx playwright show-report
```

---

## Related Project

Backend API tested by this framework:

https://github.com/marco0778/booking-api-automation

---

## Key Concepts Demonstrated

* API Automation Testing
* Data Driven Testing
* JWT Authentication Testing
* CRUD API Validation
* End-to-End Testing
* Playwright Framework Design
* Custom Reporting

---

## Author

Marco Maureece

QA Automation Engineer Portfolio Project
