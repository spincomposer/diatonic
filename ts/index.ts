
module TypeScriptGreeter {

    "use strict";
    export module Application {

        let current = 0;

        export function initialize() {
            document.addEventListener('deviceready', onDeviceReady.bind(this), false);
        }

        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);

            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            // var element = document.getElementById('geo');
            // element.addEventListener('click', onClick.bind(this), false);

            var positions = 12;
            var currentPosition = 1;

            var chart = document.querySelector('chart');
            var btn = <HTMLButtonElement> document.querySelector('button');
            btn.onclick = () => {
                
                chart.classList.remove('position-' + currentPosition);
                
                currentPosition = (currentPosition == 12) 
                    ? 1 
                    : currentPosition + 1;
                
                chart.classList.add('position-' + currentPosition);
            }
        }

        function createUser(loc: any) {
           
        }

        function showGreeter(person: any) {
            // var element = document.getElementById('hello');
            // element.textContent = "Hello, " + person.firstname + " " + person.lastname + " @latitude: " + person.latitude;
        }

        function onClick(args: any) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 3000 });
        }

        function onSuccess(position: any) {
            createUser(position.coords.latitude);
            console.log("found location data");
        }

        function onError(err: any) {
            createUser("no location data");
            console.log("location data not available");
        }

        function onPause() {
            // TODO: This application has been suspended. Save application state here.
        }

        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
        }
    }

    window.onload = () => {
        Application.initialize();
    }
}
