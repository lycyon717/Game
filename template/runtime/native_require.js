
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/mouse/mouse.js",
	"libs/modules/particle/particle.js",
	"bin-debug/Command/Command.js",
	"bin-debug/Command/CommandList.js",
	"bin-debug/Configs/EquipmentConfig.js",
	"bin-debug/Configs/MapConfig.js",
	"bin-debug/Configs/MonsterConfig.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/MapSystem/Astar.js",
	"bin-debug/MapSystem/DrawTileMap.js",
	"bin-debug/MapSystem/Grid.js",
	"bin-debug/MapSystem/MyNode.js",
	"bin-debug/PanelClasses/DialoguePanel.js",
	"bin-debug/PanelClasses/PackagePanel.js",
	"bin-debug/PanelClasses/TaskPanel.js",
	"bin-debug/PanelClasses/UI.js",
	"bin-debug/PanelClasses/UserPanel.js",
	"bin-debug/TaskSystem/EventEmitter.js",
	"bin-debug/TaskSystem/HP.js",
	"bin-debug/TaskSystem/TaskCondition.js",
	"bin-debug/TaskSystem/KillMonsterTaskCondition.js",
	"bin-debug/TaskSystem/Monsters.js",
	"bin-debug/TaskSystem/NPC.js",
	"bin-debug/TaskSystem/NPCTalkTaskCondition.js",
	"bin-debug/TaskSystem/SceneService.js",
	"bin-debug/TaskSystem/Task.js",
	"bin-debug/TaskSystem/TaskService.js",
	"bin-debug/UserSystem/Equipment.js",
	"bin-debug/UserSystem/Hero.js",
	"bin-debug/UserSystem/Jewel.js",
	"bin-debug/UserSystem/PropertiesDisplayFactory.js",
	"bin-debug/UserSystem/Property.js",
	"bin-debug/UserSystem/StateMachine.js",
	"bin-debug/UserSystem/User.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 1600,
		contentHeight: 1200,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};