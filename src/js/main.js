var SEPARATION = 30, AMOUNTX = 40, AMOUNTY = 40;
var camera;
window.camera = "123";
var container;
var scene, renderer;
var projector, raycaster;
var mouse = new THREE.Vector2(), INTERSECTED;

var particles, count = 0, count2 = 400;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

    container = document.getElementById('canvasWrapper');
    document.body.appendChild(container);
    if (container) {
        container.className += container.className ? ' waves' : 'waves';
    }

    projector = new THREE.Projector();
    raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector3();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = -1001; //changes how far back you can see i.e the particles towards horizon
    camera.position.y = 100; //changes how far back you can see i.e the particles towards horizon
    camera.position.z = 1386; //This is how close or far the particles are seen


    camera.lookAt(new THREE.Vector3(0, 0, 0));


    scene = new THREE.Scene();
    var axes = new THREE.AxesHelper(200);
    scene.add(axes);
    var gridHelper = new THREE.GridHelper(600, 60);
    //scene.add(gridHelper);

    //var controls = new THREE.OrbitControls(camera, container);

    //particles = new Array();

    var PI2 = Math.PI * 2;
    // var material = new THREE.SpriteMaterial( {
    //     sizeAttenuation: true,
    //     color: 0x0055FF, //changes color of particles
    //     program: function ( context ) {
    //         context.beginPath();
    //         context.arc( 0, 0, 0.2, 0, PI2, true );
    //         context.fill();
    //     }

    // } );

    var positions = new Float32Array(AMOUNTX * AMOUNTY * 3);
    var scales = new Float32Array(AMOUNTX * AMOUNTY);
    var i = 0, j = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
            positions[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2 - SEPARATION / 2); // x
            positions[i + 1] = Math.sin(((ix / 40 * -210) - (iy / 40 * 90)) * Math.PI / 180) * 300;
            //( Math.sin( ( ix ) * 0.3 ) + 2 ) * 0.2 + ( Math.sin( ( iy ) * 0.15 ) + 1 ) * 100;
            positions[i + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2 - SEPARATION / 2); // z
            scales[j] = 20;
            i += 3;
            j++;
        }
    }

    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('scale', new THREE.BufferAttribute(scales, 1));
    var material = new THREE.ShaderMaterial({
        uniforms: {
            color: {value: new THREE.Color(0x0055ff)},
        },
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent
    });
    //
    particles = new THREE.Points(geometry, material);
    scene.add(particles);


    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setClearColor( 0xffffff, 1);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('click', clickOnSprite, false);

}


function clickOnSprite(event) {
    console.log("CLICK! " + event.clientX + ", " + event.clientY);

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObject(particles);
    if (intersects.length > 0) {
        console.log(intersects);
        //intersects[0].object.material.color.setHex( 0xffffff );
        intersects[0].object.material.uniforms.color.value.setHex(0xFF0000);
    }
}


function onclick(event) {
    var mouse = new THREE.Vector2();
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(particles, true); //array
    if (intersects.length > 0) {

        selectedObject = intersects[0];
        console.log(intersects);
        selectedObject.object.material.color.setHex("0xffffff");
        //alert(selectedObject);
    }
}


function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    render();

}

function changeColor(){
    var controller = new ScrollMagic.Controller();

    var targetColor = new THREE.Color(0xff0000);
    var cctween = TweenMax.to(particles.material.uniforms.color.value, 2, {
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b
    });

    var scrollScene = new ScrollMagic.Scene({
        triggerElement: 'body',
        triggerHook: 0,
        duration: 1000, // resposive duration in % duration in px eg. 300, 0 = autoplay
        offset: 0 // offset trigger position by 100px
    })
    .setTween(cctween)
    .addTo(controller);
}
changeColor();

function changePos(){
    var positions = particles.geometry.attributes.position.array;
    var i = 0, j = 0;
    for (var ix = 0; ix < AMOUNTX; ix++) {

        for (var iy = 0; iy < AMOUNTY; iy++) {
            (function(i){
                console.log(i);
                var element = positions[ i + 1 ];
                var elementVal = parseFloat(element);
                var Cont={val:  elementVal + 1000} , NewVal = elementVal ;
                TweenMax.to(Cont,(4 - 0.05*ix + 0.05*iy),{val:NewVal,roundProps:"val",onUpdate:function(){
                        positions[ i + 1 ] = Cont.val;
                    }});
            })(i);

            //console.log(elementVal);
            //TweenMax.fromTo( element , 1, parseInt(element - 100) ,  parseInt(element) );

            //particle = particles[ i++ ];
            //positions[ i + 1 ] = ( Math.sin( ( ix + count ) * 0 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.2 ) * 20 ) ;
            //particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 2 ) * 4 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;

            //scales[j] = (Math.sin((ix - count) * 0) + 2) * 5 + (Math.sin((iy - count) * 0.1) + 1) * 15;

            //positions[ i + 1 ] =  (Math.sin(((ix/40*-210)-(iy/40*90))*Math.PI/180) * 300) + count2*ix*iy ;
            i += 3;
            j++;
        }

    }
}
changePos();

function render() {

    //var positions = particles.geometry.attributes.position.array;
    var scales = particles.geometry.attributes.scale.array;
    var i = 0, j = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {

        for (var iy = 0; iy < AMOUNTY; iy++) {

            //particle = particles[ i++ ];
            //positions[ i + 1 ] = ( Math.sin( ( ix + count ) * 0 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.2 ) * 20 ) ;
            //particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 2 ) * 4 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;

            scales[j] = (Math.sin((ix - count) * 0) + 2) * 5 + (Math.sin((iy - count) * 0.1) + 1) * 15;

            //positions[ i + 1 ] =  (Math.sin(((ix/40*-210)-(iy/40*90))*Math.PI/180) * 300) + count2*ix*iy ;
            i += 3;
            j++;
        }

    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.scale.needsUpdate = true;
    particles.material.uniforms.color.needsUpdate = true;

    renderer.render(scene, camera);

    // This increases or decreases speed
    count += 0.15;
    if (count2 <= 0) {
        count2 = 0;
    } else {
        count2 = count2 - 4;
    }
}


