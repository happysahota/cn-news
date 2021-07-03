import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsboardComponent } from './newsboard.component';

const routes: Routes = [
    {
        path: '',
        component: NewsboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewsboardRoutingModule { }
