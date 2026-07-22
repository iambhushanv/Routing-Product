import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from 'src/app/shared/services/blogs.service';
import { GetConfirmComponent } from '../../products-dashboard/product/get-confirm/get-confirm.component';
import { config } from 'rxjs';
import { Iblog } from 'src/app/shared/models/blog';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  blogId !: string
  blogObj !: Iblog

  constructor(
    private _routes: ActivatedRoute,
    private _blogService : BlogsService,
    private _matDialog : MatDialog,
    private _router : Router
  ) { }

  ngOnInit(): void {
    this.getBlogDetail()
  }

  getBlogDetail(){
    this.blogId = this._routes.snapshot.paramMap.get('id')!
    if(this.blogId){
      this._blogService.fetchBlogById(this.blogId)
        .subscribe({
          next: data => {
            this.blogObj = data          
          },
          error : err => {
            console.log(err);          
          }
        })
    }
  }

  onRemove(){
    let config = new MatDialogConfig()
    config.width = `350px`
    config.disableClose = true
    config.data = `Are you sure, you want to remove the blog with id ${this.blogId} ?`
    let matR = this._matDialog.open(GetConfirmComponent, config)
    matR.afterClosed().subscribe(res => {
      if(res){
        console.log(this.blogId);
        this._blogService.onRemove(this.blogId)        
        .subscribe({
          next : res => {
            console.log(res);
            this._router.navigate(['blogs'])       
          },
          error : err => {
            console.log(err);            
          }
        })
      }
    })
  }

}
