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
    window.addEventListener("deviceorientation", event=>{alert(event.webkitCompassHeading)});
  }
}
