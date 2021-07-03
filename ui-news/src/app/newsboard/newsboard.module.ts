import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NewsboardRoutingModule } from './newsboard-routing.module';
import { NewsboardComponent } from './newsboard.component';
import { SearchNewsComponent } from './search-news/search-news.component';

@NgModule({
    declarations: [
        NewsboardComponent,
        SearchNewsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule, 
        ReactiveFormsModule,
        NewsboardRoutingModule
    ],
    exports: [
        FormsModule, 
        ReactiveFormsModule
    ]
})
export class NewsboardModule { }
