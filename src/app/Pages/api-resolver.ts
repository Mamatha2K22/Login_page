import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiService } from './api-service/api-service';


export const aPIResolver: ResolveFn<any[]> = () => {
  console.log("Rsolve is Running");
  const apiservice = inject(ApiService);
  
  return apiservice.findall();
};
