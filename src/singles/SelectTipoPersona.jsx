import React from 'react'

const SelectTipoPersona = (props) => {

    /* componente que extrae */
    const { name, className, onChange, data } = props

    return (
        <select
            name={name}
            className={className}
            onChange={onChange}
        >
            <option value=''>--Seleccione--</option>
            {typeof data != 'undefined' && data.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
        </select>
    );
}

export default SelectTipoPersona;