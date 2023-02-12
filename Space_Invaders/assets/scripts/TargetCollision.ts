
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type: cc.AudioClip})
    aud_Explosion: cc.AudioClip = null;

    onCollisionEnter(_other, _self) {
        if(_other.name == "bullet<BoxCollider>"){
            _self.getComponent(cc.RigidBody).active = false;
            _self.getComponent(cc.Animation).play('explosion-01');
            cc.audioEngine.play(this.aud_Explosion, false, 0.5);
            _self.destroy();
            cc.find("Canvas/TopInfo").emit("onTargetDestroy");
        }
        else if(_other.name == "Shooter<PolygonCollider>"){
            _self.getComponent(cc.RigidBody).active = false;
            _self.getComponent(cc.Animation).play('explosion-01');
            _self.destroy();
            cc.audioEngine.play(this.aud_Explosion, false, 0.5);

            let _duration = _other.getComponent(cc.Animation).play('explosion-01').duration;
            _other.destroy();
            cc.find("Canvas/Player").emit("onShooterDestroy", _duration);
            cc.find("Canvas/TopInfo").emit("onShooterDestroy");
        }
    }

}
