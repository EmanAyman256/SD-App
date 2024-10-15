import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
    baseUrl=environment.apiUrl
   userToken=localStorage.getItem("token")
   constructor(private http:HttpClient,private auth:AuthService) {
  }
   headers=new HttpHeaders({
    "Authorization":`Bearer eyJraWQiOiJYamJTSkJ3Wm9xVDhZMENYOElabFhrdkpBRm8iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJlbWFuYXltYW4yNTZAZ21haWwuY29tIiwiYXBwX3RpZCI6IjBkMzU2MGFjLTEzNTUtNGEwNS04NDU3LWE0YjJiNGI1YzY4ZiIsImlzcyI6Imh0dHBzOi8vYWppMjZ1ZmNzLnRyaWFsLWFjY291bnRzLm9uZGVtYW5kLmNvbSIsImdpdmVuX25hbWUiOiJzYWplZCIsImF1ZCI6IjYyM2E2MjI3LThjZGUtNDI0YS05ZDAzLWVlNWZlOGY2YmFiYSIsInNjaW1faWQiOiJlMjA4ZjYzYi0xNGZiLTRjMWYtYjQ2NC1kMGNlZmI0ZDVmNzYiLCJ1c2VyX3V1aWQiOiJlMjA4ZjYzYi0xNGZiLTRjMWYtYjQ2NC1kMGNlZmI0ZDVmNzYiLCJ6b25lX3V1aWQiOiIwZDM1NjBhYy0xMzU1LTRhMDUtODQ1Ny1hNGIyYjRiNWM2OGYiLCJleHAiOjE3MjkwMTk3NjEsImlhdCI6MTcyOTAxNjE2MSwiZmFtaWx5X25hbWUiOiJheW1hbiIsImp0aSI6ImI1NmI2ZmE0LTUzZTEtNDA0Ny05OThlLTBlOTgyOWVkMzUzNSIsImVtYWlsIjoiZW1hbmF5bWFuMjU2QGdtYWlsLmNvbSJ9.SwgsUwRGcIwaxps70pgHQ6mL1JAa-qNrwgOtDl2gMSSaX9DwCgfeH8PaJb0p8UCf1h3EH_c_rE1bx5qn4PN_4ZZLT2Wjmna41DyqOSUPQcqvPaQ9hO2JTvOBPSFKqILpQGnn2e0xLZAxXv_0QmXUmmqR7cF3QDN3pGq0VhEwOlSuIgAacoQ21IwiZrKM3kU9edFpjpaEox_P8U8ITQZoo0dBdgv1P-0uFF43mpKLmryiv4bpaeX79BJh2HbWL8kpi1uFsG3PoGqNA89tnNGjvHsZ5eIFYUMHK4NMdTfd9YmMZR2ktLgNxnLEi72GSUtAUF_Slq7qVNd3H8d8TmSyrABdFPO9BUCmBKQQbeVyoyp1-WUeibZnkPreXUQpwauczhJ6kW1iBoGbpXDQdb3lr-vPqqYPhTlSa6jzMl7hav4a4402yMMIzAEdk2TYvyMINouVenDhkvZuIg88QS58pltSwr3IJLi8tebe8hPcBH8HiD5vWUpB1lCsypW924KJ55Tc3s1CMD-lNx9y3RaAAybaA-DMm0Kdt8Uf5mdoOcxa8un_gr9VzxPbwx9vVzsi75usLn7nl7zwNO0wtHpkAOQ6af7I3-iwRwkPLCSlUyp2S0zuWE_gq4Aby0JCGqX1VzqoUpAzw2uCcdl549DV3aSe6gy9u9w50IHoma6GtPw `,
    'Content-Type': 'application/json',
  })
  //Main-Items
  getMainItems<T>( ):Observable<T>{

    return this.http.get<T>(`${this.baseUrl}/mainitems`,{headers:this.headers})
  }
  getMainItemByID<T>(id:number):Observable<T>{
 
    return this.http.get<T>(`${this.baseUrl}/mainitems/${id}`,{headers:this.headers})
  }
  postMaintItem<T>(item:any):Observable<T>{
   
     return this.http.post<T>(`${this.baseUrl}/mainitems`,item,{headers:this.headers})
  }
  patchMainItem<T>(id:number,body: any):Observable<T>{
  
   return this.http.put<T>(`${this.baseUrl}/mainitems/${id}`,body,{headers:this.headers})
  }
  deleteMainItem<T>(id: number):Observable<T>{

    return this.http.delete<T>(`${this.baseUrl}/mainitems/${id}`,{headers:this.headers});
  }
  //Sub-Items
  getSubItems<T>():Observable<T>{
    
    return this.http.get<T>(`${this.baseUrl}/subitems`,{headers:this.headers})
  }

  getSubItemByID<T>(id:number):Observable<T>{
  
    return this.http.get<T>(`${this.baseUrl}/subitems/${id}`,{headers:this.headers})
  }
  postSubItems<T>(item:any,id:number ):Observable<T>{
  
    return this.http.post<T>(`${this.baseUrl}/subitems`,item,{headers:this.headers})
  }
  updateSubItems<T>(item:any,id:number):Observable<T>{

    return this.http.put<T>(`${this.baseUrl}/subitems`,item,{headers:this.headers})
  }
  deleteSubItems<T>(id: number):Observable<T>{
   
    return this.http.delete<T>(`${this.baseUrl}/subitems/${id}`,{headers:this.headers});
  }
  getServices<T>():Observable<T>
  {
  
    return this.http.get<T>(`${this.baseUrl}/servicenumbers`,{headers:this.headers})
  }
  getFormula<T>():Observable<T>
  {

  return this.http.get<T>(`${this.baseUrl}/formulas`,{headers:this.headers})
  }
  getCurrency<T>() :Observable<T>
  {
   
    return this.http.get<T>(`${this.baseUrl}/currencies`,{headers:this.headers})
  }
  putFormula<T>( id: number, body: any):Observable<T>{

    return  this.http.put<T>(`${this.baseUrl}/${id}`, body,{headers:this.headers});

  }
  patchFormula<T>( id: number,body: any): Observable<T> {
   
    return this.http.patch<T>(`${this.baseUrl}/${id}`, body,{headers:this.headers});
  }
}

