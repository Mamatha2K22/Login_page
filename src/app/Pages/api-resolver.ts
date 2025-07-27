import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiService } from './api-service/api-service';
import { Post } from './post';
import { map } from 'rxjs';


export const aPIResolver: ResolveFn<{ posts: Post[]; }> = () => {
  console.log("Resolve is Running");
  const apiservice = inject(ApiService);

  return apiservice.getPosts().pipe(
    map(posts => ({ posts })) // Wrap the result in an object
  );
};
