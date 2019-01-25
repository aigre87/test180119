var camera, scene, renderer;
var geometry, material, mesh;
var canvasWrapper = document.getElementById("canvasWrapper");
init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;
    camera.position.y = 5;
    camera.position.x = 5;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    material = new THREE.MeshNormalMaterial();

    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);


    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setSize( canvasWrapper.clientWidth, canvasWrapper.clientHeight );
    canvasWrapper.appendChild( renderer.domElement );
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = canvasWrapper.clientWidth / canvasWrapper.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( canvasWrapper.clientWidth, canvasWrapper.clientHeight );

}

function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

}