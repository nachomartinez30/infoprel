/* 
* PARA QUE ESTE COMPONENTE FUNCIONE, ES NECESARIO MANDAR EL ARRAY DE ARCHIVOS EN FORMATO
*    
*    {
*      id,name  
*    }
*
* */
import React, { useState, useEffect } from 'react'


const SelectCatalogo = props => {



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

export default SelectCatalogo;