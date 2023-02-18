/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 187:
/***/ (() => {

/* eslint-disable no-param-reassign */

/* eslint-disable no-shadow */

/* eslint-disable no-use-before-define */

/* eslint-disable no-unused-vars */

/* eslint-disable no-return-assign */

/* eslint-disable no-undef */
const $leftLinks = document.querySelectorAll('.left-menu a');
const $mapLinks = document.querySelectorAll('.map a');
const $info = document.querySelector('.info'); // eslint-disable-next-line no-unused-vars

function hideSwitchCircle() {
  const circleArr = document.querySelectorAll('circle');

  if (circleArr[0].style.display === 'none') {
    circleArr.forEach(el => el.style.display = 'block');
  } else {
    circleArr.forEach(el => el.style.display = 'none');
  }
}

function search() {
  const input = document.getElementById('search');
  const filter = input.value.toUpperCase();
  const ul = document.getElementById('search-items');
  const li = ul.getElementsByTagName('li'); // Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу

  for (let i = 0; i < li.length; i += 1) {
    const a = li[i].getElementsByTagName('a')[0];

    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}

function search2() {
  const input = document.getElementById('search2');
  const filter = input.value.toUpperCase();
  const ul = document.getElementById('search-items2');
  const li = ul.getElementsByTagName('li'); // Перебирайте все элементы списка и скрывайте те, которые не соответствуют поисковому запросу

  for (let i = 0; i < li.length; i += 1) {
    const a = li[i].getElementsByTagName('a')[0];

    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
} // hideSwitchCircle();


document.addEventListener('keyup', search);
document.addEventListener('keyup', search2);
const arrayClickCab = [];
$leftLinks.forEach(el => {
  el.addEventListener('mouseenter', e => {
    const self = e.currentTarget;
    const selfClass = self.getAttribute('href');
    const {
      color
    } = self.dataset;
    const currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
    const currentPolygon = currentElement.querySelectorAll('rect');
    const currentPath = currentElement.querySelectorAll('path');
    if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
    if (currentPath) currentPath.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
    self.classList.add('active'); // код ярика

    const dataID = self.getAttribute('data-id');

    if (dataID >= 30 && dataID <= 62) {
      appearing3floor();
    }

    if (dataID >= 1 && dataID <= 29) {
      appearing2floor();
    }

    if (dataID >= 63 && dataID <= 90) {
      appearing4floor();
    }

    if (dataID >= 91 && dataID <= 112) {
      appearing1floor();
    }
  });
  el.addEventListener('mouseleave', e => {
    const self = e.currentTarget;
    const selfClass = self.getAttribute('href');
    const currentElement = document.querySelector(`.map a[href="${selfClass}"]`);
    const currentPolygon = currentElement.querySelectorAll('rect');
    const currentPath = currentElement.querySelectorAll('path');

    if (!self.classList.contains('click')) {
      if (currentPolygon) {
        currentPolygon.forEach(el => el.style.cssText = 'fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none');
      }

      if (currentPath) currentPath.forEach(el => el.style.cssText = '');
      self.classList.remove('active');
    }
  });
  el.addEventListener('click', e => {
    e.preventDefault();
    const self = e.currentTarget;
    const selfClass = self.getAttribute('href');
    const currentElement = document.querySelector(`.map a[href="${selfClass}"]`); // let id = parseInt(currentElement.dataset.id);

    const {
      color
    } = self.dataset;
    const currentPolygon = currentElement.querySelectorAll('rect');

    if (self.classList.contains('click')) {
      if (currentPolygon) {
        currentPolygon.forEach(el => el.style.cssText = 'fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none');
      }

      self.classList.remove('active');
      self.classList.remove('click');

      if (selfClass.length <= 8) {
        arrayClickCab.splice(arrayClickCab.indexOf(selfClass.slice(-4)), 1);
      } else {
        arrayClickCab.splice(arrayClickCab.indexOf(selfClass.slice(-9)), 1);
      }
    } else {
      if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
      self.classList.add('active');
      self.classList.add('click');

      if (selfClass.length <= 8) {
        arrayClickCab.push(selfClass.slice(-4));
      } else {
        arrayClickCab.push(selfClass.slice(-9));
      }
    }

    if (arrayClickCab) {
      console.log(arrayClickCab);
    }

    if (arrayClickCab.length === 2) {
      const beginCab = arrayClickCab[0];
      const endCab = arrayClickCab[1];
      const tempCab = document.getElementById(beginCab);
      currentLevel1cab = tempCab.parentNode.id;
      const tempCab2 = document.getElementById(endCab);
      currentLevel2cab = tempCab2.parentNode.id;

      if (currentLevel1cab === currentLevel2cab) {
        const route = graph.findShortestPath(beginCab, endCab);
        drawRoute(route, currentLevel1cab);
      } else {
        let route = graph.findShortestPath(beginCab, `stair${currentLevel1cab.slice(-1)}floor`);
        drawRoute(route, currentLevel1cab);
        route = graph.findShortestPath(`stair${currentLevel2cab.slice(-1)}floor`, endCab);
        drawRoute(route, currentLevel2cab);
      }
    } else {
      removeDrawRoute();
    } // requestData(id);

  });
});
$mapLinks.forEach(el => {
  el.addEventListener('mouseenter', e => {
    const self = e.currentTarget;
    const selfClass = self.getAttribute('href');
    const {
      color
    } = self.dataset;
    const currentElement = document.querySelectorAll(`.left-menu a[href="${selfClass}"]`);
    const currentPolygon = self.querySelectorAll('rect');
    const currentPath = self.querySelectorAll('path');
    if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
    if (currentPath) currentPath.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
    currentElement.forEach(el => el.classList.add('active'));
  });
  el.addEventListener('mouseleave', e => {
    const self = e.currentTarget;
    const selfClass = self.getAttribute('href');
    const currentElement = document.querySelectorAll(`.left-menu a[href="${selfClass}"]`);
    const currentPolygon = self.querySelectorAll('rect');
    const currentPath = self.querySelectorAll('path');

    if (!currentElement[0].classList.contains('click')) {
      if (currentPolygon) {
        currentPolygon.forEach(el => el.style.cssText = 'fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none');
      }

      if (currentPath) currentPath.forEach(el => el.style.cssText = '');
      currentElement.forEach(el => el.classList.remove('active'));
    }
  });
  el.addEventListener('click', e => {
    e.preventDefault();
    const self = e.currentTarget;
    const selfClass = self.getAttribute('href');
    const currentElement = document.querySelectorAll(`.left-menu a[href="${selfClass}"]`); // let id = parseInt(currentElement.dataset.id);

    const {
      color
    } = self.dataset;
    const currentPolygon = self.querySelectorAll('rect');

    if (currentElement[0].classList.contains('click')) {
      if (currentPolygon) {
        currentPolygon.forEach(el => el.style.cssText = 'fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:0.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none');
      }

      currentElement.forEach(el => el.classList.remove('active'));
      currentElement.forEach(el => el.classList.remove('click'));

      if (selfClass.length <= 8) {
        arrayClickCab.splice(arrayClickCab.indexOf(selfClass.slice(-4)), 1);
      } else {
        arrayClickCab.splice(arrayClickCab.indexOf(selfClass.slice(-9)), 1);
      }
    } else {
      if (currentPolygon) currentPolygon.forEach(el => el.style.cssText = `fill: ${color}; stroke-width: 2px;`);
      currentElement.forEach(el => el.classList.add('active'));
      currentElement.forEach(el => el.classList.add('click'));

      if (selfClass.length <= 8) {
        arrayClickCab.push(selfClass.slice(-4));
      } else {
        arrayClickCab.push(selfClass.slice(-9));
      }
    }

    if (arrayClickCab) {
      console.log(arrayClickCab);
    }

    if (arrayClickCab.length === 2) {
      const beginCab = arrayClickCab[0];
      const endCab = arrayClickCab[1];
      const tempCab = document.getElementById(beginCab);
      currentLevel1cab = tempCab.parentNode.id;
      const tempCab2 = document.getElementById(endCab);
      currentLevel2cab = tempCab2.parentNode.id;

      if (currentLevel1cab === currentLevel2cab) {
        const route = graph.findShortestPath(beginCab, endCab);
        drawRoute(route, currentLevel1cab);
      } else {
        let route = graph.findShortestPath(beginCab, `stair${currentLevel1cab.slice(-1)}floor`);
        drawRoute(route, currentLevel1cab);
        route = graph.findShortestPath(`stair${currentLevel2cab.slice(-1)}floor`, endCab);
        drawRoute(route, currentLevel2cab);
      }
    } else {
      removeDrawRoute();
    } // requestData(id);

  });
}); // Тут я добавил svgImage2 для второго этажа

const svgImage1 = document.getElementById('svgImage1');
const svgImage2 = document.getElementById('svgImage2');
const svgImage3 = document.getElementById('svgImage3');
const svgImage4 = document.getElementById('svgImage4');
const svgContainer = document.getElementById('svgContainer'); // const svgContainer2 = document.getElementById("svgContainer2");
//  var viewBox = {x:0,y:0,w:svgImage.clientWidth,h:svgImage.clientHeight};

let viewBox = {
  x: -9.2,
  y: 0.4,
  w: 245,
  h: 161.5
};
svgImage1.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
svgImage2.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
svgImage3.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
svgImage4.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
const svgSize = {
  w: svgImage1.clientWidth,
  h: svgImage1.clientHeight
};
let isPanning = false;
let startPoint = {
  x: 0,
  y: 0
};
let endPoint = {
  x: 0,
  y: 0
};
let scale = 5.74;

svgContainer.onmousewheel = function (e) {
  e.preventDefault();
  const {
    w
  } = viewBox;
  const {
    h
  } = viewBox;
  const mx = e.offsetX; // mouse x

  const my = e.offsetY;
  const dw = w * Math.sign(e.deltaY) * 0.05;
  const dh = h * Math.sign(e.deltaY) * 0.05;
  const dx = dw * mx / svgSize.w;
  const dy = dh * my / svgSize.h;
  viewBox = {
    x: viewBox.x + dx,
    y: viewBox.y + dy,
    w: viewBox.w - dw,
    h: viewBox.h - dh
  };
  scale = svgSize.w / viewBox.w; //    zoomValue.innerText = `${Math.round(scale*100)/100}`;

  svgImage1.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
  svgImage2.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
  svgImage3.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
  svgImage4.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
};

svgContainer.onmousedown = function (e) {
  isPanning = true;
  startPoint = {
    x: e.x,
    y: e.y
  };
};

svgContainer.onmousemove = function (e) {
  if (isPanning) {
    endPoint = {
      x: e.x,
      y: e.y
    };
    const dx = (startPoint.x - endPoint.x) / scale;
    const dy = (startPoint.y - endPoint.y) / scale;
    const movedViewBox = {
      x: viewBox.x + dx,
      y: viewBox.y + dy,
      w: viewBox.w,
      h: viewBox.h
    };
    svgImage1.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
    svgImage2.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
    svgImage3.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
    svgImage4.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
  }
};

svgContainer.onmouseup = function (e) {
  if (isPanning) {
    endPoint = {
      x: e.x,
      y: e.y
    };
    const dx = (startPoint.x - endPoint.x) / scale;
    const dy = (startPoint.y - endPoint.y) / scale;
    viewBox = {
      x: viewBox.x + dx,
      y: viewBox.y + dy,
      w: viewBox.w,
      h: viewBox.h
    };
    svgImage1.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    svgImage2.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    svgImage3.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    svgImage4.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    isPanning = false;
  }
};

svgContainer.onmouseleave = function (e) {
  isPanning = false;
}; // код ярика


const map1 = document.getElementById('map1');
const map2 = document.getElementById('map2');
const map3 = document.getElementById('map3');
const map4 = document.getElementById('map4');
const button1 = document.getElementById('level1');
const button2 = document.getElementById('level2');
const button3 = document.getElementById('level3');
const button4 = document.getElementById('level4');
const h1 = document.getElementById('NameFloor'); // просто добавления класса появления и скрытия

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
});
button3.addEventListener('click', () => {
  appearing3floor();
});

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
});
button4.addEventListener('click', () => {
  appearing4floor();
});
const svg = d3.select('#svgImage1'); // ********* рисование пути *********
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
    const list = this.vertices; // список смежности

    let stack = [startVertex]; // стек вершин для перебора

    const visited = {
      [startVertex]: 1
    }; // посещенные вершины

    function handleVertex(vertex) {
      // вызываем коллбэк для посещенной вершины
      callback(vertex); // получаем список смежных вершин

      const reversedNeighboursList = [...list[vertex]].reverse();
      reversedNeighboursList.forEach(neighbour => {
        if (!visited[neighbour]) {
          // отмечаем вершину как посещенную
          visited[neighbour] = 1; // добавляем в стек

          stack.push(neighbour);
        }
      });
    } // перебираем вершины из стека, пока он не опустеет


    while (stack.length) {
      const activeVertex = stack.pop();
      handleVertex(activeVertex);
    } // проверка на изолированные фрагменты


    stack = Object.keys(this.vertices);

    while (stack.length) {
      const activeVertex = stack.pop();

      if (!visited[activeVertex]) {
        visited[activeVertex] = 1;
        handleVertex(activeVertex);
      }
    }
  }

  bfs2(startVertex) {
    const list = this.vertices;
    const queue = [startVertex];
    const visited = {
      [startVertex]: 1
    }; // кратчайшее расстояние от стартовой вершины

    const distance = {
      [startVertex]: 0
    }; // предыдущая вершина в цепочке

    const previous = {
      [startVertex]: null
    };

    function handleVertex(vertex) {
      const neighboursList = list[vertex];
      neighboursList.forEach(neighbour => {
        if (!visited[neighbour]) {
          visited[neighbour] = 1;
          queue.push(neighbour); // сохраняем предыдущую вершину

          previous[neighbour] = vertex; // сохраняем расстояние

          distance[neighbour] = distance[vertex] + 1;
        }
      });
    } // перебираем вершины из очереди, пока она не опустеет


    while (queue.length) {
      const activeVertex = queue.shift();
      handleVertex(activeVertex);
    }

    return {
      distance,
      previous
    };
  }

  findShortestPath(startVertex, finishVertex) {
    const result = this.bfs2(startVertex);
    if (!(finishVertex in result.previous)) throw new Error(`Нет пути из вершины ${startVertex} в вершину ${finishVertex}`);
    const path = [];
    let currentVertex = finishVertex;

    while (currentVertex !== startVertex) {
      path.unshift(currentVertex);
      currentVertex = result.previous[currentVertex];
    }

    path.unshift(startVertex);
    return path;
  }

} // Создаю сам граф


const graph = new Graph(); // *********** 2 этаж ***************

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
graph.addVertex('25'); //  ********** узлы 2 этажа кабинетов  ************

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
graph.addVertex('1206'); //  ******* 2 этаж грани **********

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
graph.addEdge('25', '24'); // ************** 2 этаж грани кабинетов ****************

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
graph.addEdge('1206', '25'); //  *********** 3 этаж ***************

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
graph.addVertex('48'); // ********** узлы 3 этажа кабинетов  ************

graph.addVertex('stair3floor');
graph.addVertex('1326');
graph.addVertex('1327');
graph.addVertex('1328');
graph.addVertex('1329');
graph.addVertex('1330');
graph.addVertex('1331');
graph.addVertex('1332');
graph.addVertex('1333');
graph.addVertex('1334');
graph.addVertex('1335');
graph.addVertex('1336');
graph.addVertex('1338');
graph.addVertex('1339');
graph.addVertex('1340');
graph.addVertex('ws_w');
graph.addVertex('ws_m');
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
graph.addVertex('1301'); //  ******* 3 этаж грани **********

graph.addEdge('stair3floor', '35');
graph.addEdge('stair3floor', '34');
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
graph.addEdge('35', '36');
graph.addEdge('35', '34');
graph.addEdge('34', '35');
graph.addEdge('36', '37');
graph.addEdge('38', '37');
graph.addEdge('38', '39');
graph.addEdge('40', '39');
graph.addEdge('40', '41');
graph.addEdge('35', '42');
graph.addEdge('43', '42');
graph.addEdge('43', '44');
graph.addEdge('43', '44');
graph.addEdge('45', '44');
graph.addEdge('45', '46');
graph.addEdge('47', '46');
graph.addEdge('47', '48'); // ************** 3 этаж грани кабинетов ****************

graph.addEdge('1332', '26');
graph.addEdge('1333', '26');
graph.addEdge('1334', '27');
graph.addEdge('1335', '28');
graph.addEdge('1331', '28');
graph.addEdge('1330', '29');
graph.addEdge('1336', '29');
graph.addEdge('1329', '30');
graph.addEdge('1328', '31');
graph.addEdge('1338', '31');
graph.addEdge('1327', '32');
graph.addEdge('1339', '32');
graph.addEdge('1326', '33');
graph.addEdge('1340', '33');
graph.addEdge('33', '1340');
graph.addEdge('ws_m', '36');
graph.addEdge('1320', '37');
graph.addEdge('1312', '37');
graph.addEdge('1319', '38');
graph.addEdge('1313', '38');
graph.addEdge('1318', '39');
graph.addEdge('1317', '40');
graph.addEdge('1314', '40');
graph.addEdge('1316', '41');
graph.addEdge('1315', '41');
graph.addEdge('1311', '35');
graph.addEdge('1311', '35');
graph.addEdge('ws_w', '42');
graph.addEdge('ws_w', '42');
graph.addEdge('1309', '43');
graph.addEdge('1301', '43');
graph.addEdge('1302', '44');
graph.addEdge('1303', '45');
graph.addEdge('1308', '45');
graph.addEdge('1304', '46');
graph.addEdge('1305', '47');
graph.addEdge('1307', '47');
graph.addEdge('1306', '48'); //  *********** 4 этаж ***************

graph.addVertex('49');
graph.addVertex('50');
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
graph.addVertex('63');
graph.addVertex('64');
graph.addVertex('65');
graph.addVertex('66');
graph.addVertex('67');
graph.addVertex('68');
graph.addVertex('69');
graph.addVertex('70');
graph.addVertex('89'); // ********** узлы 4 этажа кабинетов ************

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
graph.addVertex('1422');
graph.addVertex('1423');
graph.addVertex('1424');
graph.addVertex('1425');
graph.addVertex('1426');
graph.addVertex('1427');
graph.addVertex('1428');
graph.addVertex('1429');
graph.addVertex('1430');
graph.addVertex('1431');
graph.addVertex('1432');
graph.addVertex('1433');
graph.addVertex('1434');
graph.addVertex('1435');
graph.addVertex('1418');
graph.addVertex('1416');
graph.addVertex('1404');
graph.addVertex('1405'); // graph.addVertex('med');
// ******* 4 этаж грани **********

graph.addEdge('49', '50');
graph.addEdge('50', '51');
graph.addEdge('52', '51');
graph.addEdge('52', '53');
graph.addEdge('54', '53');
graph.addEdge('54', '55');
graph.addEdge('56', '55');
graph.addEdge('56', '57');
graph.addEdge('stair4floor', '57');
graph.addEdge('stair4floor', '58');
graph.addEdge('59', '58');
graph.addEdge('57', '58');
graph.addEdge('59', '60');
graph.addEdge('61', '60');
graph.addEdge('61', '62');
graph.addEdge('63', '62');
graph.addEdge('63', '64');
graph.addEdge('63', '64');
graph.addEdge('58', '89');
graph.addEdge('89', '65');
graph.addEdge('66', '65');
graph.addEdge('66', '67');
graph.addEdge('68', '67');
graph.addEdge('68', '69');
graph.addEdge('70', '69'); // ************** 4 этаж грани кабинетов ****************

graph.addEdge('1428', '49');
graph.addEdge('1427', '50');
graph.addEdge('1429', '50');
graph.addEdge('1430', '51');
graph.addEdge('1431', '52');
graph.addEdge('1426', '52');
graph.addEdge('1425', '53');
graph.addEdge('1424', '54');
graph.addEdge('1432', '54');
graph.addEdge('1423', '55');
graph.addEdge('1433', '55');
graph.addEdge('1422', '56');
graph.addEdge('1434', '56');
graph.addEdge('1435', '59'); // graph.addEdge('med', '89');

graph.addEdge('1420', '60');
graph.addEdge('1412', '60');
graph.addEdge('1419', '61');
graph.addEdge('1413', '61');
graph.addEdge('1418', '62');
graph.addEdge('1417', '63');
graph.addEdge('1414', '63');
graph.addEdge('1416', '64');
graph.addEdge('1415', '64');
graph.addEdge('1411', '58');
graph.addEdge('58', '1411');
graph.addEdge('1401', '65');
graph.addEdge('65', '1401');
graph.addEdge('1409', '65');
graph.addEdge('1402', '66');
graph.addEdge('1403', '67');
graph.addEdge('1408', '67');
graph.addEdge('1404', '68');
graph.addEdge('1405', '69');
graph.addEdge('1407', '69');
graph.addEdge('1406', '70'); // *********** 1 этаж ***************

graph.addVertex('71');
graph.addVertex('72');
graph.addVertex('73');
graph.addVertex('74');
graph.addVertex('75');
graph.addVertex('76');
graph.addVertex('77');
graph.addVertex('78');
graph.addVertex('79');
graph.addVertex('80');
graph.addVertex('81');
graph.addVertex('82');
graph.addVertex('83');
graph.addVertex('84');
graph.addVertex('85');
graph.addVertex('86');
graph.addVertex('87');
graph.addVertex('88'); // ********** узлы 1 этажа кабинетов  ************

graph.addVertex('stair1floor');
graph.addVertex('1126');
graph.addVertex('1124');
graph.addVertex('1122');
graph.addVertex('1121');
graph.addVertex('1119');
graph.addVertex('1101');
graph.addVertex('1103');
graph.addVertex('1110');
graph.addVertex('1109');
graph.addVertex('1108');
graph.addVertex('1102');
graph.addVertex('1100');
graph.addVertex('1137');
graph.addVertex('1138');
graph.addVertex('1139');
graph.addVertex('1140');
graph.addVertex('1144');
graph.addVertex('1144a');
graph.addVertex('1144b');
graph.addVertex('1144v');
graph.addVertex('11444');
graph.addVertex('1107'); // ******* 1 этаж грани **********

graph.addEdge('71', '72');
graph.addEdge('73', '72');
graph.addEdge('73', '74');
graph.addEdge('75', '74');
graph.addEdge('75', '76');
graph.addEdge('77', '76');
graph.addEdge('77', '78');
graph.addEdge('79', '78');
graph.addEdge('79', '80');
graph.addEdge('81', '80');
graph.addEdge('81', '82');
graph.addEdge('83', '82');
graph.addEdge('79', '84');
graph.addEdge('79', 'stair1floor');
graph.addEdge('85', '84');
graph.addEdge('85', '86');
graph.addEdge('87', '86');
graph.addEdge('87', '88'); // ************** 1 этаж грани кабинетов ****************

graph.addEdge('71', '1144');
graph.addEdge('71', '1140');
graph.addEdge('71', '1144a');
graph.addEdge('72', '1144b');
graph.addEdge('72', '1139');
graph.addEdge('73', '1144v');
graph.addEdge('74', '11444');
graph.addEdge('74', '1138');
graph.addEdge('75', '1137');
graph.addEdge('79', '1103');
graph.addEdge('80', '1126');
graph.addEdge('81', '1124');
graph.addEdge('82', '1122');
graph.addEdge('83', '1121');
graph.addEdge('83', '1119');
graph.addEdge('84', '1100');
graph.addEdge('84', '1110');
graph.addEdge('85', '1101');
graph.addEdge('86', '1102');
graph.addEdge('86', '1109');
graph.addEdge('87', '1108');
graph.addEdge('88', '1107'); //  let route = graph.findShortestPath('stair2floor', '1222')

function drawRoute(route, currentLevel) {
  const level = document.getElementById(currentLevel);

  for (let i = 0; i < route.length - 1; i += 1) {
    const circle1 = document.getElementById(route[i]);
    const circle2 = document.getElementById(route[i + 1]);
    const x1 = circle1.getAttribute('cx');
    const y1 = circle1.getAttribute('cy');
    const x2 = circle2.getAttribute('cx');
    const y2 = circle2.getAttribute('cy');
    const newElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    newElement.setAttribute('d', `M${x1},${y1}L${x2},${y2}`);
    newElement.style.stroke = '#000000';
    newElement.style.strokeWidth = '2px';
    newElement.setAttribute('id', 'route');
    level.appendChild(newElement);
  }
}

function removeDrawRoute() {
  const drawPaths = document.querySelectorAll('.map path[id="route"]');
  console.log(drawPaths);
  if (drawPaths) drawPaths.forEach(el => el.remove());
}

/***/ }),

/***/ 901:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(537);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*,\n::after,\n::before {\n    box-sizing: inherit;\n    padding: 0;\n    margin: 0\n}\n\nhtml {\n    line-height: 1.15;\n    box-sizing: border-box;\n    font-family: sans-serif\n}\n\nmain {\n    display: block\n}\n\nh1 {\n    font-size: 2em;\n    margin: .67em 0\n}\n\na {\n    background-color: transparent\n}\n\nabbr[title] {\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted\n}\n\ncode,\nkbd,\npre,\nsamp {\n    font-family: monospace, monospace;\n    font-size: 1em\n}\n\nsub,\nsup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline\n}\n\nsub {\n    bottom: -.25em\n}\n\nsup {\n    top: -.5em\n}\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n    line-height: inherit;\n    border: 1px solid currentColor\n}\n\nbutton {\n    overflow: visible;\n    text-transform: none\n}\n\n[type=button],\n[type=reset],\n[type=submit],\nbutton {\n    -webkit-appearance: button;\n    padding: 1px 6px\n}\n\ninput {\n    overflow: visible\n}\n\ninput,\ntextarea {\n    padding: 1px\n}\n\nfieldset {\n    border: 1px solid currentColor;\n    margin: 0 2px\n}\n\nlegend {\n    color: inherit;\n    display: table;\n    max-width: 100%;\n    white-space: normal\n}\n\nprogress {\n    display: inline-block;\n    vertical-align: baseline\n}\n\nselect {\n    text-transform: none\n}\n\ntextarea {\n    overflow: auto;\n    vertical-align: top\n}\n\n[type=search] {\n    -webkit-appearance: textfield;\n    outline-offset: -2px\n}\n\n[type=color] {\n    background: inherit\n}\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n    height: auto\n}\n\n::-webkit-input-placeholder {\n    color: inherit;\n    opacity: .5\n}\n\n::-webkit-file-upload-button,\n::-webkit-search-decoration {\n    -webkit-appearance: button;\n    font: inherit\n}\n\n::-moz-focus-inner {\n    border: 0\n}\n\n:-moz-focusring {\n    outline: 1px dotted ButtonText\n}\n\n:-moz-ui-invalid {\n    box-shadow: none\n}\n\nhr {\n    box-sizing: content-box;\n    height: 0;\n    color: inherit;\n    overflow: visible\n}\n\ndl,\nol,\nul {\n    margin: 1em 0\n}\n\ndl dl,\ndl ol,\ndl ul,\nol dl,\nol ol,\nol ul,\nul dl,\nul ol,\nul ul {\n    margin: 0\n}\n\nb,\nstrong {\n    font-weight: bolder\n}\n\naudio,\nvideo {\n    display: inline-block\n}\n\naudio:not([controls]) {\n    display: none;\n    height: 0\n}\n\nimg {\n    border: 0\n}\n\nsvg:not(:root) {\n    overflow: hidden\n}\n\ntable {\n    text-indent: 0;\n    border-color: inherit\n}\n\ndetails {\n    display: block\n}\n\ndialog {\n    background-color: inherit;\n    border: solid;\n    color: inherit;\n    display: block;\n    height: -webkit-fit-content;\n    height: -moz-fit-content;\n    height: fit-content;\n    left: 0;\n    margin: auto;\n    padding: 1em;\n    position: absolute;\n    right: 0;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content\n}\n\ndialog:not([open]) {\n    display: none\n}\n\nsummary {\n    display: list-item\n}\n\ncanvas {\n    display: inline-block\n}\n\ntemplate {\n    display: none\n}\n\n[hidden] {\n    display: none\n}", "",{"version":3,"sources":["webpack://./src/css/reseter.css"],"names":[],"mappings":"AAAA;;;IAGI,mBAAmB;IACnB,UAAU;IACV;AACJ;;AAEA;IACI,iBAAiB;IACjB,sBAAsB;IACtB;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI,cAAc;IACd;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI,yCAAyC;IACzC;AACJ;;AAEA;;;;IAII,iCAAiC;IACjC;AACJ;;AAEA;;IAEI,cAAc;IACd,cAAc;IACd,kBAAkB;IAClB;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;;;;;IAKI,oBAAoB;IACpB;AACJ;;AAEA;IACI,iBAAiB;IACjB;AACJ;;AAEA;;;;IAII,0BAA0B;IAC1B;AACJ;;AAEA;IACI;AACJ;;AAEA;;IAEI;AACJ;;AAEA;IACI,8BAA8B;IAC9B;AACJ;;AAEA;IACI,cAAc;IACd,cAAc;IACd,eAAe;IACf;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI,cAAc;IACd;AACJ;;AAEA;IACI,6BAA6B;IAC7B;AACJ;;AAEA;IACI;AACJ;;AAEA;;IAEI;AACJ;;AAEA;IACI,cAAc;IACd;AACJ;;AAEA;;IAEI,0BAA0B;IAC1B;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI,uBAAuB;IACvB,SAAS;IACT,cAAc;IACd;AACJ;;AAEA;;;IAGI;AACJ;;AAEA;;;;;;;;;IASI;AACJ;;AAEA;;IAEI;AACJ;;AAEA;;IAEI;AACJ;;AAEA;IACI,aAAa;IACb;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI,cAAc;IACd;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI,yBAAyB;IACzB,aAAa;IACb,cAAc;IACd,cAAc;IACd,2BAA2B;IAC3B,wBAAwB;IACxB,mBAAmB;IACnB,OAAO;IACP,YAAY;IACZ,YAAY;IACZ,kBAAkB;IAClB,QAAQ;IACR,0BAA0B;IAC1B,uBAAuB;IACvB;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ","sourcesContent":["*,\n::after,\n::before {\n    box-sizing: inherit;\n    padding: 0;\n    margin: 0\n}\n\nhtml {\n    line-height: 1.15;\n    box-sizing: border-box;\n    font-family: sans-serif\n}\n\nmain {\n    display: block\n}\n\nh1 {\n    font-size: 2em;\n    margin: .67em 0\n}\n\na {\n    background-color: transparent\n}\n\nabbr[title] {\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted\n}\n\ncode,\nkbd,\npre,\nsamp {\n    font-family: monospace, monospace;\n    font-size: 1em\n}\n\nsub,\nsup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline\n}\n\nsub {\n    bottom: -.25em\n}\n\nsup {\n    top: -.5em\n}\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n    line-height: inherit;\n    border: 1px solid currentColor\n}\n\nbutton {\n    overflow: visible;\n    text-transform: none\n}\n\n[type=button],\n[type=reset],\n[type=submit],\nbutton {\n    -webkit-appearance: button;\n    padding: 1px 6px\n}\n\ninput {\n    overflow: visible\n}\n\ninput,\ntextarea {\n    padding: 1px\n}\n\nfieldset {\n    border: 1px solid currentColor;\n    margin: 0 2px\n}\n\nlegend {\n    color: inherit;\n    display: table;\n    max-width: 100%;\n    white-space: normal\n}\n\nprogress {\n    display: inline-block;\n    vertical-align: baseline\n}\n\nselect {\n    text-transform: none\n}\n\ntextarea {\n    overflow: auto;\n    vertical-align: top\n}\n\n[type=search] {\n    -webkit-appearance: textfield;\n    outline-offset: -2px\n}\n\n[type=color] {\n    background: inherit\n}\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n    height: auto\n}\n\n::-webkit-input-placeholder {\n    color: inherit;\n    opacity: .5\n}\n\n::-webkit-file-upload-button,\n::-webkit-search-decoration {\n    -webkit-appearance: button;\n    font: inherit\n}\n\n::-moz-focus-inner {\n    border: 0\n}\n\n:-moz-focusring {\n    outline: 1px dotted ButtonText\n}\n\n:-moz-ui-invalid {\n    box-shadow: none\n}\n\nhr {\n    box-sizing: content-box;\n    height: 0;\n    color: inherit;\n    overflow: visible\n}\n\ndl,\nol,\nul {\n    margin: 1em 0\n}\n\ndl dl,\ndl ol,\ndl ul,\nol dl,\nol ol,\nol ul,\nul dl,\nul ol,\nul ul {\n    margin: 0\n}\n\nb,\nstrong {\n    font-weight: bolder\n}\n\naudio,\nvideo {\n    display: inline-block\n}\n\naudio:not([controls]) {\n    display: none;\n    height: 0\n}\n\nimg {\n    border: 0\n}\n\nsvg:not(:root) {\n    overflow: hidden\n}\n\ntable {\n    text-indent: 0;\n    border-color: inherit\n}\n\ndetails {\n    display: block\n}\n\ndialog {\n    background-color: inherit;\n    border: solid;\n    color: inherit;\n    display: block;\n    height: -webkit-fit-content;\n    height: -moz-fit-content;\n    height: fit-content;\n    left: 0;\n    margin: auto;\n    padding: 1em;\n    position: absolute;\n    right: 0;\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content\n}\n\ndialog:not([open]) {\n    display: none\n}\n\nsummary {\n    display: list-item\n}\n\ncanvas {\n    display: inline-block\n}\n\ntemplate {\n    display: none\n}\n\n[hidden] {\n    display: none\n}"],"sourceRoot":""}]);
// Exports
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (___CSS_LOADER_EXPORT___)));


/***/ }),

/***/ 336:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(537);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n\tmargin: 0;\n\tpadding: 0;\n\tbox-sizing: border-box;\n\tfont-family: sans-serif;\n}\n\n.content {\n\tdisplay: flex;\n\talign-items: center;\n\tpadding: 10px 100px;\n}\n\n.left-menu input {\n\tpadding: 10px;\n}\n\n.left-menu ul {\n\tlist-style-type: none;\n\tborder: 1px solid #bfbfbf;\n\tmax-height: 20em;\n\tmin-height: 20em;\n\toverflow-y: scroll;\n}\n\n.left-menu li:not(:last-child) {\n\tborder-bottom: 1px solid #bfbfbf;\n}\n\n.left-menu a {\n\tdisplay: block;\n\tpadding: 10px;\n\tcolor: #333;\n}\n\n.level ul {\n\tlist-style-type: none;\n\tborder: 1px solid #bfbfbf;\n}\n\n.level button {\n\tdisplay: block;\n\tpadding: 10px;\n\tcolor: #333;\n\tbackground: none;\n}\n\nbutton,\na {\n\ttext-decoration: none;\n}\n\n.left-menu {\n\tflex-shrink: 0;\n}\n\n.map {\n\twidth: 100%;\n\t/* height: 100vh; */\n\theight: fit-content;\n}\n\n.map svg {\n\tdisplay: block;\n\twidth: 100%;\t\n\t/* height: 100%; */\n\ttransition: all 0.15s;\n}\n\n.map a {\n\ttransition: all 0.15s;\n}\n\n.active {\n\tbackground-color: #bfbfbf;\n\ttransition: all 0.15s;\n}\n\n.info {\n\tpadding: 30px 100px;\n\tpadding-bottom: 50px;\n\tmax-width: 50%;\n}\n\n.info h2 {\n\tmargin-bottom: 20px;\n}\n\n\n/* стили для изменения этажей */\n\n#map2 {\n\tdisplay: none;\n}\n#map3 {\n\tdisplay: none;\n}\n\n#map4 {\n\tdisplay: none;\n}\n\n#map1.show-out {\n\tdisplay: none;\n}\n\n#map2.show-in {\n\tdisplay: block ;\n\t\n}\n#map3.show-in {\n\tdisplay: block ;\t\n}\n#map4.show-in {\n\tdisplay: block ;\t\n}\n\n#level1, #level2, #level3, #level4 {\n\tcursor: pointer;\n}\n\n/* заголовок с названием этажа */\n\nh1 {\n\ttext-align: center;\n\tfont-size: 80px;\n}\n\nbody text { \n\t-ms-user-select: none; \n\t-moz-user-select: none; \n\t-webkit-user-select: none; \n\tuser-select: none; \n}\n\n\n.logoMos {\n\tposition: absolute;\n\tmargin-left: 75px;\n\tmargin-top: 40px;\n\ttransform: scale(1.8);\n\t\n}\n\n@keyframes appear {\n\t0% { opacity: 0;}\n\t100% {opacity: 1;}\n}\n\n#route {\n\tanimation: appear 1s;\n}\n", "",{"version":3,"sources":["webpack://./src/css/style.css"],"names":[],"mappings":"AAAA;CACC,SAAS;CACT,UAAU;CACV,sBAAsB;CACtB,uBAAuB;AACxB;;AAEA;CACC,aAAa;CACb,mBAAmB;CACnB,mBAAmB;AACpB;;AAEA;CACC,aAAa;AACd;;AAEA;CACC,qBAAqB;CACrB,yBAAyB;CACzB,gBAAgB;CAChB,gBAAgB;CAChB,kBAAkB;AACnB;;AAEA;CACC,gCAAgC;AACjC;;AAEA;CACC,cAAc;CACd,aAAa;CACb,WAAW;AACZ;;AAEA;CACC,qBAAqB;CACrB,yBAAyB;AAC1B;;AAEA;CACC,cAAc;CACd,aAAa;CACb,WAAW;CACX,gBAAgB;AACjB;;AAEA;;CAEC,qBAAqB;AACtB;;AAEA;CACC,cAAc;AACf;;AAEA;CACC,WAAW;CACX,mBAAmB;CACnB,mBAAmB;AACpB;;AAEA;CACC,cAAc;CACd,WAAW;CACX,kBAAkB;CAClB,qBAAqB;AACtB;;AAEA;CACC,qBAAqB;AACtB;;AAEA;CACC,yBAAyB;CACzB,qBAAqB;AACtB;;AAEA;CACC,mBAAmB;CACnB,oBAAoB;CACpB,cAAc;AACf;;AAEA;CACC,mBAAmB;AACpB;;;AAGA,+BAA+B;;AAE/B;CACC,aAAa;AACd;AACA;CACC,aAAa;AACd;;AAEA;CACC,aAAa;AACd;;AAEA;CACC,aAAa;AACd;;AAEA;CACC,eAAe;;AAEhB;AACA;CACC,eAAe;AAChB;AACA;CACC,eAAe;AAChB;;AAEA;CACC,eAAe;AAChB;;AAEA,gCAAgC;;AAEhC;CACC,kBAAkB;CAClB,eAAe;AAChB;;AAEA;CACC,qBAAqB;CACrB,sBAAsB;CACtB,yBAAyB;CACzB,iBAAiB;AAClB;;;AAGA;CACC,kBAAkB;CAClB,iBAAiB;CACjB,gBAAgB;CAChB,qBAAqB;;AAEtB;;AAEA;CACC,KAAK,UAAU,CAAC;CAChB,MAAM,UAAU,CAAC;AAClB;;AAEA;CACC,oBAAoB;AACrB","sourcesContent":["* {\n\tmargin: 0;\n\tpadding: 0;\n\tbox-sizing: border-box;\n\tfont-family: sans-serif;\n}\n\n.content {\n\tdisplay: flex;\n\talign-items: center;\n\tpadding: 10px 100px;\n}\n\n.left-menu input {\n\tpadding: 10px;\n}\n\n.left-menu ul {\n\tlist-style-type: none;\n\tborder: 1px solid #bfbfbf;\n\tmax-height: 20em;\n\tmin-height: 20em;\n\toverflow-y: scroll;\n}\n\n.left-menu li:not(:last-child) {\n\tborder-bottom: 1px solid #bfbfbf;\n}\n\n.left-menu a {\n\tdisplay: block;\n\tpadding: 10px;\n\tcolor: #333;\n}\n\n.level ul {\n\tlist-style-type: none;\n\tborder: 1px solid #bfbfbf;\n}\n\n.level button {\n\tdisplay: block;\n\tpadding: 10px;\n\tcolor: #333;\n\tbackground: none;\n}\n\nbutton,\na {\n\ttext-decoration: none;\n}\n\n.left-menu {\n\tflex-shrink: 0;\n}\n\n.map {\n\twidth: 100%;\n\t/* height: 100vh; */\n\theight: fit-content;\n}\n\n.map svg {\n\tdisplay: block;\n\twidth: 100%;\t\n\t/* height: 100%; */\n\ttransition: all 0.15s;\n}\n\n.map a {\n\ttransition: all 0.15s;\n}\n\n.active {\n\tbackground-color: #bfbfbf;\n\ttransition: all 0.15s;\n}\n\n.info {\n\tpadding: 30px 100px;\n\tpadding-bottom: 50px;\n\tmax-width: 50%;\n}\n\n.info h2 {\n\tmargin-bottom: 20px;\n}\n\n\n/* стили для изменения этажей */\n\n#map2 {\n\tdisplay: none;\n}\n#map3 {\n\tdisplay: none;\n}\n\n#map4 {\n\tdisplay: none;\n}\n\n#map1.show-out {\n\tdisplay: none;\n}\n\n#map2.show-in {\n\tdisplay: block ;\n\t\n}\n#map3.show-in {\n\tdisplay: block ;\t\n}\n#map4.show-in {\n\tdisplay: block ;\t\n}\n\n#level1, #level2, #level3, #level4 {\n\tcursor: pointer;\n}\n\n/* заголовок с названием этажа */\n\nh1 {\n\ttext-align: center;\n\tfont-size: 80px;\n}\n\nbody text { \n\t-ms-user-select: none; \n\t-moz-user-select: none; \n\t-webkit-user-select: none; \n\tuser-select: none; \n}\n\n\n.logoMos {\n\tposition: absolute;\n\tmargin-left: 75px;\n\tmargin-top: 40px;\n\ttransform: scale(1.8);\n\t\n}\n\n@keyframes appear {\n\t0% { opacity: 0;}\n\t100% {opacity: 1;}\n}\n\n#route {\n\tanimation: appear 1s;\n}\n"],"sourceRoot":""}]);
// Exports
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (___CSS_LOADER_EXPORT___)));


/***/ }),

/***/ 645:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 537:
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ 821:
/***/ (() => {

"use strict";
// Module
var code = (/* unused pure expression or super */ null && ("<!DOCTYPE html> <html lang=\"en\"> <head> <meta charset=\"UTF-8\"/> <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"/> <title>SVG Map</title> <link rel=\"stylesheet\" href=\"./css/style.css\"/> <" + "script src=\"https://d3js.org/d3.v7.min.js\"><" + "/script> </head> <body> <a class=\"logoMos\" href=\"https://mospolytech.ru/\"><img src=\"./img/mospolytech-logo-black.svg\" alt=\"Перейти на сайт университета\"/></a> <h1 id=\"NameFloor\">1 этаж</h1> <div class=\"content\"> <div class=\"left-menu\"> <input id=\"search\" size=\"20\"/> <p></p> <ul id=\"search-items\"> <li> <a href=\"#cab1126\" data-id=\"91\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1126</a> </li> <li> <a href=\"#cab1124\" data-id=\"92\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1124</a> </li> <li> <a href=\"#cab1122\" data-id=\"93\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1122</a> </li> <li> <a href=\"#cab1121\" data-id=\"94\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1121</a> </li> <li> <a href=\"#cab1119\" data-id=\"95\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1119</a> </li> <li> <a href=\"#cab1101\" data-id=\"96\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1101</a> </li> <li> <a href=\"#cab1110\" data-id=\"97\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1110</a> </li> <li> <a href=\"#cab1109\" data-id=\"98\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1109</a> </li> <li> <a href=\"#cab1108\" data-id=\"99\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1108</a> </li> <li> <a href=\"#cab1107\" data-id=\"100\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1107</a> </li> <li> <a href=\"#cab1102\" data-id=\"112\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1102</a> </li> <li> <a href=\"#cab1103\" data-id=\"101\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1103</a> </li> <li> <a href=\"#cab1100\" data-id=\"102\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1100</a> </li> <li> <a href=\"#cab1137\" data-id=\"103\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1137</a> </li> <li> <a href=\"#cab1138\" data-id=\"104\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1138</a> </li> <li> <a href=\"#cab1139\" data-id=\"105\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1139</a> </li> <li> <a href=\"#cab1140\" data-id=\"106\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1140</a> </li> <li> <a href=\"#cab1144\" data-id=\"107\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1144</a> </li> <li> <a href=\"#cab1144a\" data-id=\"108\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1144а</a> </li> <li> <a href=\"#cab1144b\" data-id=\"109\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1144б</a> </li> <li> <a href=\"#cab1144v\" data-id=\"110\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1144в</a> </li> <li> <a href=\"#cab11444\" data-id=\"111\" class=\"map-tab-link\" data-color=\"#3caa3c\">Кабинет 1144г</a> </li> <li> <a href=\"#cab1222\" data-id=\"1\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1222</a> </li> <li> <a href=\"#cab1221\" data-id=\"2\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1221</a> </li> <li> <a href=\"#cab1219\" data-id=\"3\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1219</a> </li> <li> <a href=\"#cab1217\" data-id=\"4\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1217</a> </li> <li> <a href=\"#cab1216\" data-id=\"5\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1216</a> </li> <li> <a href=\"#cab1215\" data-id=\"6\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1215</a> </li> <li> <a href=\"#cab1213\" data-id=\"7\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1213</a> </li> <li> <a href=\"#cab1212\" data-id=\"8\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1212</a> </li> <li> <a href=\"#cab1211\" data-id=\"9\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1211</a> </li> <li> <a href=\"#cab1209\" data-id=\"10\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1209</a> </li> <li> <a href=\"#cab1208\" data-id=\"11\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1208</a> </li> <li> <a href=\"#cab1207\" data-id=\"12\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1207</a> </li> <li> <a href=\"#cab1206\" data-id=\"13\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1206</a> </li> <li> <a href=\"#cab1205\" data-id=\"14\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1205</a> </li> <li> <a href=\"#cab1204\" data-id=\"15\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1204</a> </li> <li> <a href=\"#cab1203\" data-id=\"16\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1203</a> </li> <li> <a href=\"#cab1202\" data-id=\"17\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1202</a> </li> <li> <a href=\"#cab1201\" data-id=\"18\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1201</a> </li> <li> <a href=\"#cab1240\" data-id=\"19\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1240</a> </li> <li> <a href=\"#cab1239\" data-id=\"20\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1239</a> </li> <li> <a href=\"#cab1236\" data-id=\"21\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1236</a> </li> <li> <a href=\"#cab1235\" data-id=\"22\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1235</a> </li> <li> <a href=\"#cab1233/1234\" data-id=\"23\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1233/1234</a> </li> <li> <a href=\"#cab1231/1232\" data-id=\"24\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1231/1232</a> </li> <li> <a href=\"#cab1229/1230\" data-id=\"25\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1229/1230</a> </li> <li> <a href=\"#cab1228\" data-id=\"26\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1228</a> </li> <li> <a href=\"#cab1227\" data-id=\"27\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1227</a> </li> <li> <a href=\"#cab1226\" data-id=\"28\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1226</a> </li> <li> <a href=\"#cab1225\" data-id=\"29\" class=\"map-tab-link\" data-color=\"#522e9a\">Кабинет 1225</a> </li> <li> <a href=\"#cab1320\" data-id=\"30\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1320</a> </li> <li> <a href=\"#cab1319\" data-id=\"31\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1319</a> </li> <li> <a href=\"#cab1318\" data-id=\"32\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1318</a> </li> <li> <a href=\"#cab1317\" data-id=\"33\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1317</a> </li> <li> <a href=\"#cab1316\" data-id=\"34\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1316</a> </li> <li> <a href=\"#cab1315\" data-id=\"35\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1315</a> </li> <li> <a href=\"#cab1314\" data-id=\"36\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1314</a> </li> <li> <a href=\"#cab1313\" data-id=\"37\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1313</a> </li> <li> <a href=\"#cab1312\" data-id=\"38\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1312</a> </li> <li> <a href=\"#cab1311\" data-id=\"39\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1311</a> </li> <li> <a href=\"#cab1309\" data-id=\"40\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1309</a> </li> <li> <a href=\"#cab1308\" data-id=\"41\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1308</a> </li> <li> <a href=\"#cab1307\" data-id=\"42\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1307</a> </li> <li> <a href=\"#cab1306\" data-id=\"43\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1306</a> </li> <li> <a href=\"#cab1305\" data-id=\"44\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1305</a> </li> <li> <a href=\"#cab1304\" data-id=\"45\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1304</a> </li> <li> <a href=\"#cab1303\" data-id=\"46\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1303</a> </li> <li> <a href=\"#cab1302\" data-id=\"47\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1302</a> </li> <li> <a href=\"#cab1301\" data-id=\"48\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1301</a> </li> <li> <a href=\"#cab1326\" data-id=\"49\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1326</a> </li> <li> <a href=\"#cab1327\" data-id=\"50\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1327</a> </li> <li> <a href=\"#cab1328\" data-id=\"51\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1328</a> </li> <li> <a href=\"#cab1329\" data-id=\"52\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1329</a> </li> <li> <a href=\"#cab1330\" data-id=\"53\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1330</a> </li> <li> <a href=\"#cab1331\" data-id=\"54\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1331</a> </li> <li> <a href=\"#cab1332\" data-id=\"55\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1332</a> </li> <li> <a href=\"#cab1333\" data-id=\"56\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1333</a> </li> <li> <a href=\"#cab1334\" data-id=\"57\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1334</a> </li> <li> <a href=\"#cab1335\" data-id=\"58\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1335</a> </li> <li> <a href=\"#cab1336\" data-id=\"59\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1336</a> </li> <li> <a href=\"#cab1338\" data-id=\"60\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1338</a> </li> <li> <a href=\"#cab1339\" data-id=\"61\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1339</a> </li> <li> <a href=\"#cab1340\" data-id=\"62\" class=\"map-tab-link\" data-color=\"#FF0000\">Кабинет 1340</a> </li> <li> <a href=\"#ws_m\" data-id=\"62\" class=\"map-tab-link\" data-color=\"#FF0000\">Туалет М</a> </li> <li> <a href=\"#ws_w\" data-id=\"62\" class=\"map-tab-link\" data-color=\"#FF0000\">Туалет Ж</a> </li> <li> <a href=\"#cab1434\" data-id=\"63\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1434</a> </li> <li> <a href=\"#cab1435\" data-id=\"63\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1435</a> </li> <li> <a href=\"#cabmed\" data-id=\"63\" class=\"map-tab-link\" data-color=\"#ffa812\">Мед кабинет</a> </li> <li> <a href=\"#cab1433\" data-id=\"64\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1433</a> </li> <li> <a href=\"#cab1432\" data-id=\"65\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1432</a> </li> <li> <a href=\"#cab1431\" data-id=\"66\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1431</a> </li> <li> <a href=\"#cab1430\" data-id=\"67\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1430</a> </li> <li> <a href=\"#cab1429\" data-id=\"68\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1429</a> </li> <li> <a href=\"#cab1428\" data-id=\"69\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1428</a> </li> <li> <a href=\"#cab1427\" data-id=\"70\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1427</a> </li> <li> <a href=\"#cab1426\" data-id=\"71\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1425</a> </li> <li> <a href=\"#cab1425\" data-id=\"72\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1425</a> </li> <li> <a href=\"#cab1424\" data-id=\"73\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1424</a> </li> <li> <a href=\"#cab1423\" data-id=\"74\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1423</a> </li> <li> <a href=\"#cab1422\" data-id=\"75\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1422</a> </li> <li> <a href=\"#cab1420\" data-id=\"76\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1420</a> </li> <li> <a href=\"#cab1419\" data-id=\"77\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1419</a> </li> <li> <a href=\"#cab1418\" data-id=\"77\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1418</a> </li> <li> <a href=\"#cab1417\" data-id=\"78\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1417</a> </li> <li> <a href=\"#cab1416\" data-id=\"78\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1416</a> </li> <li> <a href=\"#cab1415\" data-id=\"79\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1415</a> </li> <li> <a href=\"#cab1414\" data-id=\"80\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1414</a> </li> <li> <a href=\"#cab1413\" data-id=\"81\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1413</a> </li> <li> <a href=\"#cab1412\" data-id=\"82\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1412</a> </li> <li> <a href=\"#cab1411\" data-id=\"83\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1411</a> </li> <li> <a href=\"#cab1409\" data-id=\"84\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1409</a> </li> <li> <a href=\"#cab1408\" data-id=\"85\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1408</a> </li> <li> <a href=\"#cab1407\" data-id=\"86\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1407</a> </li> <li> <a href=\"#cab1406\" data-id=\"87\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1406</a> </li> <li> <a href=\"#cab1405\" data-id=\"87\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1405</a> </li> <li> <a href=\"#cab1404\" data-id=\"87\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1405</a> </li> <li> <a href=\"#cab1403\" data-id=\"88\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1403</a> </li> <li> <a href=\"#cab1402\" data-id=\"89\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1402</a> </li> <li> <a href=\"#cab1401\" data-id=\"90\" class=\"map-tab-link\" data-color=\"#ffa812\">Кабинет 1401</a> </li> </ul> </div> <div class=\"map\" id=\"svgContainer\"> <div id=\"map2\"> <svg width=\"160mm\" height=\"210mm\" id=\"svgImage2\" version=\"1.1\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"> <defs id=\"defs446\"/> <circle id=\"1\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"17.00812\" r=\"1\"/> <circle id=\"2\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"28.00812\" r=\"1\"/> <circle id=\"3\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"39.008121\" r=\"1\"/> <circle id=\"4\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"49.008121\" r=\"1\" data-neighbors=\"4,6\"/> <circle id=\"5\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"60.008121\" r=\"1\"/> <circle id=\"6\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"66.008118\" r=\"1\"/> <circle id=\"7\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"71.008118\" r=\"1\"/> <circle id=\"8\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"81.008118\" r=\"1\"/> <circle id=\"9\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"90.008118\" r=\"1\"/> <circle id=\"10\" style=\"fill:#000000;stroke:none\" cx=\"91.727585\" cy=\"90.008118\" r=\"1\"/> <circle id=\"11\" style=\"fill:#000000;stroke:none\" cx=\"117.72758\" cy=\"90.008118\" r=\"1\"/> <circle id=\"12\" style=\"fill:#000000;stroke:none\" cx=\"117.72758\" cy=\"118.00812\" r=\"1\"/> <circle id=\"13\" style=\"fill:#000000;stroke:none\" cx=\"91.727585\" cy=\"118.00812\" r=\"1\"/> <a href=\"#cab1222\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a342\" transform=\"matrix(2.6927144,0,0,0.98376394,-78.458395,-17.011795)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3-9-4-3\" width=\"15.728415\" height=\"19.326527\" x=\"45.691628\" y=\"112.29272\"/> <g font-size=\"9\"> <text x=\"50\" y=\"125\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"7\"> 1222 </text> </g> </a> <a href=\"#cab1221\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a345\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3-9-4-3-2\" width=\"15.21156\" height=\"19.317305\" x=\"29.689268\" y=\"112.28632\"/> <g font-size=\"6\"> <text x=\"31\" y=\"124\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1221 </text> </g> </a> <a href=\"#cab1219\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a348\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3-9-4-3-2-7\" width=\"8.7713041\" height=\"19.341173\" x=\"20.070086\" y=\"112.28537\"/> <g font-size=\"4\"> <text x=\"20.5\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"8\"> 1219 </text> </g> </a> <a href=\"#cab1217\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a354\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.810833;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3-9\" width=\"32.639603\" height=\"26.503717\" x=\"2.7023225\" y=\"142.81255\"/> <g font-size=\"10\"> <text x=\"7\" y=\"159\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"23\"> 1217 </text> </g> </a> <circle id=\"1217\" style=\"fill:#000000;stroke:none\" cx=\"23.102585\" cy=\"124.57062\" r=\"1\"/> <a href=\"#cab1216\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a357\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3\" width=\"9.2374735\" height=\"19.010139\" x=\"36.482674\" y=\"142.65569\"/> <g font-size=\"3\"> <text x=\"37.5\" y=\"154\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"7\"> 1216 </text> </g> </a> <a href=\"#cab1215\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a360\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3\" width=\"15.017358\" height=\"18.988932\" x=\"46.515621\" y=\"142.67734\"/> <g font-size=\"6\"> <text x=\"47.5\" y=\"155\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"13\"> 1215 </text> </g> </a> <a href=\"#cab1213\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a363\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9\" width=\"15.523537\" height=\"18.965565\" x=\"62.343002\" y=\"142.68903\"/> <g font-size=\"6\"> <text x=\"63.5\" y=\"155\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"13\"> 1213 </text> </g> </a> <a href=\"#cab1212\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a366\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1\" width=\"10.362655\" height=\"18.967752\" x=\"78.687172\" y=\"142.68709\"/> <g font-size=\"4\"> <text x=\"79.5\" y=\"154\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1212 </text> </g> </a> <a href=\"#cab1211\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a369\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-99\" width=\"34.032288\" height=\"21.598423\" x=\"89.844238\" y=\"142.69016\"/> <g font-size=\"12\"> <text x=\"92\" y=\"158\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"30\"> 1211 </text> </g> </a> <a href=\"#cab1209\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a372\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-99-2\" width=\"30.990692\" height=\"18.556828\" x=\"124.74043\" y=\"142.6666\"/> <g font-size=\"10\"> <text x=\"127\" y=\"156\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"25\"> 1209 </text> </g> </a> <a href=\"#cab1208\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a375\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-99-2-3\" width=\"19.674189\" height=\"18.645864\" x=\"156.28706\" y=\"142.6355\"/> <g font-size=\"8\"> <text x=\"157\" y=\"155\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"18\"> 1208 </text> </g> </a> <a href=\"#cab1207\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a378\" transform=\"matrix(1.3432739,0,0,1.0267447,-61.60424,-22.884978)\" style=\"stroke-width:.531016;stroke-dasharray:none\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.531016;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-99-2-3-5\" width=\"29.210623\" height=\"23.843235\" x=\"176.58269\" y=\"142.6478\"/> <g font-size=\"12\"> <text x=\"180\" y=\"158\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"21\"> 1207 </text> </g> </a> <a href=\"#cab1206\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a381\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5-6-8-8\" width=\"5.6117854\" height=\"19.439121\" x=\"197.1519\" y=\"112.63863\"/> <g font-size=\"2\"> <text x=\"198\" y=\"122\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"4\"> 1206 </text> </g> </a> <a href=\"#cab1205\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a384\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5-6-8\" width=\"10.24193\" height=\"19.423162\" x=\"186.35104\" y=\"112.63978\"/> <g font-size=\"4\"> <text x=\"187\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1205 </text> </g> </a> <a href=\"#cab1204\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a387\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5-7\" width=\"16.275974\" height=\"19.320843\" x=\"169.51369\" y=\"112.73244\"/> <g font-size=\"5\"> <text x=\"171.5\" y=\"123.5\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1204 </text> </g> </a> <a href=\"#cab1203\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a390\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5-6\" width=\"10.243823\" height=\"19.271646\" x=\"158.63133\" y=\"112.75522\"/> <g font-size=\"4\"> <text x=\"159\" y=\"123.5\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1203 </text> </g> </a> <a href=\"#cab1202\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a393\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5\" width=\"16.275974\" height=\"19.320843\" x=\"141.6817\" y=\"112.76625\"/> <g font-size=\"6\"> <text x=\"142.5\" y=\"124\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"14\"> 1202 </text> </g> </a> <a href=\"#cab1201\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a396\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4\" width=\"16.275974\" height=\"19.320843\" x=\"124.73032\" y=\"112.75002\"/> <g font-size=\"6\"> <text x=\"126\" y=\"124\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"14\"> 1201 </text> </g> </a> <a href=\"#cab1240\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a399\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-8\" width=\"14.157506\" height=\"10.063278\" x=\"109.89001\" y=\"95.266487\"/> <g font-size=\"6\"> <text x=\"111\" y=\"102\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1240 </text> </g> </a> <a href=\"#cab1239\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a402\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-8-3\" width=\"14.190986\" height=\"20.205204\" x=\"109.8899\" y=\"74.259125\"/> <g font-size=\"6\"> <text x=\"111\" y=\"87\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1239 </text> </g> </a> <a href=\"#cab1236\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a408\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1-73\" width=\"14.329887\" height=\"10.060334\" x=\"109.84391\" y=\"52.811813\"/> <g font-size=\"6\"> <text x=\"111\" y=\"60\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1236 </text> </g> </a> <a href=\"#cab1235\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a411\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1-7-0\" width=\"14.329887\" height=\"10.060334\" x=\"109.84391\" y=\"42.150204\"/> <g font-size=\"6\"> <text x=\"111\" y=\"49\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1235 </text> </g> </a> <a href=\"#cab1233/1234\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a414\" transform=\"matrix(0.98508844,0,0,2.0682025,0.47233146,-63.313397)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1-2-6\" width=\"14.329887\" height=\"10.060334\" x=\"109.84125\" y=\"31.331327\"/> <g font-size=\"1.5\"> <text x=\"111\" y=\"37\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1233/1234 </text> </g> </a> <a href=\"#cab1231/1232\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a423\" transform=\"matrix(0.97475035,0,0,3.0311912,1.1783721,-92.812073)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1-2\" width=\"14.329887\" height=\"10.060334\" x=\"89.897217\" y=\"31.16083\"/> <g font-size=\"1\"> <text x=\"91\" y=\"36.5\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1231/1232 </text> </g> </a> <a href=\"#cab1229/1230\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a429\" transform=\"translate(-1.2724137,-18.99188)\" style=\"display:inline\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1\" width=\"14.329887\" height=\"10.060334\" x=\"89.853378\" y=\"52.641315\"/> <g font-size=\"3\"> <text x=\"91\" y=\"59\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1229/1230 </text> </g> </a> <a href=\"#cab1228\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a432\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7\" width=\"14.329887\" height=\"10.060334\" x=\"89.853386\" y=\"63.302925\"/> <g font-size=\"6\"> <text x=\"90.5\" y=\"70.5\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1228 </text> </g> </a> <a href=\"#cab1227\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a435\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0\" width=\"14.329887\" height=\"10.060334\" x=\"89.809555\" y=\"73.997795\"/> <g font-size=\"6\"> <text x=\"90.5\" y=\"81\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1227 </text> </g> </a> <a href=\"#cab1226\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a438\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9\" width=\"14.329887\" height=\"10.060334\" x=\"89.765724\" y=\"84.659409\"/> <g font-size=\"6\"> <text x=\"90.5\" y=\"92\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1226 </text> </g> </a> <a href=\"#cab1225\" class=\"map-tab-link\" data-color=\"#522e9a\" id=\"a441\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2\" width=\"14.329887\" height=\"10.060334\" x=\"89.720139\" y=\"95.267952\"/> <g font-size=\"6\"> <text x=\"90.5\" y=\"102.5\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1225 </text> </g> </a> <path style=\"fill:none;stroke:#000000;stroke-width:.585827;stroke-dasharray:none;stroke-opacity:1;stop-color:#000000\" d=\"m 87.659004,0.2929135 h 36.228166 l -0.19732,43.4864385 4.34455,0.07383 -0.14549,11.569545 -4.0017,-0.08514 V 92.58746 h 78.09209 l -0.12041,-4.69598 13.5899,-0.0371 -0.0804,4.73306 v 56.2719 h -40.72211 v -5.77967 l -51.04468,-0.14239 -0.14042,3.22997 -35.879073,0.14505 0.241067,-2.78823 -52.611424,0.0372 -0.12041,7.70622 H 0.2929135 V 91.30344 86.60746 l 18.7559755,0.16806 0.03297,5.65324 68.387707,-0.0416 z\" id=\"path2733\"/> <circle id=\"15\" style=\"fill:#000000;stroke:none\" cx=\"83.040085\" cy=\"118.00812\" r=\"1\" data-neighbors=\"13,11\"/> <circle id=\"16\" style=\"fill:#000000;stroke:none\" cx=\"69.602585\" cy=\"118.00812\" r=\"1\"/> <circle id=\"17\" style=\"fill:#000000;stroke:none\" cx=\"52.852585\" cy=\"118.00812\" r=\"1\"/> <circle id=\"18\" style=\"fill:#000000;stroke:none\" cx=\"40.352585\" cy=\"118.00812\" r=\"1\"/> <circle id=\"19\" style=\"fill:#000000;stroke:none\" cx=\"23.102585\" cy=\"118.00812\" r=\"1\" data-neighbors=\"13,11\"/> <circle id=\"20\" style=\"fill:#000000;stroke:none\" cx=\"132.41508\" cy=\"118.00812\" r=\"1\"/> <circle id=\"21\" style=\"fill:#000000;stroke:none\" cx=\"149.22758\" cy=\"118.00812\" r=\"1\"/> <circle id=\"22\" style=\"fill:#000000;stroke:none\" cx=\"162.60258\" cy=\"118.00812\" r=\"1\"/> <circle id=\"23\" style=\"fill:#000000;stroke:none\" cx=\"176.54008\" cy=\"118.00812\" r=\"1\"/> <circle id=\"24\" style=\"fill:#000000;stroke:none\" cx=\"190.54008\" cy=\"118.00812\" r=\"1\"/> <circle id=\"25\" style=\"fill:#000000;stroke:none\" cx=\"199.04008\" cy=\"118.00812\" r=\"1\"/> <g style=\"fill:#000000\" id=\"g594\" transform=\"matrix(0.02387068,0,0,0.02387068,100.04994,96.125577)\"> <g id=\"g584\"> <g id=\"g582\"> <path d=\"m 460.798,40.96 h -102.4 c -11.305,0 -20.48,9.155 -20.48,20.48 v 81.92 h -20.48 V 40.96 h 20.48 c 11.305,0 20.48,-9.155 20.48,-20.48 C 358.398,9.155 349.223,0 337.918,0 h -40.96 c -0.123,0 -0.246,0.061 -0.369,0.061 -1.659,0.041 -3.236,0.553 -4.833,0.983 -0.983,0.266 -2.048,0.287 -2.97,0.696 -0.922,0.389 -1.679,1.167 -2.54,1.72 -1.393,0.881 -2.847,1.659 -3.994,2.847 -0.082,0.102 -0.205,0.123 -0.307,0.225 l -266.24,286.72 c -7.68,8.294 -7.209,21.258 1.065,28.938 3.953,3.666 8.95,5.489 13.947,5.489 5.489,0 10.977,-2.212 15.012,-6.554 l 5.468,-5.878 v 32.911 c -11.305,0 -20.48,9.155 -20.48,20.48 v 102.4 c 0,11.325 9.175,20.48 20.48,20.48 h 409.6 c 11.305,0 20.48,-9.155 20.48,-20.48 V 61.44 c 0.001,-11.325 -9.174,-20.48 -20.479,-20.48 z m -307.2,204.8 c -11.305,0 -20.48,9.155 -20.48,20.48 v 81.92 h -40.96 v -77.025 l 61.44,-66.171 z m 122.88,-102.4 h -20.48 c -11.305,0 -20.48,9.155 -20.48,20.48 v 81.92 h -40.96 v -81.92 c 0,-0.881 -0.389,-1.618 -0.492,-2.458 l 82.412,-88.74 z\" id=\"path580\"/> </g> </g> </g> <circle id=\"1219\" style=\"fill:#000000;stroke:none\" cx=\"23.102585\" cy=\"111.88312\" r=\"1\"/> <circle id=\"1221\" style=\"fill:#000000;stroke:none\" cx=\"40.352585\" cy=\"111.82062\" r=\"1\"/> <circle id=\"1216\" style=\"fill:#000000;stroke:none\" cx=\"40.352585\" cy=\"124.38312\" r=\"1\" data-neighbors=\"13,11\"/> <circle id=\"1215\" style=\"fill:#000000;stroke:none\" cx=\"52.852585\" cy=\"124.44562\" r=\"1\" data-neighbors=\"13,11\"/> <circle id=\"1222\" style=\"fill:#000000;stroke:none\" cx=\"69.602585\" cy=\"111.69562\" r=\"1\"/> <circle id=\"1213\" style=\"fill:#000000;stroke:none\" cx=\"69.602585\" cy=\"124.50812\" r=\"1\"/> <circle id=\"1212\" style=\"fill:#000000;stroke:none\" cx=\"83.040085\" cy=\"124.44562\" r=\"1\"/> <circle id=\"14\" style=\"fill:#000000;stroke:none\" cx=\"106.04008\" cy=\"118.00812\" r=\"1\" data-neighbors=\"13,11\"/> <circle id=\"1211\" style=\"fill:#000000;stroke:none\" cx=\"106.04008\" cy=\"124.50812\" r=\"1\"/> <circle id=\"stair2floor\" style=\"fill:#000000;stroke:none\" cx=\"106.04008\" cy=\"106.82062\" r=\"1\"/> <circle id=\"1201\" style=\"fill:#000000;stroke:none\" cx=\"132.41508\" cy=\"112.19562\" r=\"1\"/> <circle id=\"1209\" style=\"fill:#000000;stroke:none\" cx=\"132.41508\" cy=\"124.63312\" r=\"1\"/> <circle id=\"1202\" style=\"fill:#000000;stroke:none\" cx=\"149.22758\" cy=\"112.32062\" r=\"1\"/> <circle id=\"1203\" style=\"fill:#000000;stroke:none\" cx=\"162.60258\" cy=\"112.19562\" r=\"1\"/> <circle id=\"1208\" style=\"fill:#000000;stroke:none\" cx=\"162.60258\" cy=\"124.50812\" r=\"1\"/> <circle id=\"1204\" style=\"fill:#000000;stroke:none\" cx=\"176.54008\" cy=\"112.19562\" r=\"1\"/> <circle id=\"1205\" style=\"fill:#000000;stroke:none\" cx=\"190.54008\" cy=\"112.19562\" r=\"1\"/> <circle id=\"1207\" style=\"fill:#000000;stroke:none\" cx=\"190.54008\" cy=\"124.25812\" r=\"1\" data-neighbors=\"12,14\"/> <circle id=\"1206\" style=\"fill:#000000;stroke:none\" cx=\"199.04008\" cy=\"112.13312\" r=\"1\" data-neighbors=\"12,14\"/> <circle id=\"1240\" style=\"fill:#000000;stroke:none\" cx=\"109.41508\" cy=\"81.008118\" r=\"1\"/> <circle id=\"1225\" style=\"fill:#000000;stroke:none\" cx=\"101.85258\" cy=\"81.008118\" r=\"1\"/> <circle id=\"1226\" style=\"fill:#000000;stroke:none\" cx=\"102.04008\" cy=\"71.008118\" r=\"1\"/> <circle id=\"1239\" style=\"fill:#000000;stroke:none\" cx=\"109.47758\" cy=\"66.008118\" r=\"1\"/> <circle id=\"1227\" style=\"fill:#000000;stroke:none\" cx=\"102.04008\" cy=\"60.008121\" r=\"1\"/> <circle id=\"1228\" style=\"fill:#000000;stroke:none\" cx=\"102.19204\" cy=\"49.008121\" r=\"1\"/> <circle id=\"1229/1230\" style=\"fill:#000000;stroke:none\" cx=\"102.13383\" cy=\"39.008121\" r=\"1\"/> <circle id=\"1236\" style=\"fill:#000000;stroke:none\" cx=\"109.38383\" cy=\"39.008121\" r=\"1\" data-neighbors=\"3,5\"/> <circle id=\"1235\" style=\"fill:#000000;stroke:none\" cx=\"109.44633\" cy=\"28.00812\" r=\"1\"/> <circle id=\"1231/1232\" style=\"fill:#000000;stroke:none\" cx=\"101.91508\" cy=\"17.00812\" r=\"1\"/> <circle id=\"1233/1234\" style=\"fill:#000000;stroke:none\" cx=\"109.47758\" cy=\"17.00812\" r=\"1\"/> </svg> </div> <div id=\"map3\"> <svg width=\"160mm\" height=\"210mm\" id=\"svgImage3\" version=\"1.1\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"> <defs id=\"defs446\"/> <circle id=\"27\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"17.00812\" r=\"1\"/> <circle id=\"28\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"28.00812\" r=\"1\" data-neighbors=\"2,4\"/> <circle id=\"29\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"39.008121\" r=\"1\"/> <circle id=\"30\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"49.008121\" r=\"1\" data-neighbors=\"4,6\"/> <circle id=\"31\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"60.008121\" r=\"1\" data-neighbors=\"5,7\"/> <circle id=\"32\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"71.008118\" r=\"1\"/> <circle id=\"33\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"81.008118\" r=\"1\"/> <circle id=\"34\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"90.008118\" r=\"1\"/> <circle id=\"ws_m\" style=\"fill:#000000;stroke:none\" cx=\"91.727585\" cy=\"110\" r=\"1\"/> <circle id=\"ws_w\" style=\"fill:#000000;stroke:none\" cx=\"117.72758\" cy=\"110\" r=\"1\" data-neighbors=\"10,13\"/> <circle id=\"42\" style=\"fill:#000000;stroke:none\" cx=\"117.72758\" cy=\"118.00812\" r=\"1\" data-neighbors=\"12,14\"/> <circle id=\"36\" style=\"fill:#000000;stroke:none\" cx=\"91.727585\" cy=\"118.00812\" r=\"1\"/> <a href=\"#cab1318\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a342\" transform=\"matrix(0.82351577,0,0,1.0026952,6.5778849,-19.320579)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3-9-4-3\" width=\"15.728415\" height=\"19.326527\" x=\"45.691628\" y=\"112.29272\"/> <g font-size=\"4\"> <text x=\"49\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1318 </text> </g> </a> <a href=\"#cab1317\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a345\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3-9-4-3-2\" width=\"15.21156\" height=\"19.317305\" x=\"29.689268\" y=\"112.28632\"/> <g font-size=\"4\"> <text x=\"33\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1317 </text> </g> </a> <a href=\"#cab1316\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a348\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3-9-4-3-2-7\" width=\"8.7713041\" height=\"19.341173\" x=\"20.070086\" y=\"112.28537\"/> <g font-size=\"4\"> <text x=\"20.5\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"8\"> 1316 </text> </g> </a> <a href=\"#cab1315\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a354\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.810833;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3-9\" width=\"32.639603\" height=\"26.503717\" x=\"2.7023225\" y=\"142.81255\"/> <g font-size=\"10\"> <text x=\"7\" y=\"159\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"23\"> 1315 </text> </g> </a> <circle id=\"1315\" style=\"fill:#000000;stroke:none\" cx=\"23.102585\" cy=\"124.57062\" r=\"1\"/> <a href=\"#cab1314\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a360\" transform=\"matrix(1.667326,0,0,0.9924595,-42.406566,-17.844428)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3\" width=\"15.017358\" height=\"18.988932\" x=\"46.515621\" y=\"142.67734\"/> <g font-size=\"7\"> <text x=\"49.5\" y=\"155\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"10\"> 1314 </text> </g> </a> <a href=\"#cab1313\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a363\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9\" width=\"15.523537\" height=\"18.965565\" x=\"62.343002\" y=\"142.68903\"/> <g font-size=\"6\"> <text x=\"63.5\" y=\"155\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"13\"> 1313 </text> </g> </a> <a href=\"#cab1312\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a366\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1\" width=\"10.362655\" height=\"18.967752\" x=\"78.687172\" y=\"142.68709\"/> <g font-size=\"4\"> <text x=\"79.5\" y=\"154\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1312 </text> </g> </a> <a href=\"#cab1311\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a369\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-99\" width=\"34.032288\" height=\"21.598423\" x=\"89.844238\" y=\"142.69016\"/> <g font-size=\"12\"> <text x=\"92\" y=\"158\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"30\"> 1311 </text> </g> </a> <a href=\"#cab1309\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a372\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-99-2\" width=\"30.990692\" height=\"18.556828\" x=\"124.74043\" y=\"142.6666\"/> <g font-size=\"10\"> <text x=\"127\" y=\"156\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"25\"> 1309 </text> </g> </a> <a href=\"#cab1308\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a375\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-99-2-3\" width=\"19.674189\" height=\"18.645864\" x=\"156.28706\" y=\"142.6355\"/> <g font-size=\"8\"> <text x=\"157\" y=\"155\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"18\"> 1308 </text> </g> </a> <a href=\"#cab1307\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a378\" transform=\"matrix(1.3432739,0,0,1.0267447,-61.60424,-22.884978)\" style=\"stroke-width:.531016;stroke-dasharray:none\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.531016;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-99-2-3-5\" width=\"29.210623\" height=\"23.843235\" x=\"176.58269\" y=\"142.6478\"/> <g font-size=\"12\"> <text x=\"180\" y=\"158\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"21\"> 1307 </text> </g> </a> <a href=\"#cab1306\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a381\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5-6-8-8\" width=\"5.6117854\" height=\"19.439121\" x=\"197.1519\" y=\"112.63863\"/> <g font-size=\"2\"> <text x=\"198\" y=\"122\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"4\"> 1306 </text> </g> </a> <a href=\"#cab1305\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a384\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5-6-8\" width=\"10.24193\" height=\"19.423162\" x=\"186.35104\" y=\"112.63978\"/> <g font-size=\"4\"> <text x=\"187\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1305 </text> </g> </a> <a href=\"#cab1304\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a387\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5-7\" width=\"16.275974\" height=\"19.320843\" x=\"169.51369\" y=\"112.73244\"/> <g font-size=\"5\"> <text x=\"171.5\" y=\"123.5\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1304 </text> </g> </a> <a href=\"#cab1303\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a390\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5-6\" width=\"10.243823\" height=\"19.271646\" x=\"158.63133\" y=\"112.75522\"/> <g font-size=\"4\"> <text x=\"159\" y=\"123.5\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1303 </text> </g> </a> <a href=\"#cab1302\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a393\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5\" width=\"16.275974\" height=\"19.320843\" x=\"141.6817\" y=\"112.76625\"/> <g font-size=\"6\"> <text x=\"142.5\" y=\"124\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"14\"> 1302 </text> </g> </a> <a href=\"#cab1301\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a396\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4\" width=\"16.275974\" height=\"19.320843\" x=\"124.73032\" y=\"112.75002\"/> <g font-size=\"6\"> <text x=\"126\" y=\"124\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"14\"> 1301 </text> </g> </a> <a href=\"#cab1340\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a399\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-8\" width=\"14.157506\" height=\"10.063278\" x=\"109.89001\" y=\"95.266487\"/> <g font-size=\"6\"> <text x=\"111\" y=\"102\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1340 </text> </g> </a> <a href=\"#cab1336\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a408\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1-73\" width=\"14.329887\" height=\"10.060334\" x=\"109.84391\" y=\"52.811813\"/> <g font-size=\"6\"> <text x=\"111\" y=\"60\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1336 </text> </g> </a> <a href=\"#cab1335\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a411\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1-7-0\" width=\"14.329887\" height=\"10.060334\" x=\"109.84391\" y=\"42.150204\"/> <g font-size=\"6\"> <text x=\"111\" y=\"49\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1335 </text> </g> </a> <a href=\"#cab1332\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a423\" transform=\"matrix(0.97475035,0,0,3.0311912,1.1783721,-92.812073)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1-2\" width=\"14.329887\" height=\"5\" x=\"89.897217\" y=\"31.16083\"/> <g font-size=\"2\"> <text x=\"91\" y=\"34.5\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1332 </text> </g> </a> <a href=\"#cab1331\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a423\" transform=\"matrix(0.97475035,0,0,3.0311912,1.1783721,-92.812073)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1-2\" width=\"14.329887\" height=\"4\" x=\"89.897217\" y=\"37 \"/> <g font-size=\"2\"> <text x=\"91\" y=\"40\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1331 </text> </g> </a> <a href=\"#cab1330\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a429\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1\" width=\"14.329887\" height=\"10.060334\" x=\"89.853378\" y=\"52.641315\"/> <g font-size=\"6\"> <text x=\"91\" y=\"60\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1330 </text> </g> </a> <a href=\"#cab1329\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a432\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7\" width=\"14.329887\" height=\"10.060334\" x=\"89.853386\" y=\"63.302925\"/> <g font-size=\"6\"> <text x=\"91\" y=\"70.5\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1329 </text> </g> </a> <a href=\"#cab1328\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a435\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0\" width=\"14.329887\" height=\"10.060334\" x=\"89.809555\" y=\"73.997795\"/> <g font-size=\"6\"> <text x=\"91\" y=\"81\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1328 </text> </g> </a> <a href=\"#cab1327\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a438\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9\" width=\"14.329887\" height=\"10.060334\" x=\"89.765724\" y=\"84.659409\"/> <g font-size=\"6\"> <text x=\"91\" y=\"92\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1327 </text> </g> </a> <a href=\"#cab1326\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a441\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2\" width=\"14.329887\" height=\"10.060334\" x=\"89.720139\" y=\"95.267952\"/> <g font-size=\"6\"> <text x=\"91\" y=\"102\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1326 </text> </g> </a> <path style=\"fill:none;stroke:#000000;stroke-width:.585827;stroke-dasharray:none;stroke-opacity:1;stop-color:#000000\" d=\"m 87.659004,0.2929135 h 36.228166 l -0.19732,43.4864385 4.34455,0.07383 -0.14549,11.569545 -4.0017,-0.08514 V 92.58746 h 78.09209 l -0.12041,-4.69598 13.5899,-0.0371 -0.0804,4.73306 v 56.2719 h -40.72211 v -5.77967 l -51.04468,-0.14239 -0.14042,3.22997 -35.879073,0.14505 0.241067,-2.78823 -52.611424,0.0372 -0.12041,7.70622 H 0.2929135 V 91.30344 86.60746 l 18.7559755,0.16806 0.03297,5.65324 68.387707,-0.0416 z\" id=\"path2733\"/> <circle id=\"37\" style=\"fill:#000000;stroke:none\" cx=\"83.040085\" cy=\"118.00812\" r=\"1\" data-neighbors=\"13,11\"/> <circle id=\"38\" style=\"fill:#000000;stroke:none\" cx=\"69.602585\" cy=\"118.00812\" r=\"1\"/> <circle id=\"39\" style=\"fill:#000000;stroke:none\" cx=\"52.852585\" cy=\"118.00812\" r=\"1\"/> <circle id=\"40\" style=\"fill:#000000;stroke:none\" cx=\"40.352585\" cy=\"118.00812\" r=\"1\"/> <circle id=\"41\" style=\"fill:#000000;stroke:none\" cx=\"23.102585\" cy=\"118.00812\" r=\"1\"/> <circle id=\"43\" style=\"fill:#000000;stroke:none\" cx=\"132.41508\" cy=\"118.00812\" r=\"1\"/> <circle id=\"44\" style=\"fill:#000000;stroke:none\" cx=\"149.22758\" cy=\"118.00812\" r=\"1\"/> <circle id=\"45\" style=\"fill:#000000;stroke:none\" cx=\"162.60258\" cy=\"118.00812\" r=\"1\"/> <circle id=\"46\" style=\"fill:#000000;stroke:none\" cx=\"176.54008\" cy=\"118.00812\" r=\"1\"/> <circle id=\"47\" style=\"fill:#000000;stroke:none\" cx=\"190.54008\" cy=\"118.00812\" r=\"1\"/> <circle id=\"48\" style=\"fill:#000000;stroke:none\" cx=\"199.04008\" cy=\"118.00812\" r=\"1\"/> <g style=\"fill:#000000\" id=\"g594\" transform=\"matrix(0.02387068,0,0,0.02387068,100.04994,96.125577)\"> <g id=\"g584\"> <g id=\"g582\"> <path d=\"m 460.798,40.96 h -102.4 c -11.305,0 -20.48,9.155 -20.48,20.48 v 81.92 h -20.48 V 40.96 h 20.48 c 11.305,0 20.48,-9.155 20.48,-20.48 C 358.398,9.155 349.223,0 337.918,0 h -40.96 c -0.123,0 -0.246,0.061 -0.369,0.061 -1.659,0.041 -3.236,0.553 -4.833,0.983 -0.983,0.266 -2.048,0.287 -2.97,0.696 -0.922,0.389 -1.679,1.167 -2.54,1.72 -1.393,0.881 -2.847,1.659 -3.994,2.847 -0.082,0.102 -0.205,0.123 -0.307,0.225 l -266.24,286.72 c -7.68,8.294 -7.209,21.258 1.065,28.938 3.953,3.666 8.95,5.489 13.947,5.489 5.489,0 10.977,-2.212 15.012,-6.554 l 5.468,-5.878 v 32.911 c -11.305,0 -20.48,9.155 -20.48,20.48 v 102.4 c 0,11.325 9.175,20.48 20.48,20.48 h 409.6 c 11.305,0 20.48,-9.155 20.48,-20.48 V 61.44 c 0.001,-11.325 -9.174,-20.48 -20.479,-20.48 z m -307.2,204.8 c -11.305,0 -20.48,9.155 -20.48,20.48 v 81.92 h -40.96 v -77.025 l 61.44,-66.171 z m 122.88,-102.4 h -20.48 c -11.305,0 -20.48,9.155 -20.48,20.48 v 81.92 h -40.96 v -81.92 c 0,-0.881 -0.389,-1.618 -0.492,-2.458 l 82.412,-88.74 z\" id=\"path580\"/> </g> </g> </g> <circle id=\"1316\" style=\"fill:#000000;stroke:none\" cx=\"23.102585\" cy=\"111.88312\" r=\"1\"/> <circle id=\"1317\" style=\"fill:#000000;stroke:none\" cx=\"40.352585\" cy=\"111.82062\" r=\"1\"/> <circle id=\"1313\" style=\"fill:#000000;stroke:none\" cx=\"69.602585\" cy=\"124.50812\" r=\"1\"/> <circle id=\"1312\" style=\"fill:#000000;stroke:none\" cx=\"83.040085\" cy=\"124.44562\" r=\"1\"/> <circle id=\"35\" style=\"fill:#000000;stroke:none\" cx=\"106.04008\" cy=\"118.00812\" r=\"1\" data-neighbors=\"13,11\"/> <circle id=\"1311\" style=\"fill:#000000;stroke:none\" cx=\"106.04008\" cy=\"124.50812\" r=\"1\"/> <circle id=\"stair3floor\" style=\"fill:#000000;stroke:none\" cx=\"106.04008\" cy=\"106.82062\" r=\"1\" data-neighbors=\"13,11\"/> <circle id=\"1301\" style=\"fill:#000000;stroke:none\" cx=\"132.41508\" cy=\"112.19562\" r=\"1\" data-neighbors=\"12,14\"/> <circle id=\"1309\" style=\"fill:#000000;stroke:none\" cx=\"132.41508\" cy=\"124.63312\" r=\"1\"/> <circle id=\"1302\" style=\"fill:#000000;stroke:none\" cx=\"149.22758\" cy=\"112.32062\" r=\"1\"/> <circle id=\"1303\" style=\"fill:#000000;stroke:none\" cx=\"162.60258\" cy=\"112.19562\" r=\"1\"/> <circle id=\"1308\" style=\"fill:#000000;stroke:none\" cx=\"162.60258\" cy=\"124.50812\" r=\"1\"/> <circle id=\"1304\" style=\"fill:#000000;stroke:none\" cx=\"176.54008\" cy=\"112.19562\" r=\"1\"/> <circle id=\"1305\" style=\"fill:#000000;stroke:none\" cx=\"190.54008\" cy=\"112.19562\" r=\"1\" data-neighbors=\"12,14\"/> <circle id=\"1307\" style=\"fill:#000000;stroke:none\" cx=\"190.54008\" cy=\"124.25812\" r=\"1\"/> <circle id=\"1306\" style=\"fill:#000000;stroke:none\" cx=\"199.04008\" cy=\"112.13312\" r=\"1\"/> <circle id=\"1340\" style=\"fill:#000000;stroke:none\" cx=\"109.41508\" cy=\"81.008118\" r=\"1\"/> <circle id=\"1326\" style=\"fill:#000000;stroke:none\" cx=\"101.85258\" cy=\"81.008118\" r=\"1\"/> <circle id=\"1327\" style=\"fill:#000000;stroke:none\" cx=\"102.04008\" cy=\"71.008118\" r=\"1\"/> <circle id=\"1328\" style=\"fill:#000000;stroke:none\" cx=\"102.04008\" cy=\"60.008121\" r=\"1\"/> <circle id=\"1338\" style=\"fill:#000000;stroke:none\" cx=\"109.04008\" cy=\"60.008118\" r=\"1\"/> <circle id=\"1329\" style=\"fill:#000000;stroke:none\" cx=\"102.19204\" cy=\"49.008121\" r=\"1\"/> <circle id=\"1330\" style=\"fill:#000000;stroke:none\" cx=\"102.13383\" cy=\"39.008121\" r=\"1\"/> <circle id=\"1336\" style=\"fill:#000000;stroke:none\" cx=\"109.38383\" cy=\"39.008121\" r=\"1\"/> <circle id=\"1335\" style=\"fill:#000000;stroke:none\" cx=\"109.44633\" cy=\"28.00812\" r=\"1\"/> <circle id=\"1332\" style=\"fill:#000000;stroke:none\" cx=\"101.91508\" cy=\"6.4\" r=\"1\" data-neighbors=\"1,3\"/> <circle id=\"1331\" style=\"fill:#000000;stroke:none\" cx=\"101.91508\" cy=\"28\" r=\"1\" data-neighbors=\"1,3\"/> <circle id=\"1314\" style=\"fill:#000000;stroke:none\" cx=\"40.352585\" cy=\"124.63725\" r=\"1\"/> <a href=\"#cab1319\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a2516\" transform=\"matrix(0.94550925,0,0,1.0010389,14.716888,-19.118578)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2514\" width=\"15.728415\" height=\"19.326527\" x=\"45.691628\" y=\"112.29272\"/> <g font-size=\"4\"> <text x=\"49\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1319 </text> </g> </a> <a href=\"#cab1320\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a2524\" transform=\"matrix(0.88493087,0,0,1.001851,33.208203,-19.217619)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2522\" width=\"15.728415\" height=\"19.326527\" x=\"45.691628\" y=\"112.29272\"/> <g font-size=\"4\"> <text x=\"49\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1320 </text> </g> </a> <a href=\"#ws_m\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a2524\" transform=\"matrix(0.88493087,0,0,1.001851,33.208203,-19.217619)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2522\" width=\"13\" height=\"19.326527\" x=\"62.5\" y=\"112.29272\"/> <g font-size=\"3\"> <text x=\"65\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> Туалет М </text> </g> </a> <a href=\"#ws_w\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a2524\" transform=\"matrix(0.88493087,0,0,1.001851,33.208203,-19.217619)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2522\" width=\"12\" height=\"19.8\" x=\"89\" y=\"112.29272\"/> <g font-size=\"3\"> <text x=\"91\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> Туалет Ж </text> </g> </a> <a href=\"#cab1339\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a2540\" transform=\"translate(18.602586,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2538\" width=\"14.329887\" height=\"10.060334\" x=\"90.015724\" y=\"84.659409\"/> <g font-size=\"6\"> <text x=\"91\" y=\"91.5\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1339 </text> </g> </a> <a href=\"#cab1338\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a2541\" transform=\"translate(18.602586,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2542\" width=\"14.329887\" height=\"10.060334\" x=\"90.015724\" y=\"73.986519\"/> <g font-size=\"6\"> <text x=\"91\" y=\"81\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1338 </text> </g> </a> <circle id=\"1339\" style=\"fill:#000000;stroke:none\" cx=\"109.3736\" cy=\"71.008118\" r=\"1\"/> <a href=\"#cab1334\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a2560\" transform=\"translate(-1.2724137,-29.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2558\" width=\"14.329887\" height=\"10.060334\" x=\"109.84391\" y=\"42.150204\"/> <g font-size=\"6\"> <text x=\"111\" y=\"49\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1334 </text> </g> </a> <a href=\"#cab1333\" class=\"map-tab-link\" data-color=\"#FF0000\" id=\"a2564\" transform=\"translate(-1.2724137,-40.92938)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2562\" width=\"14.329887\" height=\"10.060334\" x=\"109.84391\" y=\"42.150204\"/> <g font-size=\"6\"> <text x=\"111\" y=\"49\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1333 </text> </g> </a> <circle id=\"1334\" style=\"fill:#000000;stroke:none\" cx=\"109.38383\" cy=\"17.00812\" r=\"1\"/> <circle id=\"26\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"6.4143696\" r=\"1\" data-neighbors=\"1,3\"/> <circle id=\"1333\" style=\"fill:#000000;stroke:none\" cx=\"109.38383\" cy=\"6.4143696\" r=\"1\"/> <circle id=\"1318\" style=\"fill:#000000;stroke:none\" cx=\"52.852585\" cy=\"111.63312\" r=\"1\"/> <circle id=\"1319\" style=\"fill:#000000;stroke:none\" cx=\"69.602585\" cy=\"111.75812\" r=\"1\"/> <circle id=\"1320\" style=\"fill:#000000;stroke:none\" cx=\"83.040085\" cy=\"111.75812\" r=\"1\" data-neighbors=\"13,11\"/> </svg> </div> <div id=\"map4\"> <svg width=\"160mm\" height=\"210mm\" id=\"svgImage4\" version=\"1.1\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"> <defs id=\"defs446\"/> <circle id=\"50\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"17.00812\" r=\"1\"/> <circle id=\"51\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"28.00812\" r=\"1\" data-neighbors=\"2,4\"/> <circle id=\"52\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"39.008121\" r=\"1\"/> <circle id=\"53\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"49.008121\" r=\"1\" data-neighbors=\"4,6\"/> <circle id=\"54\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"60.008121\" r=\"1\" data-neighbors=\"5,7\"/> <circle id=\"55\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"71.008118\" r=\"1\"/> <circle id=\"56\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"81.008118\" r=\"1\"/> <circle id=\"57\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"90.008118\" r=\"1\"/> <circle id=\"1435\" style=\"fill:#000000;stroke:none\" cx=\"91.727585\" cy=\"111\" r=\"1\"/> <circle id=\"med\" style=\"fill:#000000;stroke:none\" cx=\"117.72758\" cy=\"111\" r=\"1\" data-neighbors=\"10,13\"/> <circle id=\"89\" style=\"fill:#000000;stroke:none\" cx=\"117.72758\" cy=\"118.00812\" r=\"1\" data-neighbors=\"12,14\"/> <circle id=\"59\" style=\"fill:#000000;stroke:none\" cx=\"91.727585\" cy=\"118.00812\" r=\"1\"/> <a href=\"#cab1418\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a342\" transform=\"matrix(0.82351577,0,0,1.0026952,6.5778849,-19.320579)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3-9-4-3\" width=\"15.728415\" height=\"19.326527\" x=\"45.691628\" y=\"112.29272\"/> <g font-size=\"4\"> <text x=\"49\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1418 </text> </g> </a> <a href=\"#cab1417\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a345\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3-9-4-3-2\" width=\"15.21156\" height=\"19.317305\" x=\"29.689268\" y=\"112.28632\"/> <g font-size=\"4\"> <text x=\"33\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1417 </text> </g> </a> <a href=\"#cab1416\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a348\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3-9-4-3-2-7\" width=\"8.7713041\" height=\"19.341173\" x=\"20.070086\" y=\"112.28537\"/> <g font-size=\"4\"> <text x=\"20.5\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"8\"> 1416 </text> </g> </a> <a href=\"#cab1415\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a354\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.810833;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3-9\" width=\"32.639603\" height=\"26.503717\" x=\"2.7023225\" y=\"142.81255\"/> <g font-size=\"10\"> <text x=\"7\" y=\"159\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"23\"> 1415 </text> </g> </a> <circle id=\"1415\" style=\"fill:#000000;stroke:none\" cx=\"23.102585\" cy=\"124.57062\" r=\"1\"/> <a href=\"#cab1414\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a360\" transform=\"matrix(1.667326,0,0,0.9924595,-42.406566,-17.844428)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3\" width=\"15.017358\" height=\"18.988932\" x=\"46.515621\" y=\"142.67734\"/> <g font-size=\"7\"> <text x=\"49.5\" y=\"155\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"10\"> 1414 </text> </g> </a> <a href=\"#cab1413\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a363\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9\" width=\"15.523537\" height=\"18.965565\" x=\"62.343002\" y=\"142.68903\"/> <g font-size=\"6\"> <text x=\"63.5\" y=\"155\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"13\"> 1413 </text> </g> </a> <a href=\"#cab1412\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a366\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1\" width=\"10.362655\" height=\"18.967752\" x=\"78.687172\" y=\"142.68709\"/> <g font-size=\"4\"> <text x=\"79.5\" y=\"154\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1412 </text> </g> </a> <a href=\"#cab1411\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a369\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-99\" width=\"34.032288\" height=\"21.598423\" x=\"89.844238\" y=\"142.69016\"/> <g font-size=\"12\"> <text x=\"92\" y=\"158\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"30\"> 1411 </text> </g> </a> <a href=\"#cab1409\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a372\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-99-2\" width=\"30.990692\" height=\"18.556828\" x=\"124.74043\" y=\"142.6666\"/> <g font-size=\"10\"> <text x=\"127\" y=\"156\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"25\"> 1409 </text> </g> </a> <a href=\"#cab1408\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a375\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-99-2-3\" width=\"19.674189\" height=\"18.645864\" x=\"156.28706\" y=\"142.6355\"/> <g font-size=\"8\"> <text x=\"157\" y=\"155\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"18\"> 1408 </text> </g> </a> <a href=\"#cab1407\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a378\" transform=\"matrix(1.3432739,0,0,1.0267447,-61.60424,-22.884978)\" style=\"stroke-width:.531016;stroke-dasharray:none\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.531016;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-99-2-3-5\" width=\"29.210623\" height=\"23.843235\" x=\"176.58269\" y=\"142.6478\"/> <g font-size=\"12\"> <text x=\"180\" y=\"158\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"21\"> 1407 </text> </g> </a> <a href=\"#cab1406\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a381\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5-6-8-8\" width=\"5.6117854\" height=\"19.439121\" x=\"197.1519\" y=\"112.63863\"/> <g font-size=\"2\"> <text x=\"198\" y=\"122\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"4\"> 1406 </text> </g> </a> <a href=\"#cab1405\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a384\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5-6-8\" width=\"10.24193\" height=\"19.423162\" x=\"186.35104\" y=\"112.63978\"/> <g font-size=\"4\"> <text x=\"187\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1405 </text> </g> </a> <a href=\"#cab1404\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a387\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5-7\" width=\"16.275974\" height=\"19.320843\" x=\"169.51369\" y=\"112.73244\"/> <g font-size=\"5\"> <text x=\"171.5\" y=\"123.5\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1404 </text> </g> </a> <a href=\"#cab1403\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a390\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5-6\" width=\"10.243823\" height=\"19.271646\" x=\"158.63133\" y=\"112.75522\"/> <g font-size=\"4\"> <text x=\"159\" y=\"123.5\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1403 </text> </g> </a> <a href=\"#cab1402\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a393\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5\" width=\"16.275974\" height=\"19.320843\" x=\"141.6817\" y=\"112.76625\"/> <g font-size=\"6\"> <text x=\"142.5\" y=\"124\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"14\"> 1402 </text> </g> </a> <a href=\"#cab1401\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a396\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4\" width=\"16.275974\" height=\"19.320843\" x=\"124.73032\" y=\"112.75002\"/> <g font-size=\"6\"> <text x=\"126\" y=\"124\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"14\"> 1401 </text> </g> </a> <a href=\"#cabmed\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a396\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4\" width=\"10\" height=\"19.320843\" x=\"114\" y=\"112.75002\"/> <g font-size=\"2\"> <text x=\"114.5\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> Мед. кабинет </text> </g> </a> <a href=\"#cab1435\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a396\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4\" width=\"10\" height=\"19.320843\" x=\"90\" y=\"112.25\"/> <g font-size=\"4\"> <text x=\"90.5\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1435 </text> </g> </a> <a href=\"#cab1434\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a399\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-8\" width=\"14.157506\" height=\"10.063278\" x=\"109.89001\" y=\"95.266487\"/> <g font-size=\"6\"> <text x=\"111\" y=\"102\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1434 </text> </g> </a> <a href=\"#cab1431\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a408\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1-73\" width=\"14.329887\" height=\"10.060334\" x=\"109.84391\" y=\"52.811813\"/> <g font-size=\"6\"> <text x=\"111\" y=\"60\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1431 </text> </g> </a> <a href=\"#cab1430\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a411\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1-7-0\" width=\"14.329887\" height=\"10.060334\" x=\"109.84391\" y=\"42.150204\"/> <g font-size=\"6\"> <text x=\"111\" y=\"49\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1430 </text> </g> </a> <a href=\"#cab1427\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a423\" transform=\"matrix(0.97475035,0,0,3.0311912,1.1783721,-92.812073)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1-2\" width=\"14.329887\" height=\"10.060334\" x=\"89.897217\" y=\"31.16083\"/> <g font-size=\"2\"> <text x=\"91\" y=\"36.5\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1427 </text> </g> </a> <a href=\"#cab1426\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a429\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1\" width=\"14.329887\" height=\"10.060334\" x=\"89.853378\" y=\"52.641315\"/> <g font-size=\"6\"> <text x=\"91\" y=\"60\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1426 </text> </g> </a> <a href=\"#cab1425\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a432\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7\" width=\"14.329887\" height=\"10.060334\" x=\"89.853386\" y=\"63.302925\"/> <g font-size=\"6\"> <text x=\"91\" y=\"70.5\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1425 </text> </g> </a> <a href=\"#cab1424\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a435\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0\" width=\"14.329887\" height=\"10.060334\" x=\"89.809555\" y=\"73.997795\"/> <g font-size=\"6\"> <text x=\"91\" y=\"81\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1424 </text> </g> </a> <a href=\"#cab1423\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a438\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9\" width=\"14.329887\" height=\"10.060334\" x=\"89.765724\" y=\"84.659409\"/> <g font-size=\"6\"> <text x=\"91\" y=\"92\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1423 </text> </g> </a> <a href=\"#cab1422\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a441\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2\" width=\"14.329887\" height=\"10.060334\" x=\"89.720139\" y=\"95.267952\"/> <g font-size=\"6\"> <text x=\"91\" y=\"102\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1422 </text> </g> </a> <path style=\"fill:none;stroke:#000000;stroke-width:.585827;stroke-dasharray:none;stroke-opacity:1;stop-color:#000000\" d=\"m 87.659004,0.2929135 h 36.228166 l -0.19732,43.4864385 4.34455,0.07383 -0.14549,11.569545 -4.0017,-0.08514 V 92.58746 h 78.09209 l -0.12041,-4.69598 13.5899,-0.0371 -0.0804,4.73306 v 56.2719 h -40.72211 v -5.77967 l -51.04468,-0.14239 -0.14042,3.22997 -35.879073,0.14505 0.241067,-2.78823 -52.611424,0.0372 -0.12041,7.70622 H 0.2929135 V 91.30344 86.60746 l 18.7559755,0.16806 0.03297,5.65324 68.387707,-0.0416 z\" id=\"path2733\"/> <circle id=\"60\" style=\"fill:#000000;stroke:none\" cx=\"83.040085\" cy=\"118.00812\" r=\"1\" data-neighbors=\"13,11\"/> <circle id=\"61\" style=\"fill:#000000;stroke:none\" cx=\"69.602585\" cy=\"118.00812\" r=\"1\"/> <circle id=\"62\" style=\"fill:#000000;stroke:none\" cx=\"52.852585\" cy=\"118.00812\" r=\"1\"/> <circle id=\"63\" style=\"fill:#000000;stroke:none\" cx=\"40.352585\" cy=\"118.00812\" r=\"1\"/> <circle id=\"64\" style=\"fill:#000000;stroke:none\" cx=\"23.102585\" cy=\"118.00812\" r=\"1\"/> <circle id=\"65\" style=\"fill:#000000;stroke:none\" cx=\"132.41508\" cy=\"118.00812\" r=\"1\"/> <circle id=\"66\" style=\"fill:#000000;stroke:none\" cx=\"149.22758\" cy=\"118.00812\" r=\"1\"/> <circle id=\"67\" style=\"fill:#000000;stroke:none\" cx=\"162.60258\" cy=\"118.00812\" r=\"1\"/> <circle id=\"68\" style=\"fill:#000000;stroke:none\" cx=\"176.54008\" cy=\"118.00812\" r=\"1\"/> <circle id=\"69\" style=\"fill:#000000;stroke:none\" cx=\"190.54008\" cy=\"118.00812\" r=\"1\"/> <circle id=\"70\" style=\"fill:#000000;stroke:none\" cx=\"199.04008\" cy=\"118.00812\" r=\"1\"/> <g style=\"fill:#000000\" id=\"g594\" transform=\"matrix(0.02387068,0,0,0.02387068,100.04994,96.125577)\"> <g id=\"g584\"> <g id=\"g582\"> <path d=\"m 460.798,40.96 h -102.4 c -11.305,0 -20.48,9.155 -20.48,20.48 v 81.92 h -20.48 V 40.96 h 20.48 c 11.305,0 20.48,-9.155 20.48,-20.48 C 358.398,9.155 349.223,0 337.918,0 h -40.96 c -0.123,0 -0.246,0.061 -0.369,0.061 -1.659,0.041 -3.236,0.553 -4.833,0.983 -0.983,0.266 -2.048,0.287 -2.97,0.696 -0.922,0.389 -1.679,1.167 -2.54,1.72 -1.393,0.881 -2.847,1.659 -3.994,2.847 -0.082,0.102 -0.205,0.123 -0.307,0.225 l -266.24,286.72 c -7.68,8.294 -7.209,21.258 1.065,28.938 3.953,3.666 8.95,5.489 13.947,5.489 5.489,0 10.977,-2.212 15.012,-6.554 l 5.468,-5.878 v 32.911 c -11.305,0 -20.48,9.155 -20.48,20.48 v 102.4 c 0,11.325 9.175,20.48 20.48,20.48 h 409.6 c 11.305,0 20.48,-9.155 20.48,-20.48 V 61.44 c 0.001,-11.325 -9.174,-20.48 -20.479,-20.48 z m -307.2,204.8 c -11.305,0 -20.48,9.155 -20.48,20.48 v 81.92 h -40.96 v -77.025 l 61.44,-66.171 z m 122.88,-102.4 h -20.48 c -11.305,0 -20.48,9.155 -20.48,20.48 v 81.92 h -40.96 v -81.92 c 0,-0.881 -0.389,-1.618 -0.492,-2.458 l 82.412,-88.74 z\" id=\"path580\"/> </g> </g> </g> <circle id=\"1416\" style=\"fill:#000000;stroke:none\" cx=\"23.102585\" cy=\"111.88312\" r=\"1\"/> <circle id=\"1417\" style=\"fill:#000000;stroke:none\" cx=\"40.352585\" cy=\"111.82062\" r=\"1\"/> <circle id=\"circle610\" style=\"fill:#000000;stroke:none\" cx=\"69.602585\" cy=\"111.69562\" r=\"1\" data-neighbors=\"13,11\"/> <circle id=\"1413\" style=\"fill:#000000;stroke:none\" cx=\"69.602585\" cy=\"124.50812\" r=\"1\"/> <circle id=\"1412\" style=\"fill:#000000;stroke:none\" cx=\"83.040085\" cy=\"124.44562\" r=\"1\"/> <circle id=\"58\" style=\"fill:#000000;stroke:none\" cx=\"106.04008\" cy=\"118.00812\" r=\"1\" data-neighbors=\"13,11\"/> <circle id=\"1411\" style=\"fill:#000000;stroke:none\" cx=\"106.04008\" cy=\"124.50812\" r=\"1\"/> <circle id=\"stair4floor\" style=\"fill:#000000;stroke:none\" cx=\"106.04008\" cy=\"106.82062\" r=\"1\" data-neighbors=\"13,11\"/> <circle id=\"1401\" style=\"fill:#000000;stroke:none\" cx=\"132.41508\" cy=\"112.19562\" r=\"1\" data-neighbors=\"12,14\"/> <circle id=\"1409\" style=\"fill:#000000;stroke:none\" cx=\"132.41508\" cy=\"124.63312\" r=\"1\"/> <circle id=\"1402\" style=\"fill:#000000;stroke:none\" cx=\"149.22758\" cy=\"112.32062\" r=\"1\"/> <circle id=\"1403\" style=\"fill:#000000;stroke:none\" cx=\"162.60258\" cy=\"112.19562\" r=\"1\"/> <circle id=\"1408\" style=\"fill:#000000;stroke:none\" cx=\"162.60258\" cy=\"124.50812\" r=\"1\"/> <circle id=\"1404\" style=\"fill:#000000;stroke:none\" cx=\"176.54008\" cy=\"112.19562\" r=\"1\"/> <circle id=\"1405\" style=\"fill:#000000;stroke:none\" cx=\"190.54008\" cy=\"112.19562\" r=\"1\" data-neighbors=\"12,14\"/> <circle id=\"1407\" style=\"fill:#000000;stroke:none\" cx=\"190.54008\" cy=\"124.25812\" r=\"1\"/> <circle id=\"1406\" style=\"fill:#000000;stroke:none\" cx=\"199.04008\" cy=\"112.13312\" r=\"1\"/> <circle id=\"1434\" style=\"fill:#000000;stroke:none\" cx=\"109.41508\" cy=\"81.008118\" r=\"1\"/> <circle id=\"1422\" style=\"fill:#000000;stroke:none\" cx=\"101.85258\" cy=\"81.008118\" r=\"1\"/> <circle id=\"1423\" style=\"fill:#000000;stroke:none\" cx=\"102.04008\" cy=\"71.008118\" r=\"1\"/> <circle id=\"1424\" style=\"fill:#000000;stroke:none\" cx=\"102.04008\" cy=\"60.008121\" r=\"1\"/> <circle id=\"1432\" style=\"fill:#000000;stroke:none\" cx=\"109.04008\" cy=\"60.008118\" r=\"1\"/> <circle id=\"1425\" style=\"fill:#000000;stroke:none\" cx=\"102.19204\" cy=\"49.008121\" r=\"1\"/> <circle id=\"1426\" style=\"fill:#000000;stroke:none\" cx=\"102.13383\" cy=\"39.008121\" r=\"1\"/> <circle id=\"1431\" style=\"fill:#000000;stroke:none\" cx=\"109.38383\" cy=\"39.008121\" r=\"1\"/> <circle id=\"1430\" style=\"fill:#000000;stroke:none\" cx=\"109.44633\" cy=\"28.00812\" r=\"1\"/> <circle id=\"1427\" style=\"fill:#000000;stroke:none\" cx=\"101.91508\" cy=\"17.00812\" r=\"1\" data-neighbors=\"1,3\"/> <circle id=\"1414\" style=\"fill:#000000;stroke:none\" cx=\"40.352585\" cy=\"124.63725\" r=\"1\"/> <a href=\"#cab1419\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a2516\" transform=\"matrix(0.94550925,0,0,1.0010389,14.716888,-19.118578)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2514\" width=\"15.728415\" height=\"19.326527\" x=\"45.691628\" y=\"112.29272\"/> <g font-size=\"4\"> <text x=\"49\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1419 </text> </g> </a> <a href=\"#cab1420\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a2524\" transform=\"matrix(0.88493087,0,0,1.001851,33.208203,-19.217619)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2522\" width=\"15.728415\" height=\"19.326527\" x=\"45.691628\" y=\"112.29272\"/> <g font-size=\"4\"> <text x=\"49\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1420 </text> </g> </a> <a href=\"#cab1433\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a2540\" transform=\"translate(18.602586,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2538\" width=\"14.329887\" height=\"10.060334\" x=\"90.015724\" y=\"84.659409\"/> <g font-size=\"6\"> <text x=\"91\" y=\"91.5\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1433 </text> </g> </a> <a href=\"#cab1432\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a2541\" transform=\"translate(18.602586,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2542\" width=\"14.329887\" height=\"10.060334\" x=\"90.015724\" y=\"73.986519\"/> <g font-size=\"6\"> <text x=\"91\" y=\"81\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1432 </text> </g> </a> <circle id=\"1433\" style=\"fill:#000000;stroke:none\" cx=\"109.3736\" cy=\"71.008118\" r=\"1\"/> <a href=\"#cab1429\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a2560\" transform=\"translate(-1.2724137,-29.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2558\" width=\"14.329887\" height=\"10.060334\" x=\"109.84391\" y=\"42.150204\"/> <g font-size=\"6\"> <text x=\"111\" y=\"49\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1429 </text> </g> </a> <a href=\"#cab1428\" class=\"map-tab-link\" data-color=\"#ffa812\" id=\"a2564\" transform=\"translate(-1.2724137,-40.92938)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2562\" width=\"14.329887\" height=\"10.060334\" x=\"109.84391\" y=\"42.150204\"/> <g font-size=\"6\"> <text x=\"111\" y=\"49\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1428 </text> </g> </a> <circle id=\"1429\" style=\"fill:#000000;stroke:none\" cx=\"109.38383\" cy=\"17.00812\" r=\"1\"/> <circle id=\"49\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"6.4143696\" r=\"1\" data-neighbors=\"1,3\"/> <circle id=\"1428\" style=\"fill:#000000;stroke:none\" cx=\"109.38383\" cy=\"6.4143696\" r=\"1\"/> <circle id=\"1418\" style=\"fill:#000000;stroke:none\" cx=\"52.852585\" cy=\"111.63312\" r=\"1\"/> <circle id=\"1419\" style=\"fill:#000000;stroke:none\" cx=\"69.602585\" cy=\"111.75812\" r=\"1\"/> <circle id=\"1420\" style=\"fill:#000000;stroke:none\" cx=\"83.040085\" cy=\"111.75812\" r=\"1\" data-neighbors=\"13,11\"/> </svg> </div> <div id=\"map1\"> <svg width=\"160mm\" height=\"210mm\" id=\"svgImage1\" version=\"1.1\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"> <defs id=\"defs446\"/> <circle id=\"72\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"39.008121\" r=\"1\" data-neighbors=\"3,5\" inkscape:label=\"72\"/> <circle id=\"73\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"49.008121\" r=\"1\" data-neighbors=\"4,6\" inkscape:label=\"73\"/> <circle id=\"74\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"60.008121\" r=\"1\" data-neighbors=\"5,7\" inkscape:label=\"74\"/> <circle id=\"75\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"81.008118\" r=\"1\" data-neighbors=\"8,10\" inkscape:label=\"75\"/> <circle id=\"76\" style=\"fill:#000000;stroke:none\" cx=\"105.72758\" cy=\"90.008118\" r=\"1\" data-neighbors=\"9,11,12\" inkscape:label=\"76\"/> <circle id=\"77\" style=\"fill:#000000;stroke:none\" cx=\"91.727585\" cy=\"90.008118\" r=\"1\" data-neighbors=\"10,14\" inkscape:label=\"77\"/> <circle id=\"78\" style=\"fill:#000000;stroke:none\" cx=\"91.727585\" cy=\"118.00812\" r=\"1\" data-neighbors=\"13,11\" inkscape:label=\"78\"/> <a href=\"#cab1122\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a345\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3-9-4-3-2\" width=\"15.21156\" height=\"19.317305\" x=\"29.689268\" y=\"112.28632\"/> <g font-size=\"6\"> <text x=\"31\" y=\"124\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1122 </text> </g> </a> <a href=\"#cab1121\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a348\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3-9-4-3-2-7\" width=\"8.7713041\" height=\"19.341173\" x=\"20.070086\" y=\"112.28537\"/> <g font-size=\"4\"> <text x=\"21\" y=\"123\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"7\"> 1121 </text> </g> </a> <a href=\"#cab1119\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a354\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.810833;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-9-3-3-9\" width=\"32.639603\" height=\"26.503717\" x=\"2.7023225\" y=\"142.81255\"/> <g font-size=\"9\"> <text x=\"11\" y=\"159\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"19\"> 1119 </text> </g> </a> <circle id=\"1119\" style=\"fill:#000000;stroke:none\" cx=\"23.102585\" cy=\"124.57062\" r=\"1\" data-neighbors=\"13,11\" inkscape:label=\"1119\"/> <a href=\"#cab1103\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a369\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-99\" width=\"34.032288\" height=\"21.598423\" x=\"89.844238\" y=\"142.69016\"/> <g font-size=\"9\"> <text x=\"97\" y=\"157\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"19\"> 1103 </text> </g> </a> <a href=\"#cab1110\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a375\" transform=\"matrix(0.54386836,0,0,1.006971,69.950071,-20.051178)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.808395;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-99-2-3\" width=\"52.058994\" height=\"18.420053\" x=\"101.36746\" y=\"142.74841\"/> <g font-size=\"9\"> <text x=\"120\" y=\"154\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"20\"> 1110 </text> </g> </a> <a href=\"#cab1108\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a378\" transform=\"matrix(0.90925582,0,0,1.0313476,14.966652,-23.596446)\" style=\"stroke-width:.531016;stroke-dasharray:none\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.531016;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-1-99-2-3-5\" width=\"29.210623\" height=\"23.843235\" x=\"176.58269\" y=\"142.6478\"/> <g font-size=\"9\"> <text x=\"181\" y=\"156\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"20\"> 1108 </text> </g> </a> <a href=\"#cab1102\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a387\" transform=\"matrix(2.272882,0,0,0.98707405,-227.49043,-17.409836)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5-7\" width=\"16.275974\" height=\"19.320843\" x=\"169.51369\" y=\"112.73244\"/> <g font-size=\"9\"> <text x=\"173\" y=\"125\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"10\"> 1102 </text> </g> </a> <a href=\"#cab1101\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a393\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4-5\" width=\"16.275974\" height=\"19.320843\" x=\"141.6817\" y=\"112.76625\"/> <g font-size=\"6\"> <text x=\"146\" y=\"124\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"8\"> 1101 </text> </g> </a> <a href=\"#cab1100\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a396\" transform=\"translate(-1.2282195,-18.903491)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-4\" width=\"16.275974\" height=\"19.320843\" x=\"124.73032\" y=\"112.75002\"/> <g font-size=\"6\"> <text x=\"129\" y=\"124\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"8\"> 1100 </text> </g> </a> <a href=\"#cab1137\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a399\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-8\" width=\"14.157506\" height=\"10.063278\" x=\"109.89001\" y=\"95.266487\"/> <g font-size=\"4\"> <text x=\"114\" y=\"102\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"7\"> 1137 </text> </g> </a> <a href=\"#cab1139\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a408\" transform=\"translate(-1.4491904,-25.090676)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.670106;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1-73\" width=\"14.159781\" height=\"18.287121\" x=\"109.92896\" y=\"52.896866\"/> <g font-size=\"4\"> <text x=\"114\" y=\"63\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"7\"> 1139 </text> </g> </a> <a href=\"#cab1140\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a411\" transform=\"translate(-1.8027438,-25.532618)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1-7-0\" width=\"14.329887\" height=\"10.060334\" x=\"109.84391\" y=\"42.150204\"/> <g font-size=\"4\"> <text x=\"114\" y=\"49\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"7\"> 1140 </text> </g> </a> <a href=\"#cab1144a\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a423\" transform=\"matrix(0.99087384,0,0,1.6250968,-0.38660867,-34.587881)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1-2\" width=\"14.329887\" height=\"10.060334\" x=\"89.897217\" y=\"30.16083\"/> <g font-size=\"2\"> <text x=\"93\" y=\"37\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1144a </text> </g> </a> <a href=\"#cab1144b\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a429\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7-1\" width=\"14.329887\" height=\"10.060334\" x=\"89.853378\" y=\"50\"/> <g font-size=\"4\"> <text x=\"93\" y=\"58\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1144б </text> </g> </a> <a href=\"#cab1144v\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a432\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0-7\" width=\"14.329887\" height=\"10.060334\" x=\"89.853386\" y=\"60\"/> <g font-size=\"4\"> <text x=\"93\" y=\"69\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1144в </text> </g> </a> <a href=\"#cab11444\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a435\" transform=\"translate(-1.2724137,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect355-2-9-0\" width=\"14.329887\" height=\"10.060334\" x=\"89.809555\" y=\"69.997795\"/> <g font-size=\"4\"> <text x=\"93\" y=\"77\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"9\"> 1144г </text> </g> </a> <path style=\"fill:none;stroke:#000000;stroke-width:.585827;stroke-dasharray:none;stroke-opacity:1;stop-color:#000000\" d=\"m 87.659004,0.2929135 h 36.228166 l -0.19732,43.4864385 4.34455,0.07383 -0.14549,11.569545 -4.0017,-0.08514 V 92.58746 h 78.09209 l -0.12041,-4.69598 13.5899,-0.0371 -0.0804,4.73306 v 56.2719 h -40.72211 v -5.77967 l -51.04468,-0.14239 -0.14042,3.22997 -35.879073,0.14505 0.241067,-2.78823 -52.611424,0.0372 -0.12041,7.70622 H 0.2929135 V 91.30344 86.60746 l 18.7559755,0.16806 0.03297,5.65324 68.387707,-0.0416 z\" id=\"path2733\"/> <circle id=\"80\" style=\"fill:#000000;stroke:none\" cx=\"83.040085\" cy=\"118.00812\" r=\"1\" data-neighbors=\"13,11\" inkscape:label=\"80\"/> <circle id=\"81\" style=\"fill:#000000;stroke:none\" cx=\"52.852585\" cy=\"118.00812\" r=\"1\" data-neighbors=\"13,11\" inkscape:label=\"81\"/> <circle id=\"82\" style=\"fill:#000000;stroke:none\" cx=\"40.352585\" cy=\"118.00812\" r=\"1\" data-neighbors=\"13,11\" inkscape:label=\"82\"/> <circle id=\"83\" style=\"fill:#000000;stroke:none\" cx=\"23.102585\" cy=\"118.00812\" r=\"1\" data-neighbors=\"13,11\" inkscape:label=\"83\"/> <circle id=\"84\" style=\"fill:#000000;stroke:none\" cx=\"132.41508\" cy=\"118.00812\" r=\"1\" data-neighbors=\"12,14\" inkscape:label=\"84\"/> <circle id=\"85\" style=\"fill:#000000;stroke:none\" cx=\"149.22758\" cy=\"118.00812\" r=\"1\" data-neighbors=\"12,14\" inkscape:label=\"85\"/> <circle id=\"86\" style=\"fill:#000000;stroke:none\" cx=\"162.60258\" cy=\"118.00812\" r=\"1\" data-neighbors=\"12,14\" inkscape:label=\"86\"/> <circle id=\"87\" style=\"fill:#000000;stroke:none\" cx=\"190.54008\" cy=\"118.00812\" r=\"1\" data-neighbors=\"12,14\" inkscape:label=\"87\"/> <circle id=\"88\" style=\"fill:#000000;stroke:none\" cx=\"208.29008\" cy=\"118.00812\" r=\"1\" data-neighbors=\"12,14\" inkscape:label=\"97\"/> <g style=\"fill:#000000\" id=\"g594\" transform=\"matrix(0.02387068,0,0,0.02387068,100.04994,96.125577)\"> <g id=\"g584\"> <g id=\"g582\"> <path d=\"m 460.798,40.96 h -102.4 c -11.305,0 -20.48,9.155 -20.48,20.48 v 81.92 h -20.48 V 40.96 h 20.48 c 11.305,0 20.48,-9.155 20.48,-20.48 C 358.398,9.155 349.223,0 337.918,0 h -40.96 c -0.123,0 -0.246,0.061 -0.369,0.061 -1.659,0.041 -3.236,0.553 -4.833,0.983 -0.983,0.266 -2.048,0.287 -2.97,0.696 -0.922,0.389 -1.679,1.167 -2.54,1.72 -1.393,0.881 -2.847,1.659 -3.994,2.847 -0.082,0.102 -0.205,0.123 -0.307,0.225 l -266.24,286.72 c -7.68,8.294 -7.209,21.258 1.065,28.938 3.953,3.666 8.95,5.489 13.947,5.489 5.489,0 10.977,-2.212 15.012,-6.554 l 5.468,-5.878 v 32.911 c -11.305,0 -20.48,9.155 -20.48,20.48 v 102.4 c 0,11.325 9.175,20.48 20.48,20.48 h 409.6 c 11.305,0 20.48,-9.155 20.48,-20.48 V 61.44 c 0.001,-11.325 -9.174,-20.48 -20.479,-20.48 z m -307.2,204.8 c -11.305,0 -20.48,9.155 -20.48,20.48 v 81.92 h -40.96 v -77.025 l 61.44,-66.171 z m 122.88,-102.4 h -20.48 c -11.305,0 -20.48,9.155 -20.48,20.48 v 81.92 h -40.96 v -81.92 c 0,-0.881 -0.389,-1.618 -0.492,-2.458 l 82.412,-88.74 z\" id=\"path580\"/> </g> </g> </g> <circle id=\"1121\" style=\"fill:#000000;stroke:none\" cx=\"23.102585\" cy=\"111.88312\" r=\"1\" data-neighbors=\"13,11\" inkscape:label=\"1121\"/> <circle id=\"1122\" style=\"fill:#000000;stroke:none\" cx=\"40.352585\" cy=\"111.82062\" r=\"1\" data-neighbors=\"13,11\" inkscape:label=\"1122\"/> <circle id=\"79\" style=\"fill:#000000;stroke:none\" cx=\"106.04008\" cy=\"118.00812\" r=\"1\" data-neighbors=\"13,11\" inkscape:label=\"79\"/> <circle id=\"1103\" style=\"fill:#000000;stroke:none\" cx=\"106.04008\" cy=\"124.50812\" r=\"1\" data-neighbors=\"13,11\" inkscape:label=\"1103\"/> <circle id=\"stair1floor\" style=\"fill:#000000;stroke:none\" cx=\"106.04008\" cy=\"106.82062\" r=\"1\" data-neighbors=\"13,11\" inkscape:label=\"stair1floor\"/> <circle id=\"1100\" style=\"fill:#000000;stroke:none\" cx=\"132.41508\" cy=\"112.19562\" r=\"1\" data-neighbors=\"12,14\" inkscape:label=\"1100\"/> <circle id=\"1110\" style=\"fill:#000000;stroke:none\" cx=\"132.41508\" cy=\"124.63312\" r=\"1\" data-neighbors=\"12,14\" inkscape:label=\"1110\"/> <circle id=\"1101\" style=\"fill:#000000;stroke:none\" cx=\"149.22758\" cy=\"112.32062\" r=\"1\" data-neighbors=\"12,14\" inkscape:label=\"1101\"/> <circle id=\"1102\" style=\"fill:#000000;stroke:none\" cx=\"162.60258\" cy=\"112.19562\" r=\"1\" data-neighbors=\"12,14\" inkscape:label=\"1102\"/> <circle id=\"1108\" style=\"fill:#000000;stroke:none\" cx=\"190.54008\" cy=\"124.25812\" r=\"1\" data-neighbors=\"12,14\" inkscape:label=\"1108\"/> <circle id=\"1137\" style=\"fill:#000000;stroke:none\" cx=\"109.41508\" cy=\"81.008118\" r=\"1\" data-neighbors=\"8,10\" inkscape:label=\"1137\"/> <a href=\"#cab1138\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a2540\" transform=\"translate(18.602586,-18.99188)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.822601;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2538\" width=\"14.007286\" height=\"27.857344\" x=\"90.177025\" y=\"66.701096\"/> <g font-size=\"4\"> <text x=\"94\" y=\"80\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"7\"> 1138 </text> </g> </a> <a href=\"#cab1144\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a2564\" transform=\"matrix(0,-0.97214264,3.3080655,0,-50.194617,121.85644)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2562\" width=\"14.329887\" height=\"10.060334\" x=\"109.84391\" y=\"42.150204\"/> <g font-size=\"7\"> <text x=\"44\" y=\"-115\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"7\" style=\"transform:rotate(90deg)\"> 1144 </text> </g> </a> <circle id=\"1124\" style=\"fill:#000000;stroke:none\" cx=\"52.899712\" cy=\"112.31646\" r=\"1\" data-neighbors=\"13,11\" inkscape:label=\"1124\"/> <circle id=\"1126\" style=\"fill:#000000;stroke:none\" cx=\"83.040085\" cy=\"111.79144\" r=\"1\" data-neighbors=\"13,11\" inkscape:label=\"1126\"/> <a href=\"#cab1126\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a5196\" transform=\"matrix(1.3897687,0,0,0.99600126,-18.940531,-18.631016)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.48969;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect5194\" width=\"15.076913\" height=\"19.338762\" x=\"61.407242\" y=\"112.2866\"/> <g font-size=\"6\"> <text x=\"63\" y=\"124\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1126 </text> </g> </a> <a href=\"#cab1124\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a2524\" transform=\"matrix(1.3897687,0,0,0.99600126,-18.965413,-18.626278)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.48969;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect2522\" width=\"15.076913\" height=\"19.338762\" x=\"45.685673\" y=\"112.2866\"/> <g font-size=\"6\"> <text x=\"47\" y=\"124\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"12\"> 1124 </text> </g> </a> <rect style=\"fill:#000000;stroke-width:1.14021\" id=\"rect755\" width=\"10.99686\" height=\"26.259167\" x=\"111.90137\" y=\"87.041801\"/> <rect style=\"fill:#ffffff;stroke-width:1.02047\" id=\"rect802\" width=\"6.5270886\" height=\"20.735876\" x=\"124.06181\" y=\"41.283245\"/> <rect style=\"fill:#000000;stroke-width:.884479\" id=\"rect856\" width=\"0.51614684\" height=\"11.074843\" x=\"123.56922\" y=\"44.016609\"/> <circle id=\"71\" style=\"fill:#000000;stroke:none\" cx=\"105.66508\" cy=\"20.88312\" r=\"1\" data-neighbors=\"1,3\" inkscape:label=\"71\"/> <circle id=\"1140\" style=\"fill:#000000;stroke:none\" cx=\"108.85258\" cy=\"20.88312\" r=\"1\" data-neighbors=\"1,3\" inkscape:label=\"1140\"/> <circle id=\"1144\" style=\"fill:#000000;stroke:none\" cx=\"105.66508\" cy=\"14.07062\" r=\"1\" data-neighbors=\"1,3\" inkscape:label=\"1140\"/> <circle id=\"1138\" style=\"fill:#000000;stroke:none\" cx=\"109.52827\" cy=\"60.008121\" r=\"1\" data-neighbors=\"5,7\" inkscape:label=\"1138\"/> <circle id=\"1139\" style=\"fill:#000000;stroke:none\" cx=\"109.43989\" cy=\"39.008121\" r=\"1\" data-neighbors=\"3,5\" inkscape:label=\"1139\"/> <rect style=\"fill:#ffffff;stroke-width:.965715\" id=\"rect1370\" width=\"6.5270886\" height=\"18.570362\" x=\"-92.258804\" y=\"197.14775\" transform=\"rotate(-90)\"/> <a href=\"#cab1107\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a1378\" transform=\"matrix(0.41101254,0,0,1.0383482,130.13117,-24.678526)\" style=\"stroke-width:.531016;stroke-dasharray:none\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.531016;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect1372\" width=\"29.210623\" height=\"23.843235\" x=\"176.58269\" y=\"142.6478\"/> <g font-size=\"7\"> <text x=\"181\" y=\"157\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"20\"> 1107 </text> </g> </a> <a href=\"#cab1109\" class=\"map-tab-link\" data-color=\"#3caa3c\" id=\"a1386\" transform=\"matrix(0.44136796,0,0,1.0089068,97.186718,-20.345338)\"> <rect style=\"display:inline;fill:#fff8f8;fill-opacity:1;stroke:#000000;stroke-width:.772134;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none\" id=\"rect1380\" width=\"47.3713\" height=\"18.467527\" x=\"128.5612\" y=\"142.72466\"/> <g font-size=\"9\"> <text x=\"143\" y=\"154\" lengthAdjust=\"spacingAndGlyphs\" textLength=\"20\"> 1109 </text> </g> </a> <circle id=\"1109\" style=\"fill:#000000;stroke:none\" cx=\"162.60258\" cy=\"124.13312\" r=\"1\" data-neighbors=\"12,14\" inkscape:label=\"1109\"/> <circle id=\"1107\" style=\"fill:#000000;stroke:none\" cx=\"208.29008\" cy=\"124.00812\" r=\"1\" data-neighbors=\"12,14\" inkscape:label=\"1107\"/> <rect style=\"fill:#000000;stroke-width:1.10782\" id=\"rect1609\" width=\"13.191961\" height=\"0.59662133\" x=\"202.16624\" y=\"92.277428\"/> </svg> </div> </div> <div class=\"level\"> <ul> <li> <button id=\"level1\">1 этаж</button> </li> <li> <button id=\"level2\">2 этаж</button> </li> <li> <button id=\"level3\">3 этаж</button> </li> <li> <button id=\"level4\">4 этаж</button> </li> </ul> </div> </div> <" + "script src=\"../js/script.js\"><" + "/script> </body> </html> "));
// Exports
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (code)));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__(187);
/******/ 	__webpack_require__(821);
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	__webpack_require__(901);
/******/ 	var __webpack_exports__ = __webpack_require__(336);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map