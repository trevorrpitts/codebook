let qdiv = document.querySelector('#question')
let adiv = document.querySelector('#answer')

// let response = 'i\'m done with beans, jerry!!!'

let answers = [
    'yea', 
    'nowway',
    'buh',
    'hm'
]

// protip - keep the variables with the code that uses them

// keep global variables at top

// a traditional function declaration


// function displayEvent (event) {
//     console.log(event)
// }

function randInt(limit) {
    let r = Math.random()
    // console.log(`value of ${r}`)
    r = r * limit
    // console.log(`value of ${r}`)
    r = Math.floor(r)
    return r
}

function setRandomAnswer (e) {
    if (e.key === "Enter") {
        let answer = answers[randInt(answers.length)]
        adiv.innerHTML = answer
        qdiv.innerHTML = ""
        return false
    }
}

// create function that takes one parameter and one argument 

/* 
function choice() { 
    let w = answers[randInt(answers.length)]
    return w
}
*/

/*
function sayNope (event) {
    console.log(response)
}
*/

// function randInt (limit) {
//     let r = Math.floor(Math.random() * limit)
    
//     return r

// }

// the number between zero and nine but not reaching nine
// [0, 9) limit notation

// blocks are what is within the braces

qdiv.onkeypress = setRandomAnswer

// runs the function when a key is pressed
// onkeypress is an event handler

// protip - use meaningful names, the bigger the name the bigger the scope
// protip "=" means assigned to
// protip - float - coding word for decimal
// protip - use TODO to list out what needst be done
// event - when some'n happens

//global variables & calling functions

var scene, camera, renderer;
init();
animate();

function init(){
  
  //creates the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(500, 500);
  document.body.appendChild(renderer.domElement);

  //sets up the camera
  camera = new THREE.PerspectiveCamera(45, 500 / 500, 1, 500);
  camera.position.set(0, 0, 100);

  //set the scene
  scene = new THREE.Scene();

  //sets up light although i'm not quite sure it works
  var light = new THREE.PointLight(0xffffff);
  light.position.set(-100,200,100);
  scene.add(light);

  //what the torus's made of
  var material = new THREE.MeshPhongMaterial({color: 0x00ff65});

  //torus's size and shape
  var geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );

  //combind em
  var object = new THREE.Mesh(geometry, material);
  scene.add(object);

  //orbiting
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.update();
}


function animate(){
  //animation and final rendering
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
