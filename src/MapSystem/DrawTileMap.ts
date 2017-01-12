

class DrawTileMap extends egret.DisplayObjectContainer {

	public static TILE_SIZE = 100;             //每格地图实际大小

	public pathCauculation = new AStar();      //采用的寻路算法

	public constructor() {

		super();
		this.init();
	}

	init() {

		var backGround = new egret.Bitmap();
		backGround.texture = RES.getRes("background1_png");
		this.addChild(backGround);

		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {

			var mapX = Math.floor(e.stageX / DrawTileMap.TILE_SIZE);
			var mapY = Math.floor(e.stageY / DrawTileMap.TILE_SIZE);

			if (config[Grid.getCurrentScene().getnumRows() * mapX + mapY].walkable) {

				this.onNodeClick(Math.floor(e.stageX / DrawTileMap.TILE_SIZE), Math.floor(e.stageY / DrawTileMap.TILE_SIZE));
			}
		}, this);
	}

	private onNodeClick(x: number, y: number) {

		User.user.commandList.cancel();

		if ((Math.floor(User.user.animationContainer.x / DrawTileMap.TILE_SIZE) != x ||
			Math.floor(User.user.animationContainer.y / DrawTileMap.TILE_SIZE) != y) &&
			!User.user.locked) {

			User.user.commandList.addCommand(new WalkCommand(x, y));
			User.user.commandList.execute();
		}
	}
}