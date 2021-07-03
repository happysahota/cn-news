import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@shared/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'newsboard',
    },
    {
        path: 'newsboard',
        loadChildren: () => import('./newsboard/newsboard.module').then(m => m.NewsboardModule)
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
