
const grid = document.querySelector('#mainBox');
const clearBtn = document.querySelector('#clearBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const rainbowBtn = document.querySelector('#rainbowBtn');
const colorBtn = document.querySelector('#colorBtn');
let colorPicker = document.querySelector('#colorPicker');
let slider = document.querySelector('#sizeSlider');
let density = slider.value;
let color = colorPicker.value;
let boxes;
let mode;
loadGrid();


clearBtn.addEventListener('click', clear);
slider.addEventListener('change', changeDensity);
eraserBtn.addEventListener('click', eraser);
rainbowBtn.addEventListener('click', rainbowEffect);
colorBtn.addEventListener('click', colorMode);

function loadGrid() {

	for (i=1;i<=density;i++) {
	  const row = document.createElement('div');
	  row.classList.add('row');
	  grid.appendChild(row);
	}

	const rows = document.querySelectorAll('.row');

	rows.forEach((r) => {
	  for (i=1;i<=density;i++) {
	    const box = document.createElement('div');
	    box.classList.add('box');
	    r.appendChild(box);
	  }
	});
  rainbowEffect();
  mode = 'rainbow';
}

function reloadGrid() {

  	for (i=1;i<=density;i++) {
	  const row = document.createElement('div');
	  row.classList.add('row');
	  grid.appendChild(row);
	}

	const rows = document.querySelectorAll('.row');

	rows.forEach((r) => {
	  for (i=1;i<=density;i++) {
	    const box = document.createElement('div');
	    box.classList.add('box');
	    r.appendChild(box);
	  }

	  if (mode === 'rainbow') {
	  	rainbowEffect();
	  } else if (mode === 'eraser') {
	  	eraser()
	  } else {
	  	colorMode();
	  }
	});

}

function eraser () {
   boxes = document.querySelectorAll('.box');

	boxes.forEach((b) => {
	  b.removeEventListener('mouseover', () => b.style.backgroundColor = randomColor())
	});
	boxes.forEach((b) => {
	  b.addEventListener('mouseover', () => b.style.backgroundColor = 'lemonchiffon')
	});
	mode = 'eraser';
}

function rainbowEffect () {
  
  boxes = document.querySelectorAll('.box');

	boxes.forEach((b) => {
	  b.addEventListener('mouseover', () => b.style.backgroundColor = randomColor())
	});
	mode = 'rainbow';
}

function colorMode () {
  color = colorPicker.value

  boxes = document.querySelectorAll('.box');

	boxes.forEach((b) => {
	  b.removeEventListener('mouseover', () => b.style.backgroundColor = randomColor())
	});
	boxes.forEach((b) => {
	  b.addEventListener('mouseover', () => b.style.backgroundColor = color)
	});

  colorPicker.addEventListener('change', colorMode);

	console.log(color);

	mode = 'color';
}

function randomColor() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let rgb = `rgb(${r},${g},${b})`;
  
  return rgb;
}

function changeDensity () {
  density = slider.value;
  ResetGridStructure();
  reloadGrid();
}


function ResetGridStructure () {
  while (grid.firstChild) {
  grid.removeChild(grid.firstChild);
  }
}

function clear() {
  boxes.forEach((b) => {
  b.style.backgroundColor = '';
  });
}