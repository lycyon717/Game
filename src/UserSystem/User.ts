// TypeScript file

class User {

    private level = 1;

    properties = new Properties();

    public static user: User;

    public __cachefightPower;

    public locked: number = 0;



    ////////////////动画//////////////
    public animationContainer = new egret.DisplayObjectContainer();

    public stateMachine;
    /////状态机

    private animationClipFactory: egret.MovieClipDataFactory;

    public animationClip: egret.MovieClip;
    //////////////////////////////////

    public commandList = new CommandList();
    /////命令模式

    public UI: UI;

    public hp: HP;


    heroesPool: Hero[] = [];
    heroesInTeam: Hero[] = [];
    equipments: Equipment[] = [];

    package: Equipment[] = [];


    constructor(userHP: number, userDefence: number, userAtk: number, userCrit: number) {

        if (!User.user) {

            User.user = this;

            var data = RES.getRes("animation_json");
            var texture = RES.getRes("animation_png");
            this.animationClipFactory = new egret.MovieClipDataFactory(data, texture);

            this.animationClip = new egret.MovieClip(this.animationClipFactory.generateMovieClipData("站立"));

            this.animationContainer.addChild(this.animationClip);

            this.animationClip.gotoAndPlay(1, -1);

            this.stateMachine = new Machine();

            this.properties.createProperties(userHP, userDefence, userAtk, userCrit);

            this.hp = new HP(userHP, userHP);
        }
        return User.user;
    }

    setUI(ui: UI) {

        this.UI = ui;
        this.hp.x = 120;
        this.hp.y = 20;
        this.UI.addChild(this.hp);
    }

    takeDamage(damage: number) {

        var result = damage - User.user.getTotalValueByName(PropertyName.DENFENCE);
        if (result <= 0) {
            return;
        }

        this.hp.down(result);
        if (this.hp._currentHP <= 0) {
            this.death();
        }
    }

    death() {
        this.UI.gameOverReaction();
    }

    addHero(hero: Hero) {

        this.heroesPool.push(hero);
    }

    addEquipment(equipment: Equipment) {

        this.equipments.push(equipment);

        this.hp.upTotal(equipment.getTotalValueByName(PropertyName.HP));
        this.hp.up(equipment.getTotalValueByName(PropertyName.HP));

        if (this.UI) {
            this.UI.refresh();
        }
    }


    removeEquipment(equipment: Equipment) {

        for (var i = 0; i < this.equipments.length; i++) {

            if (equipment._configID == this.equipments[i]._configID) {
                this.equipments.splice(i, 1);
                this.hp.downTotal(equipment.getTotalValueByName(PropertyName.HP));
                this.hp.down(equipment.getTotalValueByName(PropertyName.HP));
                break;
            }
        }
        if (this.UI) {
            this.UI.refresh()
        }
    }

    addEquipmentInPackage(equipment: Equipment) {

        this.package.push(equipment);
        if (this.UI) {
            this.UI.refresh();
        }
    }

    removeEquipmentInPackage(equipment: Equipment) {

        for (var i = 0; i < this.package.length; i++) {
            if (equipment._configID == this.package[i]._configID) {
                this.package.splice(i, 1);
            }
        }
        if (this.UI) {
            this.UI.refresh();
        }
    }

    //heroUpAndDown(heroUp, heroDown) {}

    levelUp() {
        this.level++;
    }

    get fightPower() {

        var result = this.level * 100;
        this.heroesInTeam.forEach(hero => result += hero.fightPower);
        this.equipments.forEach(equip => result += equip.fightPower);

        return result;
    }

    getTotalValueByName(propertyName: PropertyName) {

        var result = this.properties.getPropertyByName(propertyName);
        this.equipments.forEach(equip => result += equip.getTotalValueByName(propertyName));
        return result;
    }

    changeAnimationByName(name: string) {

        this.animationContainer.removeChild(this.animationClip);
        this.animationClip = new egret.MovieClip(this.animationClipFactory.generateMovieClipData(name));
        this.animationClip.gotoAndPlay(1, -1);
        this.animationContainer.addChild(this.animationClip);
    }
}