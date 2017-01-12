

class NPC extends egret.DisplayObjectContainer implements Observer {

    public _id: string;

    ////NPC贴图大小
    public static NPC_HEIGHT = 120;
    ////NPC任务标示大小
    public static EMOJI_SIZE = 25;
    ////NPC与任务标识间距
    public static NPC_EMOJI_DISTANCE = 10;

    ////NPC任务标识图片
    private emoji: egret.Bitmap;
    ////NPC图片
    private bitMapNPC: egret.Bitmap;


    ////NPC对话框
    private _panel: DialoguePanel;
    ////NPC所在舞台
    private _stage: egret.DisplayObjectContainer;
    ////场景控制
    private _sceneService: SceneService;

    public constructor(bitMapName: string, id: string, stage: egret.DisplayObjectContainer, sceneService: SceneService) {

        super();

        this.touchEnabled = true;

        this._id = id;
        this._panel = new DialoguePanel(stage);
        this._stage = stage;
        this._sceneService = sceneService;

        this.bitMapNPC = new egret.Bitmap;
        this.bitMapNPC.texture = RES.getRes(bitMapName);

        ////NPC图片位置
        var scaleNum = NPC.NPC_HEIGHT / this.bitMapNPC.height;                       //缩放系数
        this.bitMapNPC.scaleX = scaleNum;
        this.bitMapNPC.scaleY = scaleNum;
        this.bitMapNPC.y = NPC.EMOJI_SIZE + NPC.NPC_EMOJI_DISTANCE;                  //NPC位置应在任务图标下方

        ////标识位置
        this.emoji = new egret.Bitmap;
        this.emoji.height = NPC.EMOJI_SIZE;
        this.emoji.width = NPC.EMOJI_SIZE;
        this.emoji.x = (this.bitMapNPC.width * scaleNum - NPC.EMOJI_SIZE) / 2;

        this.addChild(this.bitMapNPC);

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.onNPCClick();
        }, this);
    }

    onChange() {

        var taskcondition = this.rule(this._sceneService.taskConditionList);

        if (taskcondition == null) {

            this.emoji.texture = null;
            return ErrorCode.MISSING_TASK;
        }

        if (taskcondition._fromNpcId == this._id && taskcondition._task.getTaskStatus() == TaskStatus.ACCEPTABLE) {     //此NPC有可接任务

            this.emoji.texture = RES.getRes("emoji1_png");
            this.addChild(this.emoji);
        } else if (taskcondition._toNpcId == this._id && taskcondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT) {   //此NPC有可交任务

            this.emoji.texture = RES.getRes("emoji2_png");
            this.addChild(this.emoji);
        } else {                           //此NPC无任务

            this.emoji.texture = null;
        }
    }

    onNPCClick() {

        if (User.user.locked) {
            return;
        }

        var nodeX = Math.floor(this.x / DrawTileMap.TILE_SIZE);
        var nodeY = Math.floor(this.y / DrawTileMap.TILE_SIZE);

        User.user.commandList.cancel();

        if (User.user.animationContainer.x != (nodeX - 1) * DrawTileMap.TILE_SIZE ||
            User.user.animationContainer.y != nodeY * DrawTileMap.TILE_SIZE) {

            User.user.commandList.addCommand(new WalkCommand(nodeX - 1, nodeY));
        }

        var taskcondition = this.rule(this._sceneService.taskConditionList);

        if (taskcondition == null) {
            console.log("No Mission On this NPC");
            User.user.commandList.execute();
            return;
        }

        ////添加命令////

        User.user.commandList.addCommand(new TalkCommand(this.stage, this._panel));
        User.user.commandList.execute();
        ///////////////



        ////修改对话框按钮内容////


        this._panel.textField.text = taskcondition._desc;
        this._panel.taskcondition = taskcondition;

        if (taskcondition._task.getTaskStatus() == TaskStatus.ACCEPTABLE) {
            this._panel.buttonText.text = "接受";
        }
        else if (taskcondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT) {
            this._panel.buttonText.text = "完成";
        }
        else {
            this._panel.buttonText.text = "继续";
        }
        ////////////////////
    }

    ////返回当前可交或可接任务条件
    private rule = (taskConditionList: TaskCondition[]): TaskCondition => {

        for (let taskCondition of taskConditionList) {
            if ((taskCondition._task.getTaskStatus() == TaskStatus.ACCEPTABLE && taskCondition._fromNpcId == this._id) ||
                (taskCondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT && taskCondition._toNpcId == this._id)) {
                return taskCondition;
            }
        }
        return null;
    }

}