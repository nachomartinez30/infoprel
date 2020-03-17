import React, { useState, useEffect } from 'react'
import AlertError from './AlertError';

const SelectEtnias = props => {
    const [data, setData] = useState([])

    useEffect(() => {
        getData();
    }, [''])

    const getData = () => {
        const API_REQUEST = process.env.REACT_APP_BACKEN_URL;

        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${API_REQUEST}catalogos/tipos_etnias`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setData(result.data)
            })
            .catch(error => {
                AlertError(`Error al cargar ${name} `, error)
                console.log('error', error)
            });
    }

    /* componente que extrae */
    const { name, className, onChange } = props

    return (
        <select
            name={name}
            className={className}
            onChange={onChange}
        >
            <option value=''>--Seleccione--</option>
            {data.map(item => <option key={item.id} value={item.id}>{item.nombre}</option>)}
        </select>
    );
}

export default SelectEtnias;