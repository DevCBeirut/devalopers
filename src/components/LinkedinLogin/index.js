import React, { Component } from "react";
import getURL from "./getURL";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import {Link} from "react-router-dom";

class LinkedIn extends Component {
    componentDidMount() {
        this.restart();
    }

    restart = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUri = localStorage.linkedInReactRedirectUri;
        const previousState = localStorage.linkedInReactState;

        localStorage.linkedInReactState = "";
        localStorage.linkedInReactRedirectUri = "";

        const newState = urlParams.get("state");
        const code = urlParams.get("code");
        const error = urlParams.get("error");

        let newURL = window.location.pathname;
        urlParams.delete("state");
        urlParams.delete("error");
        urlParams.delete("error_description");
        urlParams.delete("code");
        if (urlParams.toString()) {
            newURL = newURL + "?" + urlParams.toString();
        }

        window.history.replaceState(null, null, newURL);

        if (error) {
            this.props.callback(error, null, null);
        } else if (redirectUri && code && previousState === newState) {
            this.props.callback(null, code, redirectUri);
        }
    };

    start = () => {
        const { clientId, scope } = this.props;
        const state = Math.random()
            .toString(36)
            .substring(7);
        localStorage.linkedInReactState = state;
        localStorage.linkedInReactRedirectUri = window.location.href;
        window.location.href = getURL(clientId, state, scope); // build url out of clientid, scope and state
    };

    render() {
        const {  buttonText } = this.props;
        return (

        <a variant="primary" onClick={this.start} className="btn btn-sm  btn text-white d-flex" style={{background:"#057ABA"}} >
            <FontAwesome name="linkedin" /> <span style={{    position: "relative",
            top: 1,
            left: 15,
        }}>{buttonText}</span>
        </a>
        );
        //TODO_D get from buttontext var
    }
}

LinkedIn.propTypes = {
    clientId: PropTypes.string,
    callback: PropTypes.func.isRequired,
    className: PropTypes.string,
    text: PropTypes.node,
    scope: PropTypes.arrayOf(PropTypes.string)
};

export default LinkedIn;