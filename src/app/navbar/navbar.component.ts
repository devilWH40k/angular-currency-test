import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  data: any;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.currencyService.fetchUsdEurInUan().subscribe((response) => {
      this.data = response.from;
    },)
  }
}
