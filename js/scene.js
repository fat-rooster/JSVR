function initScene(){
    const light=new THREE.DirectionalLight(0xffffff,.5);
    const ambientLight=new THREE.AmbientLight(0xffffff,.05);
    scene.add(light);
    scene.add(ambientLight);

    
    const ball=(()=>{
        const geometry=new THREE.IcosahedronGeometry(15,2);
        const material = new THREE.MeshStandardMaterial({color: 0xFF6666});
        return new THREE.Mesh(geometry,material);
        })();
    ball.translateZ(-40.0);
    scene.add(ball);

    trianglesMesh=(()=>{
        const geometry=new THREE.BufferGeometry();
        const vertices=new Float32Array([
          
          1.0,0.5,0.0,
          -1.0,0.5,0.0,
          0.0,-1.0,0.0
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices,3));
      
        magnitudes= new Float32Array(numTriangles);
        for(let i=0; i< numTriangles; ++i){
          const x=Math.random()
          magnitudes[i]=Math.pow(x,12.0)*magScale;
          inUseBuffer[i]=Math.random();
        }
        geometry.setAttribute('magnitude', new THREE.InstancedBufferAttribute(magnitudes,1));
        geometry.setAttribute('localMagScale', bufferAttribute);
        
        const material =new THREE.MeshBasicMaterial({color: 0xff0000});
        return new THREE.InstancedMesh(geometry, starMaterial, numTriangles);
    })();
    placeTriangle=constructPlaceTriangle(sampler,dummy,trianglesMesh);
    for(let i=0; i<numTriangles;++i){
        placeTriangle(i);
    }
    scene.add(trianglesMesh);

    return ball;

       
    
    


}