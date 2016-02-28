///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import "es6-promise";
import "es6-collections";
import "reflect-metadata";
import "zone.js";
import "rxjs/Rx";

import {enableProdMode} from "angular2/core";
import {enableNg2Tree} from "../../index";

const isProd = false;

if (isProd) {
  enableProdMode();
} else {
  enableNg2Tree();
}

import {main} from "./app";

main();
