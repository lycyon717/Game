

////任务面板，始终显示在舞台
class TaskPanel extends egret.DisplayObjectContainer implements Observer {


    //任务说明
    private textField: egret.TextField;
    //任务面板图片
    private taskPanelTexture: egret.Bitmap;
    //场景控制器
    private _sceneService: SceneService;

    public static TOTAL_WIDTH;
    public static TOTAL_HEIGHT;

    public constructor(sceneService: SceneService) {

        super();

        this._sceneService = sceneService;

        this.textField = new egret.TextField();


        this.taskPanelTexture = new egret.Bitmap();
        this.taskPanelTexture.texture = RES.getRes("taskpanel_png");

        TaskPanel.TOTAL_HEIGHT = this.taskPanelTexture.height;
        TaskPanel.TOTAL_WIDTH = this.taskPanelTexture.width;

        this.textField.width = TaskPanel.TOTAL_WIDTH;

        this.addChild(this.taskPanelTexture);
        this.addChild(this.textField);
    }

    onChange() {

        var count = 0;

        for (let taskCondition of this._sceneService.taskConditionList) {

            if (taskCondition._task.getTaskStatus() == TaskStatus.DURING ||
                taskCondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT) {
                    
                count++;
                this.textField.text = taskCondition._task.getTaskId() + ": " + taskCondition._task.getName();;
            }
        }
        
        if (count == 0) {
            this.textField.text = " ";
        }
    }
}