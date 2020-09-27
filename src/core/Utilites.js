export class Utilites {
    static getBaseLink(url) {
        if (url) {
            let parts = url.split('://');

            if (parts.length > 1) {
                return parts[0] + '://' + parts[1].split('/')[0] ;
            } else {
                return parts[0].split('/')[0] ;
            }
        }
        return "";
    }

    static isStrong(password) {
        if(password.length<6){
            return false;
        }
        var re = {
            'capital' : /[A-Z]/,
            'digit'   : /[0-9]/,
            //'except'  : /[aeiou]/,
            //'full'    : /^[@#][A-Za-z0-9]{7,13}$/
        };
        return re.capital .test(password) &&
            re.digit   .test(password);
        //!re.except  .test(password) &&
        //re.full    .test(password);
    }

    static getInnerLink(url) {
        let baselink= Utilites.getBaseLink(url);
        let res = url.replace(baselink, "");
        if(res.length===0){
            return "/"
        }
        return res;
    }
    static validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    static converttoint(value){
        return parseInt(value);
    }
    static complexpass(password) {
        let regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
        return regExp.test(password);
    }
    static setTimeout(callMethod,seconds =400) {
        setTimeout(() => {
            callMethod();
        }, seconds);
    }
    static debounce(func, wait, immediate) {
        var timeout;

        return function executedFunction() {
          var context = this;
          var args = arguments;

          var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };

          var callNow = immediate && !timeout;

          clearTimeout(timeout);

          timeout = setTimeout(later, wait);

          if (callNow) func.apply(context, args);
        };
    };

    static setCookie (cname, cvalue, exdays=99) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    static getCookie  (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

}
