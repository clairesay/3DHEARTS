///////////////////////// SETTING UP THE SCENE /////////////////////////////   
  //establishing the scebe abd background color
  var scene = new THREE.Scene();
  scene.background = new THREE.Color( "rgb(0, 0, 0)" );
  var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 500 );

  //rendering the window and everything in it
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  //Adding Orbit Controls
  var controls = new THREE.OrbitControls( camera, renderer.domElement );

///////////////////////// MODEL LOADER /////////////////////////////
     
    // Loading STL model
  var loader = new THREE.STLLoader()
  loader.load('models/17040.stl', function (geometry) {

    //material of model
    var material = new THREE.MeshStandardMaterial( {
      color: 0xfffeee,
      metalness: 0.1,
      roughness: 0.75,
      shadowSide: THREE.DoubleSide,
    } );

    //combining loaded geometry with material
    var heart = new THREE.Mesh( geometry, material );
    heart.castShadow = true;
    heart.renderOrder = 6;

    //adding heart to the scene
    scene.add(heart);

    //positioning the heart for optimal scale and visibility
    heart.scale.set(0.1, 0.1, 0.1);
    heart.translateX(1.5);
    heart.translateY(111);
    heart.translateZ(-7);
    heart.rotation.x = -1.5;

    //ensuring the camera looks directly at the model
    // camera.lookAt(heart.x, heart.y, heart.z);
  })

  //Grid for reference
  var gridXZ = new THREE.GridHelper(10, 10);
  scene.add(gridXZ);

  //Axes for xyz reference
  var axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );

  //Setting the position of the camera
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 20;
  controls.enableDamping = true;

  //Adding Lights to the Scene
  var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  scene.add( light );

  //Animate and Render
  var animate = function () {
      requestAnimationFrame( animate );
      controls.update();
      renderer.render( scene, camera );
  };

  animate();

