import { Component, Input, OnInit } from '@angular/core';
import { CatagoryService } from './../../catagory.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  catagories$;
  @Input('catagory') catagory;

  constructor(catagaoryService: CatagoryService) {
        
    this.catagories$= catagaoryService.getAll().snapshotChanges()
    .pipe(map(changes => changes
    .map(c => ({ key: c.payload.key, ...c.payload.val() }))));

   }

  ngOnInit(): void {
  }

}
