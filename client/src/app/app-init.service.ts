import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  public url!: string;
  constructor(private http: HttpClient) {}

  Init(): Promise<any> {
    const promise = this.http
      .get('config/runtime2.json')
      .toPromise()
      .then((data) => {
        Object.assign(this, data);
        return data;
      });
    return promise;
  }
}
