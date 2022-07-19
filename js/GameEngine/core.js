//importScripts("configs/core.js");


class Runtime{
    constructor(entityManager, initialScene, resourceManager){
        this.initialScene=initialScene;
        this.scene=initialScene;
        this.changes=[];
        this.entityManager=entityManager;
        this.resourceManager=resourceManager;
    }
    async run(){
        for (const system of this.systemState.state.systems){
            const returned=await system.run(this.entityManager);
            if ("changeBuffer" in returned){
                this.entityManager.doChanges(returned.changeBuffer);
            }
            if("changeSystems" in returned){
                this.changes.push(returned.changeSystems);
            }
        }
        this.applyChanges();
    }
    async applyChanges(){
        this.changes.forEach(change=> change.apply(this))
        this.changes=[];
    }
    addSystem(system){
        this.systemState.state.push(system);
    }
    load(scene){
        this.systemState.transitionTo(scene.systemState);
        this.entityManager.clearEntities();
        this.entityManager.addEntities(scene.activeEntities);
    }
}

class Entity{
    clone(){
        const newOne=new Entity();
        for (let component in this){
            newOne[component]=this[component].clone();
        }
        return newOne;
    }
    clean(){
        for (let component in this){
            component.clean();
        }

    }

}
class EntityManager{
    constructor(queryBuilder, resourceManager){
        this.resourceManager=resourceManager;
        this.queryBuilder=queryBuilder;
        this.entities=new Set();
        this.id=0;
    }
    grabID(){
        this.id+=1;
        return IdComponent(this.id);
    }
    RunQuery(query){
        for (let entity of this.entities.values()){
            if(query.test(entity)){
                yield query.cached;
            }
        }
    }
    getSingletonQuery(query){
        for (let entity of this.entities.values()){
            if(query.test(entity)){
                return query.cached;
            }
        }
    }
    doChanges(changeBuffer){
        changeBuffer.forEach(change => change.apply(this));
    }
    cleanEntity(){
        var entity=newEntity();
        this.tryForceAdd(entity);
        return entity;
    }
    tryForceAdd(entity){
        this.entities.add(entity);
        entity.IdComponent=this.grabID();
        return entity;
    }
    addEntities(entities){
        for (let entity of entities){
            this.tryForceAdd(entity);
        }
    }
    remove(entity){
        this.entities.delete(entity);
        entity.clean();
    }
    clearEntities(){
        for(let entity of entities){
            entity.clean();
        }
        this.entities=new Set();
    }
}


class QueryCode{
    constructor(){
        this.query={
            test:(entity=>{
                this.cached=entity;
                return true}),
        }
    }
    Contains(componentName){
        const oldTest=this.query.test;
        this.query.test=(entity=>{return (componentName in entity)& oldTest(entity)});
        return this;
    }
    Build(queryBuilder){
        return this.query;
    }

}