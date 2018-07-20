import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  @Input() videos;

  @Output() selectVideo = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelect(vid: Video) {
    this.selectVideo.emit(vid);
  }

}
