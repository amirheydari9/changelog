import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-respondent-svg',
  templateUrl: './respondent-svg.component.html',
  styleUrls: ['./respondent-svg.component.scss']
})
export class RespondentSvgComponent implements OnInit {

  @Input() quadrant;
  constructor() { }

  ngOnInit() {
  }

}
