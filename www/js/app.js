(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Diatonic;
(function (Diatonic) {
    (function (SwipeDirection) {
        SwipeDirection[SwipeDirection["UP"] = 0] = "UP";
        SwipeDirection[SwipeDirection["DOWN"] = 1] = "DOWN";
        SwipeDirection[SwipeDirection["LEFT"] = 2] = "LEFT";
        SwipeDirection[SwipeDirection["RIGHT"] = 3] = "RIGHT";
    })(Diatonic.SwipeDirection || (Diatonic.SwipeDirection = {}));
    var SwipeDirection = Diatonic.SwipeDirection;
    var TouchController = (function () {
        function TouchController() {
        }
        TouchController.onTouchStart = function (ev) {
            TouchController.lastX = ev.touches[0].clientX;
            console.log(TouchController.lastX);
        };
        TouchController.onTouchEnd = function (ev) {
            var currentX = ev.changedTouches[0].clientX;
            console.log(currentX);
            if (currentX > TouchController.lastX && (currentX - TouchController.lastX) > 100) {
                TouchController.onSwipe(SwipeDirection.RIGHT);
            }
            if (currentX < TouchController.lastX && (TouchController.lastX - currentX) > 100) {
                TouchController.onSwipe(SwipeDirection.LEFT);
            }
        };
        TouchController.onSwipe = function (direction) { Wheel.rotate(direction); };
        TouchController.lastX = 0;
        return TouchController;
    })();
    Diatonic.TouchController = TouchController;
    var Controls = (function () {
        function Controls() {
        }
        Controls.init = function () {
            Controls.btnLeft = document.querySelector('button.left');
            Controls.btnRight = document.querySelector('button.right');
            Controls.btnLeft.onclick = function () { Wheel.rotate(SwipeDirection.LEFT); };
            Controls.btnRight.onclick = function () { Wheel.rotate(SwipeDirection.RIGHT); };
        };
        return Controls;
    })();
    Diatonic.Controls = Controls;
    var Wheel = (function () {
        function Wheel() {
        }
        Object.defineProperty(Wheel, "animate", {
            get: function () {
                return Wheel._animate;
            },
            set: function (state) {
                Wheel._animate = state;
                if (Wheel._animate)
                    Wheel.chart.classList.add('animate');
                else
                    Wheel.chart.classList.remove('animate');
            },
            enumerable: true,
            configurable: true
        });
        Wheel.init = function () {
            Wheel.chart = document.querySelector('chart');
            Wheel.chart.classList.add('animate');
            Wheel.chart.addEventListener('transitionend', Wheel.reset);
        };
        Wheel.reset = function () {
            Wheel.animate = false;
            Wheel.chart.classList.remove('position-0');
            Wheel.chart.classList.remove('position-13');
            Wheel.animate = true;
        };
        Wheel.rotate = function (direction) {
            Wheel.chart.classList.remove('position-' + Wheel.currentPosition);
            console.log("Moving from position: " + Wheel.currentPosition);
            switch (direction) {
                case SwipeDirection.LEFT:
                    if (Wheel.currentPosition == 1) {
                        Wheel.animate = false;
                        Wheel.chart.classList.add('position-0');
                        Wheel.animate = true;
                        Wheel.currentPosition = 12;
                    }
                    else {
                        Wheel.currentPosition--;
                    }
                    break;
                case SwipeDirection.RIGHT:
                    if (Wheel.currentPosition == 12) {
                        Wheel.animate = false;
                        Wheel.chart.classList.add('position-13');
                        Wheel.animate = true;
                        Wheel.currentPosition = 1;
                    }
                    else {
                        Wheel.currentPosition++;
                    }
            }
            console.log("to position: " + Wheel.currentPosition);
            Wheel.chart.classList.add('position-' + Wheel.currentPosition);
        };
        Wheel.positions = 12;
        Wheel.currentPosition = 1;
        Wheel._animate = false;
        return Wheel;
    })();
    Diatonic.Wheel = Wheel;
    var App = (function () {
        function App() {
        }
        App.initialize = function () {
            document.addEventListener('deviceready', App.onDeviceReady.bind(this), false);
            Controls.init();
            Wheel.init();
        };
        App.onDeviceReady = function () {
            document.addEventListener('pause', App.onPause, false);
            document.addEventListener('resume', App.onResume, false);
            document.addEventListener('touchstart', TouchController.onTouchStart, false);
            document.addEventListener('touchend', TouchController.onTouchEnd, false);
        };
        App.onPause = function () {
        };
        App.onResume = function () {
        };
        return App;
    })();
    Diatonic.App = App;
    window.onload = function () { App.initialize(); window.Diatonic = Diatonic; };
})(Diatonic = exports.Diatonic || (exports.Diatonic = {}));

},{}]},{},[1])


//# sourceMappingURL=app.js.map
