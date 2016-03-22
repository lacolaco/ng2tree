///<reference path="../node_modules/angular2/typings/browser.d.ts"/>

import "angular2-browserify-deps";

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
