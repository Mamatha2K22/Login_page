import { Routes } from '@angular/router';
import { Login } from './Pages/login/login';
import {  Dashboard } from './Pages/dashboard/dashboard';
import { aPIResolver } from './Pages/api-resolver';
import { Home } from './Pages/home/home';





import { FormatFieldPipe } from './Pages/format-field-pipe';





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
    },
    
    
    
    
    

    

    
];
