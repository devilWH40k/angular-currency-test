import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private authEncidedString = btoa(`${env.apiID}:${env.apiKey}`);
  private headers = new HttpHeaders().set(
    'Authorization',
    `Basic ${this.authEncidedString}`
  );

  constructor(private http: HttpClient) {}

  fetchUsdEurInUan(): Observable<any>{
    const headers = this.headers;

    return this.http.get(
      `${env.apiUrl}/convert_to.json/?from=USD,EUR&to=UAH&inverse=true&decimal_places=2`,
      { headers }
    );
  }

  fetchConvertedAmount(currFrom: string, currTo: string, amount: string): Observable<any>{
    const headers = this.headers;

    return this.http.get(
      `${env.apiUrl}/convert_from.json/?from=${currFrom}&to=${currTo}&decimal_places=2&amount=${amount}`,
      { headers }
    );
  }
}
