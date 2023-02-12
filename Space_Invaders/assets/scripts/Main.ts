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

    @property(cc.Node)
    tutorial: cc.Node = null;

    @property({type: cc.AudioClip})
    aud_Bgm: cc.AudioClip = null;

    private gameOver: boolean = false;

    onLoad()
    {
        this.player.shooterInteractionState(false);
        this.startScreen.enablePlayButton(true);
        this.node.on("OnPlayButtonClicked", this.OnPlayButtonClicked.bind(this));
        this.node.on("onGameOver", this.onGameOver.bind(this));
        this.node.on("onInteractionStart", this.enableTutorial.bind(this, false));
        cc.audioEngine.play(this.aud_Bgm, true, 0.05);
    }

    OnPlayButtonClicked()
    {
        this.player.shooterInteractionState(true);
        this.targets.createTargets();
        this.enableTutorial(true);

        //Scheduler to end game after 30s if game is not over
        this.scheduleOnce(()=>{
            if(!this.gameOver)
                this.onGameOver();
        }, 30);
    }

    onGameOver()
    {
        this.gameOver = true;
        this.player.shooterInteractionState(false);
        this.targets.stopTargets();
        this.node.getChildByName("Background").getComponent(cc.Animation).stop();
        this.endScreen.enableEndScreen();
    }

    enableTutorial(_enable: boolean)
    {
        if(_enable)
        {
            this.tutorial.active = true;
            this.tutorial.runAction(cc.fadeIn(0.5));
        }
        else
        {
            this.tutorial.runAction(cc.fadeOut(0.5));
            this.scheduleOnce(()=>{
                this.tutorial.active = false;
            }, 0.5);
        }
    }
}
