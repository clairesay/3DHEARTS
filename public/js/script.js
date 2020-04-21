   
    //establishing the scebe abd background color
    var scene = new THREE.Scene();
    scene.background = new THREE.Color( "rgb(255, 255, 255)" );
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 500 );

    //rendering the window and everything in it
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //Adding Orbit Controls
    var controls = new THREE.OrbitControls( camera, renderer.domElement );

////////////////////////////////////////////////////////////////////

function createPlaneStencilGroup( geometry, plane, renderOrder ) {

  var group = new THREE.Group();
  var baseMat = new THREE.MeshBasicMaterial();
  baseMat.depthWrite = false;
  baseMat.depthTest = false;
  baseMat.colorWrite = false;
  baseMat.stencilWrite = true;
  baseMat.stencilFunc = THREE.AlwaysStencilFunc;

  // back faces
  var mat0 = baseMat.clone();
  mat0.side = THREE.BackSide;
  mat0.clippingPlanes = [ plane ];
  mat0.stencilFail = THREE.IncrementWrapStencilOp;
  mat0.stencilZFail = THREE.IncrementWrapStencilOp;
  mat0.stencilZPass = THREE.IncrementWrapStencilOp;

  var mesh0 = new THREE.Mesh( geometry, mat0 );
  mesh0.renderOrder = renderOrder;
  group.add( mesh0 );

  // front faces
  var mat1 = baseMat.clone();
  mat1.side = THREE.FrontSide;
  mat1.clippingPlanes = [ plane ];
  mat1.stencilFail = THREE.DecrementWrapStencilOp;
  mat1.stencilZFail = THREE.DecrementWrapStencilOp;
  mat1.stencilZPass = THREE.DecrementWrapStencilOp;

  var mesh1 = new THREE.Mesh( geometry, mat1 );
  mesh1.renderOrder = renderOrder;

  group.add( mesh1 );

  return group;
}

    ///////////////////////// LOADER /////////////////////////////
     
    var loader = new THREE.STLLoader()
     
    loader.load('models/17040.stl', function (geometry) {

      var v3 = new THREE.Vector3( 0, -7, 0);

      var controller = new function() {
        this.Angle = 0;
      }();
  
      var gui = new dat.GUI();
      gui.closed = false;
      // var f1 = gui.addFolder('Clipping');
      gui.add(controller, 'Angle', -50, 50).onChange( function() {
         console.log(controller.Angle);
         v3.setX(controller.Angle);
      });

      var localPlane = new THREE.Plane( v3, 0.75 );

      // var material = new THREE.MeshPhongMaterial({
      //   side: THREE.DoubleSide,
      //   clippingPlanes: [ localPlane ], //this stops it from working ahhahaah
      //   clipShadows: true,
      // })
      var material = new THREE.MeshStandardMaterial( {

        color: 0xFFC107,
        metalness: 0.1,
        roughness: 0.75,
        clippingPlanes: [ localPlane ],
        clipShadows: true,
        shadowSide: THREE.DoubleSide,

      } );

      var clippedColorFront = new THREE.Mesh( geometry, material );
      clippedColorFront.castShadow = true;
      clippedColorFront.renderOrder = 6;
      // object.add( clippedColorFront );

      // var mesh = new THREE.Mesh(geometry, material); //restore pls
      // mesh.castShadow = true; //restore pls


      //
				// ***** Clipping setup (renderer): *****
					Empty = Object.freeze( [] );
				renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
        renderer.localClippingEnabled = true;

				// GUI

        // folderLocal = gui.addFolder( 'Local Clipping' ),
        propsLocal = {
          get 'Enabled'() {
            return renderer.localClippingEnabled;
          },
          set 'Enabled'( v ) {
            renderer.localClippingEnabled = v;
          },
          get 'Plane'() {
            return localPlane.constant;
          },
          set 'Plane'( v ) {
            localPlane.constant = v;
          },
        }


      gui.add( propsLocal, 'Plane', -0.58, 0.75 );
      gui.add( propsLocal, 'Enabled' );
        
      scene.add(clippedColorFront);

      clippedColorFront.scale.set(0.1, 0.1, 0.1);
      clippedColorFront.translateX(1.5);
      clippedColorFront.translateY(111);
      clippedColorFront.translateZ(-7);
      clippedColorFront.rotation.x = -1.5;
      camera.lookAt(clippedColorFront.x, clippedColorFront.y, clippedColorFront.z);
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
    camera.lookAt(0, 0, 0);
    controls.enableDamping = true;

    ///////////////////////// LOADER /////////////////////////////

    ////// LIGHTS //////
//     var light = new THREE.PointLight( 0xff0000, 1, 100 );
// light.position.set( 50, 50, 50 );
// scene.add( light );
    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add( light );
    ///// LIGHTS //////

///////////////////////////////////////////////////////////////////
    //ensuring the screen is working.
    var animate = function () {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
};

animate();


