import Player from "./Player";
import Targets from "./Targets";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Canvas extends cc.Component {

    @property({type: Player})
    player: Player = null;

    @property({type: Targets})
    targets: Targets = null;

    onLoad()
    {
        this.player.shooterInteractionState(false);
    }
    

}
