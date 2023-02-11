import Canvas from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Targets extends cc.Component {

    @property(cc.Node)
    canvas: cc.Node = null;

    @property(cc.Prefab)
    targets: cc.Prefab[] = [];

    targetList: cc.Node[] = [];

    onLoad()
    {
        var _colliderManager = cc.director.getPhysicsManager();
        _colliderManager.enabled = true;

        var _cm = cc.director.getCollisionManager();
        _cm.enabled = true;
    }

    createTargets()
    {
        this.schedule(this.spawnTargets, 1);
    }

    spawnTargets()
    {
        let _newTarget = cc.instantiate(this.targets[Math.floor(Math.random() * (this.targets.length - 0)) + 0]);
        _newTarget.parent = this.node;
        let _position = cc.v2(Math.random() * (400 - (-400)) - 400, (this.canvas.height / 2) + 400);
        _newTarget.setPosition(_position);
        this.targetList.push(_newTarget);

        // this.scheduleOnce(()=>{
        //     _newTarget.getComponent(cc.RigidBody).active = false;
        //     let _duration = _newTarget.getComponent(cc.Animation).play('explosion-01').duration;

        //     this.scheduleOnce(()=>{
        //         _newTarget.destroy();
        //     }, _duration);
        // }, 3);
    }

    onBeginContact(contact, selfCollider, otherCollider) 
    {
        cc.log(contact, selfCollider.name, otherCollider.name);
    }

    onCollisionEnter(other, self){
        cc.log(other, self);
    }

    protected update(dt: number): void {
        
    }
}
