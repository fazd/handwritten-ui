import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private API_URL: "https://api.github.com/users/mapbox";
  private BASE_HEADER = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(
    private http: HttpClient,
  ) { }

  post(body) {
    //console.log('this is the result', this.utilsService.objectToFormData(body));
    return this.http.post(
      this.API_URL,body,{
        headers: this.BASE_HEADER
      },
    );
  }

  get() {
    const conf: any = {
      headers: this.BASE_HEADER
    };
    conf.responseType =  'json';
    return this.http.get(
      this.API_URL,
      conf
    );
  }




}
