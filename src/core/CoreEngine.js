import React, { Component } from "react";
import moment from 'moment'
import { OrbitSpinner } from 'react-epic-spinners'
import { store } from 'react-notifications-component'
import {Memory} from "./Memory";

class CoreEngine extends Component {

    componentWillMount() {
        let isloggedin = Memory.getItem('isloggedin');
        if(!isloggedin || isloggedin === "false"){
           // this.props.history.push('/auth/login');
        }
    }

    goToScreen(screenname,redirect = ""){
        this.props.history.push(screenname,{
            redirect:redirect
        })
    }


    changeCheckbox = (event, stateName) => {
        this.setState({ [stateName]: event.target.checked });
    };
    changeInput = (event, stateName) => {
        if(!event){
            this.setState({ [stateName]: "" });
        }else
        if(event && event.target){
            this.setState({ [stateName]: event.target.value,error:'' });
        }else if(event && event.length){
            this.setState({ [stateName]: event });
        }else{  
            this.setState({ [stateName]: event.value || [] }); // select input
        }
    };


     convertToSlug(Text,slug='-'){
        return Text.trim()
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,slug)
            ;
    }

    createSelectValue(array,withslug=true,ignore=[],key=""){
        let data = [];
        array.map((item)=>{
            const alreadyFound = ignore.find(e=>e[key]==item)
            if(alreadyFound){
                return ;
            }
            if(withslug){
                data.push({ value: this.convertToSlug(item,"_"), label: item.trim() })
            }else{
                data.push({ value: item.trim(), label: item.trim() })
            }
        });
        return data;
    };
    createSelectValueYear(addpresent=true){
        let data = [];
        const start = moment().subtract(80,'years').format('YYYY');
        const end   = moment().format("YYYY");
        for (let i = start;i<=end;i++){
            data.push({ value: i, label: i })
        }
        if(addpresent){
            data.push({ value: "present", label: "present" })
        }

        return data;
    };

     formatDate =(date)=> {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }



    filterCaseInsensitive(filter, row) {
        const id = filter.pivotId || filter.id;
        return (
            row[id] !== undefined ?
                String(row[id].toString().toLowerCase()).includes(filter.value.toString().toLowerCase())
                :
                true
        );
    }

    showErrorMessage(msg){
     //alert(msg)
        store.addNotification({
            title: "Error!",
            message: msg,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }
        });
    }
    showSucessMessage(msg){
       // alert(msg)
        store.addNotification({
            title: "Success!",
            message: msg,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 90000,
                onScreen: true
            }
        });
    }

    renderDateFromTimeStamp(timestamp) {
        let moment = require('moment');
        const formatted = moment.unix(timestamp/1000).format("DD/MM/YYYY HH:mm");
        return <span>
            {formatted}
        </span>
    }

    renderDate(item) {
        if(!item){
            return "-"
        }
        let moment = require('moment');

        let obj = moment(item).utcOffset(item)

       // const newdate = obj.format('DD/MM/YYYY HH:mm')
        const newdate = obj.format('MMM DD YYYY ')
        return newdate
    }

    renderProgress() {
        return (
            <div className="content">
                <div className="col-md-2 ml-auto mr-auto">
                    <div className="logo">
                        <div className="logo-img">
                            <OrbitSpinner color="#51BCDA"  className="loadingLogo" />
                        </div>

                    </div>

                </div>
            </div>
        )
    }

}

export default CoreEngine;


