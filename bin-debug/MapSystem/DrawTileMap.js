var DrawTileMap = (function (_super) {
    __extends(DrawTileMap, _super);
    function DrawTileMap() {
        _super.call(this);
        this.pathCauculation = new AStar(); //采用的寻路算法
        this.init();
    }
    var d = __define,c=DrawTileMap,p=c.prototype;
    p.init = function () {
        var _this = this;
        var backGround = new egret.Bitmap();
        backGround.texture = RES.getRes("background1_png");
        this.addChild(backGround);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            var mapX = Math.floor(e.stageX / DrawTileMap.TILE_SIZE);
            var mapY = Math.floor(e.stageY / DrawTileMap.TILE_SIZE);
            if (config[Grid.getCurrentScene().getnumRows() * mapX + mapY].walkable) {
                _this.onNodeClick(Math.floor(e.stageX / DrawTileMap.TILE_SIZE), Math.floor(e.stageY / DrawTileMap.TILE_SIZE));
            }
        }, this);
    };
    p.onNodeClick = function (x, y) {
        User.user.commandList.cancel();
        if ((Math.floor(User.user.animationContainer.x / DrawTileMap.TILE_SIZE) != x ||
            Math.floor(User.user.animationContainer.y / DrawTileMap.TILE_SIZE) != y) &&
            !User.user.locked) {
            User.user.commandList.addCommand(new WalkCommand(x, y));
            User.user.commandList.execute();
        }
    };
    DrawTileMap.TILE_SIZE = 100; //每格地图实际大小
    return DrawTileMap;
}(egret.DisplayObjectContainer));
egret.registerClass(DrawTileMap,'DrawTileMap');
//# sourceMappingURL=DrawTileMap.js.map