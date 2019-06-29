/**
 * @author richt / http://richt.me
 * @author WestLangley / http://github.com/WestLangley
 *
 * W3C Device Orientation control (http://w3c.github.io/deviceorientation/spec-source-orientation.html)
 */

THREE.DeviceOrientationControls = function ( object ) {

	var scope = this;

	this.object = object;
	this.object.rotation.reorder( 'YXZ' );

	this.enabled = true;

	this.deviceOrientation = {};
	this.screenOrientation = 0;

	this.alphaOffset = 0; // radians

	let alphaCallback;
	this.alphaCallback = function (callback) {
		alphaCallback = callback;
	};

	var onDeviceOrientationChangeEvent = function ( event ) {

		scope.deviceOrientation = event;

	};

	var onScreenOrientationChangeEvent = function () {

		scope.screenOrientation = window.orientation || 0;

	};

	// The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

	var setObjectQuaternion = function () {

		var zee = new THREE.Vector3( 0, 0, 1 );

		var euler = new THREE.Euler();

		var q0 = new THREE.Quaternion();

		var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

		return function ( quaternion, alpha, beta, gamma, orient ) {

			euler.set( beta, alpha, - gamma, 'YXZ' ); // 'ZXY' for the device, but 'YXZ' for us

			quaternion.setFromEuler( euler ); // orient the device

			quaternion.multiply( q1 ); // camera looks out the back of the device, not the top

			quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) ); // adjust for screen orientation

		};

	}();

	this.connect = function () {

		onScreenOrientationChangeEvent(); // run once on load

		window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

		scope.enabled = true;

	};

	this.disconnect = function () {

		window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );

		scope.enabled = false;

	};

	this.update = function () {
		let lastN = null,
		  lastAlpha = null,
			currentAlpha = 0;

		if ( scope.enabled === false ) return;

		var device = scope.deviceOrientation;

		if ( device ) {

			//var alpha = device.alpha ? THREE.Math.degToRad( device.alpha ) + scope.alphaOffset : 0; // Z
			var alpha = device.alpha ?  THREE.Math.degToRad( compass(device) * -1 ) : 0; // Z

			var beta = device.beta ? THREE.Math.degToRad( device.beta ) : 0; // X'

			var gamma = device.gamma ? THREE.Math.degToRad( device.gamma ) : 0; // Y''

			var orient = scope.screenOrientation ? THREE.Math.degToRad( scope.screenOrientation ) : 0; // O

			setObjectQuaternion( scope.object.quaternion, alpha, beta, gamma, orient );

		}

		function compass(event) {
			var alpha    = event.alpha; //z axis rotation [0,360)
			//Check if absolute values have been sent
			if (typeof event.webkitCompassHeading !== "undefined") {
				alpha = event.webkitCompassHeading; //iOS non-standard
				var heading = alpha;
			}	else {
				//console.log("Your device is reporting relative alpha values, so this compass won't point north :(");
				var heading = 180 + alpha; //heading [0, 360)
			}
			//if (lastN > Math.floor(heading)+100 || lastN < Math.floor(heading)-100 || lastN === null) lastN = Math.floor(heading);

			// let alphaRevers = event.alpha * -1;
			// if ( lastAlpha > Math.floor(alphaRevers) ) {
			// 	lastN = lastN - 1;
			// } else if ( lastAlpha < Math.floor(alphaRevers) ) {
			// 	lastN = lastN + 1;
			// }

			let reversAlpha = 360 - event.alpha;
			if (lastAlpha === null ) {
				lastAlpha = reversAlpha;
				currentAlpha = Math.floor(heading);
			} else {
				let diffAlpha = lastAlpha - reversAlpha;
				currentAlpha += diffAlpha;
				lastAlpha = reversAlpha;
			}
			document.getElementById("logs").innerHTML = 'v2<br>' + heading + '<br>' + reversAlpha + '<br>' + currentAlpha;
			console.log(currentAlpha);

			return currentAlpha;
		}

	};

	this.dispose = function () {

		scope.disconnect();

	};

	this.connect();

};
