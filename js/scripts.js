let speed = 30;
let text = ["If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough."]
let currentTheme = 0;
let textSplitChars = (text[0].split(''));
let decimalBackground = 0;
let increment = 10;
let SPEED;
let previousSpeed = speed;
let typingText = document.querySelector('.typingText');
let themeChangeButton = document.querySelector('#themeChange');
document.querySelector(".switch input").addEventListener('change', (e) => {
    instantDeath = e.target.checked;
});
let instantDeath = document.querySelector(".switch input").checked;
let themes = [
    {
        "speed": 1, "speedAdjFactor": 0, "density": 2, "shape": "circle", "warpEffect": true, "warpEffectLength": 4, "depthFade": true, "starSize": 5, "backgroundColor": "#1F74C9", "starColor": "#FFFFFF",
    },
    {
        "speed": 2, "speedAdjFactor": 0, "density": 1, "shape": "circle", "warpEffect": true, "warpEffectLength": 4, "depthFade": true, "starSize": 5, "backgroundColor": "hsl(263,45%,7%)", "starColor": "#FFFFFF"
    },
    {
        "speed": 2, "speedAdjFactor": 0, "density": 2, "shape": "circle", "warpEffect": true, "warpEffectLength": 5, "depthFade": true, "starSize": 4, "backgroundColor": "#202020", "starColor": "#FF0000"
    },
    {
        "speed": 2, "speedAdjFactor": 0, "density": 2, "shape": "circle", "warpEffect": false, "warpEffectLength": 4, "depthFade": false, "starSize": 15, "backgroundColor": "hsl(263,45%,7%)", "starColor": "#FFFFFF"
    },
]

let typingSpeed = document.querySelector('.typingSpeed');
let acceleration = 0.001;
let characters;

// typingText.innerHTML = text[0];
let timeStart;
let currentIndex = 0;
let intervalSet = null;
let regoButton = document.querySelector(".regoButton");
regoButton.addEventListener('click', () => {
    init();
})
let inputBox = document.querySelector(".inputBox");
inputBox.value = "";
inputBox.focus();

inputBox.addEventListener('input', (e) => {
    e.preventDefault();
    if (e.data === text[0][currentIndex]) {
        if (currentIndex === 0) {
            timeStart = Date.now();
        }
        currentIndex++;
        if (intervalSet === null) {
            intervalSet = setInterval(() => {
                previousSpeed = speed;
                speed = parseInt(((currentIndex + 1) / 5) * 60000 / (Date.now() - timeStart));
                typingSpeed.innerHTML = speed + " WPM";
                if (speed <= previousSpeed && speed !== 0) {
                    if (SPEED > 2)
                        SPEED -= 0.4;
                    // if (acceleration > 0.0200001)
                    //     acceleration -= 0.020;
                    // acceleration = parseFloat(acceleration).toFixed(3);
                } else {
                    if (SPEED <= 20)
                        SPEED += 3;
                    // acceleration = parseFloat(acceleration).toFixed(3);
                }
            }, 16);
        }
        if (e.data === " ") {
            inputBox.value = "";
        }
    } else if (instantDeath) {
        clearInterval(intervalSet);
        inputBox.value = "";
        inputBox.blur();
        inputBox.style.display = "none";
        regoButton.style.display = "flex";
        return
    }

    if (currentIndex === text[0].length) {
        clearInterval(intervalSet);
        typingText.childNodes[currentIndex - 1].classList.remove("currentCursor")
        typingText.childNodes[currentIndex - 1].classList.add("typedOut");
        inputBox.value = "";
        inputBox.blur();
        inputBox.style.display = "none";
        regoButton.style.display = "flex";
        return;
    }
    typingText.childNodes[currentIndex - 1].classList.remove("currentCursor")
    typingText.childNodes[currentIndex].classList.add("currentCursor")
    typingText.childNodes[currentIndex - 1].classList.add("typedOut");

})


const init = () => {
    console.log(currentTheme);
    typingText.innerHTML = "";
    characters = textSplitChars.map(el => {
        const span = document.createElement("span");
        span.innerText = el;
        typingText.appendChild(span);
        return span;
    })
    typingText.childNodes[0].classList.add("currentCursor")
    regoButton.style.display = "none";
    inputBox.style.display = "unset";
    typingSpeed.innerHTML = 0 + " WPM";
    inputBox.value = "";
    inputBox.focus();
    SPEED = themes[((currentTheme) % themes.length)].speed;
    intervalSet = null;
    currentIndex = 0;
}



init();

// THREEE JS STUFF

// let scene, camera, renderer, stars, starGeo, star;

// function init() {

//     scene = new THREE.Scene();

//     camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
//     camera.position.z = 1;
//     camera.rotation.x = Math.PI / 2;

//     renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     starGeo = new THREE.Geometry();
//     for (let i = 0; i < 15000; i++) {
//         star = new THREE.Vector3(
//             Math.random() * 600 - 300,
//             Math.random() * 600 - 300,
//             Math.random() * 600 - 300
//         );
//         star.velocity = 0;
//         star.acceleration = acceleration;
//         starGeo.vertices.push(star);
//     }

//     let sprite = new THREE.TextureLoader().load('star.png');
//     let starMaterial = new THREE.PointsMaterial({
//         color: 0xaaaaaa,
//         size: 0.7,
//         map: sprite
//     });

//     stars = new THREE.Points(starGeo, starMaterial);
//     scene.add(stars);

//     window.addEventListener("resize", onWindowResize, false);

//     animate();
// }
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }
// function animate() {
//     starGeo.vertices.forEach(p => {
//         p.velocity += acceleration
//         p.y -= p.velocity;

//         if (p.y < -200) {
//             p.y = Math.random() * (600 - 300);
//             p.velocity = 0;
//         }
//     });
//     starGeo.verticesNeedUpdate = true;
//     stars.rotation.y += 0.002;

//     renderer.render(scene, camera);
//     requestAnimationFrame(animate);
// }
// init();


// warpspeed stuff

window.requestAnimationFrame = window.requestAnimationFrame || (function (callback, element) { setTimeout(callback, 1000 / 60); });

function timeStamp() {
    if (window.performance.now) return window.performance.now(); else return Date.now();
}

function isVisible(el) {
    var r = el.getBoundingClientRect();
    return r.top + r.height >= 0 && r.left + r.width >= 0 && r.bottom - r.height <= (window.innerHeight || document.documentElement.clientHeight) && r.right - r.width <= (window.innerWidth || document.documentElement.clientWidth);
}

function Star(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = 0.5 + Math.random();
}

function WarpSpeed(targetId, config) {
    this.targetId = targetId;
    if (WarpSpeed.RUNNING_INSTANCES == undefined) WarpSpeed.RUNNING_INSTANCES = {};
    if (WarpSpeed.RUNNING_INSTANCES[targetId]) { WarpSpeed.RUNNING_INSTANCES[targetId].destroy(); }
    config = config || {};
    SPEED = config.speed;
    if (typeof config == "string") try { config = JSON.parse(config); } catch (e) { config = {} }
    this.SPEED = config.speed == undefined || config.speed < 0 ? 0.7 : config.speed;
    this.TARGET_SPEED = config.targetSpeed == undefined || config.targetSpeed < 0 ? this.SPEED : config.targetSpeed;
    this.SPEED_ADJ_FACTOR = config.speedAdjFactor == undefined ? 0.03 : config.speedAdjFactor < 0 ? 0 : config.speedAdjFactor > 1 ? 1 : config.speedAdjFactor;
    this.DENSITY = config.density == undefined || config.density <= 0 ? 0.7 : config.density;
    this.USE_CIRCLES = config.shape == undefined ? true : config.shape == "circle";
    this.DEPTH_ALPHA = config.depthFade == undefined ? true : config.depthFade;
    this.WARP_EFFECT = config.warpEffect == undefined ? true : config.warpEffect;
    this.WARP_EFFECT_LENGTH = config.warpEffectLength == undefined ? 5 : config.warpEffectLength < 0 ? 0 : config.warpEffectLength;
    this.STAR_SCALE = config.starSize == undefined || config.starSize <= 0 ? 3 : config.starSize;
    this.BACKGROUND_COLOR = config.backgroundColor == undefined ? "hsl(263,45%,7%)" : config.backgroundColor;
    var canvas = document.getElementById(this.targetId);
    canvas.width = 1; canvas.height = 1;
    this.STAR_COLOR = config.starColor == undefined ? "#FFFFFF" : config.starColor;
    this.prevW = -1; this.prevH = -1; //width and height will be set at first draw call
    this.stars = [];
    for (var i = 0; i < this.DENSITY * 1000; i++) {
        this.stars.push(new Star((Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 1000, 1000 * Math.random()));
    }
    this.lastMoveTS = timeStamp();
    this.drawRequest = null;
    this.LAST_RENDER_T = 0;
    WarpSpeed.RUNNING_INSTANCES[targetId] = this;
    this.draw();
}

WarpSpeed.prototype = {
    constructor: WarpSpeed,
    draw: function () {
        // console.log("drawing");
        var TIME = timeStamp();
        if (!(document.getElementById(this.targetId))) {
            this.destroy();
            return;
        }
        this.move();
        var canvas = document.getElementById(this.targetId);
        if (!this.PAUSED && isVisible(canvas)) {
            if (this.prevW != canvas.clientWidth || this.prevH != canvas.clientHeight) {
                canvas.width = (canvas.clientWidth < 10 ? 10 : canvas.clientWidth) * (window.devicePixelRatio || 1);
                canvas.height = (canvas.clientHeight < 10 ? 10 : canvas.clientHeight) * (window.devicePixelRatio || 1);
            }
            this.size = (canvas.height < canvas.width ? canvas.height : canvas.width) / (10 / (this.STAR_SCALE <= 0 ? 0 : this.STAR_SCALE));
            if (this.WARP_EFFECT) this.maxLineWidth = this.size / 30;
            var ctx = canvas.getContext("2d");
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = this.BACKGROUND_COLOR;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = this.STAR_COLOR;
            for (var i = 0; i < this.stars.length; i++) {
                var s = this.stars[i];
                var xOnDisplay = s.x / s.z, yOnDisplay = s.y / s.z;
                if (!this.WARP_EFFECT && (xOnDisplay < -0.5 || xOnDisplay > 0.5 || yOnDisplay < -0.5 || yOnDisplay > 0.5)) continue;
                var size = s.size * this.size / s.z;
                if (size < 0.3) continue; //don't draw very small dots
                if (this.DEPTH_ALPHA) {
                    var alpha = (1000 - s.z) / 1000;
                    ctx.globalAlpha = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;
                }
                if (this.WARP_EFFECT) {
                    ctx.beginPath();
                    var x2OnDisplay = s.x / (s.z + this.WARP_EFFECT_LENGTH * SPEED), y2OnDisplay = s.y / (s.z + this.WARP_EFFECT_LENGTH * SPEED);
                    if (x2OnDisplay < -0.5 || x2OnDisplay > 0.5 || y2OnDisplay < -0.5 || y2OnDisplay > 0.5) continue;
                    ctx.moveTo(canvas.width * (xOnDisplay + 0.5) - size / 2, canvas.height * (yOnDisplay + 0.5) - size / 2);
                    ctx.lineTo(canvas.width * (x2OnDisplay + 0.5) - size / 2, canvas.height * (y2OnDisplay + 0.5) - size / 2);
                    ctx.lineWidth = size > this.maxLineWidth ? this.maxLineWidth : size;
                    if (this.USE_CIRCLES) { ctx.lineCap = "round"; } else { ctx.lineCap = "butt" }
                    ctx.strokeStyle = ctx.fillStyle;
                    ctx.stroke();
                } else if (this.USE_CIRCLES) {
                    ctx.beginPath();
                    ctx.arc(canvas.width * (xOnDisplay + 0.5) - size / 2, canvas.height * (yOnDisplay + 0.5) - size / 2, size / 2, 0, 2 * Math.PI);
                    ctx.fill();
                } else {
                    ctx.fillRect(canvas.width * (xOnDisplay + 0.5) - size / 2, canvas.height * (yOnDisplay + 0.5) - size / 2, size, size);
                }
            }
            this.prevW = canvas.clientWidth;
            this.prevH = canvas.clientHeight;
        }
        if (this.drawRequest != -1) this.drawRequest = requestAnimationFrame(this.draw.bind(this));
        this.LAST_RENDER_T = timeStamp() - TIME;
    },
    move: function () {
        // console.log("moving");
        var t = timeStamp(), speedMulF = (t - this.lastMoveTS) / (1000 / 60);
        this.lastMoveTS = t;
        if (this.PAUSED) return;
        var speedAdjF = Math.pow(this.SPEED_ADJ_FACTOR < 0 ? 0 : this.SPEED_ADJ_FACTOR > 1 ? 1 : this.SPEED_ADJ_FACTOR, 1 / speedMulF);
        // this.SPEED = this.TARGET_SPEED * speedAdjF + this.SPEED * (1 - speedAdjF);
        if (this.SPEED < 0) this.SPEED = 0;
        // var speed = this.SPEED * speedMulF;
        var speed = SPEED;
        this.SPEED = this.TARGET_SPEED * speedAdjF + this.SPEED * (1 - speedAdjF);
        for (var i = 0; i < this.stars.length; i++) {
            var s = this.stars[i];
            s.z -= speed;
            while (s.z < 1) {
                s.z += 1000;
                s.x = (Math.random() - 0.5) * s.z;
                s.y = (Math.random() - 0.5) * s.z;
            }
        }
    },
    destroy: function (targetId) {
        if (targetId) {
            if (WarpSpeed.RUNNING_INSTANCES[targetId]) WarpSpeed.RUNNING_INSTANCES[targetId].destroy();
        } else {
            try { cancelAnimationFrame(this.drawRequest); } catch (e) { this.drawRequest = -1; }
            WarpSpeed.RUNNING_INSTANCES[this.targetId] = undefined;
        }
    },
    pause: function () {
        this.PAUSED = true;
    },
    resume: function () {
        this.PAUSED = false;
    }
}

WarpSpeed.destroy = WarpSpeed.prototype.destroy;



var x = new WarpSpeed("canvas", themes[0]);

themeChangeButton.addEventListener('click', () => {
    x.destroy;
    x = new WarpSpeed("canvas", themes[((++currentTheme) % themes.length)]);
    inputBox.focus();
})