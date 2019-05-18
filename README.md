# three.js-start-project
Optimal starter pack for 3D scene with WebGL and Three.js for Web-project.

Demo: https://golubev-design.github.io/three.js-start-project/

## Uses libs
**Three.js** (r101) - https://github.com/mrdoob/three.js 

**Tween.js** (v16.7.1) - https://github.com/tweenjs/tween.js

## Specification
### Functions
#### init() 
General initiate Three.js `scene`, `camera`, `renderer` (with resize window events) & `controls`.

#### light();
All lights in scene.

* `HemisphereLight` - sunlight, don't supported Shadows.
* `SpotLight` - directional light with Shadows.

Quality shadow change in `workSpace` param `shadowQuality` - 1 to 100 (recommended 30)

#### workFlow()
Plane with Grid gap. For change edit `width` ,`grid` & `gap` in `workSpace`.

#### objects()
Should contain all 3D objects.

#### ui()
Contain stats FPC scene monitor. Should contain all UI elements or controls.

#### animate()
Start render WebGL Scene and TWEEN.update() event (for sync animation frame & render).
  
#### animateBox()
Contain box rotate animation. Recommended use Tween in all animations.
