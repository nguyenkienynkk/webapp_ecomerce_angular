import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { enviroment } from '../enviroments';
import { UserResponse } from '../responses/user/user.response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiRegister = `${enviroment.apiBaseUrl}/users/register`;
  private apiLogin = `${enviroment.apiBaseUrl}/users/login`;
  private apiUserDetail = `${enviroment.apiBaseUrl}/users/details`
  private apiConfig = {
    headers: this.createHeaders(),
  };
  constructor(private http: HttpClient) { }
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi',
    });
  }
  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }
  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }
  getUserDetail(token: string) {
    return this.http.post(this.apiUserDetail, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }
  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger
      if(userResponse == null || !userResponse) {
        return;
      }
      //Chuyển response sang json
      const userResponseJSON = JSON.stringify(userResponse);
      //Lưu vào localstorage
      localStorage.setItem('user', userResponseJSON);
      console.log('User response saved to local storage')
    } catch (error) {
      console.log('Error saved user response to local storage:', error)
    }
  }
  getUserResponseToLocalStorage() {
    try {
      //Chuyển response sang json
      const userResponseJSON = localStorage.getItem('user')
      if(userResponseJSON == null || userResponseJSON == undefined) {
        return null;
      }
      const userResponse = JSON.parse(userResponseJSON!)
      console.log('User response retrieved from local storage')
      return userResponse;
    } catch (error) {
      console.log('Error retrieving user response to local storage:', error)
    }
  }

}
