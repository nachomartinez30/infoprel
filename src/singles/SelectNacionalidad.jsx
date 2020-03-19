import React from 'react'

const SelectNacionalidad = (props) => {
    /* componente que extrae */
    const { name, className, onChange, data, defaultValue } = props

    return (
        <select
            name={name}
            className={className}
            onChange={onChange}
            value={defaultValue}
        >
            <option value=''>--Seleccione--</option>
            {typeof data != 'undefined' && data.map(item => <option key={item.id} value={item.clave}>{item.nombre}</option>)}
        </select>
    );
}

export default SelectNacionalidad;