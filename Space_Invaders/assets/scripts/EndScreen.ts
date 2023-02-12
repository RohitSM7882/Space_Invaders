import Canvas from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EndScreen extends cc.Component {

    @property(cc.Node)
    canvas: cc.Node = null;

    @property(cc.Button)
    private installButton: cc.Button = null;

    @property({type: cc.AudioClip})
    aud_Btn: cc.AudioClip = null;

    enableEndScreen()
    {
        this.node.active = true;
        this.node.runAction(cc.fadeIn(0.2));

        cc.tween(this.node.getChildByName("Title"))
            .to(0.3, {y: 150, opacity: 255, scale: 1})
            .start();

        cc.tween(this.installButton.node)
            .to(0.3, {scale: 1}, {easing: "quadOut"})
            .call(()=>{
                this.enableInstallButton(true);
            })
            .start();
    }

    enableInstallButton(_enable: boolean)
    {
        this.installButton.interactable = _enable;
        
        if(_enable)
            cc.tween(this.installButton.node)
                .repeat(100,
                    cc.tween()
                        .to(0.5, {scale: 0.9}, {easing: "quadInOut"})
                        .to(0.5, {scale: 1.1}, {easing: "quadInOut"})
                )
                .start();
    }

    onClickInstallBtn()
    {
        cc.audioEngine.play(this.aud_Btn, false, 0.05);

        cc.tween(this.node.getChildByName('cover_letter'))
            .to(0.5, {scale: 0.4}, {easing: "expoOut"})
            .start();
    }

}
