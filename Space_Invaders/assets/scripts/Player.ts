import Canvas from "./Main";
import TopInfo from "./TopInfo";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Node)
    canvas: cc.Node = null;

    @property(cc.Node)
    private shooter: cc.Node = null;

    @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private shooterPrefab: cc.Prefab = null;

    @property({type: cc.AudioClip})
    aud_Bullet: cc.AudioClip = null;

    onLoad()
    {
        var _colliderManager = cc.director.getPhysicsManager();
        _colliderManager.enabled = true;

        var _cm = cc.director.getCollisionManager();
        _cm.enabled = true;

        this.node.on("onShooterDestroy", this.onShooterDestroy.bind(this));
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
            this.unschedule(this.shootBullets);
        }
    }
    
    onTouchStart()
    {
        this.schedule(this.shootBullets, 0.05);
        this.canvas.emit('onInteractionStart');
    }

    onTouchMove(event)
    {
        var _eventPos = event.getLocation();
        var _localPos = this.node.convertToNodeSpaceAR(cc.v2(_eventPos.x, _eventPos.y));

        if((Math.abs(_localPos.x) + 120) < this.canvas.width / 2)
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
        var _bulletDestinationPos: number = (this.canvas.height / 2) + 300;
        cc.audioEngine.play(this.aud_Bullet, false, 0.5);

        cc.tween(_newBullet)
            .to(1, {y: _bulletDestinationPos})
            .call(()=>{
                _newBullet.destroy();
            })
            .start();
    }

    moveShooter(_xPos: number)
    {
        this.shooter.x = _xPos;
    }

    onShooterDestroy(_duration: number)
    {
        this.shooterInteractionState(false);
        this.unschedule(this.shootBullets);

        this.scheduleOnce(()=>{
            this.resetToTryAgain();
        }, _duration);
    }

    resetToTryAgain()
    {
        if(cc.find("Canvas/TopInfo").getComponent(TopInfo).getLifeCount() > 0)
        {
            this.shooter = cc.instantiate(this.shooterPrefab);
            this.shooter.setParent(this.node);
            this.shooter.setPosition(0, -600);
            this.shooterInteractionState(true);
        }
        else
            this.canvas.emit("onGameOver");
    }

}
