import { Product } from './../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CatagoryService } from './../../catagory.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import { compileDirectiveFromMetadata } from '@angular/compiler';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  catagories$;
  product:any={};
  id;
  
  constructor(private catagoryService: CatagoryService,
     private productService:ProductService,
     private router: Router,
     private route: ActivatedRoute) { 
    this.catagories$=catagoryService.getAll().snapshotChanges()
    .pipe(map(changes => changes
    .map(c => ({ key: c.payload.key, ...c.payload.val() }))));

    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id)
     this.productService.getProduct(this.id).valueChanges().take(1).subscribe(p=>this.product=p);
     console.log("here");
     console.log(this.product.price);
  }

  save(product){
    if(this.id){
      this.productService.update(this.id,product)
      console.log("update");
      console.log(product.price);
    }
    else{
     this.productService.create(product);
     console.log("create");
    }
     this.router.navigate(['/admin/products']);
  };
  
  delete(){
    if (!confirm('Are yoy sure to delete the product'))
       return;
    else{
      this.productService.delete(this.id);
    }
    this.router.navigate(['/admin/products']);
  }
  ngOnInit(): void {
  }

}
