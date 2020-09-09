import React       from 'react';
import PropTypes   from 'prop-types';
import FontAwesome from "react-fontawesome";

import {
    Label,
    FormGroup,
    Row,
    Col
} from "reactstrap";
import { AvField } from 'availity-reactstrap-validation';

const propTypes = {
    spinColor:      PropTypes.string,
    spinConfig:     PropTypes.object,
    spinAlignment:  PropTypes.string
};

function FormRow({
                     label       = 'Label',
                     type       = 'text',
                     name = "" ,
                     viewonly=false,
                     includeRow = true,
                     required = true,
                     hidelabel = false,
                     readonly = false,
                     errorMessage = "Required",
                     helpMessage = "",
                     labelW="2",
                     formW="12",
                     placeholder="",
                     row=false,
                     data       ,
                     changeInput,
                     style={},
                     labelStyle={}

                 }) {
    
    function isPassword(typeParam = type) {
        return typeParam === 'password';
    }
    function onEyeClick(e) {
        const eyeSpan       = e.target;
        const passwordInput = e.target.parentNode.querySelector("input");
        eyeSpan.classList.toggle("fa-eye");
        eyeSpan.classList.toggle("fa-eye-slash");            
        passwordInput.type  = isPassword(passwordInput.type) ? "text" : "password";
    }
    function getValueProp() {
        return type === 'checkbox' ? { checked: data} : {value: data};
    }
    if(hidelabel){

        if(viewonly){
           return <Col sm={formW} style={{    textAlign: "right",
                    padding: 10}}>
                    <FormGroup >
                        <b>{data}</b>
                    </FormGroup>

                </Col>
        }
       return  <AvField
               name={name}
               type={type} // text  or textarea
               {...getValueProp()}
               placeholder={placeholder}
               required = {required}
               readOnly = {readonly}
               errorMessage={errorMessage}
               helpMessage={helpMessage}
               style={style}
               autoComplete="none"
               onChange={e =>
                   changeInput && changeInput(e, name)
               }
           />
    }




    let output = <><Label for={name} sm={formW}>{label} {required && <span style={{color:"red"}}>*</span>}</Label>
        <Col sm={formW}>
            <FormGroup style={isPassword() ? {position: "relative"} : {}}>
                <AvField
                    name={name}
                    type={type} // text  or textarea
                    {...getValueProp()}
                    required = {required}
                    readOnly = {readonly}
                    errorMessage={errorMessage}
                    helpMessage={helpMessage}
                    autoComplete="none"
                    onChange={e =>
                        changeInput && changeInput(e, name)
                    }
                />
                {name === "password" && <FontAwesome name="eye" size="1x" onClick={onEyeClick} style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    cursor: "pointer",
                }}/>}
            </FormGroup>

        </Col>

        </>
    if(viewonly){
         output = <><Label sm={labelW}>{label}</Label>
            <Col sm={formW} style={{    textAlign: "right",
                padding: 10}}>
                <FormGroup >
                   <b>{data}</b>
                </FormGroup>
            </Col>
        </>
    }

    if(row){
        output = <>
            <FormGroup >
                <AvField
                    name={name}
                    type={type} // text  or textarea
                    {...getValueProp()}
                    required = {required}
                    readOnly = {readonly}
                    errorMessage={errorMessage}
                    helpMessage={helpMessage}
                    autoComplete="none"
                    onChange={e =>
                        changeInput && changeInput(e, name)
                    }
                />
            </FormGroup>
            <Label for={name} style={labelStyle}>{label}</Label>
        </>
    }
    if(includeRow){
        return ( <Row>{output}</Row>);
    }
    return output;

}

FormRow.propTypes = propTypes;

export default FormRow;