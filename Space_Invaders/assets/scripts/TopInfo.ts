
const {ccclass, property} = cc._decorator;

@ccclass
export default class TopInfo extends cc.Component {

    private score: number = 0;
    private scoreCard: cc.Node = null;
    private LifeCount: cc.Node = null;

    onLoad()
    {
        this.scoreCard = this.node.getChildByName('ScoreCard');
        this.LifeCount = this.node.getChildByName('LifeCount');
        this.scoreCard.getChildByName('label').getComponent(cc.Label).string = "Score: " + this.score;
        this.node.on("onTargetDestroy", this.incrementScore.bind(this));
        this.node.on("onShooterDestroy", this.decrementLife.bind(this));
    }

    incrementScore()
    {
        this.score += 1;
        this.scoreCard.getChildByName('label').getComponent(cc.Label).string = "Score: " + this.score;
    }

    decrementLife()
    {
        if(this.LifeCount.getChildByName('chances').children.length > 0)
            this.LifeCount.getChildByName('chances').children[this.LifeCount.getChildByName('chances').children.length - 1].destroy();
    }

    getLifeCount()
    {
        return this.LifeCount.getChildByName('chances').children.length;
    }
}
