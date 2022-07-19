function init(){
    const renderer = new THREE.WebGLRenderer();
    const scene = new THREE.Scene();
    document.body.append(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    document.body.appendChild(VRButton.createButton(renderer));
    renderer.xr.enabled=true;

    renderer.setSize(window.innerWidth, window.innerHeight);


    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.position.set(0.0,0.0,0.0);
    camera.matrixAutoUpdate=true;

    const para=document.createElement("p");
    const styles=window.getComputedStyle(para);
    console.log(styles);
    console.log(styles["--myCustom"]);
    para.style["color"]="red";
    document.body.append(para);

    


    sampler={
        sample:(_position, _zero)=>{
        const theta=2.0*Math.random()*Math.PI;
        const seedz=Math.random();
        const rho=Math.acos(1.0-2.0*seedz);
        _position.set(
        Math.cos(theta)*Math.sin(rho),
        Math.sin(theta)*Math.sin(rho),
        Math.cos(rho)
        );
        _position.multiplyScalar(200.0+Math.random());
        //new MeshSurfaceSampler(ball).build();
    },
    }

    const _position=new THREE.Vector3();
    const _zero = new THREE.Vector3(0.0,0.0,0.0);
    const dummy= new THREE.Object3D();

    return [renderer, scene, camera, [dummy, _position, _zero]];

    

}