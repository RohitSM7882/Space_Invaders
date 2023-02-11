
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onCollisionEnter(other, self) {
        this.node.destroy();
    }

}
