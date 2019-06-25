function threeTouch(camera, canvas) {
	this.camera = camera;
	this.canvas = canvas;

	this.dispose = function () {
		canvas.domElement.addEventListener( 'touchstart', onTouchStart, false );
		canvas.domElement.addEventListener( 'touchend', onTouchEnd, false );
		canvas.domElement.addEventListener( 'touchmove', onTouchMove, false );
	};

	function onTouchStart( event ) {
		event.preventDefault();
	}
	function onTouchEnd( event ) {
		event.preventDefault();
	}
	function onTouchMove( event ) {
		event.preventDefault();
	}
}
