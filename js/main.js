function meow() {
	const audio = new Audio("assets/meow.mp3");
	audio.play();
}

makeDraggable("mainWindow", "dragHandle");
makeDraggable("linksWindow", "linksHandle");
makeDraggable("extraWindow", "extraHandle");
makeDraggable("loserWindow", "loserHandle");

function makeDraggable(windowId, handleId) {
	const win = document.getElementById(windowId);
	const handle = document.getElementById(handleId);

	let dragging = false;
	let offsetX = 0;
	let offsetY = 0;

	handle.addEventListener("mousedown", (e) => {
		dragging = true;

		offsetX = e.clientX - win.offsetLeft;
		offsetY = e.clientY - win.offsetTop;
	});

	document.addEventListener("mouseup", () => {
		dragging = false;
	});

	document.addEventListener("mousemove", (e) => {
		if (!dragging) return;

		win.style.left = (e.clientX - offsetX) + "px";
		win.style.top	= (e.clientY - offsetY) + "px";
	});
}

/* --------------------- */
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ["#5BCEFA", "#F5A9B8", "#FFFFFF", "#F5A9B8", "#5BCEFA"];

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
let points = [];

// create trail points
const length = 20;
for (let i = 0; i < length; i++) {
	points.push({ x: mouse.x, y: mouse.y });
}

document.addEventListener("mousemove", (e) => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

function lerp(a, b, t) {
	return a + (b - a) * t;
}

let time = 0;

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// move trail points
	let x = mouse.x;
	let y = mouse.y;

	for (let i = 0; i < points.length; i++) {
		const p = points[i];

		p.x = lerp(p.x, x, 0.35);
		p.y = lerp(p.y, y, 0.35);

		x = p.x;
		y = p.y;
	}

	time += 0.02;

	// draw color strokes
	for (let c = 0; c < colors.length; c++) {
		ctx.beginPath();
		ctx.strokeStyle = colors[c];
		ctx.lineWidth = 3;

		for (let i = 0; i < points.length; i++) {
			const p = points[i];
			if (i === 0) {
				ctx.moveTo(p.x, p.y);
			} else {
				ctx.lineTo(p.x, p.y + c * 2);
			}
		}

		ctx.stroke();
	}

	requestAnimationFrame(draw);
}

draw();