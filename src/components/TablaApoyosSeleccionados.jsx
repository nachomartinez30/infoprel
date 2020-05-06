import React from 'react'
import LineaDivision from '../singles/LineaDivision';

const TablaApoyosSeleccionados = (props) => {

    const { state, setState } = props

    return (
        <div className='col-md-12 py25'>
            <h3 className='text-center'>Apoyos a solicitar  </h3>
            <LineaDivision />
            <div className='table-responsive-sm'>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th className="text-center" scope="col">Apoyo solicitado</th>
                            <th className="text-center" scope="col">Monto solicitado</th>
                            <th className="text-center" scope="col">Cantidad solicitada</th>
                            <th className="text-center" scope="col">Unidad de medida</th>
                            <th className="text-center" scope="col">Folio Asesor</th>
                            <th className="text-center" scope="col">Monto aportación</th>
                            <th className="text-center" scope="col">Acciones</th>
                        </tr>
                    </thead>

                    {(state.length > 0) &&
                        <tbody>
                            {state.map((item) => {
                                return <tr>
                                    <td className='text-center'>{item.nombre_apoyo_solicitado}</td>
                                    <td className='text-center'>{item.monto_solicitado}</td>
                                    <td className='text-center'>{item.cantidad_solicitada}</td>
                                    <td className='text-center'>{item.unidad_medida}</td>
                                    <td className='text-center'>{item.monto_aportacion}</td>
                                    <td className='text-center'>{item.folio_asesor}</td>
                                    <td className='text-center'><button className='btn btn-warning'>x</button></td>
                                </tr>
                            })}
                        </tbody>
                    }
                </table>
                {(state.length <= 0) &&
                    <div class="alert alert-warning" role="alert">
                        {/* TODO: modificar este apartado para alinear mensaje */}
                           No se ha seleccionado ningun apoyo aún.
                    </div>}
            </div>
        </div>
    );
}

export default TablaApoyosSeleccionados;