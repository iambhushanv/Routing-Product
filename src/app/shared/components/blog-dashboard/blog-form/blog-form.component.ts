import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from 'src/app/shared/services/blogs.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {

  blogForm !: FormGroup
  isInEditMode: boolean = false
  blogId !: string
  blogObj !: any

  constructor(
    private _blogService: BlogsService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createBlogForm()
    this.patchData()
  }

  createBlogForm() {
    this.blogForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      body: new FormControl(null, Validators.required),
      userId: new FormControl(null, Validators.required),
    })
  }

  onBlogAdd() {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched()
    } else {
      let newBlog: any = { ...this.blogForm.value }
      this._blogService.createBlog(newBlog)
        .subscribe({
          next: res => {
            console.log(res);
            this.blogForm.reset()
            this._router.navigate(['blogs'])
          },
          error: err => {
            console.log(err);
          }
        })
    }
  }

  patchData() {
    this.blogId = this._routes.snapshot.paramMap.get('id')!
    if (this.blogId) {
      this._blogService.fetchBlogById(this.blogId)
        .subscribe({
          next: res => {
            this.blogObj = res
            this.blogForm.patchValue(this.blogObj)
            this.isInEditMode = true
          },
          error: err => {
            console.log(err);
          }
        })
    }
  }

  onUpdate() {
    if(this.blogForm.invalid){
      this.blogForm.markAllAsTouched()
    }else{
      let updatedBlog : any = {...this.blogForm.value, id : this.blogId}
      this._blogService.updateBlog(updatedBlog)
      .subscribe({
        next : res => {
          console.log(res);
          this.isInEditMode = false
          this.blogForm.reset()
          this._router.navigate(['blogs'])
        },
        error : err => {
          console.log((err));         
        }
      })
    }
  }

}
