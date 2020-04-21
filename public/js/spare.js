    // return 'Hello!';
    // console.log('threeeee');


    var scene = new THREE.Scene();
    scene.background = new THREE.Color( "rgb(0, 0, 0)" );
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 500 );
    camera.position.set(0, 0, 100);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var controls = new THREE.OrbitControls( camera, renderer.domElement );

    // var geometry = new THREE.BoxGeometry();
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // var cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
////////////////////////////////////////////////////////////////////

    // var loader = new THREE.GLTFLoader();
    // loader.load( 'models/scene.gltf', function ( gltf ) {
    //     scene.add( gltf.scene );
    // }, undefined, function ( error ) {
    //     console.error( error );
    // } );

    ///////////////////////// LOADER /////////////////////////////
     
    var loader = new THREE.STLLoader()
     
    loader.load('models/17040.stl', function (geometry) {
      var material = new THREE.MeshNormalMaterial()
      var mesh = new THREE.Mesh(geometry, material);

    //   mesh.position.set (0, 0, 0);
      mesh.scale.set(0.1, 0.1, 0.1);
    //   mesh.position.y = 10;
    //   mesh.position.z = 50;
      scene.add(mesh);
      camera.lookAt(mesh.x, mesh.y, mesh.z);
      console.log('done');
    })

    ///////////////////////// LOADER /////////////////////////////


///////////////////////////////////////////////////////////////////
    camera.position.z = 5;

    // camera.lookAt( scene.position );


    var animate = function () {
        requestAnimationFrame( animate );

        // mesh.rotation.x += 0.01;
        // mesh.rotation.y += 0.01;

        renderer.render( scene, camera );
};

animate();
