import React, { useEffect, useState } from 'react'
import AlertError from './AlertError'

const SelectEdoCivil = (props) => {
    const [edoCivil, setEdoCivil] = useState([])

    const getData = () => {
        const API_REQUEST = process.env.REACT_APP_BACKEN_URL

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${API_REQUEST}catalogos/estados_civiles`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setEdoCivil(result.estados_civiles)
            })
            .catch(error => {
                AlertError(`Error al cargar ${name} `, error)
                console.log('error', error)
            }
                );
    }

    useEffect(() => {
        getData()
    }, [''])

    const { name, className, onChange, onBlur } = props
    return (
        <select
            className={className}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
        >
            <option value=''>--Seleccione--</option>
            {edoCivil.map((item) => <option key={item.clave} value={item.clave}>{item.nombre}</option>)}
        </select>
    );
}

export default SelectEdoCivil;