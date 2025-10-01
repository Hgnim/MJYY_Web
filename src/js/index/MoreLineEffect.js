let sizeChangeFunc= null;//句柄，供jquery off
let isRun= false;//是否正在运行

export function setMoreLineEffect(enable) {
    if (enable && !isRun) {
        isRun = true;
        startEffect();
    }
    else if (!enable && isRun) {
        isRun = false;
        stopEffect();
    }
}

function readConfig() {
    const scripts= document.getElementsByTagName('script');
    const self = scripts[scripts.length - 1];

    return {
        zIndex: getAttr(self, 'zIndex', 0),
        opacity: getAttr(self, 'opacity', 0.4),
        color: getAttr(self, 'color', '74,140,229'),
        count: getAttr(self, 'count', 80)
    };

    function getAttr(node, key, def) {
        return node.getAttribute(key) || def;
    }
}

let canvas, ctx, cfg;
let W, H;
let particles = [];
let mousePoint = { x: null, y: null, max: 75000 };

function createCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'moreLineEffect_core';//元素id
    ctx = canvas.getContext('2d');

    applyStyle(canvas,{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: cfg.zIndex,
        opacity: cfg.opacity
    });

    const container = document.getElementById('moreLineEffect');
    if (container) container.appendChild(canvas);

    resize();
    $(window).on('resize', resize);
    sizeChangeFunc = resize;//保存句柄供后续off使用
}

function initParticles() {
    const { count } = cfg;
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            x:  rand() * W,
            y:  rand() * H,
            xa: rand() * 3 - 1,
            ya: rand() * 3 - 1,
            max: 14000
        });
    }
}

let rafId;
function loop() {
    if (!isRun) return;

    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
        p.x += p.xa;
        p.y += p.ya;
        if (p.x > W || p.x < 0) p.xa *= -1;
        if (p.y > H || p.y < 0) p.ya *= -1;
    });

    particles.forEach((p, i) => {
        ctx.fillRect(p.x - 0.5, p.y - 0.5, 1, 1);
        for (let j = i + 1; j < particles.length; j++) {
            drawLine(p, particles[j]);
        }
        drawLine(p, mousePoint);
    });

    rafId = requestAnimationFrame(loop);
}

function drawLine(p1, p2) {
    if (p2.x == null || p2.y == null) return;

    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dist2 = dx * dx + dy * dy;

    if (dist2 >= p2.max) return;

    const ratio = (p2.max - dist2) / p2.max;
    ctx.beginPath();
    ctx.lineWidth = ratio / 2;
    ctx.strokeStyle = `rgba(${cfg.color}, ${ratio + 0.2})`;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function applyStyle(el, styleObj) {
    Object.keys(styleObj).forEach(k => el.style[k] = styleObj[k]);
}

function resize() {
    W = canvas.width  = window.innerWidth  || document.documentElement.clientWidth;
    H = canvas.height = window.innerHeight || document.documentElement.clientHeight;
}

function bindMouse() {
    window.onmousemove = e => {
        e = e || window.event;
        mousePoint.x = e.clientX;
        mousePoint.y = e.clientY;
    };
    window.onmouseout = () => {
        mousePoint.x = mousePoint.y = null;
    };
}

function startEffect() {
    cfg = readConfig();
    createCanvas();
    initParticles();
    bindMouse();
    setTimeout(loop, 100);
}

function stopEffect() {
    if (sizeChangeFunc) $(window).off('resize', sizeChangeFunc);
    if (canvas) canvas.remove();
    cancelAnimationFrame(rafId);

    //清除所有鼠标事件
    window.onmousemove = null;
    window.onmouseout  = null;
}

const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (cb) { window.setTimeout(cb, 1000 / 45); };

const rand = Math.random;