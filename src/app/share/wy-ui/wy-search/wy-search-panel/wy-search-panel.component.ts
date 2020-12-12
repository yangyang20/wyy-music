import {
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {SearchResult} from '../../../../service/data-types/common.types';
import {SearchService} from '../../../../service/search.service';
import { Router} from "@angular/router";

@Component({
  selector: 'app-wy-search-panel',
  templateUrl: './wy-search-panel.component.html',
  styleUrls: ['./wy-search-panel.component.less']
})
export class WySearchPanelComponent implements OnInit,OnChanges {
  searchResult: SearchResult={};

  @Input()keywords:string=''

  @Output()changeVisible = new EventEmitter<boolean>()

  constructor(private searchService:SearchService,
              private router:Router) { }

  ngOnInit(): void {

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
        this.searchResult = this.highlightkeywords(this.keywords,searchResult)
      })
    }
  }


  private highlightkeywords(keywords:string,result:SearchResult):SearchResult{
    const reg = new RegExp(keywords,'ig');
    ['artists','playlists','songs'].forEach(type=>{
      // @ts-ignore
      if (result[type]){
        // @ts-ignore
        result[type].forEach(item=>{
          item.name = item.name.replace(reg,'<span class="highlight">$&</span>')
        })
      }
    })
    return  result
  }

  toInfo(path:[string,number]){
    this.changeVisible.emit(false)
    this.router.navigate(path);
  }



}
