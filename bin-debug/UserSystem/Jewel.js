// TypeScript file
var Jewel = (function () {
    function Jewel(jewelHP, jewelDefence, jewelAtk, jewelCrit) {
        this.level = 1;
        this.properties = new Properties();
        this.properties.createProperties(jewelHP, jewelDefence, jewelAtk, jewelCrit);
    }
    var d = __define,c=Jewel,p=c.prototype;
    p.levelUp = function () {
        this.level++;
    };
    p.getTotalValueByName = function (propertyName) {
        return this.properties.getPropertyByName(propertyName);
    };
    d(p, "fightPower"
        ,function () {
            var result = this.level * 30;
            return result;
        }
    );
    return Jewel;
}());
egret.registerClass(Jewel,'Jewel');
//# sourceMappingURL=Jewel.js.map