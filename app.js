/**
 * three.js-start-project - Licensed under the MIT license
 * Created By -  https://github.com/Golubev-Design
 * Check repository - https://github.com/Golubev-Design/three.js-start-project
 * ----------------------------------------------
 */

start3DProject();
function start3DProject() {
  var camera, controls, scene, HemisphereLight, SpotLight, renderer, tweenAnimation,
    workSpace = {
      width: '3000',
      height: '3000',
      grid: true,
      gap: '200',
      shadowQuality: '30'
    };
  init();
  light();
  workFlow();
  objects();
  ui();
  animate();
  console.log(scene);

  function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 15000);
    camera.position.set(3000, 2000, 1000);
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1C1C1C);

    renderer = new THREE.WebGLRenderer({
      antialias: true, canvas: canvas, alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  function ui() {
    controls = new THREE.OrbitControls(camera);
    controls.target.set(0, 0, 0);
    controls.update();

    //threeTouch = new ThreeTouch(camera, canvas);
    //threeTouch.dispose();

    stats = new Stats();
    document.body.appendChild(stats.dom);
  }

  function light() {
    HemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 0.5);
    scene.add(HemisphereLight);

    //SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
    SpotLight = new THREE.SpotLight(0xFFFFFF, 2, 3000, 1, 0.5, 1);
    SpotLight.position.set(1000, 1200, 1000);
    SpotLight.castShadow = true;
    SpotLight.shadow.mapSize.width = 1024 * workSpace.shadowQuality;
    SpotLight.shadow.mapSize.height = 1024 * workSpace.shadowQuality;
    SpotLight.target.position.set(0, 0, 0);
    scene.add(SpotLight);
  }

  function workFlow() {
    //Work Grid
    if (workSpace.grid) {
      var workGrid = new THREE.GridHelper(workSpace.width, workSpace.width / workSpace.gap, 0x000000, 0xFFFFFF);
      workGrid.material.opacity = 0.2;
      workGrid.material.transparent = true;
      scene.add(workGrid);
    }

    //Work Plane
    var whiteMaterial = new THREE.MeshPhysicalMaterial({color: 0x2C2C2C});
    whiteMaterial.roughness = 1;
    whiteMaterial.metalness = 0;
    whiteMaterial.reflectivity = 0;
    var workPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(workSpace.width, workSpace.width), whiteMaterial);
    workPlane.rotation.x = -Math.PI / 2;
    workPlane.receiveShadow = true;
    scene.add(workPlane);
  }
  function objects() {
    //Test object
    var testBoxMaterial = new THREE.MeshPhysicalMaterial({color: 0xEEEEEE});
    testBoxMaterial.roughness = 1;
    testBoxMaterial.metalness = 0;
    testBoxMaterial.reflectivity = 0;
    var geometry = new THREE.BoxGeometry(200, 200, 200);
    var testBox = new THREE.Mesh(geometry, testBoxMaterial);
    testBox.castShadow = true;
    testBox.position.set(0, 100, 0);
    scene.add(testBox);

    animateBox(testBox); //TWEEN Animation
  }

  function animateBox(testBox) {
    tweenAnimation = new TWEEN.Tween(testBox.rotation).to({y: testBox.rotation.y + Math.PI}, 6000);
    tweenAnimation.repeat(Infinity);
    tweenAnimation.start();
  }

  function animate() {
    TWEEN.update();
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    renderer.render(scene, camera);
    stats.update();
  }
}
