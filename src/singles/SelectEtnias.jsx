import React from 'react'


const SelectEtnias = props => {

    /* componente que extrae */
    const { name, className, onChange, data } = props

    return (
        <select
            name={name}
            className={className}
            onChange={onChange}
        >
            <option value={null}>--Seleccione--</option>
            {typeof data != 'undefined' && data.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
        </select>
    );
}

export default SelectEtnias;