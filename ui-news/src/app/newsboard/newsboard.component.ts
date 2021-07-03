import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiResponse } from '@shared/types/api-response';
import { DataLifeCycle } from '@shared/types/data-lifecycle';
import { Subscription } from 'rxjs';
import { NewsboardService } from './newsboard.service';

@Component({
    selector: 'app-newsboard',
    templateUrl: './newsboard.component.html'
})
export class NewsboardComponent implements OnInit, OnDestroy {

    articles: any = null;
    DataLifeCycle = DataLifeCycle
    filterString: string = '';
    subscriptions = new Subscription;


    lifeCycle: DataLifeCycle = DataLifeCycle.Loading;

    constructor(private newsboardService: NewsboardService) { }

    ngOnInit(): void {

        // calling service without any parameter as to utilize default functionality.
        this.subscriptions.add(this.newsboardService.fetchNews().subscribe((data: ApiResponse) => {
            this.articles = data.articles;
            this.lifeCycle = DataLifeCycle.Loaded;
        }, err => {
            console.error(err);
            this.lifeCycle = DataLifeCycle.LoadingError;
        }));
    }

    updateFilterString(data: any) {

        this.lifeCycle = DataLifeCycle.Loading;
        this.subscriptions.add(this.newsboardService.fetchNews(data, '').subscribe((resp: ApiResponse) => {
            this.articles = resp.articles;
            this.lifeCycle = DataLifeCycle.Loaded;
        }, err => {
            console.error(err);
            this.lifeCycle = DataLifeCycle.LoadingError;
        }));
    }

    openUrl(url: string) {
        window.open(url, '_blank');
    }

    // when component is no longer in use or got destroyed we need to unsubscribe from subscription.
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

}
