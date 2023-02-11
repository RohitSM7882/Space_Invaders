import Player from "./Player";
import Targets from "./Targets";
import StartScreen from "./StartScreen";
import EndScreen from "./EndScreen";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Canvas extends cc.Component {

    @property({type: Player})
    player: Player = null;

    @property({type: Targets})
    targets: Targets = null;

    @property({type: StartScreen})
    startScreen: StartScreen = null;

    @property({type: EndScreen})
    endScreen: EndScreen = null;

    onLoad()
    {
        this.player.shooterInteractionState(false);
        // this.targets.createTargets();
        this.startScreen.enablePlayButton(true);
        this.node.on("OnPlayButtonClicked", this.OnPlayButtonClicked.bind(this));
        this.node.on("onGameOver", this.onGameOver.bind(this));
    }

    OnPlayButtonClicked()
    {
        this.player.shooterInteractionState(true);
        this.targets.createTargets();
    }
    

    onGameOver()
    {
        this.player.shooterInteractionState(false);
        this.unschedule(this.targets.spawnTargets);
        this.node.getChildByName("Background").getComponent(cc.Animation).stop();
        this.endScreen.enableEndScreen();
    }
}
