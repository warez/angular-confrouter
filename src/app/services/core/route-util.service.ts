import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteUtilService {

  constructor() { }

  resolveDynamicLink(link: string, params: { [key: string]: string }): string {
    return link.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
      return (params.hasOwnProperty(key)) ?  params[key] : key;
    });
  }
}
