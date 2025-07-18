import { Routes } from '@angular/router';
import { Login } from './Pages/login/login';
import {  Dashboard } from './Pages/dashboard/dashboard';
import { aPIResolver } from './Pages/api-resolver';
import { Home } from './Pages/home/home';

import { PipeMask } from './Pages/pipe-mask/pipe-mask';



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
        path:'pipemask',
        component:PipeMask
        
    },
    {
        path:'home',
        component:Home,
        resolve:{
            preload: aPIResolver
        }
    },

    {
        path:'dashboard',
        component:Dashboard,
        resolve: {
            preload: aPIResolver
        }
    }

    

    

    
];
