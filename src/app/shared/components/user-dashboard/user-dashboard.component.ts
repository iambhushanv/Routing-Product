import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userArr !: Array<Iuser>
  constructor(
    private _userService : UsersService,
    private _snackBar : SnackBarService,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this._userService.fetchUser()
    .subscribe({
      next : res => {
        this.userArr = res
        if(this.userArr.length > 0){
            this._router.navigate(['/user', this.userArr[0].userId],
              {queryParams : {ur : this.userArr[0].userRole}}
            )
        }
      },
      error : err => {
      this._snackBar.openSnackBar(err)
      }
    })
  }

  trackByFun(index : number, user : Iuser){
    return user.userId
  }

}
 