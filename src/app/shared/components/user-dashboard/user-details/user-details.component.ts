import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iuser } from 'src/app/shared/models/user';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userDetails !: Iuser
  userId !: string
  constructor(
    private _routes : ActivatedRoute,
    private _userService :  UsersService
  ) { }

  ngOnInit(): void {
    this.fetchUserDetails()
  }

  fetchUserDetails(){
        this.userId = this._routes.snapshot.paramMap.get('userId')!
    if(this.userId){
      this._userService.fetchUserById(this.userId)
      .subscribe({
        next : res => {
          this.userDetails = res
        },
        error : err => {
          console.log(err);        
        }
      })
    }
  }

}
