const constructPlaceTriangle= ((sampler, dummy, trianglesMesh)=>((i)=>{
    sampler.sample(_position,_zero);
    dummy.position.copy(_position);
    dummy.lookAt(_zero);
    dummy.updateMatrix();
    trianglesMesh.setMatrixAt(i, dummy.matrix);
}));