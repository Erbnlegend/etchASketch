// Grab IDs 
const menu = document.getElementById('menu');
const slider = document.getElementById('slider');
const grid = document.getElementById('grid');

// Init Selection
let grayscale = true;
let rainbows = false;
let eraser = false;



// Menu List
const menuList = {
    1: 'Grayscale',
    2: 'Rainbow',
    3: 'Reset',
    4: 'Eraser',
    5: [16,32,64]
}

// Build Menu List
const buildMenu = () => {
    for(const prop in menuList) {
        const createDiv = document.createElement('div');
        if(Object.hasOwn(menuList[prop], prop)) {
            createDiv.setAttribute('class', 'menuButton');
            createDiv.setAttribute('id', menuList[prop]);
            createDiv.textContent = `${menuList[prop]}`;
            menu.appendChild(createDiv);
        } else {
            const createScale = document.createElement('input');
            createScale.setAttribute('id', 'menuScale');
            createScale.type = 'range';
            createScale.min= menuList[prop][0];
            createScale.value = menuList[prop][0];
            createScale.max = menuList[prop][2];
            createScale.step = 16;
            slider.append(createScale);
        }
    }
}
buildMenu()

const menuScale = document.getElementById('menuScale');

// Update the current slider value (each time you drag the slider handle)
const output = document.getElementById('scaleValue');

menuScale.value = 16
output.innerHTML = 16;

// Remove old boxes
const removeGrid = () => {
    const removeBoxes = grid.childNodes;
    // Removing always shrinks array so index must always be 0
    while(removeBoxes.length > 0) {
        removeBoxes[0].parentNode.removeChild(removeBoxes[0]);
    }
    buildGrid()
}

// Readd new boxes
const buildGrid = () => {
    for(let i = 0; i < menuScale.value * menuScale.value; i++) {
        const createBoxes = document.createElement('div');
        createBoxes.setAttribute('class', `box${menuScale.value}`);
        createBoxes.setAttribute('id', `box${i}`)
        grid.appendChild(createBoxes);
    }
    events();
}

// Update grid value
const updateScaleValue = (e) => {
    output.innerHTML = `${menuScale.value}`;
    removeGrid()
}

// Event on scale change
menuScale.addEventListener('change', updateScaleValue);
  

// Initial Grid
const initGrid = () => {
    for(let i = 0; i < menuScale.value * menuScale.value; i++) {
    const createBoxes = document.createElement('div');
    createBoxes.setAttribute('class', `box${menuScale.value}`);
    createBoxes.setAttribute('id', `box${i}`)
    grid.appendChild(createBoxes);
    }
}
initGrid()

const colorMe = (e) => {
    if(grayscale) {
        e.target.style.backgroundColor = "gray";
    }
    if(rainbows) {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        e.target.style.backgroundColor = `#${randomColor}`;
    }
    if(eraser) {
        e.target.style.backgroundColor = "white";
    }
}

// Color Event
const events = (e) => {
    for(let i = 0; i < menuScale.value * menuScale.value; i++) {
        const hoverMe = document.getElementById(`box${[i]}`);
        hoverMe.addEventListener('mouseover', colorMe);
    }
}
events();

// Event on Menu Buttons
const menuSelections = (e) => {
    if(e.target === grayscaleButton){
        grayscale = true;
        rainbows = false;
        eraser = false;
        grayscaleButton.classList.add('selected')
        rainbowsButton.classList.remove('selected')
        eraserButton.classList.remove('selected')
    } else if(e.target === rainbowsButton) {
        grayscale = false;
        rainbows = true;
        eraser = false;
        grayscaleButton.classList.remove('selected')
        rainbowsButton.classList.add('selected')
        eraserButton.classList.remove('selected')
    } else if(e.target === eraserButton) {
        grayscale = false;
        rainbows = false;
        eraser = true;
        grayscaleButton.classList.remove('selected')
        rainbowsButton.classList.remove('selected')
        eraserButton.classList.add('selected')
    }
}

// Grayscale
const grayscaleButton = document.getElementById('Grayscale');
grayscaleButton.classList.add('selected')
grayscaleButton.addEventListener('click', menuSelections);

// Rainbows
const rainbowsButton = document.getElementById('Rainbow');
rainbowsButton.addEventListener('click', menuSelections);

// Reset
const resetButton = document.getElementById('Reset');
resetButton.addEventListener('click', removeGrid);

// Eraser
const eraserButton = document.getElementById('Eraser');
eraserButton.addEventListener('click', menuSelections);
