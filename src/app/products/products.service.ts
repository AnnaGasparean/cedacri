// products.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as xml2js from 'xml2js';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  private parseXmlToJson(xmlString: string): any {
    const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
    let jsonData: any;
    parser.parseString(xmlString, (error, result) => {
      if (error) {
        console.error('Error parsing XML:', error);
      } else {
        jsonData = result;
      }
    });
    return jsonData;
  }

  getProductsByGender(gender: string): Observable<Product[]> {
    const path = `assets/${gender}.xml`;
    return this.http.get(path, { responseType: 'text' })
      .pipe(
        map(data => this.parseXmlToJson(data)?.[`${gender}Products`]?.product || [])
      );
  }
}
