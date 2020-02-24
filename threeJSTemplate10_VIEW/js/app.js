// these needs to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;
let model;

// let myFilePath;

// mixers
const mixers = [];
const clock = new THREE.Clock();

function init(){
   container = document.querySelector( '#scene-container' );

   createScene();
   createCamera();
   createControls();
   function filePassed(){
      loadModels();
      console.log('called');
   }
   loadModels();
   createLights();
   createRenderer();

   // setAnimationLoop() method for WebXR
   renderer.setAnimationLoop(() => {
      update();
      render();
   });
   // /
}

function createScene(){
   scene = new THREE.Scene();
   scene.background = new THREE.Color( 0x8FBCD4 );
}
function createCamera(){
   camera = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 1, 3000);
   // camera.position.set( -1.5, 1.5, 6.5);
   camera.position.set( 0, 0, 300);
}
function createControls(){
   controls = new THREE.OrbitControls( camera, container);
}

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

function createLights(){
   const hemisphereLight = new THREE.HemisphereLight( 0xddeeff, 0x202020, 5.0);
   const mainLight = new THREE.DirectionalLight( 0xFFFFFF, 5.0);
   mainLight.position.set( 10, 10, 10);
   scene.add( hemisphereLight, mainLight);
}

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

function loadModels(){
   const loader = new THREE.GLTFLoader();



   // A reusable Function to set up the models. We're passing in a position parameter so that they can be individually placed around the scene.
   const onLoad = ( gltfResult, position ) => {
      model = gltfResult.scene.children[ 0 ];

      // // the below 2 'if' statements are for changing the 'size' of the models from their default value.
      // if( position == gVehiclePosition ){
      //    model.scale.set( 5, 5, 5);
      // }
      // if( position == soldierPosition ){
      //    model.scale.set( 1, 1, 1);
      //    model.rotateZ( 180 );
      // }

      model.position.copy( position );

      const animation = gltfResult.animations[ 0 ];

      const mixer = new THREE.AnimationMixer( model );
      mixers.push( mixer );

      const action = mixer.clipAction( animation );
      action.play();
      // action.stop();

      scene.add( model );
   };



   const onProgress = () => { console.log( 'Models are on the way...' ); };
   //
   const onError = ( errorMessage ) => { console.log( errorMessage ); };

   const myFilePath = document.getElementById("myFilePath").value;
   // const myFilePath = "models/Parrot.glb";

   const parrotPosition = new THREE.Vector3( 0, 0, 0);
   loader.load( myFilePath , gltfResult => onLoad( gltfResult, parrotPosition ), onProgress, onError );

}

// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

function createRenderer(){
   renderer = new THREE.WebGLRenderer( {antialias:true, container} );
   renderer.setSize( container.clientWidth, container.clientHeight);
   renderer.setPixelRatio( window.devicePixelRatio);
   container.appendChild( renderer.domElement);
}
//
function update(){

   const delta = clock.getDelta();
   for(const mixer of mixers){
      mixer.update( 0.03 );
   }

   // camera.rotation.x += 0.001;
   // camera.rotation.y += 0.001;
}

function render(){
   renderer.render( scene, camera);
}

function onWindowResize(){
   // set the aspect ratio to match the new browser window aspect ratio
   camera.aspect = container.clientWidth / container.clientHeight;
   // update the camera's frustrum
   camera.updateProjectionMatrix();
   // update the size of the renderer and the canvas
   renderer.setSize( container.clientWidth, container.clientHeight);
}
window.addEventListener( 'resize', onWindowResize);

function filePassed(){
   loadModels();
   console.log('called');
}

init();
