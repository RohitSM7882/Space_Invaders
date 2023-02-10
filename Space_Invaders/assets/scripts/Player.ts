import Canvas from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Node)
    canvas: cc.Node = null;

    @property(cc.Node)
    private shooter: cc.Node = null;

    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;

    onLoad()
    {
        // this.shooterInteractionState(false);
        var _colliderManager = cc.director.getPhysicsManager();
        _colliderManager.enabled = true;
    }

    onBeginContact(contact, selfCollider, otherCollider) 
    {
        cc.log(contact, selfCollider.name, otherCollider.name);
    }

    shooterInteractionState(_enable: boolean)
    {
        if(_enable)
        {
            this.shooter.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this));
            this.shooter.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove.bind(this));
            this.shooter.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
            this.shooter.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel.bind(this));
        }
        else{
            this.shooter.off(cc.Node.EventType.TOUCH_START);
            this.shooter.off(cc.Node.EventType.TOUCH_MOVE);
            this.shooter.off(cc.Node.EventType.TOUCH_END);
            this.shooter.off(cc.Node.EventType.TOUCH_CANCEL);
        }
    }
    
    onTouchStart()
    {
        this.schedule(this.shootBullets, 0.05);
    }

    onTouchMove(event)
    {
        var _eventPos = event.getLocation();
        var _localPos = this.node.convertToNodeSpaceAR(cc.v2(_eventPos.x, _eventPos.y));

        if((Math.abs(this.shooter.x) + 100) < (this.canvas.width / 2))
            this.moveShooter(_localPos.x);
    }

    onTouchEnd()
    {
        this.unschedule(this.shootBullets);
    }

    onTouchCancel()
    {
        this.unschedule(this.shootBullets);
    }

    shootBullets()
    {
        var _newBullet = cc.instantiate(this.bulletPrefab);
        _newBullet.setParent(this.node.getChildByName('Bullets'));
        _newBullet.setPosition(this.shooter.x, this.shooter.y + 110);
        var _bulletDestinationPos: number = this.canvas.height - _newBullet.position.y;

        cc.tween(_newBullet)
            .to(1, {y: _bulletDestinationPos})
            .call(()=>{
                _newBullet.destroy();
            })
            .start();
    }

    moveShooter(_xPos: number){
        this.shooter.x = _xPos;
    }

}
