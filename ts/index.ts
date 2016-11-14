interface WindowX extends Window {
    Diatonic?: any;
}


export namespace Diatonic {

    export enum SwipeDirection { UP, DOWN, LEFT, RIGHT }

    export class TouchController {
       
       private static lastX: number = 0;

       public static onTouchStart(ev: TouchEvent) {
            
            TouchController.lastX = ev.touches[0].clientX; 
            console.log(TouchController.lastX);
        }

        public static onTouchEnd(ev: TouchEvent) {
            
            var currentX: number = ev.changedTouches[0].clientX;
            console.log(currentX);

            if (currentX > TouchController.lastX && (currentX - TouchController.lastX) > 100) {
                TouchController.onSwipe(SwipeDirection.RIGHT);
            }

            if (currentX < TouchController.lastX && (TouchController.lastX - currentX) > 100) {
                TouchController.onSwipe(SwipeDirection.LEFT);
            }
        }

        public static onSwipe(direction: SwipeDirection) { Wheel.rotate(direction) }
    }

    export class Controls {

        private static btnLeft: HTMLButtonElement;

        private static btnRight: HTMLButtonElement;

        public static init() {
            
            Controls.btnLeft = <HTMLButtonElement> document.querySelector('button.left');
            Controls.btnRight = <HTMLButtonElement> document.querySelector('button.right');

            Controls.btnLeft.onclick = () => { Wheel.rotate(SwipeDirection.LEFT) }
            Controls.btnRight.onclick = () => { Wheel.rotate(SwipeDirection.RIGHT) }
        }
    }

    export class Wheel {

        private static positions: number = 12;

        private static currentPosition: number = 1;

        private static chart: HTMLElement;

        private static _animate: boolean = false;

        private static get animate(): boolean {

            return Wheel._animate;
        }

        private static set animate(state: boolean) {
            
            Wheel._animate = state;
            
            if (Wheel._animate) Wheel.chart.classList.add('animate');
            else Wheel.chart.classList.remove('animate');
        }

        public static init() {

            Wheel.chart = <HTMLElement>document.querySelector('chart');
            Wheel.chart.classList.add('animate');

            Wheel.chart.addEventListener('transitionend', Wheel.reset);
        }

        public static reset() {

        
            Wheel.animate = false;
            Wheel.chart.classList.remove('position-0');
            Wheel.chart.classList.remove('position-13');
            Wheel.animate = true;
        }

        public static rotate(direction: SwipeDirection) {

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
        }
    }

    export class App {

        public static initialize() {
    
            document.addEventListener('deviceready', App.onDeviceReady.bind(this), false);
            
            Controls.init();
            Wheel.init();
        }
        
        public static  onDeviceReady() {

            // Handle the Cordova pause and resume events
            document.addEventListener('pause', App.onPause, false);
            document.addEventListener('resume', App.onResume, false);
            document.addEventListener('touchstart', TouchController.onTouchStart, false);
            document.addEventListener('touchend', TouchController.onTouchEnd, false);

            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            // var element = document.getElementById('geo');
            // element.addEventListener('click', onClick.bind(this), false);
        }

        public static onPause() {
            // TODO: This application has been suspended. Save application state here.
        }

        public static onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }
    }

    window.onload = () => { App.initialize(); (<WindowX>window).Diatonic = Diatonic; }
}
