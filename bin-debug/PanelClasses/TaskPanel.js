////任务面板，始终显示在舞台
var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel(sceneService) {
        _super.call(this);
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
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function () {
        var count = 0;
        for (var _i = 0, _a = this._sceneService.taskConditionList; _i < _a.length; _i++) {
            var taskCondition = _a[_i];
            if (taskCondition._task.getTaskStatus() == TaskStatus.DURING ||
                taskCondition._task.getTaskStatus() == TaskStatus.CAN_SUBMIT) {
                count++;
                this.textField.text = taskCondition._task.getTaskId() + ": " + taskCondition._task.getName();
                ;
            }
        }
        if (count == 0) {
            this.textField.text = " ";
        }
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
//# sourceMappingURL=TaskPanel.js.map