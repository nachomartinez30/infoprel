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

const DatosPredio = (props) => {

    const { state, setState } = props

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
        <div id="div_predio">
            <div className="row">
                <div className="col-md-6 ">
                    <div className="form-group">
                        <label className="control-label">Clave Catastral o PHINA:</label>
                        <input
                            onChange={setInfo}
                            className="form-control"
                            type="text"
                            name="phina_datos_propiedad"
                            maxLength={16}
                            placeholder="Ingresa la clave"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="control-label">Nombre del terreno:</label>
                        <input
                            onChange={setInfo}
                            name="nombre_terreno_datos_propiedad"
                            className="form-control"
                            type="text"
                            placeholder="Ingresa el nombre del terreno"
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="control-label">Tipo de terreno:</label>
                        <SelectTipoTerreno
                            onChange={setInfo}
                            key="tipoterreno-general"
                            name="tipoterreno-general"
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="control-label">Regimen de Propiedad:</label>
                        <SelectRegimenTerreno
                            className="form-control"
                            onChange={setInfo}
                            name="regimen_propiedad"
                            key="regimen_propiedad"
                        />

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="control-label">Documento de acreditación: <span className="glyphicon glyphicon-question-sign emergente" data-title="Nombre del documento con el que acreditas la propiedad del terreno" /></label>
                        <SelectDocAcredPredios
                            onChange={setInfo}
                            key="acre_predio"
                            name="acre_predio"
                            className="form-control"
                        />
                         
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label className="control-label">Número o Folio : </label>
                        <input name="folio_predio" className="form-control" placeholder="Ingresa el número o folio" />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label className="control-label">Estatus de Posesión:</label>
                        <SelectCatalogo
                            onChange={setInfo}
                            className="form-control py5"
                            name="estatus_posesion"
                            key="estatus_posesion"
                            data={cat_tipos_poseedores}
                        />

                    </div>
                </div>
            </div>
            <div className="row">
                <EntidadSelects
                    textoComplemetarioLabel='domicilio notificacion'
                    nameComplement='domicilio_notificacion'
                    onBlur={setInfo}
                />
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="control-label">Superficie total: <span className="glyphicon glyphicon-question-sign emergente" data-title="En caso de ejidos y comunidades se refiere a la superficie en hectáreas con la que fue dotado" /></label>
                        <input
                            onChange={setInfo}
                            name="superficie_datos_propiedad"
                            className="form-control"
                            placeholder="Ingresa la superficie en hectáreas"
                            type="number"
                        />
                        <small htmlFor="superficie_datos_propiedad" className="form-text form-text-error" style={{ display: 'none' }} />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="control-label">Superficie forestal: <span className="glyphicon glyphicon-question-sign emergente" data-title="Superficie en hectáreas, no es mayor a la superficie total" /></label>
                        <input
                            onChange={setInfo}
                            name="superficie_forestal_datos_propiedad"
                            className="form-control"
                            placeholder="Ingresa la superficie en hectáreas"
                            type="number"
                        />
                        <small htmlFor="superficie_forestal_datos_propiedad" className="form-text form-text-error" style={{ display: 'none' }} />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="control-label">Área Natural Protegida:</label>
                        <SelectAreasNatProtect
                            onChange={setInfo}
                            name="anp_predio"
                            className="form-control"
                        />
                        <small className="form-text form-text-error" style={{ display: 'none' }} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default DatosPredio;