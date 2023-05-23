import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ProductService } from '../product.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  products: any = [];
  productDialog: boolean = false;
  formcreateProduct: any;     
  submitButton: boolean = false;
  changeButton: boolean = false;
  msgs: Message[] = [];
  updateButtonClicked: boolean = false;


  constructor(private productService: ProductService, private router: Router, private fb: FormBuilder, private confirmationService: ConfirmationService) { }


  ngOnInit() {
    this.fetchAllProducts();

    this.formcreateProduct = this.fb.group({
      pno: [''],
      pcategory: [''],
      pmodelname: [''],
      pheight: [''],
      pweight: [''],
      pwidth: ['']
    });
  }

  fetchAllProducts() {
    this.productService.getProducts().subscribe(
      response => {
        this.products = response;
      },
      error => {
        console.log('get API error:', error);
      }
    );
  }
  onSubmit() {
    const url = 'http://localhost:8080/add/product';
    const requestBody = this.formcreateProduct.value;
    this.productService.addProduct(url, requestBody).subscribe(
      response => {
        this.productDialog = false;
        // Handle the response from the API
        this.fetchAllProducts();
      },
      error => {
        console.log('POST API error:', error);
        // Handle any errors that occurred during the API request
      })
  }

  openNewProductForm() {
    this.productDialog = true;
    this.submitButton = true;
    this.changeButton = false;
    this.formcreateProduct.reset();
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete this product with id: ${product.pno}`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.productService.deleteProduct(product.pno).subscribe(
          () => {
            this.fetchAllProducts();
          },
          error => {
            console.log('DELETE API error:', error);
          })
      },

      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  onEditClicked(pno: any) {
    console.log("edit button clicked");
    this.changeButton = true;
    this.submitButton = false;
    let currentProduct = this.products.find((prod: any) => prod.pno === pno);
    console.log(currentProduct);
    console.log(this.formcreateProduct);
  
    this.formcreateProduct.setValue({
      pno: currentProduct.pno,
      pcategory: currentProduct.pcategory,
      pmodelname: currentProduct.pmodelname,
      pheight: currentProduct.pheight,
      pweight: currentProduct.pweight,
      pwidth: currentProduct.pwidth
    });
  
    this.productDialog = true;
  }
  
  onUpdateClicked() {
    const updatedProduct = this.formcreateProduct.value; // Get the updated form values
  
    this.productService.updateProduct(updatedProduct.pno, updatedProduct).subscribe(
      () => {
        this.productDialog = false;
        this.fetchAllProducts();
      },
      error => {
        console.log('PUT API error:', error);
      }
    );
  }
  
  
  


}
