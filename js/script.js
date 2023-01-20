const $leftLinks = document.querySelectorAll('.left-menu a'),
			$mapLinks = document.querySelectorAll('.map a'),
			$info = document.querySelector('.info');

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

document.addEventListener('keyup', search);

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
	});

	el.addEventListener('mouseleave', (e) => {
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
		let currentPolygon = currentElement.querySelectorAll('rect');
		let currentPath = currentElement.querySelectorAll('path');
		if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none`);
		if (currentPath) currentPath.forEach(el => el.style.cssText = ``);
		self.classList.remove('active');
	});
});

$mapLinks.forEach(el => {
	el.addEventListener('mouseenter', (e) => {
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let color = self.dataset.color;
		let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
		let currentPolygon = self.querySelectorAll('rect');
		let currentPath = self.querySelectorAll('path');
		if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
		if (currentPath) currentPath.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
		currentElement.classList.add('active');
	});

	el.addEventListener('mouseleave', (e) => {
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
		let currentPolygon = self.querySelectorAll('rect');
		let currentPath = self.querySelectorAll('path');
		if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none`);
		if (currentPath) currentPath.forEach(el => el.style.cssText = ``);
		currentElement.classList.remove('active');
	});

	el.addEventListener('click', (e) => {
		e.preventDefault();
		let self = e.currentTarget;
		let selfClass = self.getAttribute('href');
		let currentElement = document.querySelector(`.left-menu a[href="${selfClass}"]`);
		let id = parseInt(currentElement.dataset.id);
		requestData(id);
	});
});

const svgImage = document.getElementById("svgImage");
const svgContainer = document.getElementById("svgContainer");

// var viewBox = {x:0,y:0,w:svgImage.clientWidth,h:svgImage.clientHeight};
var viewBox = {x:-24,y:13.5,w:258.5,h:170.5};
svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
const svgSize = {w:svgImage.clientWidth,h:svgImage.clientHeight};
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
   zoomValue.innerText = `${Math.round(scale*100)/100}`;
   svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);

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
  svgImage.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
   }
}

svgContainer.onmouseup = function(e){
   if (isPanning){ 
  endPoint = {x:e.x,y:e.y};
  var dx = (startPoint.x - endPoint.x)/scale;
  var dy = (startPoint.y - endPoint.y)/scale;
  viewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w,h:viewBox.h};
  svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
  isPanning = false;
   }
}

svgContainer.onmouseleave = function(e){
 isPanning = false;
}