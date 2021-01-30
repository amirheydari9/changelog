import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-suggestion-header',
  templateUrl: './suggestion-header.component.html',
  styleUrls: ['./suggestion-header.component.scss']
})
export class SuggestionHeaderComponent implements OnInit {

  @Input() suggestionInfo;
  constructor() { }

  ngOnInit() {
  }

}
