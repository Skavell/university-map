const $leftLinks = document.querySelectorAll('.left-menu a'),
	$mapLinks = document.querySelectorAll('.map a'),
	$info = document.querySelector('.info	');


// const requestData = (id = 1) => {
// 	fetch('data.json')
// 		.then((response) => {
// 			return response.json();
// 		})
// 		.then((data) => {
// 			$info.innerHTML = `
// 			<h2>${data[id - 1].district}</h2>
// 			<p>${data[id - 1].info}</p>
// 		`;
// 		});
// };

// requestData();
function hideSwitchCircle() {
	let circleArr = document.querySelectorAll('circle');
	if (circleArr[0].style.display === 'none'){
		circleArr.forEach(el => el.style.display = 'block');
	}
	else {
		circleArr.forEach(el => el.style.display = 'none');
	}
}

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

hideSwitchCircle();
document.addEventListener('keyup', search);
document.addEventListener('keyup', search2);
let arrayClickCab = [];
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
		if (dataID >= 30 && dataID <= 61) {
			appearing3floor();
		}
		if (dataID >= 1 && dataID <= 29) {
			appearing2floor();
		}
		if (dataID >= 62 && dataID <= 72) {
			appearing4floor();
		}
		if (dataID >= 73 && dataID <= 79) {
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
			if (selfClass.length <= 8) {
				arrayClickCab.splice(arrayClickCab.indexOf(selfClass.slice(-4)),1);
			}
			else {
				arrayClickCab.splice(arrayClickCab.indexOf(selfClass.slice(-9)),1);
			}
			
		}
		else {
			if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
			self.classList.add('active');
			self.classList.add('click');
			if (selfClass.length <= 8) {
				arrayClickCab.push(selfClass.slice(-4));
			}
			else {
				arrayClickCab.push(selfClass.slice(-9));
			}
		}
		if (arrayClickCab) {
			console.log(arrayClickCab);
		}
		if (arrayClickCab.length == 2) {
			let beginCab = arrayClickCab[0];
			let endCab = arrayClickCab[1];
			let tempCab = document.getElementById(beginCab);
			currentLevel1cab = tempCab.parentNode.id;
			let tempCab2 = document.getElementById(endCab);
			currentLevel2cab = tempCab2.parentNode.id;
			if (currentLevel1cab == currentLevel2cab) {
				let route = graph.findShortestPath(beginCab, endCab);
				drawRoute(route, currentLevel1cab);
			}
			else {
				let route = graph.findShortestPath(beginCab, `stair${currentLevel1cab.slice(-1)}floor`);
				drawRoute(route, currentLevel1cab);
				route = graph.findShortestPath(`stair${currentLevel2cab.slice(-1)}floor`, endCab);
				drawRoute(route, currentLevel2cab);
			}
			
		}
		else {
			removeDrawRoute();
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
			if (selfClass.length <= 8) {
				arrayClickCab.splice(arrayClickCab.indexOf(selfClass.slice(-4)),1);
			}
			else {
				arrayClickCab.splice(arrayClickCab.indexOf(selfClass.slice(-9)),1);
			}
		}
		else {
			if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
			currentElement.forEach(el => el.classList.add('active'));
			currentElement.forEach(el => el.classList.add('click'));
			if (selfClass.length <= 8) {
				arrayClickCab.push(selfClass.slice(-4));
			}
			else {
				arrayClickCab.push(selfClass.slice(-9));
			}
		}
		if (arrayClickCab) {
			console.log(arrayClickCab);
		}
		if (arrayClickCab.length == 2) {
			let beginCab = arrayClickCab[0];
			let endCab = arrayClickCab[1];
			let tempCab = document.getElementById(beginCab);
			currentLevel1cab = tempCab.parentNode.id;
			let tempCab2 = document.getElementById(endCab);
			currentLevel2cab = tempCab2.parentNode.id;
			if (currentLevel1cab == currentLevel2cab) {
				let route = graph.findShortestPath(beginCab, endCab);
				drawRoute(route, currentLevel1cab);
			}
			else {
				let route = graph.findShortestPath(beginCab, `stair${currentLevel1cab.slice(-1)}floor`);
				drawRoute(route, currentLevel1cab);
				route = graph.findShortestPath(`stair${currentLevel2cab.slice(-1)}floor`, endCab);
				drawRoute(route, currentLevel2cab);
			}
			
		}
		else {
			removeDrawRoute();
		}
		// requestData(id);
	});
});

// Тут я добавил svgImage2 для второго этажа

const svgImage1 = document.getElementById("svgImage1");
const svgImage2 = document.getElementById("svgImage2");
const svgImage3 = document.getElementById("svgImage3");
const svgImage4 = document.getElementById("svgImage4");
const svgContainer = document.getElementById("svgContainer");
// const svgContainer2 = document.getElementById("svgContainer2");


// var viewBox = {x:0,y:0,w:svgImage.clientWidth,h:svgImage.clientHeight};
var viewBox = { x: -9.2, y: 0.4, w: 245, h: 161.5 };
svgImage1.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
svgImage2.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
svgImage3.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
svgImage4.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
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
	svgImage3.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
	svgImage4.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);

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
		svgImage3.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
		svgImage4.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
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
		svgImage3.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
		svgImage4.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
		isPanning = false;
	}
}

svgContainer.onmouseleave = function (e) {
	isPanning = false;
}


// код ярика



const map1 = document.getElementById('map1')
const map2 = document.getElementById('map2')
const map3 = document.getElementById('map3')
const map4 = document.getElementById('map4')
const button1 = document.getElementById('level1');
const button2 = document.getElementById('level2');
const button3 = document.getElementById('level3');
const button4 = document.getElementById('level4');
const h1 = document.getElementById('NameFloor')

// просто добавления класса появления и скрытия

function appearing2floor() {
	map1.classList.add('show-out');
	map2.classList.add('show-in');
	map3.classList.remove('show-in');
	map4.classList.remove('show-in');
	h1.innerHTML = '2 этаж';
}
function appearing3floor() {
	map1.classList.add('show-out');
	map2.classList.remove('show-in');
	map3.classList.add('show-in');
	map4.classList.remove('show-in');
	h1.innerHTML = '3 этаж';
}

button2.addEventListener('click', () => {
	appearing2floor();
})
button3.addEventListener('click', () => {
	appearing3floor();
})

function appearing1floor() {
	map1.classList.remove('show-out');
	map2.classList.remove('show-in');
	map3.classList.remove('show-in');
	map4.classList.remove('show-in');
	h1.innerHTML = '1 этаж';
}
function appearing4floor() {
	map1.classList.add('show-out');
	map2.classList.remove('show-in');
	map3.classList.remove('show-in');
	map4.classList.add('show-in');

	h1.innerHTML = '4 этаж';
}

button1.addEventListener('click', () => {
	appearing1floor();
})

button4.addEventListener('click', () => {
	appearing4floor();
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

// *********** 2 этаж ***************

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


// ********** узлы 2 этажа кабинетов целуются ************
graph.addVertex('stair2floor');
graph.addVertex('1231/1232');
graph.addVertex('1233/1234');
graph.addVertex('1235');
graph.addVertex('1236');
graph.addVertex('1229/1230');
graph.addVertex('1228');
graph.addVertex('1227');
graph.addVertex('1239');
graph.addVertex('1226');
graph.addVertex('1225');
graph.addVertex('1240');
graph.addVertex('1212');
graph.addVertex('1213');
graph.addVertex('1222');
graph.addVertex('1215');
graph.addVertex('1216');
graph.addVertex('1221');
graph.addVertex('1219');
graph.addVertex('1217');
graph.addVertex('1211');
graph.addVertex('1209');
graph.addVertex('1201');
graph.addVertex('1202');
graph.addVertex('1203');
graph.addVertex('1208');
graph.addVertex('1204');
graph.addVertex('1205');
graph.addVertex('1207');
graph.addVertex('1206');





// ******* 2 этаж грани **********
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
graph.addEdge('9', '11');
graph.addEdge('11', '9');
graph.addEdge('10', '13');
graph.addEdge('13', '10');
graph.addEdge('11', '12');
graph.addEdge('12', '11');
graph.addEdge('12', '13');
graph.addEdge('13', '12');
graph.addEdge('13', '14');
graph.addEdge('14', '13');
graph.addEdge('14', '12');
graph.addEdge('12', '14');
graph.addEdge('stair2floor', '14');
graph.addEdge('14', 'stair2floor');
graph.addEdge('13', '15');
graph.addEdge('15', '13');
graph.addEdge('15', '16');
graph.addEdge('16', '15');
graph.addEdge('16', '17');
graph.addEdge('17', '16');
graph.addEdge('17', '18');
graph.addEdge('18', '17');
graph.addEdge('18', '19');
graph.addEdge('19', '18');
graph.addEdge('20', '12');
graph.addEdge('12', '20');
graph.addEdge('20', '21');
graph.addEdge('21', '22');
graph.addEdge('22', '21');
graph.addEdge('22', '23');
graph.addEdge('23', '22');
graph.addEdge('23', '24');
graph.addEdge('24', '23');
graph.addEdge('24', '25');
graph.addEdge('25', '24');

// ************** 2 этаж грани кабинетов ****************
graph.addEdge('1231/1232', '1');
graph.addEdge('1', '1231/1232');
graph.addEdge('1', '1233/1234');
graph.addEdge('1233/1234', '1');
graph.addEdge('2', '1235');
graph.addEdge('1235', '2');
graph.addEdge('3', '1236');
graph.addEdge('1236', '3');
graph.addEdge('1229/1230', '3');
graph.addEdge('3', '1229/1230');
graph.addEdge('4', '1228');
graph.addEdge('1228', '4');
graph.addEdge('1227', '5');
graph.addEdge('5', '1227');
graph.addEdge('6', '1239');
graph.addEdge('1239', '6');
graph.addEdge('1226', '7');
graph.addEdge('7', '1226');
graph.addEdge('1225', '8');
graph.addEdge('8', '1225');
graph.addEdge('8', '1240');
graph.addEdge('1240', '8');
graph.addEdge('15', '1212');
graph.addEdge('1212', '15');
graph.addEdge('16', '1213');
graph.addEdge('1213', '16');
graph.addEdge('1222', '16');
graph.addEdge('16', '1222');
graph.addEdge('17', '1215');
graph.addEdge('1215', '17');
graph.addEdge('1216', '18');
graph.addEdge('18', '1216');
graph.addEdge('18', '1221');
graph.addEdge('1221', '18');
graph.addEdge('1219', '19');
graph.addEdge('19', '1219');
graph.addEdge('19', '1217');
graph.addEdge('1217', '19');
graph.addEdge('1211', '14');
graph.addEdge('14', '1211');
graph.addEdge('20', '1209');
graph.addEdge('1209', '20');
graph.addEdge('1201', '20');
graph.addEdge('20', '1201');
graph.addEdge('21', '1202');
graph.addEdge('1202', '21');
graph.addEdge('1203', '22');
graph.addEdge('22', '1203');
graph.addEdge('22', '1208');
graph.addEdge('1208', '22');
graph.addEdge('1204', '23');
graph.addEdge('23', '1204');
graph.addEdge('24', '1205');
graph.addEdge('1205', '24');
graph.addEdge('1207', '24');
graph.addEdge('24', '1207');
graph.addEdge('25', '1206');
graph.addEdge('1206', '25');




// *********** 3 этаж ***************

graph.addVertex('26');
graph.addVertex('27');
graph.addVertex('28');
graph.addVertex('29');
graph.addVertex('30');
graph.addVertex('31');
graph.addVertex('32');
graph.addVertex('33');
graph.addVertex('34');
graph.addVertex('35');
graph.addVertex('36');
graph.addVertex('37');
graph.addVertex('38');
graph.addVertex('39');
graph.addVertex('40');
graph.addVertex('41');
graph.addVertex('42');
graph.addVertex('43');
graph.addVertex('44');
graph.addVertex('45');
graph.addVertex('46');
graph.addVertex('47');
graph.addVertex('48');
graph.addVertex('49');
graph.addVertex('50');

// ********** узлы 3 этажа кабинетов целуются ************
graph.addVertex('stair3floor');
graph.addVertex('1427');
graph.addVertex('1428');
graph.addVertex('1429');
graph.addVertex('1430');
graph.addVertex('1431');
graph.addVertex('1426');
graph.addVertex('1425');
graph.addVertex('1424');
graph.addVertex('1432');
graph.addVertex('1423');
graph.addVertex('1433');
graph.addVertex('1422');
graph.addVertex('1434');
graph.addVertex('1320');
graph.addVertex('1312');
graph.addVertex('1313');
graph.addVertex('1319');
graph.addVertex('1314');
graph.addVertex('1318');
graph.addVertex('1317');
graph.addVertex('1316');
graph.addVertex('1315');
graph.addVertex('1311');
graph.addVertex('1309');
graph.addVertex('1308');
graph.addVertex('1307');
graph.addVertex('1306');
graph.addVertex('1305');
graph.addVertex('1304');
graph.addVertex('1303');
graph.addVertex('1302');
graph.addVertex('1301');



// ******* 3 этаж грани **********
graph.addEdge('26', '27');
graph.addEdge('27', '26');
graph.addEdge('27', '28');
graph.addEdge('28', '27');
graph.addEdge('28', '29');
graph.addEdge('29', '28');
graph.addEdge('29', '30');
graph.addEdge('30', '29');
graph.addEdge('30', '31');
graph.addEdge('31', '30');
graph.addEdge('31', '32');
graph.addEdge('32', '31');
graph.addEdge('32', '33');
graph.addEdge('33', '32');
graph.addEdge('33', '34');
graph.addEdge('34', '33');
graph.addEdge('34', '35');
graph.addEdge('35', '34');
graph.addEdge('34', '36');
graph.addEdge('36', '34');
graph.addEdge('35', '38');
graph.addEdge('38', '35');
graph.addEdge('36', '37');
graph.addEdge('37', '36');
graph.addEdge('37', '38');
graph.addEdge('38', '37');
graph.addEdge('38', '39');
graph.addEdge('39', '38');
graph.addEdge('39', '37');
graph.addEdge('37', '39');
graph.addEdge('stair3floor', '39');
graph.addEdge('39', 'stair3floor');
graph.addEdge('38', '40');
graph.addEdge('40', '38');
graph.addEdge('40', '41');
graph.addEdge('41', '40');
graph.addEdge('41', '42');
graph.addEdge('42', '41');
graph.addEdge('42', '43');
graph.addEdge('43', '42');
graph.addEdge('43', '44');
graph.addEdge('44', '43');
graph.addEdge('37', '45');
graph.addEdge('45', '37');
graph.addEdge('45', '46');
graph.addEdge('46', '47');
graph.addEdge('47', '46');
graph.addEdge('47', '48');
graph.addEdge('48', '47');
graph.addEdge('48', '49');
graph.addEdge('49', '48');
graph.addEdge('49', '50');
graph.addEdge('50', '49');

// ************** 3 этаж грани кабинетов ****************
graph.addEdge('1428', '26');
graph.addEdge('26', '1428');
graph.addEdge('27', '1429');
graph.addEdge('27', '1427');
graph.addEdge('1427', '27');
graph.addEdge('28', '1430');
graph.addEdge('1430', '28');
graph.addEdge('29', '1431');
graph.addEdge('1431', '29');
graph.addEdge('1426', '29');
graph.addEdge('29', '1426');
graph.addEdge('30', '1425');
graph.addEdge('1425', '30');
graph.addEdge('1432', '31');
graph.addEdge('31', '1432');
graph.addEdge('31', '1424');
graph.addEdge('1424', '31');
graph.addEdge('1423', '32');
graph.addEdge('32', '1423');
graph.addEdge('32', '1433');
graph.addEdge('1433', '32');
graph.addEdge('1434', '33');
graph.addEdge('33', '1434');
graph.addEdge('33', '1422');
graph.addEdge('1422', '33');
graph.addEdge('1320', '40');
graph.addEdge('40', '1320');
graph.addEdge('1312', '40');
graph.addEdge('40', '1312');
graph.addEdge('41', '1319');
graph.addEdge('1319', '41');
graph.addEdge('1313', '41');
graph.addEdge('41', '1313');
graph.addEdge('42', '1318');
graph.addEdge('1318', '42');
graph.addEdge('1317', '43');
graph.addEdge('43', '1317');
graph.addEdge('43', '1314');
graph.addEdge('1314', '43');
graph.addEdge('1316', '44');
graph.addEdge('44', '1316');
graph.addEdge('44', '1315');
graph.addEdge('1315', '44');
graph.addEdge('1301', '45');
graph.addEdge('45', '1301');
graph.addEdge('45', '1309');
graph.addEdge('1309', '45');
graph.addEdge('1302', '46');
graph.addEdge('46', '1302');
graph.addEdge('47', '1303');
graph.addEdge('1303', '47');
graph.addEdge('1308', '47');
graph.addEdge('47', '1308');
graph.addEdge('48', '1304');
graph.addEdge('1304', '48');
graph.addEdge('1305', '49');
graph.addEdge('49', '1305');
graph.addEdge('49', '1307');
graph.addEdge('1307', '49');
graph.addEdge('1306', '50');
graph.addEdge('50', '1306');
graph.addEdge('39', '1311');
graph.addEdge('1311', '39');



// *********** 4 этаж ***************
graph.addVertex('51');
graph.addVertex('52');
graph.addVertex('53');
graph.addVertex('54');
graph.addVertex('55');
graph.addVertex('56');
graph.addVertex('57');
graph.addVertex('58');
graph.addVertex('59');
graph.addVertex('60');
graph.addVertex('61');
graph.addVertex('62');

// ********** узлы 4 этажа кабинетов целуются ************
graph.addVertex('stair4floor');
graph.addVertex('1420');
graph.addVertex('1419');
graph.addVertex('1417');
graph.addVertex('1415');
graph.addVertex('1414');
graph.addVertex('1413');
graph.addVertex('1412');
graph.addVertex('1411');
graph.addVertex('1409');
graph.addVertex('1408');
graph.addVertex('1407');
graph.addVertex('1406');
graph.addVertex('1403');
graph.addVertex('1402');
graph.addVertex('1401');

// ******* 4 этаж грани **********
graph.addEdge('stair4floor', '51');
graph.addEdge('51', 'stair4floor');
graph.addEdge('51', '52');
graph.addEdge('52', '51');
graph.addEdge('52', '53');
graph.addEdge('53', '52');
graph.addEdge('53', '54');
graph.addEdge('54', '53');
graph.addEdge('54', '55');
graph.addEdge('55', '54');
graph.addEdge('55', '56');
graph.addEdge('56', '55');
graph.addEdge('56', '57');
graph.addEdge('57', '56');
graph.addEdge('51', '62');
graph.addEdge('62', '51');
graph.addEdge('62', '58');
graph.addEdge('58', '62');
graph.addEdge('58', '62');
graph.addEdge('58', '59');
graph.addEdge('59', '58');
graph.addEdge('59', '60');
graph.addEdge('60', '59');
graph.addEdge('60', '61');
graph.addEdge('61', '60');

// ************** 4 этаж грани кабинетов ****************
graph.addEdge('1420', '53');
graph.addEdge('53', '1420');
graph.addEdge('53', '1412');
graph.addEdge('1412', '53');
graph.addEdge('1413', '54');
graph.addEdge('54', '1413');
graph.addEdge('56', '1419');
graph.addEdge('1419', '56');
graph.addEdge('1414', '56');
graph.addEdge('56', '1414');
graph.addEdge('57', '1417');
graph.addEdge('1417', '57');
graph.addEdge('1415', '57');
graph.addEdge('57', '1415');
graph.addEdge('51', '1411');
graph.addEdge('1411', '51');
graph.addEdge('1401', '58');
graph.addEdge('58', '1401');
graph.addEdge('58', '1409');
graph.addEdge('1409', '58');
graph.addEdge('1402', '59');
graph.addEdge('59', '1402');
graph.addEdge('60', '1403');
graph.addEdge('1403', '60');
graph.addEdge('1408', '60');
graph.addEdge('60', '1408');
graph.addEdge('61', '1406');
graph.addEdge('1406', '61');
graph.addEdge('1407', '61');
graph.addEdge('61', '1407');

// *********** 1 этаж ***************
graph.addVertex('63');
graph.addVertex('64');
graph.addVertex('65');
graph.addVertex('66');
graph.addVertex('67');

// ********** узлы 1 этажа кабинетов целуются ************
graph.addVertex('stair1floor');
graph.addVertex('1126');
graph.addVertex('1124');
graph.addVertex('1122');
graph.addVertex('1121');
graph.addVertex('1119');
graph.addVertex('1103');

// ******* 4 этаж грани **********
graph.addEdge('stair1floor', '63');
graph.addEdge('63', 'stair1floor');
graph.addEdge('63', '64');
graph.addEdge('64', '63');
graph.addEdge('64', '65');
graph.addEdge('65', '64');
graph.addEdge('65', '66');
graph.addEdge('66', '65');
graph.addEdge('66', '67');
graph.addEdge('67', '66');

// ************** 1 этаж грани кабинетов ****************
graph.addEdge('63', '1103');
graph.addEdge('1103', '63');
graph.addEdge('1126', '64');
graph.addEdge('64', '1126');
graph.addEdge('65', '1124');
graph.addEdge('1124', '65');
graph.addEdge('1122', '66');
graph.addEdge('66', '1122');
graph.addEdge('67', '1121');
graph.addEdge('1121', '67');
graph.addEdge('1119', '67');
graph.addEdge('67', '1119');


// let route = graph.findShortestPath('stair2floor', '1222')
function drawRoute(route, currentLevel) {
	let level = document.getElementById(currentLevel);
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
		newElement.setAttribute('id', 'route');
		level.appendChild(newElement);
		
	}
}

function removeDrawRoute() {
	let drawPaths = document.querySelectorAll(`.map path[id="route"]`);
	console.log(drawPaths);
	if (drawPaths) drawPaths.forEach(el => el.remove());
}

