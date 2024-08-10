import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(`http://localhost:8080/api/post/retrieveallPOST`);
  }

  addPost(postData: any): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/post/addPOST',
      postData
    );
  }


  deletePost(id: any) {
    return this.http.delete(
      'http://localhost:8080/api/post/deletePost/' + id
    );
  }

  updatePost(id: any, postData: any): Observable<any> {
    return this.http.put(
      `http://localhost:8080/api/post/EditPost/${id}`,
      postData
    );
  }

  getPostById(id: any) {
    return this.http.get(
      `http://localhost:8080/api/post/retrievePost/${id}`
    );
  }


  public addFile(formData:FormData,id:any): Observable<any>{
   
    return this.http.post(`http://localhost:8080/api/post/AddPostFile/${id}`,formData, {  reportProgress :true, observe:'events'});
  }
  public retrieveFile(id:any):Observable<Blob>{
    
    const headers = new HttpHeaders().set('Accept', 'application/octet-stream');
    return this.http.get(`http://localhost:8080/api/post/retrieveFile/${id}`,
      { headers : headers,
               responseType: 'blob'
        });
  }

  SearchPosts(word: any) {
    return this.http.get(
      `http://localhost:8080/api/post/SearchPosts/${word}`
    );
  }

}
