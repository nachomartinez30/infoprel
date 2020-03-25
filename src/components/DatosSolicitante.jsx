import React, { useContext} from 'react'
/* HELPERS */

/* COMPONENTES PROPIOS */
import LineaDivision from '../singles/LineaDivision';
import SelectCatalogo from '../singles/SelectCatalogo';

/* CONTEXT */
import catalogosContext from "./../context/catalogos/catalogosContext";

const DatosSolicitante = (props) => {

    const catsContext = useContext(catalogosContext)
    const {
        tipos_tenedores,
        tipos_poseedores,
        tipos_productores
    } = catsContext.catalogos


    /* Se modifica para paso de parametros a <SelectCatalogos/> */
    const cat_tipos_tenedores = (typeof tipos_tenedores !== 'undefined') ? tipos_tenedores.data : tipos_tenedores
    const cat_tipos_poseedores = (typeof tipos_poseedores !== 'undefined') ? tipos_poseedores.data : tipos_poseedores
    const cat_tipos_productores = (typeof tipos_productores !== 'undefined') ? tipos_productores.data : tipos_productores

    const { state, setState } = props

    const setInfo = (input) => {
        setState({
            ...state,
            [input.target.name]: input.target.value
        })
    }

    return (
        <React.Fragment>
            <div className="row top-buffer">
                <div className="col-md-12">
                    <h2>Datos de Solicitante</h2>
                    <LineaDivision />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 py5">
                    <div className="form-group">
                        <label className="control-label">La persona solicitante es*:</label>
                        <SelectCatalogo
                            onChange={setInfo}
                            className="form-control"
                            name="tipo_tenedor"
                            data={cat_tipos_tenedores}
                        />
                        <small className="form-text form-text-error" style={{ display: 'none' }}>Dato necesario</small>
                    </div>
                </div>
                <div className="col-md-6 py5" id="tipo_poseedor">
                    <label className="control-label">Tipo de Poseedor*:</label>
                    <SelectCatalogo
                        onChange={setInfo}
                        className="form-control py5"
                        name="tipo_poseedor"
                        data={cat_tipos_poseedores}
                    />
                    <small className="form-text form-text-error" style={{ display: 'none' }}>Dato necesario</small>
                </div>
                <div className="col-md-6 py5" id="tipo_poseedor">
                    <label className="control-label">Tipo de Productor*:</label>
                    <SelectCatalogo
                        onChange={setInfo}
                        className="form-control"
                        name="tipo_productor"
                        data={cat_tipos_productores}
                    />
                    <small className="form-text form-text-error" style={{ display: 'none' }}>Dato necesario</small>
                </div>
                <div className="col-md-12 py5">
                    <label>Email Solicitante:</label>
                    <input
                        onChange={setInfo}
                        type="email"
                        className="form-control"
                        placeholder="Email Solicitante"
                        name="email_solicitante"
                    />
                </div>
            </div>
        </React.Fragment>
    );
}

export default DatosSolicitante;