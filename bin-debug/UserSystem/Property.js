// TypeScript file
var Property = (function () {
    function Property(name, value, isRate) {
        this.name = name;
        this.value = value;
        this.isRate = isRate;
    }
    var d = __define,c=Property,p=c.prototype;
    return Property;
}());
egret.registerClass(Property,'Property');
var Properties = (function () {
    function Properties() {
        this.all = [];
    }
    var d = __define,c=Properties,p=c.prototype;
    p.getPropertyByName = function (Pname) {
        return this.all[Pname].value;
    };
    p.createProperties = function (HP, Defence, Atk, Crit) {
        this.all[PropertyName.HP] = new Property("生命值", HP, false);
        this.all[PropertyName.DENFENCE] = new Property("防御力", Defence, false);
        this.all[PropertyName.ATTACK] = new Property("攻击力", Atk, false);
        this.all[PropertyName.CRITICAL] = new Property("暴击率", Crit, true);
    };
    return Properties;
}());
egret.registerClass(Properties,'Properties');
var PropertyName;
(function (PropertyName) {
    PropertyName[PropertyName["HP"] = 0] = "HP";
    PropertyName[PropertyName["DENFENCE"] = 1] = "DENFENCE";
    PropertyName[PropertyName["ATTACK"] = 2] = "ATTACK";
    PropertyName[PropertyName["CRITICAL"] = 3] = "CRITICAL";
})(PropertyName || (PropertyName = {}));
//# sourceMappingURL=Property.js.map