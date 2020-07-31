import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { StateService } from '../state/state.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private router: Router, private stateService: StateService) { }

  login(data){
    const url = `${environment.apiUrl}user/login`;
    this.httpClient.post(url, data).subscribe((response: any) => {
      if (response.result === 0) {
        this.stateService.authorization = response.data.token;
        this.router.navigate(['private']);
      }
    });
  }

  logout(){
    const url = `${environment.apiUrl}user/logout`;
    this.httpClient.get(url).subscribe((response: any) => {
      if (response.result === 0) {
        this.stateService.authorization = null;
        this.router.navigate(['login']);
      }
    });
  }

  register(data){
    const url = `${environment.apiUrl}user`;
    return this.httpClient.post(url, data);
  }

  current(){
    const url = `${environment.apiUrl}user/current`;
    return this.httpClient.get(url);
  }
}
