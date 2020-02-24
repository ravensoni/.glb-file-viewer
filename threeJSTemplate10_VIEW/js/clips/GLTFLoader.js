/*
Here's a bare minimum set up for loading a file using the GLTFLoader.
*/

/*
url : a string , this tells the loader where to find the file on the server.
onLoad : a calback function , this will get called when the model has finished loading.
onProgress : a callback function , that gets called as the loading progresses.
onError : a callback function , if there is an error loading the model.

There are two more useful things for us in starting : {
   1) gltf.animations
   2) gltf.scene

   The loader returns entire scene for us, with any models placed in it. If we wish to, we can just replace our scene entirely with this one.
}

The onLoad Function :

*/

function loadModels(){
   // The 'Loader'
   const loader = new THREE.GLTFLoader();

   const url = './models/parrot.glb';

   // A reusable function Function to set up the models. We're passing in a position parameter so that they can be individually placed around the scene.
   // The 'gltfResult' Object returned by the 'Loader'.
   const onLoad = ( gltfResult ) => {

      // Next, we need to get a reference to the model from with the gltf.scene.
      // Fortunately each of our bird models is located in the same place.
      const model = gltfResult.scene.children[ 0 ];
      model.position.copy( position );

      const animation = gltf.animation[ 0 ];

      const mixer = new THREE.AnimationMixer( model );
      mixers.push( mixer );

      const action = mixer.clipAction( animation );

      action.play();

      scene.add( model );
   };

   loader.load( url, onLoad, onProgress, onError );
}

loadModels();
