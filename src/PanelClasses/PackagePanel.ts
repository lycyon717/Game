

class PackagePanel extends egret.DisplayObjectContainer {


    private basicPanel: egret.DisplayObjectContainer;
    private packagePanel: egret.Bitmap;


    public constructor() {

        super();

        this.basicPanel = new egret.DisplayObjectContainer();

        this.packagePanel = new egret.Bitmap();
        this.packagePanel.texture = RES.getRes("packagepanel_png");

        this.basicPanel.addChild(this.packagePanel);
        this.basicPanel.x = 20;
        this.basicPanel.y = 800;

        var x = 30;
        var y = 105;

        for (let equipment of User.user.package) {

            for (var i = 0; i < equipmentConfig.length; i++) {
                if (equipment._configID == equipmentConfig[i].configID) {
                    var texName = equipmentConfig[i].texture;
                    break;
                }
            }

            var Etexture = new egret.Bitmap();
            Etexture.texture = RES.getRes(texName);
            Etexture.width = 50;
            Etexture.height = 50;
            Etexture.x = x;
            Etexture.y = y;

            Etexture.touchEnabled = true;

            Etexture.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {

                User.user.addEquipment(equipment);
                User.user.removeEquipmentInPackage(equipment);
            }, this)

            this.basicPanel.addChild(Etexture);

            x += 56;
            if (x >= 700) {
                y += 56;
            }
        }

        this.addChild(this.basicPanel);
    }
}