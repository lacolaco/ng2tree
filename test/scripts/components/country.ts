import {Component, Input} from "angular2/core";

import {CityCmp} from "./city";

@Component({
  selector: "lc-country",
  template: `
  <h3>{{name}}</h3>
  <ul>
    <li *ngFor="#c of cities;">
      <lc-city [name]="c"></lc-city>
    </li>
  </ul>
  `,
  directives: [CityCmp]
})
export class CountryCmp {
  @Input() name:string;

  cities:string[];

  ngOnInit() {
    this.cities = cityData[this.name];
  }
}

const cityData:any = {
  "Japan": ["Tokyo", "Osaka", "Fukuoka"],
  "USA": ["New York", "San Francisco"]
};
