function meow() {
	const audio = new Audio("assets/meow.mp3");
	audio.play();
}

const bubbleLines = [
	"In 1973, the united states government officially recognized the existence of a second, smaller moon. it hasn't been seen again since 1981",
	"have you tried giving up and using hard drugs?",
	"<placeholder-line> test, hello is this thing on?? </placeholder-line>",
	"Almost all staircases have one additional step that can only be accessed by walking down it incorrectly",
	"Did you know! The human skeleton is not native to earth. its exact origins remain a subject of debate among historians",
	"Shitting to farting is like smoking to vaping, both smell bad in public",
	"The sun was originally going to be just a temporary installation to end the ice age. The contractor responsible for removing it disappeared without a trace so the sun remains in the sky!",
	"It's likely that your best friend has an additional set of bones that they will never tell you about!",
	"Around 80% of staircase-related injuries happen on staircases! Be careful.",
	"A small percentage of telephone poles are capable of reproducing sexually. Their offspring are commonly mistaken for animals known as 'Shareholders'.",
	"The first known photograph of \"God\" was taken in 1942. Unfortunately, \"God\"'s eyes were closed",
	"Fun Fact! The US government briefly recognised the country of Atlantis in 1956, only to never bring it up in any files ever again.",
	"The inventor of the traffic light was colourblind and originally intended the three lights to represent different stages of grief",
	"All pharanthesises you open and not close are collected! (By someone else, we dont know by whom.",
	"A japanese mathematician discovered a real number between three and four. His findings were rejected due to religious reasons.",
	"All escalators have a built in \"Dead Man's Switch\" that makes them inoperable when their manufacturer dies",
	"I wish I was born a woman,,,, wait sorry I need to be writing schizophrenic fun facts uhhh, something about the guy who watches you sleep",
	"There's only around 400 original jokes, all other jokes are just translations or retellings",
	"All world maps have at least 1 or 2 errors! This is made to keep things new and interesting",
	"The last ever naturally occuring coincidence took place on September 6th, 1995.",
	"In 2022 during the Covid outbreak, some researchers at Oxford succesfully isolated the feeling of being watched, it weighted around 13 Micrograms",
];

const bubble = document.querySelector(".bubble");
if (bubble && !bubble.classList.contains("keep")) {
	let last = -1;
	try {
		last = parseInt(localStorage.getItem("lastBubble"), 10);
	} catch (e) {}

	let pick = Math.floor(Math.random() * bubbleLines.length);
	if (bubbleLines.length > 1 && pick === last) {
		pick = (pick + 1 + Math.floor(Math.random() * (bubbleLines.length - 1))) % bubbleLines.length;
	}

	bubble.textContent = bubbleLines[pick];

	try {
		localStorage.setItem("lastBubble", String(pick));
	} catch (e) {}
}

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ["#5BCEFA", "#F5A9B8", "#FFFFFF", "#F5A9B8", "#5BCEFA"];

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
let points = [];

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

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let x = mouse.x;
	let y = mouse.y;

	for (let i = 0; i < points.length; i++) {
		const p = points[i];

		p.x = lerp(p.x, x, 0.35);
		p.y = lerp(p.y, y, 0.35);

		x = p.x;
		y = p.y;
	}

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
