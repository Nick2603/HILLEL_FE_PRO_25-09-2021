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

   const doAstrologicalSign = function (month, day) {

      let astrologicalSign;

      if (month === 1 && day >= 20 || month === 2 && day <= 18) {
         astrologicalSign = "Aquarius ♒";
      } else if (month === 2 && day >= 19 || month === 3 && day <= 20) {
         astrologicalSign = "Pisces ♓";
      } else if (month === 3 && day >= 21 || month === 4 && day <= 19) {
         astrologicalSign = "Aries ♈";
      } else if (month === 4 && day >= 20 || month === 5 && day <= 20) {
         astrologicalSign = "Taurus ♉";
      } else if (month === 5 && day >= 21 || month === 6 && day <= 20) {
         astrologicalSign = "Gemini ♊";
      } else if (month === 6 && day >= 21 || month === 7 && day <= 22) {
         astrologicalSign = "Cancer ♋";
      } else if (month === 7 && day >= 23 || month === 8 && day <= 22) {
         astrologicalSign = "Leo ♌";
      } else if (month === 8 && day >= 23 || month === 9 && day <= 22) {
         astrologicalSign = "Virgo ♍";
      } else if (month === 9 && day >= 23 || month === 10 && day <= 22) {
         astrologicalSign = "Libra ♎";
      } else if (month === 10 && day >= 23 || month === 11 && day <= 21) {
         astrologicalSign = "Scorpio ♏";
      } else if (month === 11 && day >= 22 || month === 12 && day <= 21) {
         astrologicalSign = "Sagittarius ♐";
      } else {
         astrologicalSign = "Capricorn ♑";
      };

      return astrologicalSign;

   };

   return {

      isLeapYear,

      doMaxDay,

      doAstrologicalSign,

   };

})();

const userFabric = function (firstName, lastName, yearOfBirth, monthOfBirth, dayOfBirth, astrologicalSign) {

   return {

      firstName,

      lastName,

      yearOfBirth,

      monthOfBirth,

      dayOfBirth,

      astrologicalSign,

      get fullName() {

         return `${this.firstName} ${this.lastName}`;

      },

      set fullName(value) {

         const firstName = value.split(' ')[0];

         const lastName = value.split(' ')[1];

         if (firstName) {

            this.firstName = firstName;

         };

         if (lastName) {

            this.lastName = lastName;

         };

      },

      get age() {

         const originalBirthDay = new Date(yearOfBirth, monthOfBirth, dayOfBirth);

         const BirthDay = new Date(new Date().getFullYear(), monthOfBirth, dayOfBirth);

         age = BirthDay.getFullYear() - originalBirthDay.getFullYear();

         if (new Date() > BirthDay) {

            return age;

         } else {

            return age - 1;

         };

      },

   };

};

const archiveFabric = function () {

   const entries = [];

   return {

      isEmpty() {

         if (entries.length <= 0) {

            return true

         };

      },

      count() {

         return entries.length;

      },

      add(item) {

         entries.push(item);

      },

      delete(index) {

         let removed = entries.splice(index, 1);

         return removed;

      },

      reduce(cb) {

         return entries.reduce(cb, 0);

      },

      find(cb) {

         return entries.find(cb);

      },

      filter(cb) {

         return entries.filter(cb);

      },

      each(cb) {

         return entries.forEach(cb);

      },

      take(index1, index2) {

         let taken = entries.splice(index1, index2);

         return taken;

      },

   };

};