import React from 'react'

const SelectSiNo = (props) => {
    const { name, textLabel, onChange, defaultValue } = props

    return (
        <React.Fragment>
            <label
                className='control-label'
                htmlFor={name}
            >{textLabel}</label>
            <select
                onChange={onChange}
                className='form-control'
                name={name}
                value={defaultValue}
            >
                <option value=''>--Seleccione--</option>
                <option value={true}>Si</option>
                <option value={false}>No</option>
            </select>
        </React.Fragment>
    );
}

export default SelectSiNo;