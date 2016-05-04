///<reference path="../node_modules/typescript/lib/lib.es6.d.ts"/>

import "reflect-metadata";
import "zone.js/dist/zone";

import {enableProdMode} from "@angular/core";
import {enableNg2Tree} from "../../index";

const isProd = false;

if (isProd) {
  enableProdMode();
} else {
  enableNg2Tree();
}

import {main} from "./app";

main();
