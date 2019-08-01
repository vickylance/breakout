// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Ball.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Ball =
/** @class */
function () {
  function Ball(game) {
    this.position = {
      x: 10,
      y: 10
    };
    this.speed = {
      x: 80,
      y: 80
    };
    this.game = game;
    this.sprite = this.game.spritesheets["main"].getImage("ball");
    this.height = this.sprite.height;
    this.width = this.sprite.width;
    this.scale = 1;
  }

  Ball.prototype.update = function (deltaTime) {
    this.position.x += this.speed.x / deltaTime;
    this.position.y += this.speed.y / deltaTime;

    if (this.position.x + this.width > this.game.width || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    if (this.position.y + this.height > this.game.height || this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
  };

  Ball.prototype.draw = function (ctx) {
    var spr = this.game.spritesheets["main"];
    ctx.drawImage(spr.image, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, this.position.x, this.position.y, this.width * this.scale, this.height * this.scale);
  };

  return Ball;
}();

exports["default"] = Ball;
},{}],"src/Vector2.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Vector2 =
/** @class */
function () {
  function Vector2(x, y) {
    this.x = x;
    this.y = y;
  }

  return Vector2;
}();

exports["default"] = Vector2;
},{}],"src/Paddle.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var Vector2_1 = __importDefault(require("./Vector2"));

var Paddle =
/** @class */
function () {
  function Paddle(game) {
    this.game = game;
    this.sprite = this.game.spritesheets["main"].getImage("paddle");
    this.height = this.sprite.height;
    this.width = this.sprite.width;
    this.position = new Vector2_1["default"](this.game.width / 2 - this.width / 2, this.game.height - this.height - 10);
  }

  Paddle.prototype.draw = function (ctx) {
    var spr = this.game.spritesheets["main"];
    ctx.drawImage(spr.image, this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height, this.position.x, this.position.y, this.width, this.height);
  };

  Paddle.prototype.update = function (deltaTime) {
    this.position.x = this.game.input.mousePos.x;
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.game.width) this.position.x = this.game.width - this.width;
  };

  return Paddle;
}();

exports["default"] = Paddle;
},{"./Vector2":"src/Vector2.ts"}],"src/Input.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var Vector2_1 = __importDefault(require("./Vector2"));

var Input =
/** @class */
function () {
  function Input() {
    var _this = this;

    this.mouseMove = function (evt) {
      _this.mousePos = new Vector2_1["default"](evt.offsetX, evt.offsetY);
    };

    this.mousePos = new Vector2_1["default"](0, 0);
    document.getElementById("game").addEventListener("mousemove", this.mouseMove);
  }

  return Input;
}();

exports["default"] = Input;
},{"./Vector2":"src/Vector2.ts"}],"src/Game.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var Ball_1 = __importDefault(require("./Ball"));

var Paddle_1 = __importDefault(require("./Paddle"));

var Input_1 = __importDefault(require("./Input"));

var Game =
/** @class */
function () {
  function Game(id, options) {
    this.width = 600; // default width

    this.height = 300; // default height

    this.spritesheets = {};

    if (options) {
      this.options = options;
    } // get the canvas or create a new one


    if (id && document.getElementById(id)) {
      this.canvas = document.getElementById(id);
    } else {
      this.canvas = document.createElement("canvas");
      document.appendChild(this.canvas);
    } // set the game size


    if (this.options) {
      this.canvas.width = this.options.width;
      this.canvas.height = this.options.height;
    }

    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.getBoundingClientRect().width;
    this.height = this.canvas.getBoundingClientRect().height;
  }

  Game.prototype.loadSpritesheet = function (spr) {
    this.spritesheets[spr.name] = spr;
  };

  Game.prototype.start = function () {
    this.input = new Input_1["default"]();
    this.ball = new Ball_1["default"](this);
    this.paddle = new Paddle_1["default"](this);
    console.log("start"); // add the game objects to the array

    this.gameObjects = [this.ball, this.paddle];
  };

  Game.prototype.update = function (deltaTime) {
    this.gameObjects.forEach(function (gameObject) {
      gameObject.update(deltaTime);
    });
  };

  Game.prototype.draw = function () {
    var _this = this;

    this.gameObjects.forEach(function (gameObject) {
      gameObject.draw(_this.ctx);
    });
  };

  return Game;
}();

exports["default"] = Game;
},{"./Ball":"src/Ball.ts","./Paddle":"src/Paddle.ts","./Input":"src/Input.ts"}],"src/SpriteSheet.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var SpriteSheet =
/** @class */
function () {
  function SpriteSheet(image, data, name) {
    var tempImg = new Image();
    tempImg.src = image;
    this.image = tempImg;
    this.data = data;
    this.name = name;
  }

  SpriteSheet.prototype.getImage = function (name) {
    for (var key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        var elem = this.data[key];

        if (elem["name"] === name) {
          return elem;
        }
      }
    }
  };

  return SpriteSheet;
}();

exports["default"] = SpriteSheet;
},{}],"src/assets/breakout.png":[function(require,module,exports) {
module.exports = "/breakout.6ce3e761.png";
},{}],"src/assets/breakout.json":[function(require,module,exports) {
module.exports = [{
  "name": "paddle",
  "x": 0,
  "y": 0,
  "width": 64,
  "height": 16
}, {
  "name": "brick",
  "x": 0,
  "y": 17,
  "width": 32,
  "height": 16
}, {
  "name": "heart",
  "x": 33,
  "y": 17,
  "width": 10,
  "height": 9
}, {
  "name": "empty_heart",
  "x": 44,
  "y": 17,
  "width": 10,
  "height": 9
}, {
  "name": "ball",
  "x": 0,
  "y": 33,
  "width": 8,
  "height": 8
}];
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

exports.__esModule = true;

var Game_1 = __importDefault(require("./Game"));

var SpriteSheet_1 = __importDefault(require("./SpriteSheet")); // import assets


var BreakoutSpritesheet = __importStar(require("./assets/breakout.png"));

var BreakoutData = __importStar(require("./assets/breakout.json"));

Math.__proto__.toRad = function (deg) {
  return deg * (Math.PI / 180);
};

Math.__proto__.toDeg = function (rad) {
  return rad * (180 / Math.PI);
};

var game = new Game_1["default"]("game", {
  width: 400,
  height: 400
});
game.loadSpritesheet(new SpriteSheet_1["default"](BreakoutSpritesheet["default"], BreakoutData, "main"));
game.start();
var lastTime = 0;

function gameLoop(timeStamp) {
  var deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  game.ctx.clearRect(0, 0, game.width, game.height);
  game.update(deltaTime);
  game.draw();
  requestAnimationFrame(gameLoop); // run the game loop at 60 fps
}

requestAnimationFrame(gameLoop); // start the game loop
},{"./Game":"src/Game.ts","./SpriteSheet":"src/SpriteSheet.ts","./assets/breakout.png":"src/assets/breakout.png","./assets/breakout.json":"src/assets/breakout.json"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51218" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map