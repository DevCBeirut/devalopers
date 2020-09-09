import React       from 'react';
import PropTypes   from 'prop-types';

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

function ShowRow({
                     label       = 'Label',
                     includeRow = true,
                     labelW="5",
                     formW="7",
                     data       ,
                     style={width:130}

                 }) {

    const output = <><Label sm={labelW}>{label}</Label>
        <Label sm={formW} style={{fontWeight:"bold"}}>
                {data}
        </Label>



    </>
    if(includeRow){
        return ( <Row>{output}</Row>);
    }
    return output;

}

ShowRow.propTypes = propTypes;

export default ShowRow;