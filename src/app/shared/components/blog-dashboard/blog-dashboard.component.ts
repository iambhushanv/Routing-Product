import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.scss']
})
export class BlogDashboardComponent implements OnInit {

  blogsArr: Array<any> = []
  constructor(
    private _BlogService: BlogsService,
    private _spinnerService : SpinnerService
  ) { }

  ngOnInit(): void {
    this.getBlogs()
  }

  getBlogs() {
    this._BlogService.fetchBlogs()
      .subscribe({
        next: data => {
          this.blogsArr = data
          //  this._spinnerService.emitLoadingFlag(false)
        },
        error: err => {
          console.log(err);
          //  this._spinnerService.emitLoadingFlag(false)
        }
      })
  }

  trackByFun(index: number, blog: any) {
    return blog.id
  }


}
