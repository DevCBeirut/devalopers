export class Memory {
    static setRemeberMe(value = false) {
     localStorage.setItem("remeberme",value)
    }

    static isRemeberMe() {
        localStorage.getItem("remeberme")
    }

    static setItem(key,value) {
      //  if(Memory.isRemeberMe()){
            localStorage.setItem(key,value)
       // }else{
          //  sessionStorage.setItem(key,value)
       // }
    }
    static getItem(key) {
      //  if(Memory.isRemeberMe()){
           return  localStorage.getItem(key)
       // }else{
        //  return  sessionStorage.getItem(key)
       // }
    }


    static clear() {
        localStorage.setItem('isloggedin', false);
        localStorage.setItem('managertype', undefined);
        localStorage.setItem('token', undefined);
        localStorage.clear()
        sessionStorage.clear()
    }




}