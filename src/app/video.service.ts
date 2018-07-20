import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Video } from './video';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private getUrl = "/api/videos";
  private postUrl = "/api/video";
  private putUrl = "/api/video/";
  private deleteUrl = "/api/video";

  constructor(private http: HttpClient) { }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.getUrl)
      .pipe(tap(videos => console.log(videos)));
  }

  addVideo(video: Video): Observable<Video> {
    return this.http.post<Video>(this.postUrl, video, httpOptions).pipe(
      tap((video: Video) => console.log(`Added video w/ id=${video._id}`))
    );
  }

  updateVideo(video: Video): Observable<any> {
    return this.http.put<Video>(this.putUrl + video._id, video, httpOptions).pipe(
      tap((video: Video) => console.log(`Updated video w/ title=${video._id}`))
    );
  }

  deleteVideo(video: Video | number): Observable<Video> {
    const id = typeof video === 'number' ? video : video._id;
    const url = `${this.deleteUrl}/${id}`;

    return this.http.delete<Video>(url, httpOptions).pipe(
      tap(_ => console.log(`Delete video id=${id}`))
    );
  }
}
