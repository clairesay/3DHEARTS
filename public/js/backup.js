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

////////////////////////////////////////////////////////////////////

    ///////////////////////// LOADER /////////////////////////////
     
    var loader = new THREE.STLLoader()
     
    loader.load('models/17040.stl', function (geometry) {
      var material = new THREE.MeshNormalMaterial()
      var mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      mesh.scale.set(0.1, 0.1, 0.1);
      mesh.translateX(1.5);
      mesh.translateY(111);
      mesh.translateZ(-7);
    //   mesh.translate( 1.5, 110, 15 );
    //   mesh.position.x = 1.5;
    //   mesh.position.y = 15;
    //   mesh.position.z = 110;
      mesh.rotation.x = -1.5;
      camera.lookAt(mesh.x, mesh.y, mesh.z);
      console.log('done');
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

    ////// PLANE //////
    // ***** Clipping planes: *****
    // var localPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.8);
    // // Geometry
    // var material = new THREE.MeshPhongMaterial({
    //     color: 0x80ee10,
    //     shininess: 100,
    //     side: THREE.DoubleSide,
    //     // ***** Clipping setup (material): *****
    //     clippingPlanes: [ localPlane ],
    //     clipShadows: true
    // });
    // // var geometry = new THREE.TorusKnotBufferGeometry(0.4, 0.08, 95, 20);
    // var mesh = new THREE.Mesh(geometry, material);
    // mesh.castShadow = true;
    // scene.add(mesh);
    ///// PLANE //////
///////////////////////////////////////////////////////////////////
    //ensuring the screen is working.
    var animate = function () {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
};

animate();


/////// 8:37 PM 02/04/2020 //////////////

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

////////////////////////////////////////////////////////////////////

    ///////////////////////// LOADER /////////////////////////////
     
    var loader = new THREE.STLLoader()
     
    loader.load('models/17040.stl', function (geometry) {
       //
      var localPlane = new THREE.Plane( new THREE.Vector3( 0, - 1, 0 ), 0.8 );
      var globalPlane = new THREE.Plane( new THREE.Vector3( - 1, 0, 0 ), 0.1 );

      var material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        clippingPlanes: [ localPlane ], //this stops it from working ahhahaah
        clipShadows: true
      })

      var mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;


      //
				// ***** Clipping setup (renderer): *****
				var globalPlanes = [ globalPlane ],
					Empty = Object.freeze( [] );
				renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
				renderer.localClippingEnabled = true;

				// GUI

				var gui = new dat.GUI(),
					folderLocal = gui.addFolder( 'Local Clipping' ),
					propsLocal = {
						get 'Enabled'() {
							return renderer.localClippingEnabled;
						},
						set 'Enabled'( v ) {
							renderer.localClippingEnabled = v;
						},
						get 'Shadows'() {
							return material.clipShadows;
						},
						set 'Shadows'( v ) {
							material.clipShadows = v;
						},
						get 'Plane'() {
							return localPlane.constant;
						},
						set 'Plane'( v ) {
							localPlane.constant = v;
						}
					},

					folderGlobal = gui.addFolder( 'Global Clipping' ),
					propsGlobal = {
						get 'Enabled'() {
							return renderer.clippingPlanes !== Empty;
						},
						set 'Enabled'( v ) {
							renderer.clippingPlanes = v ? globalPlanes : Empty;
						},
						get 'Plane'() {
							return globalPlane.constant;
						},
						set 'Plane'( v ) {
							globalPlane.constant = v;
						}
					};

				folderLocal.add( propsLocal, 'Enabled' );
				folderLocal.add( propsLocal, 'Shadows' );
				folderLocal.add( propsLocal, 'Plane', 0.3, 1.25 );
				folderGlobal.add( propsGlobal, 'Enabled' );
				folderGlobal.add( propsGlobal, 'Plane', - 0.4, 3 );
      // var controller = new function() {
      //   this.scaleX = 0;
      //   this.scaleY = 0;
      //   this.scaleZ = 0;
      // }();

      // var gui = new dat.GUI();
      // var f1 = gui.addFolder('Scale');
      // f1.add(controller, 'scaleX', 0.1, 5).onChange( function() {
      //    mesh.scale.x = (controller.scaleX);
      // });
      // f1.add(controller, 'scaleY', 0.1, 5).onChange( function() {
      //    mesh.scale.y = (controller.scaleY);
      // });
      // f1.add(controller, 'scaleZ', 0.1, 5).onChange( function() {
      //    mesh.scale.z = (controller.scaleZ);
      // });

      scene.add(mesh);

      mesh.scale.set(0.1, 0.1, 0.1);
      mesh.translateX(1.5);
      mesh.translateY(111);
      mesh.translateZ(-7);
      mesh.rotation.x = -1.5;
      camera.lookAt(mesh.x, mesh.y, mesh.z);
      console.log('done');

  
  

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


/////// 10:15pm 02/04/2020

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

////////////////////////////////////////////////////////////////////

    ///////////////////////// LOADER /////////////////////////////
     
    var loader = new THREE.STLLoader()
     
    loader.load('models/17040.stl', function (geometry) {
       //
      let antihero = new function() {
        this.xValue = 0;
    }

      var localPlane = new THREE.Plane( new THREE.Vector3( antihero.xValue, -7, 0 ), 0.75 );

      var material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        clippingPlanes: [ localPlane ], //this stops it from working ahhahaah
        clipShadows: true,
        // vertexColors: true
      })

      var mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;


      //
				// ***** Clipping setup (renderer): *****
					Empty = Object.freeze( [] );
				renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
        renderer.localClippingEnabled = true;

				// GUI

				var gui = new dat.GUI(),
					folderLocal = gui.addFolder( 'Local Clipping' ),
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
            get 'Direct'() {
              return antihero.xValue;
            },
            set 'Direct'( v ) {
              antihero.xValue = v;
            }
					}

        folderLocal.add( propsLocal, 'Enabled' );
        folderLocal.add( propsLocal, 'Plane', -0.58, 0.75 );
        folderLocal.add( propsLocal, 'Direct', -15, 15 );

      scene.add(mesh);

      mesh.scale.set(0.1, 0.1, 0.1);
      mesh.translateX(1.5);
      mesh.translateY(111);
      mesh.translateZ(-7);
      mesh.rotation.x = -1.5;
      camera.lookAt(mesh.x, mesh.y, mesh.z);
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

//// 11:08pm 04 04 2020

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

////////////////////////////////////////////////////////////////////

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

      var material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        clippingPlanes: [ localPlane ], //this stops it from working ahhahaah
        clipShadows: true,
      })

      var mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;


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
        
      scene.add(mesh);

      mesh.scale.set(0.1, 0.1, 0.1);
      mesh.translateX(1.5);
      mesh.translateY(111);
      mesh.translateZ(-7);
      mesh.rotation.x = -1.5;
      camera.lookAt(mesh.x, mesh.y, mesh.z);
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

animate()