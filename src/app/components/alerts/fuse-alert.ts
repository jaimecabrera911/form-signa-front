import { FuseAlertType } from "@fuse/components/alert";

export class FuseAlert{

    alert: { type: FuseAlertType; message: string } 

    FuseAlert(type, message){
        alert('fsfs');
        return this.alert = {
            type   : 'error',
            message: 'Correo o contraseña equivocada'
        };
    }

}