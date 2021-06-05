import axios from "axios/index";
import Constants from "../core/Constants";
import {Memory} from "./Memory";

 class RequestEngine {
    constructor() {


        let token = Memory.getItem('token');
        this.apiEngine = axios.create({
            baseURL: Constants.serverlink,
            timeout: Constants.timeout,
            headers: {
                'Content-Type': 'application/json',
                'token':token
            }
        });
       // this.debugit();
    }


    debugit(){
        this.apiEngine.interceptors.request.use(request => {
            console.log('Starting Request', request);
            return request
        });

        this.apiEngine.interceptors.response.use(response => {
            console.log('Response:', response);
            return response
        })
    }

     async getItemlistDirect(path) {
         const link = '/api/admin/'+path+'/list';
         console.warn(link);
         return await this.apiEngine.get(link)
     }


     toggleuserstatus(paramid,ismanager,callback) {
        if(ismanager){
            ismanager = 1;
        }else{
            ismanager = 0;
        }
         const link = '/api/admin/toggleuserstatus/'+paramid+"/"+ismanager;

         console.warn(link);
         this.apiEngine.get(link)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }

     saveSettings(data,callback) {
         const link = '/api/admin/settings/save';
         console.warn(link);
         this.apiEngine.post(link,data)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }


     deleteUser(id,callback) {
         const link = '/api/admin/user/delete/'+id;
        // console.warn(link);
         this.apiEngine.get(link)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }




     deleteUsersubscribe(id,callback) {
         const link = '/api/admin/usersubscribe/delete/'+id;
         // console.warn(link);
         this.apiEngine.get(link)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }

     async deleteItem(path,id) {
         const link = '/api/admin/'+path+'/delete/'+id;
         console.log(link)
         return await this.apiEngine.get(link)
     }


     async login(username,password) {
         const link = '/api/admin/login';
         const data = {username :username,password:password}
         console.warn(link);
         return await this.apiEngine.post(link,data);
     }




     getUsers(manager,callback) {
         let link = '/api/admin/user/list';
         if(manager){
             link = '/api/admin/manager/list';
         }
         console.warn(link);
         this.apiEngine.get(link)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }



     getSettingsinfo(callback) {
         const link = '/api/admin/settings';
         console.warn(link);
         this.apiEngine.get(link)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }


     getdashboard(callback) {
         const link = '/api/admin/dashboard';
         console.warn(link);
         this.apiEngine.get(link)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }





     saveUserManager(data,callback) {
         const link = '/api/admin/manager/save';
         console.warn(link);
         this.apiEngine.post(link,data)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }

     saveUser(formData,callback) {
         const link = '/api/admin/user/save';
         console.warn(link);
         const config = {
             headers: {
                 'content-type': 'multipart/form-data'
             }
         };
         this.apiEngine.post(link,formData,config)
             .then((response) => {
                 callback(response);
             })
             .catch((error) => {
                 console.log(error);
             });
     }

     async postItemData(path,formData,action = "save") {
         const link = '/api/'+path+'/'+action;
         const config = {
             headers: {
                 'content-type': 'multipart/form-data'
             }
         };
         return await  this.apiEngine.post(link,formData,config)
     }
     async postItem(path,data,action = "save") {
         const link = '/api/'+path+'/'+action;
         console.warn(link);
         return await this.apiEngine.post(link,data);
     }

     async getItem(path,param = "/list") {
         const link = '/api/'+path+param;
         console.warn(link);
         return await this.apiEngine.get(link)
     }

     async getFilteredUsers(options) {
        const link = "/api/user/queryusers";
        console.log("options ",options)
        return await this.apiEngine.post(link, {options})
    }

     async postFull(link,body) {
         return await this.apiEngine.post(link,body)
     }




     async deleteItem(path,id) {
         const link = '/api/'+path+'/delete/'+id;
         console.log(link)
         return await this.apiEngine.get(link)
     }





}

export default RequestEngine;
