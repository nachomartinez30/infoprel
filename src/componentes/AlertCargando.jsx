import Swal from "sweetalert2";

const AlertCargando = (msg) => {
    Swal.fire({
        title: msg,
        allowEscapeKey: false,
        allowOutsideClick: false,
        onOpen: () => {
            Swal.showLoading();
        }
    })
}

export default AlertCargando;