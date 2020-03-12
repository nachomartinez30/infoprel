import React, { useState, useEffect } from 'react'
import { getDefaultLang } from 'validatorjs'

const SelectEstados = (props) => {
    const [estados, setEstados] = useState([])

    const getData = () => {
        const API_REQUEST = process.env.REACT_APP_BACKEN_URL

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${API_REQUEST}inegi/estados`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setEstados(result)
            })
            .catch(error => console.log('error', error));
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
            {estados.map((item) => <option key={item.cve_ent} value={item.cve_ent}>{item.nom_ent}</option>)}
        </select>
    );
}

export default SelectEstados;