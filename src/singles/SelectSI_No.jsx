import React from 'react'

const SelectSI_No = (props) => {
    const { name, textLabel, onChange } = props
    
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
            >
                <option value=''>--Seleccione--</option>
                <option value='true'>Si</option>
                <option value='false'>No</option>
            </select>
        </React.Fragment>
    );
}

export default SelectSI_No;