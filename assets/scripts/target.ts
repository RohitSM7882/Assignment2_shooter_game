// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Prefab)
    target: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    spawnTargets(){
        var newTarget = cc.instantiate(this.target);
        var targetx = this.getRandom(-600,600);
        var targety = this.getRandom(70,300);
        newTarget.setPosition(targetx,targety);
        this.node.addChild(newTarget);
    }

    getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    onCollision(other,self){
        if(other.tag == 1){
            this.node.destroy();
        }
    }

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        cc.director.preloadScene("Game");
    }

    start () {

    }

    // update (dt) {}
}
