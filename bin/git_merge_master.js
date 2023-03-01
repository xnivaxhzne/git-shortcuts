#! /usr/bin/env node
import runCommand from "./../utils/run_command.js";

runCommand("git", ["merge", "origin", "master"]);
