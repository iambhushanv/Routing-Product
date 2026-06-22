import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/models/user';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  isInEditMode: boolean = false
  userForm !: FormGroup
  editUserInfo !: Iuser
  userId !: string

  constructor(
    private _userService : UsersService,
    private _snackBar : SnackBarService,
    private _router : Router,
    private _routes : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.addSkillControl()
    this.isAddSameHandler()
    this.currentAddressHandler()

    this.userId = this._routes.snapshot.paramMap.get('userId')!
    if(this.userId){
      this._userService.fetchUserById(this.userId)
      .subscribe({
        next : res => {
          this.editUserInfo = res 
          console.log(this.editUserInfo);
          
          this.userForm.patchValue(this.editUserInfo)
        },
        error : err => {
          console.log(err);        
        }
      })
    }
  }

  currentAddressHandler(){  
    this.formControls['isAddSame'].valueChanges
      .subscribe(val => {
        if (val) {
          let currentAddVal = this.formControls['address'].get('current')?.value
          this.formControls['address'].get('permanent')?.patchValue(currentAddVal)
          this.formControls['address'].get('permanent')?.disable()
        } else {
          this.formControls['address'].get('permanent')?.reset()
          this.formControls['address'].get('permanent')?.enable()
        }
      })
  }

  isAddSameHandler(){
       this.formControls['address'].get('current')?.valueChanges
      .subscribe(val => {
        if (this.formControls['address'].get('current')?.valid) {
          this.formControls['isAddSame'].enable()
        } else {
          this.formControls['isAddSame'].reset()
          this.formControls['isAddSame'].disable()
        }
      })
  }

  createUserForm() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      userRole: new FormControl(null, [Validators.required]),
      profileDescription: new FormControl(null, [Validators.required]),
      profileImage: new FormControl(null, [Validators.required]),
      experienceYears: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      isAddSame: new FormControl({ value: null, disabled: true }, [Validators.required]),
      address: new FormGroup({
        current: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        }),
        permanent: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        })
      }),
      skills: new FormArray([])
    })
  }

  addSkillControl() {
    if (this.formControls['skills'].valid) {
      let skillcontrol = new FormControl(null, [Validators.required])
      this.skillsArr.push(skillcontrol)
    }
  }

  get formControls() {
    return this.userForm.controls
  }

  get skillsArr() {
    return this.formControls['skills'] as FormArray
  }

  onAddUser() {
     if(this.userForm.invalid){
      this.userForm.markAllAsTouched()
     }else{
    let userDetails: Iuser = {...this.userForm.getRawValue(), userId: Date.now().toString()}
      this._userService.addUser(userDetails)
      .subscribe({
        next : res => {
          this._snackBar.openSnackBar(res.msg)
          this._router.navigate(['/user'])
        },
        error : err => {
          this._snackBar.openSnackBar(err.msg)
        }
      })

     }
  }

}
