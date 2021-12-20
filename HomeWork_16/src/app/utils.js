const STDIN = (function () {

   const getNumberInput = function (message, validate) {

      let input;

      do {

         input = parseInt(prompt(message, ''));

      } while (validate(input));

      return input;

   };

   const getStringInput = function (message, validate) {

      let input;

      do {

         input = prompt(message ?? "", '');

      } while (validate(input));

      return input;

   };

   return {

      getNumberInput,

      getStringInput,

   };

})();

const DATE = (function () {

   const isLeapYear = function (year) {

      let leapYear;

      let moduleOF400 = year % 400 === 0;

      let moduleOF100 = year % 100 === 0;

      let moduleOF4 = year % 4 === 0;

      if ((moduleOF400 || (!moduleOF100 && moduleOF4))) {

         leapYear = true;

      } else {

         leapYear = false;

      };

      return leapYear;

   };

   const doMaxDay = function (month, year) {

      let maxDay;

      if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {

         maxDay = 31;

      } else if (month === 2) {

         maxDay = isLeapYear(year) ? 29 : 28;

      } else {

         maxDay = 30;

      };

      return maxDay;

   };

   const getDateByFormat = function (format) {

      let dd = new Date().getDate();

      if (dd < 10) {

         dd = '0' + dd;

      };

      let mm = new Date().getMonth() + 1;

      if (mm < 10) {

         mm = '0' + mm;

      };

      let hh = new Date().getHours();

      if (hh < 10) {

         hh = '0' + hh;

      };

      let min = new Date().getMinutes();

      if (min < 10) {

         min = '0' + min;

      };

      let ss = new Date().getSeconds();

      if (ss < 10) {

         ss = '0' + ss;

      };

      let MMM = new Date().getMilliseconds()

      if (MMM < 10) {

         MMM = '00' + MMM;

      } else if (MMM < 100) {

         MMM = '0' + MMM;

      };

      switch (format) {

         case 'dd/mm/yyyy hh:mm':

            return `${dd}/${mm}/${new Date().getFullYear()} ${hh}:${min}`;

         case 'yyyy-mm-dd hh:mm:ss.MMM':

            return `${new Date().getFullYear()}-${mm}-${dd} ${hh}:${min}:${ss}.${MMM}`;

         case 'yyyy Mon dd at hh:mm':

            if (mm == '01') {

               mm = 'Jan';

            } else if (mm == '02') {

               mm = 'Feb';

            } else if (mm == '03') {

               mm = 'Mar';

            } else if (mm == '04') {

               mm = 'Apr';

            } else if (mm == '05') {

               mm = 'May';

            } else if (mm == '06') {

               mm = 'Jun';

            } else if (mm == '07') {

               mm = 'Jul';

            } else if (mm == '08') {

               mm = 'Aug';

            } else if (mm == '09') {

               mm = 'Sep';

            } else if (mm == '10') {

               mm = 'Oct';

            } else if (mm == '11') {

               mm = 'Nov';

            } else if (mm == '12') {

               mm = 'Dec';

            };

            return `${new Date().getFullYear()} ${mm} ${dd} at ${hh}:${min}`;

         default:

            return new Date().toDateString();
      };

   };

   return {

      isLeapYear,

      doMaxDay,

      getDateByFormat,

   };

})();