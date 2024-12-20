import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
//import { AuthService } from 'app/core/auth/auth.service';
import { AuthenticationService } from '../../../security-auth/authentication.service';
import { ApiService } from 'app/services/api.service';

import { Observable } from 'rxjs';
import { LoginService } from 'app/services/login.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    companies: any;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private authService: AuthenticationService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _login: LoginService,
        protected api: ApiService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        //this.getCompanies();
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', Validators.required],
            rememberMe: ['']
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /*getCompanies(): void {
        this.api.companyService().subscribe({
            next: (data: any) => {

                this.companies = data;
            },
            error: (e: any) => console.error(e)
        });
    }*/

    /**
     * Sign in
     */
    signIn(): void {
        const data = this.signInForm.value;
        if (this.signInForm.invalid) {
            return;
        }
        this.signInForm.disable();
        this.showAlert = false;
        console.log('email :: ',data.email,' password :: ', data.password);
        this.api.login(data.email, data.password)
            .subscribe({
                next: (response: any) => {
                    console.log('response :: ',response);
                    this.signinSuccess(response);
                }, error: (error: any) => this.signInError(error)
            });
    }

    /**
     *  Sign Success
     */
    signinSuccess(success: any): void {
        this._login.loginSuccess(success.accessToken);
        this.alert = { type: 'success', message: 'Usuario verificado' };
        const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('/');
        this._router.navigateByUrl(redirectURL);
    }

    /**
     * Sign ErrorItem
     */
    signInError(error: any): void {
        this.signInForm.enable();
        this.signInNgForm.resetForm();
        this.alert = { type: 'error', message: 'Correo o contraseña equivocada' };
        this.showAlert = true;
    }
}
