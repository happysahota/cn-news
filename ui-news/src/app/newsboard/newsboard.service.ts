import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiResponse } from '@shared/types/api-response';

@Injectable({
    providedIn: 'root'
})
export class NewsboardService {

    private region: string = 'GB';
    private apiURL = 'http://localhost:3210';
    constructor(private http: HttpClient) { }

    // default parameters set so that from component we don't have to provide all the data when its not required to.
    fetchNews(filter: string = '', region: string = ''): Observable<any> {

        this.region = !!region ? region : this.region;
        const url = `${this.apiURL}/news/fetchAll`;

        return this.http.post(url, {
            "region": this.region,
            "filter": filter
        });
    }

}
