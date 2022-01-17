export const COOKIE = (() => {

   const getCookie = (name) => {

      let matches = document.cookie.match(new RegExp(

         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"

      ));

      return matches ? decodeURIComponent(matches[1]) : undefined;

   };


   const hasCookie = (name) => {

      return Boolean(getCookie(name));

   };

   const setCookie = (name, value, options = {}) => {

      options = {

         path: '/',

         ...options

      };

      if (options.expires instanceof Date) {

         options.expires = options.expires.toUTCString();

      };

      let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

      for (let optionKey in options) {

         updatedCookie += "; " + optionKey;

         let optionValue = options[optionKey];

         if (optionValue !== true) {

            updatedCookie += "=" + optionValue;

         };

      };

      document.cookie = updatedCookie;

   };

   const removeCookie = (name) => {

      setCookie(name, '', {

         'max-age': -1

      });

   };

   const count = () => {

      return document.cookie.split(';').length;

   };

   return {

      getCookie,

      hasCookie,

      setCookie,

      removeCookie,

      count,

   };

})();