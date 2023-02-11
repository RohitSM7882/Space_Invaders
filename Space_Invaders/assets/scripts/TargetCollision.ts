
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onCollisionEnter(_other, _self) {
        if(_other.name == "bullet<BoxCollider>"){
            _self.getComponent(cc.RigidBody).active = false;
            _self.getComponent(cc.Animation).play('explosion-01');
            _self.destroy();
        }
        else if(_other.name == "Shooter<PolygonCollider>"){
            _self.getComponent(cc.RigidBody).active = false;
            _self.getComponent(cc.Animation).play('explosion-01');
            _self.destroy();

            let _duration = _other.getComponent(cc.Animation).play('explosion-01').duration;
            cc.find("Canvas/Player").emit("onShooterDestroy", _duration);
        }
    }

}
