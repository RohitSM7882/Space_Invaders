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
    }

    createTargets()
    {
        this.schedule(this.spawnTargets, 1);
    }

    spawnTargets()
    {
        let _newTarget = cc.instantiate(this.targets[Math.floor(Math.random() * (this.targets.length - 0)) + 0]);
        _newTarget.parent = this.node;
        let _position = cc.v2(Math.random() * (400 - (-400)) - 400, this.canvas.height);
        _newTarget.setPosition(_position);
        this.targetList.push(_newTarget);
    }

    protected update(dt: number): void {
        
    }
}
