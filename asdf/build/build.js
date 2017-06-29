(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Particle2 = require("./Particle.js");

var _Particle3 = _interopRequireDefault(_Particle2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineParticle = function (_Particle) {
    _inherits(LineParticle, _Particle);

    function LineParticle(o) {
        _classCallCheck(this, LineParticle);

        var _this = _possibleConstructorReturn(this, (LineParticle.__proto__ || Object.getPrototypeOf(LineParticle)).call(this, o));

        _this.mass = 0.5;
        return _this;
    }

    _createClass(LineParticle, [{
        key: "display",
        value: function display() {
            var white = map(this.lifespan, 0, 50, 0, 1);
            ctx.save();
            ctx.translate(this.x - this.r / 2, this.y - this.r / 2);
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255,255,255," + white + ")";
            ctx.moveTo(0, 0);
            ctx.lineTo(random(-10, 10), random(-10, 10));
            // ctx.strokeRect(0,0,this.r,this.r);
            ctx.stroke();
            ctx.restore();
        }
    }]);

    return LineParticle;
}(_Particle3.default);

module.exports = LineParticle;

},{"./Particle.js":2}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
    function Particle(o) {
        _classCallCheck(this, Particle);

        this.location = o.location;
        this.velocity = o.velocity;
        this.acceleration = o.acceleration;
        this.mass = o.mass;
        this.r = o.radius;
        this.lifespan = 100;
        this.cont = 5;
        this.delta = Math.random();
        this.theta = Math.random();
        this.gamma = Math.random();
    }

    _createClass(Particle, [{
        key: 'update',
        value: function update() {

            /* Update data */
            this.cont += Math.random();
            this.delta += this.cont;
            this.theta = Math.sin(rad(this.delta));
            this.gamma = Math.cos(rad(this.delta));
            this.lifespan -= 0.2;

            /* Apply forces */
            this.applyForce(wind);
            this.applyForce(new Vector(0, gravity.x * this.mass));
            // this.applyEdgeForces(); NO FUNCA!

            /* Update location and reset values*/
            this.velocity.add(this.acceleration);
            // this.velocity.mult(0.5);
            // this.checkEdges();
            this.location.add(this.velocity);
            this.acceleration.mult(0);
        }
    }, {
        key: 'display',
        value: function display() {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fill();
        }
    }, {
        key: 'checkEdges',
        value: function checkEdges() {
            if (this.location.x > width) {
                this.location.x = width;
                this.velocity.x *= -1;
            }
            if (this.location.y >= height) {
                this.location.y = height;
                this.velocity.y *= -1;
            }
        }
    }, {
        key: 'applyEdgeForces',
        value: function applyEdgeForces() {
            this.applyForce(edgess[0].clone().div(this.location.y));
            this.applyForce(edgess[1].clone().div(width - this.location.x));
            this.applyForce(edgess[2].clone().div(height - this.location.y));
            this.applyForce(edgess[3].clone().div(this.location.x));
        }
    }, {
        key: 'isDead',
        value: function isDead() {
            return this.lifespan <= 0;
        }
    }, {
        key: 'run',
        value: function run() {
            this.update();
            this.display();
        }
    }, {
        key: 'applyForce',
        value: function applyForce(force) {
            force = new Vector(force.x, force.y).div(this.mass);
            this.acceleration.add(force);
        }
    }, {
        key: 'remove',
        value: function remove() {
            delete this;
        }
    }, {
        key: 'x',
        get: function get() {
            return this.location.x;
        }
    }, {
        key: 'y',
        get: function get() {
            return this.location.y;
        }
    }]);

    return Particle;
}();

module.exports = Particle;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Particle = require('./Particle.js');

var _Particle2 = _interopRequireDefault(_Particle);

var _SmokeParticle = require('./SmokeParticle.js');

var _SmokeParticle2 = _interopRequireDefault(_SmokeParticle);

var _LineParticle = require('./LineParticle.js');

var _LineParticle2 = _interopRequireDefault(_LineParticle);

var _PointParticle = require('./PointParticle.js');

var _PointParticle2 = _interopRequireDefault(_PointParticle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParticleSystem = function () {
    function ParticleSystem(origin, maxAmount, type) {
        _classCallCheck(this, ParticleSystem);

        this.particles = [];
        this.origin = origin;
        this.flag = true;
        this.maxAmount = maxAmount || 10;
        this.velocity = new Vector(1, 1);
        this.acceleration = new Vector(0, 0);
        this.cont = 5;
        this.delta = 0.0;
        this.theta = 0.0;
        this.gamma = 0.0;
        this.type = type;
        this.particleTypes = {
            'point': _PointParticle2.default,
            'line': _LineParticle2.default,
            'smoke': _SmokeParticle2.default
        };
        this.run();
    }

    _createClass(ParticleSystem, [{
        key: 'run',
        value: function run() {
            this.update();
            this.display();
        }
    }, {
        key: 'update',
        value: function update() {
            var _this = this;

            // this.delta += this.cont;
            // this.theta = Math.sin(rad(this.delta));
            // this.gamma = Math.cos(rad(this.delta));
            // this.acceleration = new Vector(this.gamma,this.theta);
            // this.velocity.add(this.acceleration);
            // this.origin.add(this.velocity);
            // this.velocity.mult(0);
            if (this.particles.length <= this.maxAmount && this.flag) {
                this.particles.push(new this.particleTypes[this.type]({
                    location: this.origin.clone(),
                    velocity: new Vector(map(Math.random(), 0, 1, -1, 1), -0.01),
                    acceleration: new Vector(map(Math.random(), 0, 1, -0.02, 0.01), -0.01),
                    radius: Math.floor(map(Math.random(), 0, 1, 20, 50))
                }));
            } else {
                this.flag = false;
            }
            this.particles.forEach(function (p, i) {
                if (p.isDead()) {
                    p.remove();
                    _this.particles.splice(i, 1);
                }
            });
        }
    }, {
        key: 'display',
        value: function display() {
            this.particles.forEach(function (p, i) {
                p.run();
            });
        }
    }, {
        key: 'remove',
        value: function remove() {
            delete this;
        }
    }]);

    return ParticleSystem;
}();

module.exports = ParticleSystem;

},{"./LineParticle.js":1,"./Particle.js":2,"./PointParticle.js":4,"./SmokeParticle.js":5}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Particle2 = require("./Particle.js");

var _Particle3 = _interopRequireDefault(_Particle2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PointParticle = function (_Particle) {
    _inherits(PointParticle, _Particle);

    function PointParticle(o) {
        _classCallCheck(this, PointParticle);

        var _this = _possibleConstructorReturn(this, (PointParticle.__proto__ || Object.getPrototypeOf(PointParticle)).call(this, o));

        _this.mass = 10;
        return _this;
    }

    _createClass(PointParticle, [{
        key: "display",
        value: function display() {
            ctx.save();
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }]);

    return PointParticle;
}(_Particle3.default);

module.exports = PointParticle;

},{"./Particle.js":2}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Particle2 = require('./Particle.js');

var _Particle3 = _interopRequireDefault(_Particle2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SmokeParticle = function (_Particle) {
    _inherits(SmokeParticle, _Particle);

    function SmokeParticle(o) {
        _classCallCheck(this, SmokeParticle);

        var _this = _possibleConstructorReturn(this, (SmokeParticle.__proto__ || Object.getPrototypeOf(SmokeParticle)).call(this, o));

        var self = _this;
        _this.imgLoaded = false;
        _this.sprite = new Image();
        _this.sprite.onload = function () {
            self.imgLoaded = true;
        };
        _this.sprite.src = 'img/smoke_256.png';
        return _this;
    }

    _createClass(SmokeParticle, [{
        key: 'display',
        value: function display() {
            if (!this.imgLoaded) return;
            ctx.save();
            ctx.translate(this.x - this.r / 2, this.y - this.r / 2);
            ctx.rotate(frameCount * 0.001 * Math.PI / 180);
            ctx.globalAlpha = map(this.lifespan, 0, 100, 0, 1);
            ctx.drawImage(this.sprite, 0, 0, this.r, this.r);
            ctx.restore();
        }
    }]);

    return SmokeParticle;
}(_Particle3.default);

module.exports = SmokeParticle;

},{"./Particle.js":2}],6:[function(require,module,exports){
'use strict';

var _ParticleSystem = require('./ParticleSystem.js');

var _ParticleSystem2 = _interopRequireDefault(_ParticleSystem);

require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// GLOBALS
window.frameCount = 0;

var reqId;
var img = new Image();
img.onload = function () {};
img.src = 'img/smoke_256.png';
function setup() {
    // ctx.globalCompositeBlending = 'screen';
    loop();
}
function update() {
    ++frameCount;
}
function render() {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, mouseX, mouseY, 30, 30);
}

var lastCalledFrame, fps, delta;
var fpsHTML = document.getElementById("fps");
function loop() {
    reqId = requestAnimationFrame(loop);
    update();
    render();
    if (!lastCalledFrame) {
        lastCalledFrame = Date.now();
        fps = 0;
        return;
    }
    delta = (Date.now() - lastCalledFrame) / 1000;
    fps = 1 / delta | 0;
    lastCalledFrame = Date.now();
    if (frameCount % 24 === 0) fpsHTML.innerHTML = fps;
}
setup();

},{"./ParticleSystem.js":3,"./utils.js":7}],7:[function(require,module,exports){
'use strict';

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
        key: 'add',
        value: function add(vector) {
            this.x += vector.x;
            this.y += vector.y;
            return this;
        }
    }, {
        key: 'sub',
        value: function sub(vector) {
            this.x -= vector.x;
            this.y -= vector.y;
            return this;
        }
    }, {
        key: 'mag',
        value: function mag() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }, {
        key: 'mult',
        value: function mult(num) {
            this.x *= num;
            this.y *= num;
            return this;
        }
    }, {
        key: 'clone',
        value: function clone() {
            return new Vector(this.x, this.y);
        }
    }, {
        key: 'div',
        value: function div(num) {
            this.x = this.x / num;
            this.y = this.y / num;
            return this;
        }
    }]);

    return Vector;
}();

window.Vector = Vector;
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

},{}]},{},[6])

//# sourceMappingURL=build.js.map
