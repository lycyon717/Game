// TypeScript file
var Hero = (function () {
    function Hero(configId, heroHP, heroDefence, heroAtk, heroCrit) {
        this.equipments = [];
        this.properties = new Properties();
        this.level = 1;
        this.configId = configId;
        Hero.uId++;
        this.properties.createProperties(heroHP, heroDefence, heroAtk, heroCrit);
    }
    var d = __define,c=Hero,p=c.prototype;
    p.addLevel = function () {
        this.level++;
    };
    d(p, "fightPower"
        ,function () {
            var result = this.level * 100;
            this.equipments.forEach(function (equiptment) { return result += equiptment.fightPower; });
            return result;
        }
    );
    p.addEquipment = function (equipment) {
        this.equipments.push(equipment);
    };
    Hero.uId = 0;
    return Hero;
}());
egret.registerClass(Hero,'Hero');
//# sourceMappingURL=Hero.js.map