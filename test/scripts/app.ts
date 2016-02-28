import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";

import {CountryCmp} from "./components/country";

@Component({
  selector: "my-app",
  template: `
  <h1>Example App</h1>
  <ul>
    <li><lc-country name="Japan"></lc-country></li>
    <li><lc-country name="USA"></lc-country></li>
  </ul>
  `,
  directives: [CountryCmp]
})
export class MyApp {
}

export function main() {
  bootstrap(MyApp, []);
}
