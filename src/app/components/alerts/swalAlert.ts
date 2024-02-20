import Swal from 'sweetalert2';

export class SwalAlert {

    Toast() {
        return Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
    }

    AlertDelete() {
        return Swal.fire({
            title: "¿Está seguro de eliminar este elemento?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
        });
    }

    /*
    successUpdate(path: string){
      let Toast = this.Toast();
      return Toast.fire({
        icon: 'error', title: 'Hubo un problema en guardar los registros, intenta nuevamente'
      }).then((result) => {
        this.router.navigateByUrl(path);
      });
    }*/

    toastSuccess() {
        let Toast = this.Toast();
        return Toast.fire({
            icon: 'success', title: 'Tu proceso ha culminado perfectamente'
        });
    }

    toastErrorUpload() {
        let Toast = this.Toast();
        return Toast.fire({
            icon: 'error', title: 'Hubo un problema al cargar la imagen, intenta nuevamente'
        });
    }

    toastErrorUpdate() {
        let Toast = this.Toast();
        return Toast.fire({
            icon: 'error', title: 'Hubo un problema, intenta nuevamente'
        });
    }
}
