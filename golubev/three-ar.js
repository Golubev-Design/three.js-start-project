function ThreeAR(camera, updateFrame) {
  let isTrace = false;
  let DeviceOrientationControls = {};

  initAR();
  function initAR() {
    orientation();
  }

  this.trace = function() {
    isTrace = true;
  };

  function orientation() {
    DeviceOrientationControls = new THREE.DeviceOrientationControls( camera );
    updateFrame.addEvent(DeviceOrientationControls.update);

		// Get event data
		function compass(event) {
			var alpha    = event.alpha; //z axis rotation [0,360)
			//Check if absolute values have been sent
			if (typeof event.webkitCompassHeading !== "undefined") {
				alpha = event.webkitCompassHeading; //iOS non-standard
				var heading = alpha
				document.getElementById("logs").innerHTML = heading.toFixed([0]);
			}
			else {
				alert("Your device is reporting relative alpha values, so this compass won't point north :(");
				var heading = 360 - alpha; //heading [0, 360)
				document.getElementById("logs").innerHTML = heading.toFixed([0]);
			}
		}

		// Check if device can provide absolute orientation data
		if (window.DeviceOrientationAbsoluteEvent) {
			window.addEventListener("DeviceOrientationAbsoluteEvent", compass);
		} // If not, check if the device sends any orientation data
		else if(window.DeviceOrientationEvent){
			window.addEventListener("deviceorientation", compass);
		} // Send an alert if the device isn't compatible
		else {
			alert("Sorry, try again on a compatible mobile device!");
		}
  }
}
