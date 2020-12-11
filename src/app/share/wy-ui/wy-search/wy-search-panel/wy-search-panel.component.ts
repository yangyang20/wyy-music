import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {SearchResult} from '../../../../service/data-types/common.types';
import {SearchService} from '../../../../service/search.service';

@Component({
  selector: 'app-wy-search-panel',
  templateUrl: './wy-search-panel.component.html',
  styleUrls: ['./wy-search-panel.component.less']
})
export class WySearchPanelComponent implements OnInit,OnChanges {
  searchResult: SearchResult={};

  @Input()keywords:string=''

  constructor(private searchService:SearchService) { }

  ngOnInit(): void {
    // this.getSearch()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['keywords']){
      if (this.keywords){
        this.getSearch()
      }
    }
  }
  private getSearch(){
    if (this.keywords){
      this.searchService.getSearch(this.keywords).subscribe(searchResult=>{
        this.searchResult = searchResult
      })
    }

  }

  toInfo(data:(number|string)[]){
    console.log(data);
  }

  test222(){
    console.log(123);
  }

}
