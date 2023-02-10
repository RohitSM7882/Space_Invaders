import Canvas from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    canvas: cc.Node = null;

    @property(cc.Prefab)
    targets: cc.Prefab[] = [];

    onLoad()
    {
        var _colliderManager = cc.director.getPhysicsManager();
        _colliderManager.enabled = true;
        this.schedule(this.createTargets, 1);
    }

    createTargets()
    {
        let _newTarget = cc.instantiate(this.targets[Math.floor(Math.random() * (this.targets.length - 0)) + 0]);
        _newTarget.parent = this.node;
        let _position = cc.v2(Math.random() * (400 - (-400)) - 400, 100);
        _newTarget.setPosition(_position);
    }

}