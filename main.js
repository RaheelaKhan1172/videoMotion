"use strict";
const mraa = require("mraa");

function emitEvent() {
	console.log("Changes");
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
