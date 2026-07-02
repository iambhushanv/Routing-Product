import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogClose, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/models/user';
import { UsersService } from 'src/app/shared/services/users.service';
import { GetConfirmComponent } from '../../products-dashboard/product/get-confirm/get-confirm.component';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userDetails !: Iuser
  userId !: string
  constructor(
    private _routes: ActivatedRoute,
    private _userService: UsersService,
    private _matDialog : MatDialog,
    private _snackBar : SnackBarService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.fetchUserDetails()
  }

  fetchUserDetails() {
    this._routes.params.subscribe(param => {
      this.userId = param['userId']
      
      if (this.userId) {
        this._userService.fetchUserById(this.userId)
          .subscribe({
            next: res => {
              this.userDetails = res
            },
            error: err => {
              console.log(err);
            }
          })
      }
    })

  }

  onRemove(){
    let config = new MatDialogConfig()
    config.width = '350px'
    config.disableClose = true
    config.data = `Are you sure, you want to remove the user with id ${this.userId}`
    let matR = this._matDialog.open(GetConfirmComponent, config)
     matR.afterClosed().subscribe( res => {
      if(res){
        this._userService.onRemove(this.userId)
        .subscribe({
          next : res => {
            this._snackBar.openSnackBar(res.msg)
            this._router.navigate(['user'])
          },
          error : err => {
            this._snackBar.openSnackBar(err.msg)
          }
        })
      }
     })
  }

}
