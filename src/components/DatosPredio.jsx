import React, { useContext } from 'react'
/* COMPONENTES PROPIOS */
import EntidadSelects from './EntidadSelects';
import SelectCatalogo from '../singles/SelectCatalogo';
import SelectAreasNatProtect from '../singles/SelectAreasNatProtect';
import SelectDocAcredPredios from '../singles/SelectDocAcredPredios';
import SelectTipoTerreno from '../singles/SelectTipoTerreno';
import SelectRegimenTerreno from '../singles/SelectRegimenTerreno';
/* CONTEXT */
import catalogosContext from "./../context/catalogos/catalogosContext";
import ErrorInputMsg from '../singles/ErrorInputMsg';

const DatosPredio = (props) => {

    const { state, setState, validacion } = props

    const catsContext = useContext(catalogosContext)
    const {
        tipos_poseedores,
    } = catsContext.catalogos
    const cat_tipos_poseedores = (typeof tipos_poseedores !== 'undefined') ? tipos_poseedores.data : tipos_poseedores


    const setInfo = input => {
        setState({
            ...state,
            [input.target.name]: input.target.value
        })
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-6 ">
                    <label className="control-label">Clave Catastral o PHINA:</label>
                    <input
                        onChange={setInfo}
                        className="form-control"
                        type="text"
                        name="phina"
                        maxLength={16}
                        placeholder="Ingresa la clave"
                    />
                </div>
            </div>
            <div className="row">
                <div className={`col-md-4 ${(validacion.nombre) ? 'has-error' : null}`}>
                    <label className="control-label">Nombre del terreno*:</label>
                    <input
                        onChange={setInfo}
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Ingresa el nombre del terreno"
                    />
                </div>
                <div className={`col-md-4 ${(validacion.tipo_predio_id) ? 'has-error' : null}`}>
                    <label className="control-label">Tipo de terreno*:</label>
                    <SelectTipoTerreno
                        onChange={setInfo}
                        key="tipo_predio_id"
                        name="tipo_predio_id"
                        className="form-control"
                    />
                    {validacion.tipo_predio_id && <ErrorInputMsg />}
                </div>
                <div className={`col-md-4 ${(validacion.regimen_propiedad_id) ? 'has-error' : null}`}>
                    <label className="control-label">Regimen de Propiedad*:</label>
                    <SelectRegimenTerreno
                        className="form-control"
                        onChange={setInfo}
                        name="regimen_propiedad_id"
                        key="regimen_propiedad_id"
                    />
                    {validacion.regimen_propiedad_id && <ErrorInputMsg />}
                </div>
                <div className={`col-md-6 ${(validacion.doc_acreditacion_predio_id) ? 'has-error' : null}`}>
                    <label className="control-label">Documento de acreditación*: <span className="glyphicon glyphicon-question-sign emergente" data-title="Nombre del documento con el que acreditas la propiedad del terreno" /></label>
                    <SelectDocAcredPredios
                        onChange={setInfo}
                        key="doc_acreditacion_predio_id"
                        name="doc_acreditacion_predio_id"
                        className="form-control"
                    />
                    {validacion.doc_acreditacion_predio_id && <ErrorInputMsg />}
                </div>
                <div className="col-md-3">
                    <label className="control-label">Número o Folio : </label>
                    <input
                        name="folio_documento"
                        className="form-control"
                        placeholder="Ingresa el número o folio"
                    />
                </div>
                <div className={`col-md-3 ${(validacion.estatus_general_id) ? 'has-error' : null}`}>
                    <label className="control-label">Estatus de Posesión*:</label>
                    <SelectCatalogo
                        onChange={setInfo}
                        className="form-control py5"
                        name="estatus_general_id"
                        key="estatus_general_id"
                        data={cat_tipos_poseedores}
                    />
                    {validacion.estatus_general_id && <ErrorInputMsg />}
                </div>
            </div>
            <div className="row">
                <div className={(validacion.estado_id || validacion.municipio_id || validacion.localidad_id) ? 'has-error' : null}>
                    <EntidadSelects
                        textoComplemetarioLabel=' predio'
                        onBlur={setInfo}
                    />
                </div>
                <div
                    className={(validacion.estado_id || validacion.municipio_id || validacion.localidad_id) ? 'has-error' : null}
                    style={{ textAlign: 'center' }} >
                    {(validacion.estado_id || validacion.municipio_id || validacion.localidad_id)
                        ? <ErrorInputMsg msg='Estos campos son necesarios' /> : null}
                </div>
                <div className={`col-md-4 ${(validacion.superficie_total) ? 'has-error' : null}`}>
                    <label className="control-label">Superficie total*: <span className="glyphicon glyphicon-question-sign emergente" data-title="En caso de ejidos y comunidades se refiere a la superficie en hectáreas con la que fue dotado" /></label>
                    <input
                        onChange={setInfo}
                        name="superficie_total"
                        className="form-control"
                        placeholder="Ingresa la superficie en hectáreas"
                        type="number"
                    />
                    {validacion.superficie_total && <ErrorInputMsg />}
                </div>
                <div className={`col-md-4 ${(validacion.superficie_forestal) ? 'has-error' : null}`}>
                    <label className="control-label">Superficie forestal*: <span className="glyphicon glyphicon-question-sign emergente" data-title="Superficie en hectáreas, no es mayor a la superficie total" /></label>
                    <input
                        onChange={setInfo}
                        name="superficie_forestal"
                        className="form-control"
                        placeholder="Ingresa la superficie en hectáreas"
                        type="number"
                    />
                    {validacion.superficie_forestal && <ErrorInputMsg />}
                </div>
                <div className={`col-md-4 ${(validacion.area_natural) ? 'has-error' : null}`}>
                    <label className="control-label">Área Natural Protegida*:</label>
                    <SelectAreasNatProtect
                        onChange={setInfo}
                        name="area_natural"
                        className="form-control"
                    />
                    {validacion.area_natural && <ErrorInputMsg />}
                </div>
            </div>
        </React.Fragment>

    );
}

export default DatosPredio;