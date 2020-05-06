import React, { useEffect } from 'react'

const SelectApoyos = (props) => {
    /* componente que extrae */

    const { name, className, onChange, onBlur, data } = props

    return (
        <select
            name={name}
            className={className}
            onChange={onChange}
            onBlur={onBlur}
        >
            <option value=''>--Seleccione--</option>
            {typeof data != 'undefined' && data.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
        </select>
    );
}

export default SelectApoyos;