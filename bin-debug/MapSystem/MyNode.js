var MyNode = (function () {
    function MyNode(x, y) {
        this.walkable = true;
        this.costMultiplier = 1.0;
        this.x = x;
        this.y = y;
    }
    var d = __define,c=MyNode,p=c.prototype;
    return MyNode;
}());
egret.registerClass(MyNode,'MyNode');
//# sourceMappingURL=MyNode.js.map