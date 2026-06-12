const unique = Date.now();

exports.testCases = [
  { description: 'Success register', email: `testing${unique}@rocketmail.com`, password: 'Testing123!@', expectStatus: [200] , expectMessage: `createdAt`},
  { description: 'Email is empty', email: '', password: 'Testing123!@', expectStatus: [400] , expectMessage: `Email is required`},
  { description: 'Password is empty', email: `marco${unique}@rocketmail.com`, password: '', expectStatus: [400] , expectMessage: `Password is required`},
  { description: 'Invalid format email', email: 'maureecemarco001', password: 'Testing123!@', expectStatus: [400] , expectMessage: `Invalid format for Email`},
  { description: 'Password < 8 characters', email: `maureecemarco${unique}@rocketmail.com`, password: 'Test', expectStatus: [400] , expectMessage: `Minimum 8 characters for Password`},
  { description: 'Email has been registered', email: 'maureecemarco01@rocketmail.com', password: 'Testing123!@', expectStatus: [400] , expectMessage: `Email already registered`}
];
