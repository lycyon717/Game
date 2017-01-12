// TypeScript file
var Equipment = (function () {
    function Equipment(configID) {
        this.jewels = [];
        this.properties = new Properties();
        for (var i = 0; i < equipmentConfig.length; i++) {
            if (equipmentConfig[i].configID == configID) {
                this._configID = configID;
                this.properties.createProperties(equipmentConfig[i].equipmentHP, equipmentConfig[i].equipmentDefence, equipmentConfig[i].equipmentAtk, equipmentConfig[i].equipmentCrit);
            }
        }
        if (!this._configID) {
            console.log("没有这件装备！！！");
        }
    }
    var d = __define,c=Equipment,p=c.prototype;
    d(p, "fightPower"
        ,function () {
            var result = 100;
            this.jewels.forEach(function (jewel) { return result += jewel.fightPower; });
            return result;
        }
    );
    p.getTotalValueByName = function (propertyName) {
        var result = this.properties.getPropertyByName(propertyName);
        this.jewels.forEach(function (jewel) { return result += jewel.getTotalValueByName(propertyName); });
        return result;
    };
    p.addJewel = function (jewel) {
        this.jewels.push(jewel);
    };
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
//# sourceMappingURL=Equipment.js.map