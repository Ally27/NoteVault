const fs = require("fs");
const express = require("express");
const path = require("path");
const util = require("util");

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./Develop/public"));