import { Routes } from '@angular/router';
import { Login } from './Pages/login/login';
import {  Dashboard } from './Pages/dashboard/dashboard';
import { aPIResolver } from './Pages/api-resolver';



export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch: 'full'
    },
    {
        path:'login',
        component:Login,
        
    },

    {
        path:'dashboard',
        component:Dashboard,
        resolve: {
            preload: aPIResolver
        }
    }

    

    

    
];
