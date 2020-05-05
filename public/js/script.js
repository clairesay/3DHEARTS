///////////////////////// SETTING UP THE SCENE /////////////////////////////   
  //establishing the scebe abd background color
  var scene = new THREE.Scene();
  scene.background = new THREE.Color( "rgb(0, 0, 0)" );
  var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 500 );

  //rendering the window and everything in it
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  //Setting the position of the camera
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 20;

  //Adding Orbit Controls
  // var controls = new THREE.OrbitControls( camera, renderer.domElement );

  // controls.enableDamping = true;

///////////////////////// MODEL LOADER /////////////////////////////
     
    // Loading STL model
  var loader = new THREE.STLLoader()
  loader.load('models/17040.stl', function (geometry) {

    //centering geometry
    geometry.center();

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

    //adding heart to the scene
    scene.add(heart);

    //positioning the heart for optimal scale and visibility
    heart.scale.set(0.1, 0.1, 0.1);
    heart.rotation.x = -1.5;
    heart.rotation.z = -3;
      ////////////////////// CHANGING VIEWS WITH BUTTONS /////////////////////

        document.getElementById('orientview1').addEventListener('click', function orientView1() {
          // camera.rotation.x = 0.28;
          // camera.rotation.y = 0.84;
          // camera.rotation.z = 0.21;
          // heart.rotation.x = 0.28
          // heart.rotation.y = 0.4
          // heart.rotation.z = 0.21
          // camera.rotation.x = -0.3;
        })   

      ////////////////////// CHANGING VIEWS WITH BUTTONS /////////////////////
  })

  //Grid for reference
  var gridXZ = new THREE.GridHelper( 10, 10 );
  scene.add(gridXZ);

  //Axes for xyz reference
  var axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );

  //Adding Lights to the Scene
  var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  scene.add( light );

  //Animate and Render
  var animate = function () {
      requestAnimationFrame( animate );
      // controls.update();
      console.log(camera.rotation.x, camera.rotation.y, camera.rotation.z);
      renderer.render( scene, camera );
  };

  animate();


