import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }
  getRepos(username: string, page: number = 1, pageSize: number = 10){

    return this.httpClient.get(
      `https://api.github.com/users/${username}/repos?per_page=${pageSize}&page=${page}`
    );
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params
}
