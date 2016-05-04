import {Component, Input} from "@angular/core";

@Component({
  selector: "lc-city",
  template: `<p>{{name}}</p>`
})
export class CityCmp {
  @Input() name:string;
}
