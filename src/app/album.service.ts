import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ialbum } from './album';
import { from, Observable } from 'rxjs';
import { Iuser } from './user';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private  url: string = 'https://jsonplaceholder.typicode.com/photos?albumId=1';

  constructor(private http: HttpClient) { }

  getalbum(): Observable<Ialbum[]>
  {
    
    return this.http.get<Ialbum[]>(this.url);
   }  

   getUserByid(id:number): Observable <Iuser[]>
   {
      return this.http.get<Iuser[]>(`https://jsonplaceholder.typicode.com/posts/${id}`);
   }

 
}
