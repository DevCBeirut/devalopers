import React, { Component } from "react";

import {
    Label,
    FormGroup,
    Row,
    Col
} from "reactstrap";

import Select, {createFilter} from 'react-select';


import { FixedSizeList as List } from "react-window";
const height = 35;
function convertToSlug(Text,slug='-'){
    return Text.trim()
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,slug)
        ;
}
function createSelectValue(array,withslug=false){
    let data = [];
    array.map((item)=>{
        if(item.length<2){

        }else{
            if(withslug){
                data.push({ value: convertToSlug(item,"xx"), label: item.trim() })
            }else{
                data.push({ value: item.trim(), label: item.trim() })
            }
        }


    });
    return data;
};

function createSegelData(){
    let data = [{key:"البداوي",value:513},
        {key:"التبانة",value:724},
        {key:"التل",value:576},
        {key:"الحدادين",value:3108},
        {key:"الحديد",value:818},
        {key:"الرمانة",value:344},
        {key:"الزهرية",value:525},
        {key:"السويقة",value:1297},
        {key:"القبة",value:1223},
        {key:"القلمون",value:314},
        {key:"المهاترة",value:390},
        {key:"الميناء",value:2608},
        {key:"النوري",value:1042},
        {key:"وادي النحلي",value:71},
    ];

    let fulldata = []
    data.map((item)=>{

        for(let i=1;i<item.value;i++) {
            let fullitem = item.key + " - " + (1+i)
            fulldata.push({value: fullitem, label: fullitem})
        }
    });
    return fulldata;
};


class MenuList extends Component {
    render() {
        const { options, children, maxHeight, getValue } = this.props;
        const [value] = getValue();
        const initialOffset = options.indexOf(value) * height;


        return (
            <List
                height={maxHeight}
                itemCount={children.length}
                itemSize={height}
                initialScrollOffset={initialOffset}
            >
                {({ index, style }) => <div style={style}>{children[index]}</div>}
            </List>
        );
    }
}

function SelectRow({
                     label       = 'Label',
                       defaultValue  ,
                    datatype=0, // 0 normal , 1 mouhafaza , 2 kadaa , 3 segel
                     name ,
                     required = false,
                       viewonly=false,
                       hidelabel = false,
                       isMulti = false,
                       isSearchable = true,
                       readonly = false,
                        fastSelect =false,
                       placeholder = "Please select..",
                     data       ,
                     changeInput,
                     isAlwaysCleared = false
                 }) {

    if(viewonly){
        readonly = true
    }



    let useSelect = <Select
        // className="react-select primary"
        classNamePrefix="react-select"
        name={name}
        readOnly={readonly}
        isMulti ={isMulti}
        required={required}
        isSearchable ={isSearchable}
        value={isAlwaysCleared ? [] : data && data.find(v => v.value === defaultValue)}
        onChange={e =>
            changeInput && changeInput(e, name)
        }
        options={data}
        placeholder={placeholder}
    />

    if(isMulti){
        useSelect = <Select
            // className="react-select primary"
            classNamePrefix="react-select"
            name={name}
            readOnly={readonly}
            isMulti ={isMulti}
            required={required}
            isSearchable ={isSearchable}
            value={defaultValue}
            onChange={e =>
                changeInput && changeInput(e, name)
            }
            options={data}
            placeholder={placeholder}
        />
    }
    if(fastSelect){
        useSelect = <Select
            //  className="react-select primary"
            classNamePrefix="react-select"
            name={name}
            readOnly={readonly}
            isMulti ={isMulti}
            required={required}
            isSearchable ={isSearchable}
            filterOption={createFilter({ignoreAccents: false})}
            value={data && data.find(v => v.value === defaultValue)}
            onChange={e =>
                changeInput && changeInput(e, name)
            }
            placeholder={placeholder}
            components={{ MenuList }} options={data} />
    }


    if(hidelabel){
        return (  <FormGroup >
            {useSelect}
        </FormGroup>)
    }

    if(viewonly){
        let viewvalue = data && data.find(v => v.value === defaultValue);
        if(viewvalue){
            viewvalue= viewvalue.value
        }else{
            return ("")
        }
        return (
            <Row>
                <Label sm="2">{label}</Label>
                <Col sm="7" style={{    textAlign: "right",
                    padding: 10}}>
                    <FormGroup >
                        <b>{viewvalue}</b>
                    </FormGroup>
                </Col>



            </Row>
        );
    }
    return (
        <Row>
            <Label sm="12">{label} {required && <span style={{color:"red"}}>*</span>}</Label>
            <Col sm="12">
                <FormGroup >
                    {useSelect}
                </FormGroup>
            </Col>



        </Row>
    );
}

export default SelectRow;
