import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input()
  paginator: any;
  paginas: number[]=[];
  constructor() { }

  ngOnInit(): void {
    this.paginas= new Array(this.paginator.totalPages).fill(0)
        .map((n, i)=> i+1);
  }

}
