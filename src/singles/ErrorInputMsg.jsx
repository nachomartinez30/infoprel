import React from 'react'
const ErrorInputMsg = ({ msg = 'Este campo es necesario' }) => {
    return (
        <span class="help-block">{msg}</span>

    );
}

export default ErrorInputMsg;