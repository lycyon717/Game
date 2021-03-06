var PackagePanel = (function (_super) {
    __extends(PackagePanel, _super);
    function PackagePanel() {
        _super.call(this);
        this.basicPanel = new egret.DisplayObjectContainer();
        this.packagePanel = new egret.Bitmap();
        this.packagePanel.texture = RES.getRes("packagepanel_png");
        this.basicPanel.addChild(this.packagePanel);
        this.basicPanel.x = 20;
        this.basicPanel.y = 800;
        var x = 30;
        var y = 105;
        var _loop_1 = function(equipment) {
            for (i = 0; i < equipmentConfig.length; i++) {
                if (equipment._configID == equipmentConfig[i].configID) {
                    texName = equipmentConfig[i].texture;
                    break;
                }
            }
            Etexture = new egret.Bitmap();
            Etexture.texture = RES.getRes(texName);
            Etexture.width = 50;
            Etexture.height = 50;
            Etexture.x = x;
            Etexture.y = y;
            Etexture.touchEnabled = true;
            Etexture.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                User.user.addEquipment(equipment);
                User.user.removeEquipmentInPackage(equipment);
            }, this_1);
            this_1.basicPanel.addChild(Etexture);
            x += 56;
            if (x >= 700) {
                y += 56;
            }
        };
        var this_1 = this;
        var i, texName, Etexture;
        for (var _i = 0, _a = User.user.package; _i < _a.length; _i++) {
            var equipment = _a[_i];
            _loop_1(equipment);
        }
        this.addChild(this.basicPanel);
    }
    var d = __define,c=PackagePanel,p=c.prototype;
    return PackagePanel;
}(egret.DisplayObjectContainer));
egret.registerClass(PackagePanel,'PackagePanel');
//# sourceMappingURL=PackagePanel.js.map