
//importScripts('scene.js');

let sampler;

const [renderer, scene, camera, dummies] = init();
const [dummy, _position,_zero] = dummies;


let starMaterial;
//importScripts('js/init.js');
initMaterials();


let numTriangles=10000;
let magScale=0.07;

let inUseBuffer=new Float32Array(numTriangles);
let otherBuffer=new Float32Array(numTriangles);

let bufferAttribute=new THREE.InstancedBufferAttribute(inUseBuffer,1);
for(let i=0; i< numTriangles; ++i){
  inUseBuffer[i]=Math.random();
  otherBuffer[i]=Math.random();  
}


let ball=initScene();

function qTest(){
  const a={x:0.0};
  const b={y:5.0};
  return [a,b];
}


let baseTime=Date.now();
const cycle=200;
//let which=true;
function updateWorld(){ 
  const time=Date.now();
  const loopPos=time-baseTime;
  if (loopPos>cycle){
    baseTime=baseTime+cycle;
    
  }
}


group=new THREE.Group();
scene.add(group);

const fistGeo=new THREE.CylinderGeometry(0.02, 0.015,0.1);
const handMaterial= new THREE.MeshBasicMaterial({color: 0x999900});
const leftHand= new THREE.Mesh(fistGeo,handMaterial);
const smallSphere=new THREE.IcosahedronGeometry(.1,1);
const thingMaterial=new THREE.MeshBasicMaterial({color: 0x009999});
const thing=new THREE.Mesh(smallSphere,thingMaterial);
thing.translateZ(-.3);
group.add(thing);


const raycaster=new THREE.Raycaster();
//ball.layers.disable(1);


let controllers=[];
let controller1= renderer.xr.getController(0);
let grip=renderer.xr.getControllerGrip(0);
controller1.add(leftHand);
scene.add(controller1);
controller1.addEventListener('selectstart', onSelectStart);
controller1.addEventListener('selectend', onSelectEnd);

function controllerConnected(e){
  console.log(e.data);
  console.log(e.data.gamepad);
  controllers.push({
    gamepad: e.data.gamepad,
    grip: e.target,
    colliding: false,
    playing:false,
  });
}

renderer.xr.getControllerGrip(0).addEventListener('connected', controllerConnected);

function onSelectStart(e){
  console.log("selecting");
  const controller = e.target;
  controller.attach(ball);
  controller.userData.selected=ball;
  pulse(controllers[0].gamepad);
}
function onSelectEnd(e){
  const controller= e.target;
  group.attach(ball);
  controller.userData.selected=undefined;
}
function pulse(gamepad){
  let actuator=gamepad.vibrationActuator;
  console.log(actuator);

  if( !gamepad || ! gamepad.hapticActuators) {console.log("failed"); return}
  actuator=gamepad.hapticActuators[0];
  if(!actuator) return;
  actuator.pulse(1,100);
}
/*const firstWorker=new Worker("js/workers/FirstWorker.js");
firstWorker.onmessage = function(e){
  console.log("got message from worker");
  firstWorker.postMessage(bufferAttribute.array, [bufferAttribute.array.buffer]);
  bufferAttribute.array=new Float32Array(e.data);
  console.log(bufferAttribute.array.length);
  bufferAttribute.needsUpdate=true;
}

console.log(otherBuffer.length);
firstWorker.postMessage(otherBuffer, [otherBuffer.buffer]);
*/

function animate(){
  renderer.setAnimationLoop(()=>{
    updateWorld();
    renderer.render(scene,camera);
  });
}

animate();