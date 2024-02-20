import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Path } from 'app/components/routers/path';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    title = new Path().getModule();
    subtitle = 'Registro de proveedores';

    formInit: any = this._formBuilder.group({
        identificationType: new FormControl('CC'),
        identificationNumber: new FormControl('5345345346'),
        names: new FormControl('Miguel Angel 1111'),
        surnames: new FormControl('Espejo Castellanos 111'),
        phoneNumber: new FormControl('7555555'),
        cellphoneNumber: new FormControl('3123371764', [Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10), Validators.maxLength(10)]),
        email: new FormControl('miguel_1111@gmail.com', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        position: new FormControl('Desarrollador Software'),
        workspace: new FormControl('TI'),
        roleName: new FormControl('EMPLOYEE'),
        companyUuid: new FormControl('f5995673-825e-41ee-a886-6af332817eef',),
        gender: new FormControl('M', [Validators.required]),
        birthCountry: new FormControl('169'),
        city: new FormControl('11001'),
        address: new FormControl('CR 27 C 70 81'),
        password: new FormControl('123456789'),
        birthdate: new FormControl('1988-02-11'),
        profilePicture: new FormControl('http://drive.com/image.png'),
        permissions: this._formBuilder.array(
        ['write-users',
        'read-users',
        'delete-users'])
    });

    constructor(
        private _formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        console.log('form: ',this.formInit.value);
    }

}
