
interface IMonster {

    attack();
    takeDamage(damage: number);
}


abstract class DPSMonster extends egret.DisplayObjectContainer implements IMonster {

    protected _sceneService: SceneService;

    public _monsterID: string;

    public hp: HP;

    public defence: number;

    public atk: number;

    public damageNumber: egret.TextField;


    public constructor(sceneService: SceneService, monsterID: string) {

        super();

        this._monsterID = monsterID;
        this._sceneService = sceneService;

        this.damageNumber = new egret.TextField();
        this.addChild(this.damageNumber);

        for (var i = 0; i < monsterConfig.length; i++) {

            if (monsterID == monsterConfig[i].monsterID) {

                this.hp = new HP(monsterConfig[i].maxHP, monsterConfig[i].maxHP)
                this.addChild(this.hp);
                this.defence = monsterConfig[i].defence;
                this.atk = monsterConfig[i].atk;
                break;
            }
        }
    }

    onMonsterClick() { };

    giveReward() { };

    attack() { }

    takeDamage(damage: number) {

        var crit = Math.random() * 100
        if (crit < User.user.getTotalValueByName(PropertyName.CRITICAL) / 10) {

            this.hp.down(damage * 2 - this.defence);

            this.damageNumber.text = "暴击 -" + (damage * 2 - this.defence);



        } else {

            this.hp.down(damage - this.defence);

            this.damageNumber.text = "-" + (damage - this.defence);
        }

        egret.setTimeout(() => {
            this.damageNumber.text = " ";
        }, this, 500);


        if (this.hp._currentHP <= 0) {
            egret.setTimeout(this.death, this, 500);
        }
    }

    death() {

    }
}


class FrogMonster extends DPSMonster {

    public monsterTexture: egret.Bitmap;

    public textField: egret.TextField;

    public constructor(sceneService: SceneService, monsterID: string) {

        super(sceneService, monsterID);

        this.touchEnabled = true;

        this.monsterTexture = new egret.Bitmap();
        this.monsterTexture.texture = RES.getRes("monster_png");
        this.addChild(this.monsterTexture);

        this.damageNumber.y = -100;

        this.textField = new egret.TextField();
        this.textField.text = "悲伤的青蛙";
        this.textField.x = 10;
        this.textField.y = -30;
        this.addChild(this.textField);

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMonsterClick, this);

        var internal = setInterval(() => {

            if (Math.abs(User.user.animationContainer.x - this.x) <= DrawTileMap.TILE_SIZE * 3 &&
                Math.abs(User.user.animationContainer.y - this.y) <= DrawTileMap.TILE_SIZE * 3) {
                this.attack();
            }
        }, 2000)


    }


    findTaskConditionByRule() {

        var condition;

        for (var i = 0; i < this._sceneService.taskConditionList.length; i++) {

            if (this._sceneService.taskConditionList[i]["_monsterID"] == this._monsterID &&
                this._sceneService.taskConditionList[i]._task.getTaskStatus() == TaskStatus.DURING) {

                condition = this._sceneService.taskConditionList[i];
                break;
            }
        }
        return condition;
    }


    onMonsterClick() {

        if (User.user.locked) {
            return;
        }

        var nodeX = Math.floor(this.x / DrawTileMap.TILE_SIZE);
        var nodeY = Math.floor(this.y / DrawTileMap.TILE_SIZE);

        User.user.commandList.cancel();

        if (User.user.animationContainer.x != (nodeX + 2) * DrawTileMap.TILE_SIZE ||
            User.user.animationContainer.y != nodeY * DrawTileMap.TILE_SIZE) {

            User.user.commandList.addCommand(new WalkCommand(nodeX + 2, nodeY));
        }

        var condition = this.findTaskConditionByRule();

        if (condition) {
            User.user.commandList.addCommand(new FightCommand(this));
        }

        User.user.commandList.execute();
    }

    death() {

        var condition = this.findTaskConditionByRule();

        if (!condition) {
            console.error("critical error! Monster Die!");
            return;
        }

        condition.onSubmit();

        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMonsterClick, this);

        this.removeChild(this.hp);

        this.monsterTexture.texture = RES.getRes("reward_png");

        this.textField.text = " "

        this.giveReward();

        this.removeChild(this.damageNumber);
    }

    giveReward() {

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pickupEquipment, this);
    }

    attack() {

        var condition = this.findTaskConditionByRule();
        if (!condition) {
            return;
        }

        var texture = RES.getRes("newParticle_png");
        var config = RES.getRes("newParticle_json");
        var system = new particle.GravityParticleSystem(texture, config);
        system.start();

        this.addChild(system);
        system.x = 120;
        system.y = 70


        var targetPoint: egret.Point = this.globalToLocal(User.user.animationContainer.x, User.user.animationContainer.y);

        egret.Tween.get(system).to({ x: targetPoint.x, y: targetPoint.y }, 500, egret.Ease.sineIn).call(() => {
            system.stop();
            this.removeChild(system);
            User.user.takeDamage(this.atk);
        });
    }

    private pickupEquipment() {

        this.textField.text = " ";
        this.monsterTexture.texture = null;
        if (this.hasEventListener) {

            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pickupEquipment, this);
        }

        User.user.addEquipmentInPackage(new Equipment(1000));
        User.user.addEquipmentInPackage(new Equipment(1001));
        User.user.addEquipmentInPackage(new Equipment(1002));
        User.user.addEquipmentInPackage(new Equipment(1003));
        User.user.addEquipmentInPackage(new Equipment(1004));
        User.user.addEquipmentInPackage(new Equipment(1005));


        egret.setTimeout(() => {

            var dragon = new DragonMonster(this._sceneService, "monster2");

            dragon.x = 200;
            dragon.y = 800;
            this.parent.addChild(dragon);
            this.parent.swapChildren(this, dragon);

        }, this, 8000)

    }
}


class DragonMonster extends DPSMonster {

    public monsterTexture: egret.Bitmap;

    public textField: egret.TextField;


    public internal;

    public constructor(sceneService: SceneService, monsterID: string) {

        super(sceneService, monsterID);

        this.touchEnabled = true;

        this.monsterTexture = new egret.Bitmap();
        this.monsterTexture.texture = RES.getRes("dragon_png");
        this.addChild(this.monsterTexture);


        this.damageNumber.y = -100;


        this.textField = new egret.TextField();
        this.textField.text = "电龙";
        this.textField.x = 10;
        this.textField.y = -50;
        this.addChild(this.textField);

        this.hp.x = -40;

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMonsterClick, this);

        this.internal = setInterval(() => {

            if (Math.abs(User.user.animationContainer.x - this.x) <= DrawTileMap.TILE_SIZE * 3 &&
                Math.abs(User.user.animationContainer.y - this.y) <= DrawTileMap.TILE_SIZE * 3) {
                this.attack();
            }
        }, 2000)
    }

    onMonsterClick() {

        if (User.user.locked) {
            return;
        }

        var nodeX = Math.floor(this.x / DrawTileMap.TILE_SIZE);
        var nodeY = Math.floor(this.y / DrawTileMap.TILE_SIZE);

        User.user.commandList.cancel();

        if (User.user.animationContainer.x != (nodeX + 2) * DrawTileMap.TILE_SIZE ||
            User.user.animationContainer.y != nodeY * DrawTileMap.TILE_SIZE) {

            User.user.commandList.addCommand(new WalkCommand(nodeX + 2, nodeY));
        }

        User.user.commandList.addCommand(new FightCommand(this));

        User.user.commandList.execute();
    }

    death() {

        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMonsterClick, this);

        this.removeChild(this.hp);

        this.monsterTexture.texture = null;

        clearInterval(this.internal);

        this.textField.text = " "

        this.giveReward();

        this.removeChild(this.damageNumber);
    }

    giveReward() {

    }

    attack() {

        var texture = RES.getRes("newParticle_png");
        var config = RES.getRes("newParticle_json");
        var system = new particle.GravityParticleSystem(texture, config);
        system.start();

        this.addChild(system);
        system.x = 120;
        system.y = 70


        var targetPoint: egret.Point = this.globalToLocal(User.user.animationContainer.x, User.user.animationContainer.y);

        egret.Tween.get(system).to({ x: targetPoint.x, y: targetPoint.y }, 500, egret.Ease.sineIn).call(() => {
            system.stop();
            this.removeChild(system);
            User.user.takeDamage(this.atk);
            console.log(this.atk);
        });
    }
}