const requestHandler = require('../index');

const request = {
  headers: {
    GET: 'sample_page.html HTTP/2.0',
    Host: 'www.example.org',
    'Content-Type': 'application/x-www-form-urlencoded',
    Cookie: 'yummy_cookie = choco; tasty_cookie=strawberry; X-AB-Test = tenantsTextConversion:1,OwnersLandingBtn:3',
  },
};

const cookie = 'cookie';
describe('requestHandler', () => {
  let requestHandlerInstance;
  beforeAll(() => {
    requestHandlerInstance = requestHandler(request);
  });

  describe('setCookieInHeader', () => {
    it('exposes setCookieInHeader', () => {
      expect(requestHandlerInstance.setCookieInHeader).toBeDefined();
    });

    it('should return headers with set-cookie', () => {
      const expectedHeader = {
        ...request.headers,
        'set-cookie': [{
          key: 'Set-Cookie',
          value: `X-AB-Test=${cookie}`,
        }],
      };
      expect(requestHandlerInstance.setCookieInHeader(cookie)).toEqual(expectedHeader);
    });

    it('should return null if new cookie is undefined', () => {
      expect(requestHandlerInstance.setCookieInHeader(undefined)).toBeNull();
    });
  });

  describe('getCookieString', () => {
    it('exposes getCookieString', () => {
      expect(requestHandlerInstance.getCookieString).toBeDefined();
    });

    describe('should return empty string', () => {
      it('if no cookie is informed in header', () => {
        const requestCopy = JSON.parse(JSON.stringify(request));
        delete requestCopy.headers.Cookie;
        expect(requestHandler(requestCopy).getCookieString()).toEqual('');
      });

      it('if there is no AB-test cookie', () => {
        const requestCopy = JSON.parse(JSON.stringify(request));
        requestCopy.headers.Cookie = 'yummy_cookie = choco; tasty_cookie=strawberry;';
        expect(requestHandler(requestCopy).getCookieString()).toEqual('');
      });
    });

    describe('should return correct cookie', () => {
      it('if correct cookie key is informed', () => {
        expect(requestHandlerInstance.getCookieString()).toEqual('tenantsTextConversion:1,OwnersLandingBtn:3');
      });
    });
  });

  describe('getExperimentAndVariantsMap', () => {
    it('exposes getCookieString', () => {
      expect(requestHandlerInstance.getExperimentAndVariantsMap).toBeDefined();
    });

    it('should return a Map', () => {
      expect(requestHandlerInstance.getExperimentAndVariantsMap() instanceof Map).toBeTruthy();
    });

    it('should return the correct Map', () => {
      const expectedMap = new Map([['tenantsTextConversion', '1'], ['OwnersLandingBtn', '3']]);
      expect(requestHandlerInstance.getExperimentAndVariantsMap()).toEqual(expectedMap);
    });
  });
});

