"use strict";
const mraa = require("mraa");
const http = require('http');
const fs = require('fs');

function emitEvent() {
  var options = {
    port: '8000',
    method: 'POST',
    path: '/',
    host: 'http://127.0.0.1',
    headers: {
      'Content-Length': 0
    }
  } 

  const req = http.request(options);
  req.end();
}

var sensor = new mraa.Gpio(3);
sensor.dir(mraa.DIR_IN);

var currentState = sensor.read();

function statusCheck() {
	var sensorValue = sensor.read();
	if (currentState !== sensorValue) {
		currentState = sensorValue;
		emitEvent();
	}
}

setInterval(function() {
	statusCheck();	
}, 0.01);
