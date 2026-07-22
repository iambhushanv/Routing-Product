import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { SnackBarService } from '../../services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  allReadyHasAccount: boolean = false
  loginForm !: FormGroup
  signUpForm !: FormGroup

  constructor(
    private _authService: AuthService,
    private _snackBar: SnackBarService,
    private _router: Router

  ) { }

  ngOnInit(): void {
    this.createSignUpForm();
    this.createLoginForm();
    this.fetchPostsArr();
  }

  createSignUpForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      userRole: new FormControl('admin')
    })
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  fetchPostsArr() {
    this._authService.fetchPosts()
      .subscribe({
        next: res => {
          console.log(res);
        }
      })
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
    } else {
      let details = this.loginForm.value
      console.log(details);
      this._authService.login(details)
        .subscribe({
          next: data => {
            console.log(data);
            this._snackBar.openSnackBar(data.message);
            this._authService.saveToken(data.token)
            this._authService.saveUserRole(data.userRole)
            this._router.navigate(['home'])
          },
          error: err => {
            console.log(err);
            this._snackBar.openSnackBar(err.error.message);
          }
        })
    }
  }

  onSignUP() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched()
    } else {
      let userDetails = this.signUpForm.value;
      this._authService.signUp(userDetails)
        .subscribe({
          next: res => {
            console.log(res)
            this._snackBar.openSnackBar(res.message);
            this.allReadyHasAccount = true
          },
          error: err => {
            console.log(err)
            this._snackBar.openSnackBar(err.error.message);
          }
        })

    }
  }

}
