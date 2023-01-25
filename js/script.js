const $leftLinks = document.querySelectorAll('.left-menu a'),
	$mapLinks = document.querySelectorAll('.map a'),
	$info = document.querySelector('.info	');


const requestData = (id = 1) => {
	fetch('data.json')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			$info.innerHTML = `
			<h2>${data[id - 1].district}</h2>
			<p>${data[id - 1].info}</p>
		`;
		});
};

requestData();

function search() {
	let input = document.getElementById("search");
	let filter = input.value.toUpperCase();
	let ul = document.getElementById("search-items");
	let li = ul.getElementsByTagName("li");

	// Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
	for (let i = 0; i < li.length; i++) {
		let a = li[i].getElementsByTagName("a")[0];
		if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}

function search2() {
	let input = document.getElementById("search2");
	let filter = input.value.toUpperCase();
	let ul = document.getElementById("search-items2");
	let li = ul.getElementsByTagName("li");

	// Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу
	for (let i = 0; i < li.length; i++) {
		let a = li[i].getElementsByTagName("a")[0];
		if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
			li[i].style.display = "";
		} else {
			li[i].style.display = "none";
		}
	}
}

document.addEventListener('keyup', search);
document.addEventListener('keyup', search2);

$leftLinks.forEach(el => {
	el.addEventListener('mouseenter', (e) => {
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let color = self.dataset.color;
		let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
		let currentPolygon = currentElement.querySelectorAll('rect');
		let currentPath = currentElement.querySelectorAll('path');
		if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
		if (currentPath) currentPath.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
		self.classList.add('active');
		//код ярика
		let dataID = self.getAttribute('data-id')
		if (dataID >= 37 && dataID <= 72) {
			appearing2floor();
		}
		if (dataID >= 1 && dataID <= 36) {
			appearing1floor();
		}


	});

	el.addEventListener('mouseleave', (e) => {
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
		let currentPolygon = currentElement.querySelectorAll('rect');
		let currentPath = currentElement.querySelectorAll('path');
		if (!self.classList.contains('click')) {
			if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none`);
			if (currentPath) currentPath.forEach(el => el.style.cssText = ``);
			self.classList.remove('active');
		}
	});

	el.addEventListener('click', (e) => {
		e.preventDefault();
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
		// let id = parseInt(currentElement.dataset.id);
		let color = self.dataset.color;
		let currentPolygon = currentElement.querySelectorAll('rect');
		if (self.classList.contains('click')) {
			if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none`);
			self.classList.remove('active');
			self.classList.remove('click');
		}
		else {
			if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
			self.classList.add('active');
			self.classList.add('click');
		}
		// requestData(id);
	});
});

$mapLinks.forEach(el => {
	el.addEventListener('mouseenter', (e) => {
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let color = self.dataset.color;
		let currentElement = document.querySelectorAll(`.left-menu a[href="${selfClass}"]`);
		let currentPolygon = self.querySelectorAll('rect');
		let currentPath = self.querySelectorAll('path');
		if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
		if (currentPath) currentPath.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
		currentElement.forEach(el => el.classList.add('active'));
	});

	el.addEventListener('mouseleave', (e) => {
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let currentElement = document.querySelectorAll(`.left-menu a[href="${selfClass}"]`);
		let currentPolygon = self.querySelectorAll('rect');
		let currentPath = self.querySelectorAll('path');
		if (!currentElement[0].classList.contains('click')) {
			if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none`);
			if (currentPath) currentPath.forEach(el => el.style.cssText = ``);
			currentElement.forEach(el => el.classList.remove('active'));
		}
	});

	el.addEventListener('click', (e) => {
		e.preventDefault();
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let currentElement = document.querySelectorAll(`.left-menu a[href="${selfClass}"]`);
		// let id = parseInt(currentElement.dataset.id);
		let color = self.dataset.color;
		let currentPolygon = self.querySelectorAll('rect');
		if (currentElement[0].classList.contains('click')) {
			if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none`);
			currentElement.forEach(el => el.classList.remove('active'));
			currentElement.forEach(el => el.classList.remove('click'));
		}
		else {
			if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
			currentElement.forEach(el => el.classList.add('active'));
			currentElement.forEach(el => el.classList.add('click'));
		}
		// requestData(id);
	});
});

// Тут я добавил svgImage2 для второго этажа

const svgImage1 = document.getElementById("svgImage1");
const svgImage2 = document.getElementById("svgImage2");
const svgContainer = document.getElementById("svgContainer");
// const svgContainer2 = document.getElementById("svgContainer2");


// var viewBox = {x:0,y:0,w:svgImage.clientWidth,h:svgImage.clientHeight};
var viewBox = { x: -24, y: 13.5, w: 258.5, h: 170.5 };
svgImage1.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
svgImage2.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
const svgSize = { w: svgImage1.clientWidth, h: svgImage1.clientHeight };
var isPanning = false;
var startPoint = { x: 0, y: 0 };
var endPoint = { x: 0, y: 0 };;
var scale = 1;

svgContainer.onmousewheel = function (e) {
	e.preventDefault();
	var w = viewBox.w;
	var h = viewBox.h;
	var mx = e.offsetX;//mouse x  
	var my = e.offsetY;
	var dw = w * Math.sign(e.deltaY) * 0.05;
	var dh = h * Math.sign(e.deltaY) * 0.05;
	var dx = dw * mx / svgSize.w;
	var dy = dh * my / svgSize.h;
	viewBox = { x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w - dw, h: viewBox.h - dh };
	scale = svgSize.w / viewBox.w;
	//    zoomValue.innerText = `${Math.round(scale*100)/100}`;
	svgImage1.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
	svgImage2.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);

}


svgContainer.onmousedown = function (e) {
	isPanning = true;
	startPoint = { x: e.x, y: e.y };
}

svgContainer.onmousemove = function (e) {
	if (isPanning) {
		endPoint = { x: e.x, y: e.y };
		var dx = (startPoint.x - endPoint.x) / scale;
		var dy = (startPoint.y - endPoint.y) / scale;
		var movedViewBox = { x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h };
		svgImage1.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
		svgImage2.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
	}
}

svgContainer.onmouseup = function (e) {
	if (isPanning) {
		endPoint = { x: e.x, y: e.y };
		var dx = (startPoint.x - endPoint.x) / scale;
		var dy = (startPoint.y - endPoint.y) / scale;
		viewBox = { x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h };
		svgImage1.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
		svgImage2.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
		isPanning = false;
	}
}

svgContainer.onmouseleave = function (e) {
	isPanning = false;
}


// код ярика



const map1 = document.getElementById('map1')
const map2 = document.getElementById('map2')
const button1 = document.getElementById('level1');
const button2 = document.getElementById('level2');
const h1 = document.getElementById('NameFloor')

// просто добавления класса появления и скрытия

function appearing2floor() {
	map1.classList.add('show-out');
	map2.classList.add('show-in');
	h1.innerHTML = '2 этаж';
}

button2.addEventListener('click', () => {
	appearing2floor();
})

function appearing1floor() {
	map1.classList.remove('show-out');
	map2.classList.remove('show-in');
	h1.innerHTML = '1 этаж';
}

button1.addEventListener('click', () => {
	appearing1floor();
})

const buttRoute = document.getElementById('route');
const Tochka_8 = document.getElementById('8');
const Tochka_9 = document.getElementById('9');
const Tochka_10 = document.getElementById('10');
const Tochka_11 = document.getElementById('11');
const Tochka_12 = document.getElementById('12');
const Tochka_13 = document.getElementById('13');
const Tochka_14 = document.getElementById('14');

const svg = d3.select('#svgImage1');


// function FindPath(start, end) {
// 	let path = [start];
// 	let visited = {};
// 	let queue = [start]
// 	visited[start.id] = true;
// 	while (queue.length > 0) {
// 		let current = queue.shift();
// 		if (current === end) {
// 			return path;
// 		}
// 		let neighbors = current.getAttribute("data-neighbors").split(",");
// 		for (let i = 0; i < neighbors.length; i += 1) {
// 			// console.log(neighbors[i].trim());
// 			let neighbor = 	document.getElementById(neighbors[i].trim());
// 			if (!visited[neighbor.id]) {
// 				path.push(neighbor);
// 				visited[neighbor.id] = true;
// 				queue.push(neighbor);
// 			}
// 		}
// 	}
// }


// console.log(FindPath(Tochka_8, Tochka_14))
// FindPath(Tochka_8, Tochka_14)






// let circles = [Tochka_8, Tochka_9, Tochka_10, Tochka_11, Tochka_12, Tochka_13, Tochka_14];
// console.log(circles)
// let startCircle = Tochka_14;
// let endCircle = Tochka_8;
// let startIndex = circles.indexOf(startCircle);
// let endIndex = circles.indexOf(endCircle);
// let route = [];
// for (let i = startIndex; i !== endIndex; i = (i + 1) % circles.length) {
// 	route.push(circles[i])
// }
// for (let i = 0; i < route.length - 1; i += 1) {
// 	let x1 = route[i].getAttribute('cx');
// 	let y1 = route[i].getAttribute('cy');
// 	let x2 = route[i + 1].getAttribute('cx');
// 	let y2 = route[i + 1].getAttribute('cy');
// 	let newElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
// 	newElement.setAttribute('d', 'M' + x1 + ',' + y1 + 'L' + x2 + ',' + y2);
// 	newElement.style.stroke = '#000000';
// 	newElement.style.strokeWidth = '2px'; 
// 	svgImage1.appendChild(newElement);

// }



// buttRoute.addEventListener('click', () => {
// 	var newElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
// 	newElement.setAttribute('d', 'M' + Tochka_1.getAttribute('cx') + ',' + Tochka_1.getAttribute('cy') + 'L' + Tochka_2.getAttribute('cx') + ',' + Tochka_2.getAttribute('cy'));
// 	newElement.style.stroke = '#000000';
// 	newElement.style.strokeWidth = '1px'; 
// 	svgImage1.appendChild(newElement);
// })




// buttRoute.addEventListener('click', () => {
// 	svg.append("line")
//        .attr("x1", Tochka_x1.getAttribute('cx'))
//        .attr("x2", Tochka_x2.getAttribute('cx'))
//        .attr("y1", Tochka_x1.getAttribute('cy'))
//        .attr("y2", Tochka_x2.getAttribute('cy'))
//        .attr("stroke", "black")
// })

