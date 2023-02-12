import Canvas from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Targets extends cc.Component {

    @property(cc.Node)
    canvas: cc.Node = null;

    @property(cc.Prefab)
    private targets: cc.Prefab[] = [];

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
    }

    stopTargets()
    {
        this.unschedule(this.spawnTargets);
        this.node.children.forEach(_ele=>{
            _ele.getComponent(cc.RigidBody).active = false;
        });
    }
}
