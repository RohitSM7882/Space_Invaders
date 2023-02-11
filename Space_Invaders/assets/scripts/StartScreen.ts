import Canvas from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartScreen extends cc.Component {

    @property(cc.Node)
    canvas: cc.Node = null;

    @property(cc.Button)
    playButton: cc.Button = null;

    onLoad()
    {
        // this.enablePlayButton(false);
    }

    enablePlayButton(_enable: boolean)
    {
        this.playButton.interactable = _enable;
        
        if(_enable)
            cc.tween(this.playButton.node)
                .repeat(100,
                    cc.tween()
                        .to(0.5, {scale: 0.9}, {easing: "quadInOut"})
                        .to(0.5, {scale: 1.1}, {easing: "quadInOut"})
                )
                .start();
    }

    onClickPlayButton(){
        this.canvas.emit('OnPlayButtonClicked');
        this.enablePlayButton(false);

        cc.tween(this.node.getChildByName("Title"))
            .to(0.3, {y: 1200, opacity: 0, scale: 3})
            .start();

        cc.tween(this.playButton.node)
            .to(0.3, {scale: 0}, {easing: "quadOut"})
            .call(()=>{
                this.playButton.node.active = false;
                cc.tween(this.node)
                    .to(0.1, {opacity: 0})
                    .call(()=>{
                        this.node.active = false;
                    })
                    .start();
            })
            .start();
    }
}
