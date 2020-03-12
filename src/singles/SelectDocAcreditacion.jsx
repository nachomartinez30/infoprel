import React, { useEffect, useState } from 'react'

const SelectDocAcreditacion = (props) => {

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

        fetch(`${API_REQUEST}catalogos/documentos_acreditacion`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setData(result.data)
            })
            .catch(error => {
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
            {data.map(item => <option value={item.id}>{item.nombre}</option>)}
        </select >
    );
}

export default SelectDocAcreditacion;