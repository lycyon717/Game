

class UI extends egret.DisplayObjectContainer {


    private avater: egret.Bitmap;
    private packageButton: egret.Bitmap;

    private userPanel: UserPanel;
    private packagePanel;


    public constructor() {

        super();

        var stageH = Grid.getCurrentScene().getnumRows() * DrawTileMap.TILE_SIZE;
        var stageW = Grid.getCurrentScene().getnumCols() * DrawTileMap.TILE_SIZE;

        this.avater = new egret.Bitmap();
        this.avater.texture = RES.getRes("avater_png");
        this.addChild(this.avater);

        this.packageButton = new egret.Bitmap();
        this.packageButton.texture = RES.getRes("packagebutton_png");
        this.addChild(this.packageButton);

        this.packageButton.x = this.avater.width + 10;

        this.avater.touchEnabled = true;
        this.packageButton.touchEnabled = true;

        this.avater.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.onAvaterClick();
        }, this)

        this.packageButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.onPackageClick();
        }, this)


    }

    private onAvaterClick() {

        if (!this.userPanel) {
            this.userPanel = new UserPanel();
        }

        if (this.userPanel.parent) {

            this.removeChild(this.userPanel);
            User.user.locked--;

        } else {
            this.addChild(this.userPanel);
            User.user.locked++;
        }
    }

    private onPackageClick() {

        if (!this.packagePanel) {
            this.packagePanel = new PackagePanel();
        }

        if (this.packagePanel.parent) {

            this.removeChild(this.packagePanel);
            User.user.locked--;

        } else {
            this.addChild(this.packagePanel);
            User.user.locked++;
        }
    }

    public refresh() {


        if (!this.packagePanel) {
            this.packagePanel = new PackagePanel();
        }
        if (!this.userPanel) {
            this.userPanel = new UserPanel();
        }

        if (this.userPanel.parent) {
            this.removeChild(this.userPanel);
            User.user.locked--;
        }
        if (this.packagePanel.parent) {
            this.removeChild(this.packagePanel);
            User.user.locked--;
        }


        this.packagePanel = new PackagePanel();
        this.userPanel = new UserPanel();

        this.addChild(this.userPanel);
        this.addChild(this.packagePanel);

        User.user.locked += 2;
    }

    public gameOverReaction() {

        var overImage = new egret.Bitmap();
        overImage.texture = RES.getRes("gameover_png");

        overImage.touchEnabled = true;
        overImage.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            
        },this)

        this.addChild(overImage);

        

  
    }

}