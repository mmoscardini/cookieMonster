
const requestHandler = (request) => {
  const { headers } = request;
  const allCookies = headers.Cookie ? headers.Cookie.replace(/\s/g, '') : '';

  const regex = new RegExp('^X-AB-Test=', 'gm');

  const findAbCookie = cookies => cookies.split(';').filter(cookie => regex.test(cookie));
  const removeCookieKey = cookie => cookie.replace(regex, '').trim();

  const fromStringToObject = (experimentAndVariant) => {
    const splited = experimentAndVariant.split(':');
    return {
      experiment: splited[0],
      variant: splited[1],
    };
  };

  return {
    getCookieString: () => {
      if (allCookies) {
        const ABCookieWithKey = findAbCookie(allCookies);
        if (ABCookieWithKey && ABCookieWithKey.length) {
          return removeCookieKey(ABCookieWithKey[0]);
        }
      }
      return '';
    },
    getExperimentAndVariantsMap: (cookie) => {
      const cookieString = cookie || requestHandler(request).getCookieString();
      return cookieString.split(',')
        .map((experimentAndVariant => fromStringToObject(experimentAndVariant)))
        .reduce(
          (accumulator, { experiment, variant }) =>
            accumulator.set(experiment, variant),
          new Map() // eslint-disable-line comma-dangle
        );
    },
    setCookieInHeader: (newCookie) => {
      if (newCookie === undefined) return null;
      Object.assign(headers, {
        'set-cookie': [{
          key: 'Set-Cookie',
          value: `X-AB-Test=${newCookie}`,
        }],
      });
      return headers;
    },
  };
};

module.exports.default = requestHandler;

