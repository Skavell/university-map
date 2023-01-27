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
var viewBox = { x: -9.2, y: 0.4, w: 245, h: 161.5 };
svgImage1.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
svgImage2.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
const svgSize = { w: svgImage1.clientWidth, h: svgImage1.clientHeight };
var isPanning = false;
var startPoint = { x: 0, y: 0 };
var endPoint = { x: 0, y: 0 };;
var scale = 5.74;

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


const svg = d3.select('#svgImage1');

// ********* рисование пути *********

// Создаю класс граф
class Graph {
	constructor() {
	  this.vertices = {}; // список смежности графа
	}
	
	addVertex(value) {
	  if (!this.vertices[value]) {
		this.vertices[value] = [];
	  }
	}
	
	addEdge(vertex1, vertex2) {
	  if (!(vertex1 in this.vertices) || !(vertex2 in this.vertices)) {
		throw new Error('В графе нет таких вершин');
	  }
  
	  if (!this.vertices[vertex1].includes(vertex2)) {
		this.vertices[vertex1].push(vertex2);
	  }
	  if (!this.vertices[vertex2].includes(vertex1)) {
		this.vertices[vertex2].push(vertex1);
	  }
	}

	dfs(startVertex, callback) {
		let list = this.vertices; // список смежности
		let stack = [startVertex]; // стек вершин для перебора
		let visited = { [startVertex]: 1 }; // посещенные вершины
		
		function handleVertex(vertex) {
		  // вызываем коллбэк для посещенной вершины
		  callback(vertex);
		  
		  // получаем список смежных вершин
		  let reversedNeighboursList = [...list[vertex]].reverse();
		 
		  reversedNeighboursList.forEach(neighbour => {
			if (!visited[neighbour]) {
			  // отмечаем вершину как посещенную
			  visited[neighbour] = 1;
			  // добавляем в стек
			  stack.push(neighbour);
			}
		  });
		}
		
		// перебираем вершины из стека, пока он не опустеет
		while(stack.length) {
		  let activeVertex = stack.pop();
		  handleVertex(activeVertex);
		}
		
		// проверка на изолированные фрагменты
		stack = Object.keys(this.vertices);
	
		while(stack.length) {
		  let activeVertex = stack.pop();
		  if (!visited[activeVertex]) {
			visited[activeVertex] = 1;
			handleVertex(activeVertex);
		  }
		}
	  }

	  bfs2(startVertex) {
		let list = this.vertices; 
		let queue = [startVertex];
		let visited = { [startVertex]: 1 }; 
		
		// кратчайшее расстояние от стартовой вершины
		let distance = { [startVertex]: 0 }; 
		// предыдущая вершина в цепочке
		let previous = { [startVertex]: null };
	
		function handleVertex(vertex) {
		  let neighboursList = list[vertex];
	
		  neighboursList.forEach(neighbour => {
			if (!visited[neighbour]) {
			  visited[neighbour] = 1;
			  queue.push(neighbour);
			  // сохраняем предыдущую вершину
			  previous[neighbour] = vertex;
			  // сохраняем расстояние 
			  distance[neighbour] = distance[vertex] + 1;
			}
		  });
		}
	
		// перебираем вершины из очереди, пока она не опустеет
		while(queue.length) {
		  let activeVertex = queue.shift();
		  handleVertex(activeVertex);
		}
		
		return { distance, previous }
	  }

	  findShortestPath(startVertex, finishVertex) {
		let result = this.bfs2(startVertex);
	
		if (!(finishVertex in result.previous)) 
			throw new Error(`Нет пути из вершины ${startVertex} в вершину ${finishVertex}`);
			
		let path = [];
		
		let currentVertex = finishVertex;
		
		while(currentVertex !== startVertex) {
		  path.unshift(currentVertex);
		  currentVertex = result.previous[currentVertex];
		}
		
		path.unshift(startVertex);
		
		return path;
	  }
	
  }

// Создаю сам граф
const graph = new Graph();

graph.addVertex('1');
graph.addVertex('2');
graph.addVertex('3');
graph.addVertex('4');
graph.addVertex('5');
graph.addVertex('6');
graph.addVertex('7');
graph.addVertex('8');
graph.addVertex('9');
graph.addVertex('10');
graph.addVertex('11');
graph.addVertex('12');
graph.addVertex('13');
graph.addVertex('14');
graph.addVertex('15');
graph.addVertex('16');
graph.addVertex('17');
graph.addVertex('18');
graph.addVertex('19');
graph.addVertex('20');
graph.addVertex('21');
graph.addVertex('22');
graph.addVertex('23');
graph.addVertex('24');
graph.addVertex('25');
graph.addVertex('26');
graph.addVertex('27');
graph.addVertex('28');
graph.addVertex('29');

graph.addEdge('1', '2');
graph.addEdge('2', '1');
graph.addEdge('2', '3');
graph.addEdge('3', '2');
graph.addEdge('3', '4');
graph.addEdge('4', '3');
graph.addEdge('4', '5');
graph.addEdge('5', '4');
graph.addEdge('5', '6');
graph.addEdge('6', '5');
graph.addEdge('6', '7');
graph.addEdge('7', '6');
graph.addEdge('7', '8');
graph.addEdge('8', '7');
graph.addEdge('8', '9');
graph.addEdge('9', '8');
graph.addEdge('9', '10');
graph.addEdge('10', '9');
graph.addEdge('10', '11');
graph.addEdge('10', '12');
graph.addEdge('11', '10');
graph.addEdge('11', '14');
graph.addEdge('12', '10');
graph.addEdge('12', '13');
graph.addEdge('13', '12');
graph.addEdge('13', '14');
graph.addEdge('14', '11');
graph.addEdge('14', '13');
graph.addEdge('14', '15');
graph.addEdge('15', '14');
graph.addEdge('13', '15');
graph.addEdge('15', '13');
graph.addEdge('14', '16');
graph.addEdge('16', '14');
graph.addEdge('16', '17');
graph.addEdge('17', '16');
graph.addEdge('17', '18');
graph.addEdge('18', '17');
graph.addEdge('18', '19');
graph.addEdge('19', '18');
graph.addEdge('19', '20');
graph.addEdge('20', '19');
graph.addEdge('20', '21');
graph.addEdge('21', '20');
graph.addEdge('13', '22');
graph.addEdge('22', '13');
graph.addEdge('22', '23');
graph.addEdge('23', '22');
graph.addEdge('23', '24');
graph.addEdge('24', '23');
graph.addEdge('24', '25');
graph.addEdge('25', '24');
graph.addEdge('25', '26');
graph.addEdge('26', '25');
graph.addEdge('26', '27');
graph.addEdge('27', '26');
graph.addEdge('13', '28');
graph.addEdge('28', '13');
graph.addEdge('14', '28');
graph.addEdge('28', '14');
graph.addEdge('21', '29');
graph.addEdge('29', '21');

  

// let route = graph.findShortestPath('1', '29')
for (let i = 0; i < route.length - 1; i += 1) {
	let circle1 = document.getElementById(route[i]);
	let circle2 = document.getElementById(route[i + 1]);
	let x1 = circle1.getAttribute('cx');
	let y1 = circle1.getAttribute('cy');
	let x2 = circle2.getAttribute('cx');
	let y2 = circle2.getAttribute('cy');
	let newElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
	newElement.setAttribute('d', 'M' + x1 + ',' + y1 + 'L' + x2 + ',' + y2);
	newElement.style.stroke = '#000000';
	newElement.style.strokeWidth = '2px'; 
	svgImage1.appendChild(newElement);

}


