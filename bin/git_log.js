#! /usr/bin/env node
const { runCommand } = require("./../utils/run-command");

runCommand("git", ["log"]);
