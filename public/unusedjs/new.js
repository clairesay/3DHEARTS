// Three.js - Align HTML Elements to 3D Globe
// from https://threejsfundamentals.org/threejs/threejs-align-html-elements-to-3d-globe.html


import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/controls/OrbitControls.js';
import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 60;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 10;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2.5;

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 1.2;
  controls.maxDistance = 4;
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#246');

  {
    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://threejsfundamentals.org/threejs/resources/data/world/country-outlines-4k.png', render);
    const geometry = new THREE.SphereBufferGeometry(1, 64, 32);
    const material = new THREE.MeshBasicMaterial({map: texture});
    scene.add(new THREE.Mesh(geometry, material));
  }

  async function loadJSON(url) {
    const req = await fetch(url);
    return req.json();
  }

  let countryInfos;
  async function loadCountryData() {
    countryInfos = await loadJSON('https://threejsfundamentals.org/threejs/resources/data/world/country-info.json');  

    const lonFudge = Math.PI * 1.5;
    const latFudge = Math.PI;
    // these helpers will make it easy to position the boxes
    // We can rotate the lon helper on its Y axis to the longitude
    const lonHelper = new THREE.Object3D();
    // We rotate the latHelper on its X axis to the latitude
    const latHelper = new THREE.Object3D();
    lonHelper.add(latHelper);
    // The position helper moves the object to the edge of the sphere
    const positionHelper = new THREE.Object3D();
    positionHelper.position.z = 1;
    latHelper.add(positionHelper);

    const labelParentElem = document.querySelector('#labels');
    for (const countryInfo of countryInfos) {
      const {lat, lon, min, max, name} = countryInfo;

      // adjust the helpers to point to the latitude and longitude
      lonHelper.rotation.y = THREE.MathUtils.degToRad(lon) + lonFudge;
      latHelper.rotation.x = THREE.MathUtils.degToRad(lat) + latFudge;

      // get the position of the lat/lon
      positionHelper.updateWorldMatrix(true, false);
      const position = new THREE.Vector3();
      positionHelper.getWorldPosition(position);
      countryInfo.position = position;

      // compute the area for each country
      const width = max[0] - min[0];
      const height = max[1] - min[1];
      const area = width * height;
      countryInfo.area = area;

      // add an element for each country
      const elem = document.createElement('div');
      elem.textContent = name;
      labelParentElem.appendChild(elem);
      countryInfo.elem = elem;
    }
    requestRenderIfNotRequested();
  }
  loadCountryData();

  const tempV = new THREE.Vector3();
  const cameraToPoint = new THREE.Vector3();
  const cameraPosition = new THREE.Vector3();
  const normalMatrix = new THREE.Matrix3();

  const settings = {
    minArea: 20,
    maxVisibleDot: -0.2,
  };
  const gui = new GUI({width: 300});
  gui.add(settings, 'minArea', 0, 50).onChange(requestRenderIfNotRequested);
  gui.add(settings, 'maxVisibleDot', -1, 1, 0.01).onChange(requestRenderIfNotRequested);

  function updateLabels() {
    if (!countryInfos) {
      return;
    }

    const large = settings.minArea * settings.minArea;
    // get a matrix that represents a relative orientation of the camera
    normalMatrix.getNormalMatrix(camera.matrixWorldInverse);
    // get the camera's position
    camera.getWorldPosition(cameraPosition);
    for (const countryInfo of countryInfos) {
      const {position, elem, area} = countryInfo;
      // large enough?
      if (area < large) {
        elem.style.display = 'none';
        continue;
      }
///////////////////////////////////////////////////////////////////////////////////////////////////////
      // Orient the position based on the camera's orientation.
      // Since the sphere is at the origin and the sphere is a unit sphere
      // this gives us a camera relative direction vector for the position.
      tempV.copy(position);
      tempV.applyMatrix3(normalMatrix);

      // compute the direction to this position from the camera
      cameraToPoint.copy(position);
      cameraToPoint.applyMatrix4(camera.matrixWorldInverse).normalize();

      // get the dot product of camera relative direction to this position
      // on the globe with the direction from the camera to that point.
      // -1 = facing directly towards the camera
      // 0 = exactly on tangent of the sphere from the camera
      // > 0 = facing away
      const dot = tempV.dot(cameraToPoint);

      // if the orientation is not facing us hide it.
      if (dot > settings.maxVisibleDot) {
        elem.style.display = 'none';
        continue;
      }

      // restore the element to its default display style
      elem.style.display = '';

      // get the normalized screen coordinate of that position
      // x and y will be in the -1 to +1 range with x = -1 being
      // on the left and y = -1 being on the bottom
      tempV.copy(position);
      tempV.project(camera);

      // convert the normalized position to CSS coordinates
      const x = (tempV.x *  .5 + .5) * canvas.clientWidth;
      const y = (tempV.y * -.5 + .5) * canvas.clientHeight;

      // move the elem to that position
      elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;

      // set the zIndex for sorting
      elem.style.zIndex = (-tempV.z * .5 + .5) * 100000 | 0;
    }
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  let renderRequested = false;

  function render() {
    renderRequested = undefined;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    controls.update();

    updateLabels();

    renderer.render(scene, camera);
  }
  render();

  function requestRenderIfNotRequested() {
    if (!renderRequested) {
      renderRequested = true;
      requestAnimationFrame(render);
    }
  }

  controls.addEventListener('change', requestRenderIfNotRequested);
  window.addEventListener('resize', requestRenderIfNotRequested);
}

main();




////////////////////////////////////////////////////////////////////////////////////
switch (step) {
  case 1:
    switch (name){
      case 'Ben':
        tweenView(5.85, 4.28, 12.79, -0.32, 0.41, 0.13);
      break;
      case 'Ayanthi':
        tweenView(3.44, -0.95, 14.6, 0.06, 0.23, -0.01);
      break;
      case 'Amin':
        tweenView(-0.290, 5.940, 13.77, -0.407, -0.019, -0.008);
      break;
      case 'Lucy':
        tweenView(-3.612, 2.099, 14.406, -0.144, -0.243, -0.035);
      break;
      default:
        break
    }
    break;

  case 2:
    switch (name){
      case 'Ben':
        tweenView(12.05, 3.11, 6.33, -0.46, 1.04, 0.40);
      break;
      case 'Ayanthi':
        tweenView(14.8, 2.67, 0.14, -1.52, 1.39, 1.52);
      break;
      case 'Amin':
        tweenView(4.556, 6.515, 12.719, -0.473, 0.308, 0.154);
      break;
      case 'Lucy':
        tweenView(7.354, 7.078, 10.991, -0.572, 0.512, 0.305);
      break;
      default:
        break
    }
    break;

  case 3:
    switch (name){
      case 'Ben':
        tweenView(1.42, -13.87, -6.7, 2.02, 0.09, -2.95);
      break;
      case 'Ayanthi':
        tweenView(-2.32, -12.3, -8.32, 2.17, -0.16, 2.92);
      break;
      case 'Amin':
        tweenView(8.0291, -10.114, -7.630, 2.217, 0.564, -2.524);
      break;
      case 'Lucy':
        tweenView(1.538, -14.774, -2.087, 1.711, 0.102, -2.513);
      break;
      default:
        break
    }
    break;

  case 4:
    switch (name){
      case 'Ben':
        tweenView(0.51, 3.85, 14.1, -0.27, 0.04, 0.01);
      break;
      case 'Ayanthi':
        tweenView(-8.28, 1.33, 12.4, -0.11, -0.58, -0.06);
      break;
      case 'Amin':
        tweenView( -6.220, 3.708, 13.135, -0.275, -0.427, -0.116);
      break;
      case 'Lucy':
        tweenView(-10.341, 10.160, 3.848, -1.208, -0.760, -1.068);
      break;
      default:
        break
    }
    break;

  case 5:
    switch (name){
      case 'Ben':
        tweenView(-4.55, -10.29, 9.46, 0.83, -0.31, 0.32);
      break;
      case 'Ayanthi':
        tweenView(-10.72, -5.84, 8.73, 0.59, -0.80, 0.45);
      break;
      case 'Amin':
        tweenView( -7.848, -11.152, 6.246, 1.060, -0.550, 0.751);
      break;
      case 'Lucy':
        tweenView(-11.618, -5.940, 7.396, 0.676, -0.886, 0.556);
      break;
      default:
        break
    }
    break;

  case 6:
    switch (name){
      case 'Ben':
        tweenView(8.66, -10.58, 7.26, 0.97, 0.59, -0.68);
      break;
      case 'Ayanthi':
        tweenView(13.88, 5.35, 1.91, -1.23, 1.18, 1.20);
      break;
      case 'Amin':
        tweenView(12.896, 5.706, 5.111, -0.840, 1.034, 0.764);
      break;
      case 'Lucy':
        tweenView(9.472, -3.135, 11.199, 0.272, 0.683, -0.175);
      break;
      default:
        break
    }
    break;

  case 7:
    switch (name){
      case 'Ben':
        tweenView(0.29, -9.15, -12.48, 2.51, 0.02, -3.13);
      break;
      case 'Ayanthi':
        tweenView(-0.32, -13.24, -7.05, 2.06, -0.02, 3.10);
      break;
      case 'Amin':
        tweenView(-9.886, 1.323, 11.202, -0.117, -0.719, -0.077);
      break;
      //7 & 8 are the same for Lucy
      case 'Lucy':
        tweenView(10.024, -9.739, -5.442, 2.080, 0.731, -2.267);
      break;
      default:
        break
    }
    break;

  case 8:
    switch (name){
      case 'Ben':
        tweenView(4.65, 4.19, -13.16, -2.83, 0.32, 3.04);
      break;
      case 'Ayanthi':
        tweenView(-5.55, 3.44, -13.51, -2.89, -0.38, -3.05);
      break;
      case 'Amin':
        tweenView( -1.939, 0.798, -14.852, -3.087, -0.129, -3.134);
      break;
      case 'Lucy':
        tweenView(10.024, -9.739, -5.442, 2.080, 0.731, -2.267);
      break;
      default:
        break
    }
    break;
    
  case 9:
    switch (name){
      case 'Lucy':
        tweenView(9.055, -3.204, -11.519, 2.870, 0.648, -2.975);
      break;
      default:
        break
    }
    break;
  default: 
    break;
}

///////////////////////////////////////////////
switch(name) {
  case "Ben":
      switch (step) {
          case 1:
              tweenView(5.85, 4.28, 12.79, -0.32, 0.41, 0.13);
              baseNumber = 0;
              break;
          case 2:
              tweenView(12.05, 3.11, 6.33, -0.46, 1.04, 0.40);
              baseNumber = 2;
              break;
          case 3:
              tweenView(1.42, -13.87, -6.7, 2.02, 0.09, -2.95);
              baseNumber = 3
              break;
          case 4:
              tweenView(0.51, 3.85, 14.1, -0.27, 0.04, 0.01);
              baseNumber = 6;
              break;
          case 5:
              tweenView(-4.55, -10.29, 9.46, 0.83, -0.31, 0.32);
              baseNumber = 6;
              break;
          case 6:
              tweenView(8.66, -10.58, 7.26, 0.97, 0.59, -0.68);
              break;
          case 7:
              tweenView(0.29, -9.15, -12.48, 2.51, 0.02, -3.13);
              break;
          case 8:
              tweenView(4.65, 4.19, -13.16, -2.83, 0.32, 3.04);
              break;
          default:
              break;
      }
      break;
  case "Ayanthi":
      switch (step) {
          case 1:
              tweenView(3.44, -0.95, 14.6, 0.06, 0.23, -0.01)
              break
          case 2:
              tweenView(14.8, 2.67, 0.14, -1.52, 1.39, 1.52)
              break
          case 3:
              tweenView(-2.32, -12.3, -8.32, 2.17, -0.16, 2.92)
              break
          case 4:
              tweenView(-8.28, 1.33, 12.4, -0.11, -0.58, -0.06)
              break
          case 5:
              //tweenView(-8.04, 1.37, 12.6, -0.11, -0.57, -0.06)
              tweenView(-10.72, -5.84, 8.73, 0.59, -0.80, 0.45)
              break
          case 6:
              tweenView(13.88, 5.35, 1.91, -1.23, 1.18, 1.20)
              break
          case 7:
              tweenView(-0.32, -13.24, -7.05, 2.06, -0.02, 3.10)
              break
          case 8:
              tweenView(-5.55, 3.44, -13.51, -2.89, -0.38, -3.05)
              break
          default:
              break
      }
      break

  case "Amin":
      switch (step) {
          case 1:
              tweenView(-0.290, 5.940, 13.77, -0.407, -0.019, -0.008)
              break
          case 2:
              tweenView(4.556, 6.515, 12.719, -0.473, 0.308, 0.154)
              break
          case 3:
              tweenView(8.0291, -10.114, -7.630, 2.217, 0.564, -2.524)
              break
          case 4:
              tweenView( -6.220, 3.708, 13.135, -0.275, -0.427, -0.116)
              break
          case 5:
              tweenView( -7.848, -11.152, 6.246, 1.060, -0.550, 0.751)
              break
          case 6:
              tweenView(12.896, 5.706, 5.111, -0.840, 1.034, 0.764)
              break
          case 7:
              tweenView(-9.886, 1.323, 11.202, -0.117, -0.719, -0.077)
              break
          case 8:
              tweenView( -1.939, 0.798, -14.852, -3.087, -0.129, -3.134)
              break
          default:
              break
      }
      break

  case "Lucy":
      switch (step) {
          case 1:
              tweenView(-3.612, 2.099, 14.406, -0.144, -0.243, -0.035)
              break
          case 2:
              tweenView(7.354, 7.078, 10.991, -0.572, 0.512, 0.305)
              break
          case 3:
              tweenView(1.538, -14.774, -2.087, 1.711, 0.102, -2.513)
              break
          case 4:
              tweenView(-10.341, 10.160, 3.848, -1.208, -0.760, -1.068)
              break
          case 5:
              tweenView(-11.618, -5.940, 7.396, 0.676, -0.886, 0.556)
              break
          case 6:
              tweenView(9.472, -3.135, 11.199, 0.272, 0.683, -0.175)
              break
          //7 & 8 are the same
          case 7:
              tweenView(10.024, -9.739, -5.442, 2.080, 0.731, -2.267)
              break
          case 8:
              tweenView(10.024, -9.739, -5.442, 2.080, 0.731, -2.267)
              break
          case 9:
              tweenView(9.055, -3.204, -11.519, 2.870, 0.648, -2.975)
              break
          default:
              break
      }
      break
  default:
      break
}