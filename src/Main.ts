class Main extends egret.DisplayObjectContainer {

    private loadingView: LoadingUI;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    private onResourceLoadError(event: RES.ResourceEvent): void {

        console.warn("Group:" + event.groupName + " has failed to load");

        this.onResourceLoadComplete(event);
    }

    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private createGameScene(): void {

        mouse.enable(this.stage);


        var map = new DrawTileMap();
        this.addChild(map);

        var gameSence = new Grid();

        var user = new User(100, 20, 30, 22);
        this.addChild(User.user.animationContainer);
        Grid.getCurrentScene().setPlayerPositionOnMap(1, 1);


        var task: Task = new Task("Task01", "欢迎来到迷之游戏！这是新手任务！", TaskStatus.ACCEPTABLE, 0, npctalkcondition);
        var task2: Task = new Task("Task02", "去杀死悲伤的青蛙！", TaskStatus.UNACCEPTABLE, 1, killcondition);

        var npctalkcondition = new NPCTalkTaskCondition(task, "npc1", "npc2", task._name);

        var killcondition = new KillMonsterTaskCondition(task2, task2._total, "monster1", "npc2", "npc2", task2._name);

        var sceneservice: SceneService = new SceneService();

        var npc1: NPC = new NPC("NPC1_png", "npc1", this, sceneservice);
        var npc2: NPC = new NPC("NPC2_png", "npc2", this, sceneservice);

        var taskPanel = new TaskPanel(sceneservice);

        var mockMonster: DPSMonster = new FrogMonster(sceneservice, "monster1");
        


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


        var taskservice: TaskService = new TaskService(sceneservice);

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
    }
}