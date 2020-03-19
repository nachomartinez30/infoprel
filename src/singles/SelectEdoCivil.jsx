import React from 'react'


const SelectEdoCivil = (props) => {
    const { name, className, onChange, onBlur, data } = props

    return (
        <select
            className={className}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
        >
            <option value=''>--Seleccione--</option>
            {typeof data != 'undefined' && data.map((item) => <option key={item.clave} value={item.clave}>{item.nombre}</option>)}
        </select>
    );
}

export default SelectEdoCivil;