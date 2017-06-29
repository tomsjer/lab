(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = require('./Vector.js');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function midPointBtw(p1, p2) {
    return {
        x: p1.x + (p2.x - p1.x) / 2,
        y: p1.y + (p2.y - p1.y) / 2
    };
}

var Arrow = function () {
    function Arrow() {
        _classCallCheck(this, Arrow);

        this.prevPos = new _Vector2.default(0, 0);
        this.pos = new _Vector2.default(mouseX, mouseY);
        this.dir = new _Vector2.default(0, 0);
        this.length = new _Vector2.default(50, 50);
        this.origin = new _Vector2.default(mouseX, mouseY);
        this.width = 50;
        this.posta = 0;
        this.rot = 0;
        this.painting = false;
        this.points = [];
        this.bindEvents();
    }

    _createClass(Arrow, [{
        key: 'update',
        value: function update() {

            this.origin = new _Vector2.default(this.pos.x, this.pos.y);
            this.dir = new _Vector2.default(mouseX, mouseY);
            this.dir.sub(this.origin).normalize();
            this.pos = new _Vector2.default(mouseX, mouseY);
            this.rot = this.getRot();
            this.posta = this.dir.add(this.pos);
        }
    }, {
        key: 'display',
        value: function display() {
            var self = this;
            // self.peine();

            ctx.strokeStyle = 'white';
            ctx.lineWidth = "1px";
            for (var i = -50; i <= 50; i += 25) {
                var delta = 0 + i;
                var gamma = 0;
                var delta2 = 0 + i * 1.2;
                var gamma2 = 0;

                ctx.beginPath();
                ctx.moveTo(self.points[0].x, self.points[0].y + i);
                this.points.forEach(function (p) {
                    gamma = Math.sin(delta * Math.PI / 180) * 0.5;
                    delta += 1;
                    // gamma2 = Math.sin(delta * Math.PI/180) * 0.8;
                    // delta2 += 1.5;
                    var r = (gamma + gamma2) / 2;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.r);
                    ctx.lineTo(0, i * gamma);
                    ctx.restore();
                });
                ctx.stroke();
            }
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var self = this;
            window.addEventListener('mousedown', function (e) {
                self.update();
                self.painting = !self.painting;
                self.points = [];
                self.points.push({
                    x: e.clientX,
                    y: e.clientY,
                    r: self.rot
                });
            });
            window.addEventListener('mousemove', function (e) {
                self.update();
                if (self.painting) self.points.push({
                    x: e.clientX,
                    y: e.clientY,
                    r: self.rot
                });
            });
            window.addEventListener('mouseup', function (e) {
                // self.painting = false;
                self.points = [{ x: e.clientX, y: e.clientY, r: self.rot }];
            });
        }
    }, {
        key: 'getRot',
        value: function getRot() {
            if (!this.dir.mag()) return this.rot;
            var r = Math.atan2(this.dir.y, this.dir.x);
            // console.log('x: ' + this.dir.x + 'y: ' + this.dir.y + ' | mag(): '+this.dir.mag() + ' | rot: '+r)
            return r;
        }
    }, {
        key: 'peine',
        value: function peine() {

            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            ctx.rotate(this.rot);
            ctx.strokeStyle = "red";
            ctx.strokeRect(0, -50, 2, 100);
            ctx.strokeStyle = 'white';
            for (var i = -40; i <= 40; i += 10) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(-50, i);
                ctx.stroke();
                ctx.restore();
            }
            ctx.restore();
        }
    }]);

    return Arrow;
}();

exports.default = Arrow;

},{"./Vector.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
    function Vector(x, y) {
        _classCallCheck(this, Vector);

        this.x = x;
        this.y = y;

        return this;
    }

    _createClass(Vector, [{
        key: "add",
        value: function add(vector) {
            this.x += vector.x;
            this.y += vector.y;
            return this;
        }
    }, {
        key: "sub",
        value: function sub(vector) {
            this.x -= vector.x;
            this.y -= vector.y;
            return this;
        }
    }, {
        key: "mag",
        value: function mag() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }, {
        key: "mult",
        value: function mult(num) {
            this.x *= num;
            this.y *= num;
            return this;
        }
    }, {
        key: "clone",
        value: function clone() {
            return new Vector(this.x, this.y);
        }
    }, {
        key: "div",
        value: function div(num) {
            this.x = this.x / num;
            this.y = this.y / num;
            return this;
        }
    }, {
        key: "normalize",
        value: function normalize() {
            var m = this.mag();
            if (m === 0) return this;
            this.x = this.x / m;
            this.y = this.y / m;
            return this;
        }
    }]);

    return Vector;
}();

exports.default = Vector;

},{}],3:[function(require,module,exports){
'use strict';

require('./utils.js');

var _Arrow = require('./Arrow.js');

var _Arrow2 = _interopRequireDefault(_Arrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// GLOBALS
window.frameCount = 0;


var reqId,
    arrow = new _Arrow2.default();

function setup() {
    loop();
    ctx.lineJoin = ctx.lineCap = 'round';
}
function update() {
    ++frameCount;
    // arrow.update();
}
function render() {
    ctx.fillStyle = "rgba(0,0,0,.25)";
    ctx.fillRect(0, 0, width, height);
    // ctx.clearRect(0,0,width,height);
    if (arrow.painting) arrow.display();
}

function loop() {
    reqId = requestAnimationFrame(loop);
    update();
    render();
}
setup();

},{"./Arrow.js":1,"./utils.js":4}],4:[function(require,module,exports){
'use strict';

window.canvas = document.getElementById('canvas');
window.ctx = canvas.getContext('2d');

window.onresize = function () {
    canvas.width = window.width = window.innerWidth;
    canvas.height = window.height = window.innerHeight;
};
window.onresize();

window.cont = 0.0;

window.rad = function (deg) {
    return deg * Math.PI / 180;
};

window.mouseX = 0;
window.mouseY = 0;
window.onmousemove = function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
};
window.map = function (a, b, c, d, f) {
    return d + (f - d) * ((a - b) / (c - b));
};
window.random = function (min, max) {
    return map(Math.random(), 0, 1, min, max);
};

},{}]},{},[3])

//# sourceMappingURL=build.js.map
