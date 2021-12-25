#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var commander_1 = require("commander");
var package_json_1 = require("../package.json");
var program = new commander_1.Command();
program.version(package_json_1.version).description(package_json_1.description);
