import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  uri = 'http://localhost:4000/business';
  constructor(private http: HttpClient) { }
  addBusiness(person_name, business_name, business_gst_number) {
    const obj = {
      person_name: person_name,
      business_name: business_name,
      business_gst_number: business_gst_number
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Business added'));
  }
  getBusiness(): Observable<any> {
    return this.http.get(`${this.uri}`);
  }
  //get
  showBusiness(business_name){
    return this.http.get(`${this.uri}/edit/${business_name}`);
  }
  //editar

  
  editBusiness(id,person_name, business_name, business_gst_number):Observable<any>{
    let result: Observable<Object>;
    const obj = {
      person_name: person_name,
      business_name: business_name,
      business_gst_number: business_gst_number
    };
    return result = this.http.post(`${this.uri}/update/${id}`, obj)
    
    
  }
  //eliminar
  deleteBusiness(id): Observable<any>{
    let result: Observable<Object>;
    return result = this.http.get(`${this.uri}/delete/${id}`)
  }
}