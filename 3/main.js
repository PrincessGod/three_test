'use strict';

var renderer, scene, camera;

var line;
var MAX_POINTS = 500;
var drawCount = 0;

init();
animate();

function init() {
    renderer = new THREE.WebGLRenderer({antialias: true});
    var glcanvas = renderer.domElement;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(glcanvas);

    camera = new THREE.PerspectiveCamera(45,
        glcanvas.clientWidth / glcanvas.clientHeight, 1, 500);
    camera.position.set(0, 0, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    scene = new THREE.Scene();

    var material = new THREE.LineBasicMaterial({color: 0x0000ff, linewidth: 2});

    var geometry = new THREE.BufferGeometry();

    var positions = new Float32Array(MAX_POINTS * 3);
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

    line = new THREE.Line(geometry, material);

    scene.add(line);

    updatePositions();
}

function updatePositions() {
    var positions = line.geometry.attributes.position.array;

    var x, y, z, index;
    x = y = z = index =0;

    for (var i = 0, l = MAX_POINTS; i < l; i ++) {
        positions[index ++] = x;
        positions[index ++] = y;
        positions[index ++] = z;

        x += (Math.random() - 0.5) * 3;
        y += (Math.random() - 0.5) * 3;
        z += (Math.random() - 0.5) * 3;
    }
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);

    drawCount = (drawCount + 1) % MAX_POINTS;

    line.geometry.setDrawRange(0, drawCount);

    if (drawCount === 0) {
        updatePositions();

        line.geometry.attributes.position.needsUpdate = true;

        line.material.color.setHSL(Math.random(), 1, Math.random());
    }

    render();
}
