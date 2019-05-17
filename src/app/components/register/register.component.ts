import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  @Output() cancelRegister = new EventEmitter<boolean>();
  constructor(private authService: AuthService, private alertifyService: AlertifyService,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    /**this works but not the best way */
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [ Validators.required, Validators.minLength(4), Validators.maxLength(8) ]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchvalidator);
    this.createRegisterForm();
  }

  passwordMatchvalidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = this.registerForm.value;
      this.authService.register(this.user).subscribe( () => {
        this.alertifyService.success(`register ${this.user.username} successfully`);
      }, error => {
        console.log(error);
      }, () => {
        //when subsccription completes
        this.authService.login(this.user).subscribe( () => {
          this.router.navigate(['/members']);
        });
      });

    }
    //console.log(this.registerForm);
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(8) ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchvalidator });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
