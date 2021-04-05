import { map, catchError } from 'rxjs/operators';
import { Product } from './product-model/product.model';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "http://localhost:3001/produtos"

  constructor(private snackBar:MatSnackBar, private http: HttpClient) { }

  showMessage(msg:string, isError: boolean = false) : void{
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError?['msg-error'] : ['msg-success']
    } ) 
  }

create(product: Product):Observable<Product>{
  return this.http.post<Product>(this.baseUrl, product).pipe(
    map(obj => obj),
    catchError(e => this.handleError(e)) 
  );
}

handleError(e: any): Observable<any>{
  this.showMessage('Erro inesperado, servidor fora do ar', true)
  return EMPTY;
}


read(): Observable<Product[]>{
  return this.http.get<Product[]>(this.baseUrl);
}

readById(id: number): Observable<Product> {
  const url = `${this.baseUrl}/${id}`;
  return this.http.get<Product>(url);

}
update(product:Product):Observable<Product>{
  const url = `${this.baseUrl}/${product.id}`;
  return this.http.put<Product>(url, product);
}

delete(id:number): Observable<Product> {
  const url = `${this.baseUrl}/${id}`;
  return this.http.delete<Product>(url);
}


}
