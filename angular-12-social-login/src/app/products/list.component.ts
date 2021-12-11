import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from './product';
    
@Component({templateUrl: './list.component.html'})
export class ProductListComponent implements OnInit {
     
	products: Product[] = [];
   
	constructor(public productService: ProductService) {
	}
    
	ngOnInit(): void {
		this.getProducts({ page: "0", size: "5" });
	}
	 
	private getProducts(request) {
		this.productService.getAll(request)
		.subscribe(data => {
			this.products = data['content'];
		}
		, error => {
			console.log(error.error.message);
		}
		);
	}
	  
	deleteProduct(id:number){
		this.productService.delete(id)
		.subscribe(data => {
			this.products = this.products.filter(item => item.id !== id);
			console.log('Product deleted successfully!');
		}
		, error => {
			console.log(error.error.message);
		}
		);
	}
}
