const { isStringObject } = require("util/types");

exports.testCases = [
  { description: 'Success login', email: 'maureecemarco01@rocketmail.com', password: 'Testing123!@', expectStatus: [200], expectMessage: 'token'},
  { description: 'Email is empty', email: '', password: 'Testing123!@', expectStatus: [400] , expectMessage : 'Email is required'},
  { description: 'Password is empty', email: 'maureecemarco01@rocketmail.com', password: '', expectStatus: [400] , expectMessage : 'Password is required'},
  { description: 'Unregistered email', email: 'maureecemarco001@rocketmail.com', password: 'Testing123!@#', expectStatus: [404] , expectMessage: 'User not found'},
  { description: 'Invalid password', email: 'maureecemarco01@rocketmail.com', password: 'Testing123!@#', expectStatus: [401] , expectMessage: 'Invalid password'}
];
