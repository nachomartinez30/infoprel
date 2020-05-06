import React, { useState } from 'react'
import LineaDivision from '../singles/LineaDivision'

const FormCargaArchivos = (props) => {
    const { files } = props
    return (
        <React.Fragment>
            <h2>Documentos</h2>
            <LineaDivision />
            {files.map((item) => {
                return <React.Fragment>
                    <div className="col-md-7">
                        <h4>{(item.necesario) ? '*' : null}{item.titulo}</h4>
                    </div>
                    <div className='col-md-1' style={{ color: '#00a63e', fontStyle: 'italic' }}>
                        {(item.cargado) ? 'Cargado' : null}
                    </div>
                    <div className="col-md-4">
                        <input
                            type='file'
                            accept={`.${item.tipoArchivo}`}
                            className='form-control'
                            name={item.name}
                            multiple
                        />
                    </div>
                </React.Fragment>
            })}
        </React.Fragment>
    );
}

export default FormCargaArchivos;