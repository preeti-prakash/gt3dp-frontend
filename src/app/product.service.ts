import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  //add new product
  addProduct(url: string, requestBody: any):Observable<any>{
    return this.http.post(url, requestBody);
  }

  //get all the list of products added
  getProducts():Observable<any>{
    return this.http.get(`http://localhost:8080/products`);
  }

  deleteProduct(id: any){
      return this.http.delete(`http://localhost:8080/products/${id}`);
  }

  updateProduct(id: any, requestBody: any){
    console.log("request body", requestBody);
    return this.http.put(`http://localhost:8080/products/${id}`, requestBody);
  }

  generateBarcode(id: any){
    return this.http.get(`http://localhost:8080/barcode/${id}`);
  }
}
