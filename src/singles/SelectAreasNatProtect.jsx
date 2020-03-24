import React, { useContext, useState, useEffect } from 'react'

const SelectAreasNatProtect = (props) => {
    const { name, className, onChange } = props
    const [data, setData] = useState([])

    const API_REQUEST = process.env.REACT_APP_BACKEN_URL;

    useEffect(() => {
        fetch(`${API_REQUEST}catalogos/areas_naturales`)
            .then(response => response.json())
            .then(data => setData(data))
    }, [''])

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

export default SelectAreasNatProtect;