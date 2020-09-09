import React        from "react";
import {Home}       from '../components/HomePage/Home';
import {BaseLayout} from '../components/BaseLayout';
import "../styles.less";

export default props => (
    <div>
        <BaseLayout content={<Home/>}/>
    </div>
)
