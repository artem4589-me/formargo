window.requestAnimationFrame =
    window.__requestAnimationFrame ||
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback, element) {
        var lastTime = element.__lastTime || 0;
        var currTime = Date.now();
        var timeToCall = Math.max(1, 33 - (currTime - lastTime));
        window.setTimeout(callback, timeToCall);
        element.__lastTime = currTime + timeToCall;
    };

let isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    (navigator.userAgent || navigator.vendor || window.opera).toLowerCase()
);

let scaleFactor = isMobile ? 1 : 2; // **Сердце увеличено в 2 раза на телефоне**

var loaded = false;
function init() {
    if (loaded) return;
    loaded = true;

    var canvas = document.getElementById("heart");
    var ctx = canvas.getContext("2d");
    var width = (canvas.width = window.innerWidth);
    var height = (canvas.height = window.innerHeight);
    var rand = Math.random;

    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, width, height);

    function heartPosition(rad) {
        return [Math.pow(Math.sin(rad), 3), -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad))];
    }

    function scaleAndTranslate(pos, sx, sy, dx, dy) {
        return [dx + pos[0] * sx * scaleFactor, dy + pos[1] * sy * scaleFactor]; // Применяем масштаб
    }

    window.addEventListener("resize", function () {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, width, height);
    });

    var traceCount = isMobile ? 15 : 50;
    var pointsOrigin = [];
    var dr = 0.1;
    for (var i = 0; i < Math.PI * 2; i += dr)
        pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
    for (var i = 0; i < Math.PI * 2; i += dr)
        pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));
    for (var i = 0; i < Math.PI * 2; i += dr)
        pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));

    var heartPointsCount = pointsOrigin.length;
    var targetPoints = [];

    function pulse(kx, ky) {
        for (var i = 0; i < pointsOrigin.length; i++) {
            targetPoints[i] = [
                kx * pointsOrigin[i][0] + width / 2,
                ky * pointsOrigin[i][1] + height / 2,
            ];
        }
    }

    var e = [];
    for (var i = 0; i < heartPointsCount; i++) {
        var x = rand() * width;
        var y = rand() * height;
        e[i] = {
            vx: 0,
            vy: 0,
            R: 2,
            speed: rand() + 5,
            q: ~~(rand() * heartPointsCount),
            D: 2 * (i % 2) - 1,
            force: 0.2 * rand() + 0.7,
            f: "hsla(0," + ~~(40 * rand() + 60) + "%," + ~~(60 * rand() + 20) + "%,.3)",
            trace: Array.from({ length: traceCount }, () => ({ x, y })),
        };
    }

    var config = { traceK: 0.4, timeDelta: 0.6 };
    var time = 0;

    function loop() {
        var n = -Math.cos(time);
        pulse((1 + n) * 0.5, (1 + n) * 0.5);
        time += (Math.sin(time) < 0 ? 9 : n > 0.8 ? 0.2 : 1) * config.timeDelta;

        ctx.fillStyle = "rgba(0,0,0,.1)";
        ctx.fillRect(0, 0, width, height);

        for (var i = e.length; i--; ) {
            var u = e[i];
            var q = targetPoints[u.q];
            var dx = u.trace[0].x - q[0];
            var dy = u.trace[0].y - q[1];
            var length = Math.sqrt(dx * dx + dy * dy);

            if (length < 10) {
                if (rand() > 0.95) {
                    u.q = ~~(rand() * heartPointsCount);
                } else {
                    if (rand() > 0.99) u.D *= -1;
                    u.q = (u.q + u.D) % heartPointsCount;
                    if (u.q < 0) u.q += heartPointsCount;
                }
            }

            u.vx += (-dx / length) * u.speed;
            u.vy += (-dy / length) * u.speed;
            u.trace[0].x += u.vx;
            u.trace[0].y += u.vy;
            u.vx *= u.force;
            u.vy *= u.force;

            for (var k = 0; k < u.trace.length - 1; k++) {
                var T = u.trace[k];
                var N = u.trace[k + 1];
                N.x -= config.traceK * (N.x - T.x);
                N.y -= config.traceK * (N.y - T.y);
            }

            ctx.fillStyle = u.f;
            u.trace.forEach((t) => ctx.fillRect(t.x, t.y, 1, 1));
        }

        window.requestAnimationFrame(loop, canvas);
    }

    loop();
}

document.addEventListener("DOMContentLoaded", init);
