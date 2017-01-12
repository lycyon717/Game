var Machine = (function () {
    function Machine() {
        this.towardLeft = false;
        this.standing = new StandState(this);
        this.running = new RunState(this);
        this.fight = new FightState(this);
        this.state = this.standing;
        this.state.onEnter();
    }
    var d = __define,c=Machine,p=c.prototype;
    p.Idel = function () {
        if (this.state != this.standing) {
            this.state.onExit();
            this.state = this.standing;
            this.state.onEnter();
        }
        else {
            console.log("allready standing!");
        }
    };
    p.runState = function () {
        this.state.onExit();
        this.state = this.running;
        this.state.onEnter();
    };
    p.fightState = function () {
        if (this.state != this.fight) {
            this.state.onExit();
            this.state = this.fight;
            this.state.onEnter();
        }
        else {
            console.log("allready fight!");
        }
    };
    p.setState = function (state) {
        this.state = state;
    };
    p.getState = function () {
        return this.state;
    };
    Machine.Speed = 0.125;
    return Machine;
}());
egret.registerClass(Machine,'Machine');
var StandState = (function () {
    function StandState(machine) {
        this.machine = machine;
    }
    var d = __define,c=StandState,p=c.prototype;
    p.onEnter = function () {
        if (this.machine.towardLeft) {
            User.user.changeAnimationByName("向左站立");
        }
        else {
            User.user.changeAnimationByName("站立");
        }
        this.machine.Idel();
    };
    p.onExit = function () {
        console.log("Exit Idel");
    };
    return StandState;
}());
egret.registerClass(StandState,'StandState',["State"]);
var RunState = (function () {
    function RunState(machine) {
        this.machine = machine;
    }
    var d = __define,c=RunState,p=c.prototype;
    p.onEnter = function () {
        if (this.machine.towardLeft) {
            User.user.changeAnimationByName("向左奔跑");
        }
        else {
            User.user.changeAnimationByName("奔跑");
        }
        this.machine.setState(this.machine.running);
    };
    p.onExit = function () {
        console.log("Exit Running");
    };
    return RunState;
}());
egret.registerClass(RunState,'RunState',["State"]);
var FightState = (function () {
    function FightState(machine) {
        this.machine = machine;
    }
    var d = __define,c=FightState,p=c.prototype;
    p.onEnter = function () {
        this.machine.setState(this.machine.fight);
        User.user.changeAnimationByName("向左断踢");
    };
    p.onExit = function () {
        console.log("Exit Running");
    };
    return FightState;
}());
egret.registerClass(FightState,'FightState',["State"]);
//# sourceMappingURL=StateMachine.js.map