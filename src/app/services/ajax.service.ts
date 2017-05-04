import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AjaxService {
  constructor(private http: Http){}

  call(url: string){
    return this.http.get(url)
                    .map(( res: Response ) => res.json())
                    .catch((err: any) =>
                      Observable.throw(err.json() || 'Server error')
                    );
  }

}

