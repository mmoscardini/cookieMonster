# Quinto Andar AB Testing cookie handler

This small lib was encapsulates the functionality to read and write AB Cookies in request headers

## Usage
const requestHandler = require('5A-AB-Cookie');

requestHandler(request).getCookieString();
requestHandler(request).setCookieInHeader(newABCookie);

## Key Words
AB Testing, request handler, cookies