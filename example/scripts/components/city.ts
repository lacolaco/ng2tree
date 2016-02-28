import {Component, Input} from "angular2/core";

@Component({
  selector: "lc-city",
  template: `<p>{{name}}</p>`
})
export class CityCmp {
  @Input() name:string;
}
