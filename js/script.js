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

const svgImage1= document.getElementById("svgImage1");
const svgImage2= document.getElementById("svgImage2");
const svgContainer = document.getElementById("svgContainer");
// const svgContainer2 = document.getElementById("svgContainer2");


// var viewBox = {x:0,y:0,w:svgImage.clientWidth,h:svgImage.clientHeight};
var viewBox = {x:-24,y:13.5,w:258.5,h:170.5};
svgImage1.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
svgImage2.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
const svgSize = {w:svgImage1.clientWidth,h:svgImage1.clientHeight};
var isPanning = false;
var startPoint = {x:0,y:0};
var endPoint = {x:0,y:0};;
var scale = 1;

svgContainer.onmousewheel = function(e) {
   e.preventDefault();
   var w = viewBox.w;
   var h = viewBox.h;
   var mx = e.offsetX;//mouse x  
   var my = e.offsetY;    
   var dw = w*Math.sign(e.deltaY)*0.05;
   var dh = h*Math.sign(e.deltaY)*0.05;
   var dx = dw*mx/svgSize.w;
   var dy = dh*my/svgSize.h;
   viewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w-dw,h:viewBox.h-dh};
   scale = svgSize.w/viewBox.w;
//    zoomValue.innerText = `${Math.round(scale*100)/100}`;
   svgImage1.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
   svgImage2.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);

}


svgContainer.onmousedown = function(e){
   isPanning = true;
   startPoint = {x:e.x,y:e.y};   
}

svgContainer.onmousemove = function(e){
   if (isPanning){
  endPoint = {x:e.x,y:e.y};
  var dx = (startPoint.x - endPoint.x)/scale;
  var dy = (startPoint.y - endPoint.y)/scale;
  var movedViewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w,h:viewBox.h};
  svgImage1.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
  svgImage2.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
   }
}

svgContainer.onmouseup = function(e){
   if (isPanning){ 
  endPoint = {x:e.x,y:e.y};
  var dx = (startPoint.x - endPoint.x)/scale;
  var dy = (startPoint.y - endPoint.y)/scale;
  viewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w,h:viewBox.h};
  svgImage1.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
  svgImage2.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
  isPanning = false;
   }
}

svgContainer.onmouseleave = function(e){
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
const Tochka_x1 = document.getElementById('1');
const Tochka_x2 = document.getElementById('2');
console.log(Tochka_x2.getAttribute('data-neighbors')[2])
const svg = d3.select('#svgImage1')

	

buttRoute.addEventListener('click', () => {
	var newElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
	newElement.setAttribute('d', 'M' + Tochka_x1.getAttribute('cx') + ',' + Tochka_x1.getAttribute('cy') + 'L' + Tochka_x2.getAttribute('cx') + ',' + Tochka_x2.getAttribute('cy'));
	newElement.style.stroke = '#000000';
	newElement.style.strokeWidth = '1px'; 
	svgImage1.appendChild(newElement);
})
	



// buttRoute.addEventListener('click', () => {
// 	svg.append("line")
//        .attr("x1", Tochka_x1.getAttribute('cx'))
//        .attr("x2", Tochka_x2.getAttribute('cx'))
//        .attr("y1", Tochka_x1.getAttribute('cy'))
//        .attr("y2", Tochka_x2.getAttribute('cy'))
//        .attr("stroke", "black")
// })