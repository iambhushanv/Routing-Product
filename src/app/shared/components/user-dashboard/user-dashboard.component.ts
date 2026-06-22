import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userArr !: Array<Iuser>
  constructor(
    private _userService : UsersService,
    private _snackBar : SnackBarService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this._userService.fetchUser()
    .subscribe({
      next : res => {
        this.userArr = res
      },
      error : err => {
      this._snackBar.openSnackBar(err)
      }
    })
  }

}
 