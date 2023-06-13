import { Component } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { debounce } from 'lodash';
import { validateValue } from 'src/helpers/validationHelper';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent {
  selectedCurrency1 = 'UAH';
  selectedCurrency2 = 'USD';
  currencyValue1 = '0';
  currencyValue2 = '0';

  constructor(private currencyService: CurrencyService) {
    this.onInputChangeCurr1 = debounce(this.onInputChangeCurr1, 800);
    this.onInputChangeCurr2 = debounce(this.onInputChangeCurr2, 800);
  }

  onOptionChangeCurr1(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    this.selectedCurrency1 = selectElement.value;

    if (!validateValue(this.currencyValue2) || !validateValue(this.currencyValue1)) return;

    this.currencyService
      .fetchConvertedAmount(
        this.selectedCurrency2,
        this.selectedCurrency1,
        this.currencyValue2
      )
      .subscribe((response) => {
        this.currencyValue1 = response.to[0].mid;
      });
  }

  onOptionChangeCurr2(eventTarget: EventTarget | null) {
    const selectElement = eventTarget as HTMLSelectElement;
    this.selectedCurrency2 = selectElement.value;

    if (!validateValue(this.currencyValue2) || !validateValue(this.currencyValue1)) return;

    this.currencyService
      .fetchConvertedAmount(
        this.selectedCurrency1,
        this.selectedCurrency2,
        this.currencyValue1
      )
      .subscribe((response) => {
        this.currencyValue2 = response.to[0].mid;
      });
  }

  onInputChangeCurr1(eventTarget: EventTarget | null) {
    const inputElement = eventTarget as HTMLSelectElement;
    this.currencyValue1 = inputElement.value;

    if (!validateValue(this.currencyValue1)) return;
    
    this.currencyService
      .fetchConvertedAmount(
        this.selectedCurrency1,
        this.selectedCurrency2,
        this.currencyValue1
      )
      .subscribe((response) => {
        this.currencyValue2 = response.to[0].mid;
      });
  }

  onInputChangeCurr2(eventTarget: EventTarget | null) {
    const inputElement = eventTarget as HTMLSelectElement;
    this.currencyValue2 = inputElement.value;

    if (!validateValue(this.currencyValue2)) return;

    this.currencyService
      .fetchConvertedAmount(
        this.selectedCurrency2,
        this.selectedCurrency1,
        this.currencyValue2
      )
      .subscribe((response) => {
        this.currencyValue1 = response.to[0].mid;
      });
  }
}
