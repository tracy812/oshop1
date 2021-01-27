
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import "rxjs/add/operator/switchMap"

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:any[];
  filterProducts:any[];
  catagory: string;
  constructor(route: ActivatedRoute, productService: ProductService) { 
   
    productService.getAll().snapshotChanges().switchMap(
      p=>{
        p=p.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        this.products=p;
        return route.queryParamMap;})
       .subscribe(params=>
      {this.catagory= params.get('catagory');
      this.filterProducts= (this.catagory)?
        this.products.filter(p =>p.catagory===this.catagory):
        this.products;
      })
  
  
    
    
    

    

  }

  ngOnInit(): void {
  }

}
