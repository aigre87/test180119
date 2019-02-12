
// if ( WEBGL.isWebGLAvailable() === false ) {
//     content.appendChild( WEBGL.getWebGLErrorMessage() );
// }
// var container;
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
// var controls = new THREE.OrbitControls( camera, container );
// var renderer = new THREE.WebGLRenderer({ alpha: true });
// renderer.setSize( window.innerWidth, window.innerHeight );
// container = document.getElementById("canvasWrapper");
// container.appendChild( renderer.domElement );
// var axes = new THREE.AxesHelper(20);
// scene.add(axes);
// camera.position.z = 5;
// camera.position.y = 2;
// camera.lookAt(new THREE.Vector3(0,0,0));


// // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// // var cube = new THREE.Mesh( geometry, material );
// // scene.add( cube );

// var SEPARATION = 1, AMOUNTX = 20, AMOUNTY = 20;
// var numParticles = AMOUNTX * AMOUNTY;
// var positions = new Float32Array( numParticles * 3 );
// var scales = new Float32Array( numParticles );
// var i = 0, j = 0;
// for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
//     for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
//         positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
//         positions[ i + 1 ] = 0; // y
//         positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z
//         scales[ j ] = 1;
//         i += 3;
//         j ++;
//     }
// }
// var geometry = new THREE.BufferGeometry();
// geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
// geometry.addAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );
// // var material = new THREE.ShaderMaterial( {
// //     uniforms: {
// //         color: { value: new THREE.Color( 0x0500E5 ) },
// //     },
// //     vertexShader: document.getElementById( 'vertexshader' ).textContent,
// //     fragmentShader: document.getElementById( 'fragmentshader' ).textContent
// // } );
// var material = new THREE.MeshBasicMaterial( { color: 0x0500E5 } );
// //
// particles = new THREE.Points( geometry, material );
// scene.add( particles );





// var animate = function () {
//     requestAnimationFrame( animate );

//     renderer.render( scene, camera );
// };

// animate();

var SEPARATION = 30, AMOUNTX = 20, AMOUNTY = 20;

  var container;
  var camera, scene, renderer;
  var projector;

  var particles, particle, count = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  init();
  animate();

  function init() {

    container = document.getElementById('canvasWrapper');
    document.body.appendChild( container );
    if(container) {
        container.className += container.className ? ' waves' : 'waves';
    }

    projector = new THREE.Projector();
    raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector3();

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.x = -501; //changes how far back you can see i.e the particles towards horizon
    camera.position.y = 508; //changes how far back you can see i.e the particles towards horizon
    camera.position.z = -526; //This is how close or far the particles are seen

    camera.lookAt(new THREE.Vector3(0,0,0));



    scene = new THREE.Scene();
    var axes = new THREE.AxesHelper(200);
    scene.add(axes);
    var gridHelper = new THREE.GridHelper(600, 60);
    //scene.add(gridHelper);

    var controls = new THREE.OrbitControls( camera, container );

    particles = new Array();

    var PI2 = Math.PI * 2;
    var material = new THREE.SpriteMaterial( {
        sizeAttenuation: true,
        color: 0x0055FF, //changes color of particles
        program: function ( context ) {
            context.beginPath();
            context.arc( 0, 0, 0.2, 0, PI2, true );
            context.fill();
        }

    } );

    var i = 0;

    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

            particle = particles[ i ++ ] = new THREE.Sprite( material );
            particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 - SEPARATION/2 );
            particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 - SEPARATION/2 );
            scene.add( particle );

        }

    }



    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    //renderer.setClearColor( 0xffffff, 1);
    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
    //window.addEventListener( 'click', onclick, false );

  }



    function clickOnSprite(event){
        console.log("CLICK! " + event.clientX + ", " + event.clientY);      

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1; 
        raycaster.setFromCamera( mouse, camera );   

        var intersects = raycaster.intersectObjects( particles );

        intersects.forEach(function(element){
            console.log("Intersection: " + element.object);
        });
    }



    // function onclick(event) {
    //     var mouse = new THREE.Vector2();
    //     raycaster.setFromCamera(mouse, camera);
    //     var intersects = raycaster.intersectObjects(particles, true); //array
    //     if (intersects.length > 0) {

    //         selectedObject = intersects[0];
    //         console.log(intersects);
    //         selectedObject.object.material.color.setHex("0xffffff");
    //         //alert(selectedObject);
    //     }
    // }



  function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  function animate() {

    requestAnimationFrame( animate );

    render();

  }

  function render() {

    var i = 0;

    for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

            particle = particles[ i++ ];
            particle.position.y = ( Math.sin( ( ix + count ) * 0 ) * 20 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 10 ) + 50;
            //particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 2 ) * 4 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;

            particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0 ) + 2 ) * 4 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;

        }

    }

    renderer.render( scene, camera );

    // This increases or decreases speed
    count += 0.1;

  }




function tt(){


            var container;
            var camera, scene, projector, renderer;
            var particleMaterialBlack;            
            var particleMaterialGreen;            
            var particleMaterialBlue;            
            var viewWidth = window.innerWidth;
            var viewHeight = window.innerHeight;
            var cameraOffset = window.innerWidth;
            var objects = [];               
            init();
            animate();

            function init() {

                container = document.createElement( 'div' );
                document.body.appendChild( container );             
                
                camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
                camera.position.set( 0, 0, cameraOffset );                

                scene = new THREE.Scene();

                var geometry = new THREE.BoxGeometry( 100, 100, 100 );
                

                var object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: 0.5 } ) );
                object.position.x = 0;
                object.position.y = 0;
                object.position.z = 0;

                object.scale.x = 1;
                object.scale.y = 1;
                object.scale.z = 1;

                object.rotation.x = Math.PI / 4;
                object.rotation.y = Math.PI / 4;
                object.rotation.z = Math.PI / 4;

                scene.add( object );

                objects.push( object );


                var PI2 = Math.PI * 2;
                particleMaterialBlack = new THREE.SpriteCanvasMaterial( {

                    color: 0x000000,
                    program: function ( context ) {

                        context.beginPath();
                        context.arc( 0, 0, 0.5, 0, PI2, true );
                        context.fill();

                    }

                } );
                particleMaterialGreen = new THREE.SpriteCanvasMaterial( {

                    color: 0x00FF00,
                    program: function ( context ) {

                        context.beginPath();
                        context.arc( 0, 0, 0.5, 0, PI2, true );
                        context.fill();

                    }

                } );
                
                particleMaterialBlue = new THREE.SpriteCanvasMaterial( {

                    color: 0x0000FF,
                    program: function ( context ) {

                        context.beginPath();
                        context.arc( 0, 0, 0.5, 0, PI2, true );
                        context.fill();
                    }
                } );
                
                projector = new THREE.Projector();

                renderer = new THREE.CanvasRenderer();
                renderer.setClearColor( 0xf0f0f0 );
                renderer.setSize( viewWidth, viewHeight );
                           
                container.appendChild( renderer.domElement );

                renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );                

                window.addEventListener( 'resize', onWindowResize, false );
                camera.lookAt(new THREE.Vector3(0,0,0));
                render();                
            }

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );
            }

            function addNewParticle(pos, scale, particleMaterial)
            {
                if( !scale )
                {
                    scale = 16;
                }
                if( !particleMaterial )
                {
                    particleMaterial = particleMaterialBlack;
                }
                var particle = new THREE.Sprite( particleMaterial );
                particle.position = pos;
                particle.scale.x = particle.scale.y = scale;
                scene.add( particle );
            }
            
            function drawLine(pointA, pointB, lineColor)
            {            
                var material = new THREE.LineBasicMaterial({
                        color: lineColor
                });
            
                var geometry = new THREE.Geometry();
                var max = 500*500;
                if( Math.abs(pointA.x - pointB.x) < max && Math.abs(pointA.y - pointB.y) < max && Math.abs(pointA.z - pointB.z) < max )
                {
                    geometry.vertices.push(pointA);
                    geometry.vertices.push(pointB);
                                    
                    var line = new THREE.Line(geometry, material);
                    scene.add(line);      
                }
                else
                {
                    console.debug(pointA.x.toString() + ':' + pointA.y.toString() + ':' + pointA.z.toString()  + ':' + 
                                pointB.x.toString() + ':' + pointB.y.toString()  + ':' + pointB.z.toString());
                }
            }           
            
            function getFactorPos( val, factor, step )
            {
                return step / factor * val;                
            }
            
            function drawParticleLine(pointA,pointB,particleMaterial)
            {
                var factor = 50;
                for( var i = 0; i < factor; i++ )
                {
                    var x = getFactorPos( pointB.x - pointA.x, factor, i );
                    var y = getFactorPos( pointB.y - pointA.y, factor, i );
                    var z = getFactorPos( pointB.z - pointA.z, factor, i );
                    addNewParticle( new THREE.Vector3( pointA.x+x,pointA.y+y,pointA.z+z ), Math.max(1, window.innerWidth / 500), particleMaterial );
                }
            }
            
            function onDocumentMouseDown( event ) {

                if( event.button !== 0)
                {
                    return;
                }
                event.preventDefault();
                var zInput = document.getElementById('zInput');
                var z = parseFloat(zInput.value);
                if( isNaN(z) )
                {
                    return;
                }
                camera.position.set( 0, 0, cameraOffset );
                render();
                var mouse3D = new THREE.Vector3( ( (event.clientX) / viewWidth ) * 2 - 1, - ( (event.clientY) / viewHeight ) * 2 + 1, z );                               
                projector.unprojectVector( mouse3D, camera );                                                
                drawParticleLine( camera.position, mouse3D, particleMaterialGreen );//comment this and uncomment below to see single point
                //addNewParticle( new THREE.Vector3(mouse3D.x,mouse3D.y,mouse3D.z), Math.max(1, window.innerWidth / 500), particleMaterialGreen );
                mouse3D.sub( camera.position );                
                mouse3D.normalize();
                var raycaster = new THREE.Raycaster( camera.position, mouse3D );
                var scale = window.innerWidth*2;
                var rayDir = new THREE.Vector3(raycaster.ray.direction.x*scale,raycaster.ray.direction.y*scale,raycaster.ray.direction.z*scale);
                var rayVector = new THREE.Vector3(camera.position.x + rayDir.x, camera.position.y + rayDir.y, camera.position.z + rayDir.z);
                drawParticleLine(camera.position, rayVector, particleMaterialBlack);
                
                var intersects = raycaster.intersectObjects( objects );
                // Change color if hit block
                if ( intersects.length > 0 ) {

                    intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
                }       
                var oldPos = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z);                
                camera.position.set( camera.position.x+10, camera.position.y+10, camera.position.z+20 );                                
                addNewParticle( oldPos, 4, particleMaterialBlue );
                render();
            }

            var radius = 600;
            var theta = 0;

            function render() {             
                renderer.render( scene, camera );
            }

        
}

