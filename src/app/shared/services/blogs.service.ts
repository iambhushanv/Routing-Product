import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iblog, IblogRes } from '../models/blog';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  BLOG_BASE_URL: string = environment.blogUrl
  BLOG_URL = `${this.BLOG_BASE_URL}/blogs.json`

  constructor(
    private _HttpClient: HttpClient,
    private _spinnerSerice: SpinnerService
  ) { }

  fetchBlogs(): Observable<Iblog[]> {

    let h = new HttpHeaders({
      "Content-type" : 'application/json',
      "auth" : 'token'
    })
    this._spinnerSerice.emitLoadingFlag(true)
    return this._HttpClient.get<IblogRes>(this.BLOG_URL, {
      headers : h
    })
      .pipe(
        map((obj: IblogRes) => {
          let blogsArr: Array<Iblog> = []
          for (const key in obj) {
            blogsArr.push({ ...obj[key], id: key })
          }
          return blogsArr
        }),
        finalize(() => {
          this._spinnerSerice.emitLoadingFlag(false)
        })
      )
  }

  createBlog(blog: Iblog): Observable<any> {
    return this._HttpClient.post<Iblog>(this.BLOG_URL, blog)
  }

  fetchBlogById(id: string): Observable<Iblog> {
    let SINGLE_BLOG_ID = `${this.BLOG_BASE_URL}/blogs/${id}.json`
    return this._HttpClient.get<Iblog>(SINGLE_BLOG_ID)
  }

  updateBlog(obj: Iblog): Observable<Iblog> {
    let UPDATE_URL = `${this.BLOG_BASE_URL}/blogs/${obj.id}.json`
    return this._HttpClient.patch<Iblog>(UPDATE_URL, obj)
  }

  onRemove(id: string): Observable<Iblog> {
    let REMOVE_URL = `${this.BLOG_BASE_URL}/blogs/${id}.json`
    return this._HttpClient.delete<Iblog>(REMOVE_URL)
  }
}
