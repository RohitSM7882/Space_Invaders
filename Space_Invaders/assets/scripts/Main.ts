import Player from "./Player";
import Targets from "./Targets";
import StartScreen from "./StartScreen";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Canvas extends cc.Component {

    @property({type: Player})
    player: Player = null;

    @property({type: Targets})
    targets: Targets = null;

    @property({type: StartScreen})
    startScreen: StartScreen = null;

    onLoad()
    {
        this.player.shooterInteractionState(false);
        // this.targets.createTargets();
        this.startScreen.enablePlayButton(true);
        this.node.on("OnPlayButtonClicked", this.OnPlayButtonClicked.bind(this));
    }

    OnPlayButtonClicked()
    {
        this.player.shooterInteractionState(true);
        this.targets.createTargets();
    }
    
}
