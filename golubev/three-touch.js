function threeTouch(camera, canvas) {
	this.camera = camera;
	this.canvas = canvas;

	this.dispose = function () {
		canvas.addEventListener( 'touchstart', onTouchStart, false );
		canvas.addEventListener( 'touchend', onTouchEnd, false );
		canvas.addEventListener( 'touchmove', onTouchMove, false );
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
