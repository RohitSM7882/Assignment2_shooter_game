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

    @property(cc.Prefab)
    bullet: cc.Prefab = null;

    @property(cc.Label)
    display: cc.Label = null;

    @property
    posX: number = 0;
    posY: number = 0;
    tarobjects = new Array(10);
    tarlist = new Array(10);
    count: number = 0;
    angleD = new Array(10);

    // LIFE-CYCLE CALLBACKS:

    spawnTargets(){
            var newTarget = cc.instantiate(this.target);
            var targetx = this.getRandom(-600,600);
            var targety = this.getRandom(70,300);
            newTarget.setPosition(targetx,targety);
            this.node.addChild(newTarget);
            var playerx = this.node.getChildByName('Player').position.x;
            var playery = this.node.getChildByName('Player').position.y;

            //Euclidean distance is used to find the nearest point wrt player
            var res = Math.sqrt(((targetx-playerx)*(targetx-playerx)) + ((playery-targety)*(playery-targety)))
            var arr = [targetx,targety,newTarget,res];
            return arr;
    }

    getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }


    convert(x,y){
        var targetpos = cc.v2(x,y);
        var playerx = this.node.getChildByName('Player').position.x;
        var playery = this.node.getChildByName('Player').position.y;
        var playerPosition = cc.v2(playerx,playery);

        var angle = cc.misc.radiansToDegrees(targetpos.signAngle(playerPosition));
        angle = (-1 * angle)-150;
        return angle;

    }

    killTarget(){

        console.log(this.tarlist[this.count][0],'========',this.tarlist[this.count][1]);

        var targetpos = cc.v2(this.tarlist[this.count][0],this.tarlist[this.count][1]);
        var player = this.node.getChildByName('Player');
        player.angle = this.angleD[this.count];

        var newBullet = cc.instantiate(this.bullet);
        newBullet.setPosition(this.node.getChildByName('Player').position.x,this.node.getChildByName('Player').position.y);
        this.node.addChild(newBullet);

        this.posX = targetpos.x;
        this.posY = targetpos.y;

        var actionBy = cc.moveTo(0.2, cc.v2(this.posX,this.posY));
        var destruction = cc.callFunc(function(){
                newBullet.destroy();
                this.tarobjects[this.count].destroy();
                this.count = this.count+1;
                if(this.count == 10)
                    this.display.string = "CONGRATULATIONS!!!";
        },this);

        var sequence = cc.sequence(actionBy,destruction);
        newBullet.runAction(sequence);

    }
    
    onLoad () {
        var i:number = 0;
        var temp = new Array(10);
        for(i=0;i<10;i++){
            temp[i] = this.spawnTargets();
        }
        
        temp.sort(function (a,b) {
            return a[3] - b[3];
        });

        for(i=0;i<10;i++){    
            this.tarlist[i] = [temp[i][0],temp[i][1]];
            this.tarobjects[i] = temp[i][2];
        }

        for(i=0;i<10;i++){
            this.angleD[i] = this.convert(this.tarlist[i][0],this.tarlist[i][1]);
            console.log(this.angleD[i]);
        }

    }

    start () {

    }

    // update (dt) {}
}
