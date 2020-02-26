import React, { useState } from 'react'

function InputRFC({ rfc, onTyping, name, defaultValue }) {


    const [valido, setValido] = useState('')
    const [claseValido, setClaseValido] = useState('')

    const checkStructure = () => {
        if (rfc.length > 1) {
            const check = (rfcValido(rfc) === rfc) ? true : false;
            setClaseValido((check) ? '' : 'noValido')
            setValido(check);
        } else {
            setClaseValido('')
            setValido('');
        }
    }

    const rfcValido = (rfc, aceptarGenerico = true) => {
        const re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
        var validado = rfc.match(re);

        if (!validado)  //Coincide con el formato general del regex?
            return false;

        //Separar el dígito verificador del resto del RFC
        const digitoVerificador = validado.pop(),
            rfcSinDigito = validado.slice(1).join(''),
            len = rfcSinDigito.length,

            //Obtener el digito esperado
            diccionario = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
            indice = len + 1;
        var suma,
            digitoEsperado;

        if (len == 12) suma = 0
        else suma = 481; //Ajuste para persona moral

        for (var i = 0; i < len; i++)
            suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
        digitoEsperado = 11 - suma % 11;
        if (digitoEsperado == 11) digitoEsperado = 0;
        else if (digitoEsperado == 10) digitoEsperado = "A";

        //El dígito verificador coincide con el esperado?
        // o es un RFC Genérico (ventas a público general)?
        if ((digitoVerificador != digitoEsperado)
            && (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000"))
            return false;
        else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000")
            return false;
        return rfcSinDigito + digitoVerificador;
    }


    return (
        <div className="col-md-6 col-md-offset-3">
            <label>RFC:</label>
            <input
                className={`form-control ${claseValido}`}
                value={defaultValue}
                placeholder='Ingrese RFC'
                onChange={onTyping}
                onBlur={checkStructure}
                name={name}
            />
            {valido === false &&
                <div className="col-sm-4">
                    <small className="text-danger">
                        El RFC no es valido.
                </small>
                </div>
            }
        </div>
    );
}

export default InputRFC;