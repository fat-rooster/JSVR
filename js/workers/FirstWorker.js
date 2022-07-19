

onmessage = function(e){
    this.setTimeout((()=>{
        const stuff=new Float32Array(e.data);
        //console.log(e);
        this.postMessage(stuff,stuff.buffer);

    }), 2000);

}