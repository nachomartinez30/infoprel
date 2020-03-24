import React, { useState } from 'react'
import curpValida from '../helpers/curpValida';

const InputCURP = (props) => {

    const {
        curp,
        onKeyPressCapture,
        name,
        defaultValue,
        placeholder,
        className,
        onChange
    } = props


    const checkStructure = () => {
        if (typeof curp != 'undefined') {
            if (curp.length > 1) {
                const check = (curpValida(curp)) ? true : false;
                setClaseValido((check) ? '' : 'noValido')
                setValido(check);
            } else {
                setClaseValido('')
                setValido('');
            }
        }
    }

    const [valido, setValido] = useState('')
    const [claseValido, setClaseValido] = useState('')


    return (
        <React.Fragment>
            <input
                className={`${className} ${claseValido}`}
                defaultValue={defaultValue}
                placeholder={placeholder}
                onKeyPressCapture={onKeyPressCapture}
                onChange={onChange}
                onBlur={checkStructure}
                name={name}
                maxLength={18}
                minLength={18}
                type='text'
            />
            {valido === false &&
                <div className="col-sm-4">
                    <small className="text-danger">
                        La CURP no es valida.
                </small>
                </div>
            }
        </React.Fragment>
    );
}

export default InputCURP;