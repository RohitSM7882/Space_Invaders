import Player from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Canvas extends cc.Component {

    @property({type: Player})
    player: Player = null;

    onLoad()
    {
        this.player.shooterInteractionState(true);

        // this.scheduleOnce(()=>{
        //     this.player.shooterInteractionState(true);
        // }, 3);
    }
    

}
