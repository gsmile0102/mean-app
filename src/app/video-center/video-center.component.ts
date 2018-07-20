import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css']
})
export class VideoCenterComponent implements OnInit {

  videos: Video[];

  selectedVideo: Video;

  private hideNewVideo: boolean = true;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoService.getVideos()
      .subscribe((resVideoData) => {this.videos = resVideoData});
  }

  onSelectVideo(video: any) {
    this.selectedVideo = video;
    this.hideNewVideo = true;
    console.log(this.selectedVideo);
  }

  onSubmitAddVideo(video: Video) {
    this.videoService.addVideo(video)
      .subscribe(resNewVideo => {
        this.videos.push(resNewVideo);
        this.hideNewVideo = true;
        this.selectedVideo = resNewVideo;
      });
  }

  newVideo() {
    this.hideNewVideo = false;
  }

  onUpdateVideoEvent(video: any) {
    this.videoService.updateVideo(video)
      .subscribe(resUpdatedVideo => video = resUpdatedVideo);
    this.selectedVideo = null;
  }

  onDeleteVideoEvent(video: any) {
    this.videos = this.videos.filter(v => v !== video);
    this.videoService.deleteVideo(video)
      .subscribe();
    this.selectedVideo = null;
  }

}
