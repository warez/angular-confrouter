// src/app/services/config.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {Location} from "@angular/common";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  constructor(private http: HttpClient, private location: Location) {}
  public async loadConfig(): Promise<void> {

    const errorFunction = (type: any) => (error: any) => {
      if(!environment.production)
        console.error(error);
      console.warn("Error loading " + type);
      return of(null);
    };

    try {

      //loading remote configuration...

    }  catch (error) {
      console.error('Error loading configuration:', error);
    }

  }
}
