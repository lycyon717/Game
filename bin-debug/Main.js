var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    p.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    };
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    p.createGameScene = function () {
        mouse.enable(this.stage);
        var map = new DrawTileMap();
        this.addChild(map);
        var gameSence = new Grid();
        var user = new User(100, 20, 30, 22);
        this.addChild(User.user.animationContainer);
        Grid.getCurrentScene().setPlayerPositionOnMap(1, 1);
        var task = new Task("Task01", "欢迎来到迷之游戏！这是新手任务！", TaskStatus.ACCEPTABLE, 0, npctalkcondition);
        var task2 = new Task("Task02", "去杀死悲伤的青蛙！", TaskStatus.UNACCEPTABLE, 1, killcondition);
        var npctalkcondition = new NPCTalkTaskCondition(task, "npc1", "npc2", task._name);
        var killcondition = new KillMonsterTaskCondition(task2, task2._total, "monster1", "npc2", "npc2", task2._name);
        var sceneservice = new SceneService();
        var npc1 = new NPC("NPC1_png", "npc1", this, sceneservice);
        var npc2 = new NPC("NPC2_png", "npc2", this, sceneservice);
        var taskPanel = new TaskPanel(sceneservice);
        var mockMonster = new FrogMonster(sceneservice, "monster1");
        npc1.x = 700;
        npc1.y = 800;
        npc2.x = 400;
        npc2.y = 400;
        mockMonster.x = 200;
        mockMonster.y = 800;
        taskPanel.x = this.stage.stageWidth - TaskPanel.TOTAL_WIDTH;
        taskPanel.y = (this.stage.stageHeight - TaskPanel.TOTAL_HEIGHT) / 2;
        this.addChild(npc1);
        this.addChild(npc2);
        this.addChild(taskPanel);
        this.addChild(mockMonster);
        var taskservice = new TaskService(sceneservice);
        taskservice.addTask(task);
        taskservice.addTask(task2);
        sceneservice.addTaskCondition(killcondition);
        sceneservice.addTaskCondition(npctalkcondition);
        sceneservice.addSceneStuff(npc1);
        sceneservice.addSceneStuff(npc2);
        sceneservice.addSceneStuff(taskPanel);
        var ui = new UI();
        this.addChild(ui);
        var user = new User(100, 50, 200, 0);
        User.user.setUI(ui);
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map