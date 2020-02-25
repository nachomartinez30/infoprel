import Swal from "sweetalert2";

const AlertError = (msg, err) => {
    Swal.fire({
        title: msg,
        type: 'error',
        icon: 'error',
        text: err,
    })
}

export default AlertError;