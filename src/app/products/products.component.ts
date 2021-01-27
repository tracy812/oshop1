import { CatagoryService } from './../catagory.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$;
  catagories$;
  constructor(productService: ProductService, catagaoryService: CatagoryService) { 
    this.products$= productService.getAll().snapshotChanges()
    .pipe(map(changes => changes
    .map(c => ({ key: c.payload.key, ...c.payload.val() }))));
    
    this.catagories$= catagaoryService.getAll().snapshotChanges()
    .pipe(map(changes => changes
    .map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }

  ngOnInit(): void {
  }

}
