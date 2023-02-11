
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    start()
    {}

    onCollisionEnter(other, self) {
        cc.log("Collide ", other.name, self.name);
    }
}
