var HP = (function (_super) {
    __extends(HP, _super);
    function HP(maxHP, currentHP) {
        _super.call(this);
        this.maxHP = maxHP;
        this.currentHP = currentHP;
        this.healthBar = new egret.Shape();
        this.healthBar.graphics.beginFill(0x00ff00, 1);
        var trueLength = (this.currentHP / this.maxHP) * HP.healthBarLength;
        this.healthBar.graphics.drawRect(0, 0, trueLength, HP.healthBarHeight);
        this.healthBar.graphics.endFill();
        this.addChild(this.healthBar);
    }
    var d = __define,c=HP,p=c.prototype;
    p.up = function (heal) {
        this.currentHP += heal;
        if (this.currentHP > this.maxHP) {
            this.currentHP = this.maxHP;
        }
        this.repaint();
    };
    p.upTotal = function (increase) {
        this.maxHP += increase;
    };
    p.down = function (damage) {
        this.currentHP -= damage;
        if (this.currentHP < 0) {
            this.currentHP = 0;
        }
        this.repaint();
    };
    p.downTotal = function (decrease) {
        this.maxHP -= decrease;
        if (this.maxHP <= 0) {
            this.maxHP += decrease;
            console.log("eerror HP!");
        }
    };
    d(p, "_currentHP"
        ,function () {
            return this.currentHP;
        }
    );
    p.repaint = function () {
        if (this.healthBar.parent) {
            this.removeChild(this.healthBar);
            this.healthBar = new egret.Shape();
            this.healthBar.graphics.beginFill(0x00ff00, 1);
            var trueLength = (this.currentHP / this.maxHP) * HP.healthBarLength;
            this.healthBar.graphics.drawRect(0, 0, trueLength, HP.healthBarHeight);
            this.healthBar.graphics.endFill();
            this.addChild(this.healthBar);
        }
        else {
            console.log("no healthbar");
        }
    };
    HP.healthBarLength = 180;
    HP.healthBarHeight = 20;
    return HP;
}(egret.DisplayObjectContainer));
egret.registerClass(HP,'HP');
//# sourceMappingURL=HP.js.map