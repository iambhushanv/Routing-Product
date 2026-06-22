import { Injectable } from '@angular/core';
import { Iuser } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersArr: Array<Iuser> = [
    {
      userName: 'May',
      userId: '125',
      userRole: 'Admin',
      profileDescription: 'Frontend developer with Angular experience.',
      profileImage: 'https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png',
      skills: ['Angular', 'TypeScript', 'HTML', 'CSS'],
      experienceYears: '1 to 3 years',
      isActive: true,
      address: {
        current: {
          city: 'Pune',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '411001'
        },
        permanent: {
          city: 'Pune',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '411001'
        }
      },
      isAddSame: true
    },
    {
      userName: 'Rahul',
      userId: '126',
      userRole: 'Candidate',
      profileDescription: 'Backend developer with Node.js and database experience.',
      profileImage: 'https://static.vecteezy.com/system/resources/thumbnails/024/183/525/small/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg',
      skills: ['Node.js', 'Express', 'MongoDB', 'REST API'],
      experienceYears: '3 to 5 years',
      isActive: false,
      address: {
        current: {
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '400001'
        },
        permanent: {
          city: 'Udgir',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '413517'
        }
      },
      isAddSame: false
    }
  ]

  constructor() { }

  fetchUser(): Observable<Iuser[]> {
    return of(this.usersArr)
  }

  fetchUserById(id: string): Observable<Iuser>{
    let userObj = this.usersArr.find(u => u.userId === id)!
    return of(userObj)
  }

  addUser(obj: Iuser){
    this.usersArr.unshift(obj)
    return of({
      msg : `The new user with id ${obj.userId} is added successfully !!!`,
      data : obj
    })
  }
}
