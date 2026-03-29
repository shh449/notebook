import React from 'react';

export default function Alert(props) {
    function capitalize(str) {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <div style={{ marginTop: "58px" }}>
            {props.alert && <div className={`alert alert-${props.alert.type} " role="alert`} >
                <strong>{capitalize(props.alert.type)}</strong>:{props.alert.msg}


            </div>}
        </div>
    );
}
