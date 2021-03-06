import { Observable } from 'rxjs/observable';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit , OnDestroy {
//  products:{title:string, price:string,key:any}[];
//  filterProducts:{title:string, price:string,key:any}[];
products:any[];
filterProducts:any[];
subscription:Subscription;
//tableResources:DataTableResource<any>;
items:any[];
itemCount:number;

//private initalizleTable(products:any){
//  this.tableResources=new DataTableResource(products);
//  this.tableResources.query({offset:0}).then(items =>this.items=items)
//  this.tableResources.count().then(count=>this.itemCount=count)
//}

  constructor(private productService:ProductService) {
    //this.product$=this.productService.getAll().snapshotChanges()
    //.pipe(map(changes => changes
    //.map(c => ({ key: c.payload.key, ...c.payload.val() }))));

    //this.subscription=this.productService.getAll().valueChanges()
    //.subscribe(products=>{this.filterProducts=this.products=products;
    //});

    this.subscription=this.productService.getAll().snapshotChanges()
    .subscribe(products=>{products=products.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    this.filterProducts=this.products=products;
  //  this.initalizleTable(products);
    });

  
  }

 // reloadItems(parms){
 //   this.tableResources.query(parms).then(items=>this.items=items)
 //
 // }
  ngOnInit(): void {
  }

  ngOnDestroy():void{
     this.subscription.unsubscribe();
  }
  filter(query: string){
    this.filterProducts = (query)?
    this.products.filter(p=>p.title.includes(query))
    :this.products;
  }
}
