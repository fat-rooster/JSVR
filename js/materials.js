function initMaterials(){
    starMaterial=new THREE.ShaderMaterial({
        uniforms:{
            falloffWidth: {value :2.0},
            minWidth: {value: 0.008},
            magScale: {value: 1.0},
        },
        /*vertexShader: document.getElementById('starVertexShader').textContent,
        fragmentShader: document.getElementById('starFragmentShader').textContent,*/
        vertexShader:
        `attribute float magnitude;
        uniform float minWidth;
        uniform float magScale;
        attribute float localMagScale;
        varying float vArea;
        varying vec2 vUv;
        varying float vHeight;
        varying float vFalloff;
        uniform float falloffWidth;
    
        void main(){
            gl_Position=projectionMatrix*viewMatrix*instanceMatrix*vec4(position,1.0);
            vUv= position.xy;
            float scaledMagnitude=magnitude*magScale*localMagScale;
            bool bigEnough=scaledMagnitude>minWidth;
            vArea=bigEnough? scaledMagnitude: minWidth;
            vHeight=bigEnough? 1.0 : scaledMagnitude/minWidth;
            vFalloff=sqrt(vArea)*falloffWidth;
            //vFalloff=bigEnough? 1.0: 0.0;
        }`,
        fragmentShader:
        `varying float vArea;
        varying vec2 vUv;
        varying float vHeight;
        varying float vFalloff;
    
        uniform float falloffWidth;
    
        float antisigmoid(float x){
            return x< 0.0 ? 1.0: x>1.0 ? 0.0: 1.0-3.0*x*x+2.0*x*x*x;
        }
        float colorMag(vec2 pos){
            float distSquare=dot(pos,pos);
            return antisigmoid((distSquare-vArea)/vFalloff);
        }
        void main(){
            vec3 color=vec3(1.0,1.0,1.0)*colorMag(vUv)*vHeight;
            //vec3 color=vec3(vHeight==1.0?1.0:0.0,vArea*10.3,falloffWidth);
            gl_FragColor=vec4(color,1.0);
            //gl_FragColor=vec4(1.0,0.0,1.0,1.0);
        }`
    })

    return 
    

}