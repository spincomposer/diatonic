(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var TypeScriptGreeter;
(function (TypeScriptGreeter) {
    "use strict";
    var Application;
    (function (Application) {
        var current = 0;
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady.bind(this), false);
        }
        Application.initialize = initialize;
        function onDeviceReady() {
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            var positions = 12;
            var currentPosition = 1;
            var chart = document.querySelector('chart');
            var btn = document.querySelector('button');
            btn.onclick = function () {
                chart.classList.remove('position-' + currentPosition);
                currentPosition = (currentPosition == 12)
                    ? 1
                    : currentPosition + 1;
                chart.classList.add('position-' + currentPosition);
            };
        }
        function createUser(loc) {
        }
        function showGreeter(person) {
        }
        function onClick(args) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 3000 });
        }
        function onSuccess(position) {
            createUser(position.coords.latitude);
            console.log("found location data");
        }
        function onError(err) {
            createUser("no location data");
            console.log("location data not available");
        }
        function onPause() {
        }
        function onResume() {
        }
    })(Application = TypeScriptGreeter.Application || (TypeScriptGreeter.Application = {}));
    window.onload = function () {
        Application.initialize();
    };
})(TypeScriptGreeter || (TypeScriptGreeter = {}));

},{}]},{},[1])


//# sourceMappingURL=app.js.map
