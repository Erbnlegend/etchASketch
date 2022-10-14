// Grab IDs 
const menu = document.getElementById('menu');
const slider = document.getElementById('slider');
const grid = document.getElementById('grid');



// Menu List
const menuList = {
    1: 'Grayscale',
    2: 'Rainbow',
    3: 'Clear',
    4: 'Eraser',
    5: [16,32,64]
}

// Build Menu List
const buildMenu = () => {
    for(const prop in menuList) {
        const createDiv = document.createElement('div');
        if(Object.hasOwn(menuList[prop], prop)) {
            createDiv.setAttribute('class', 'menuButton');
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

const buildGrid = () => {
    // Remove old boxes
    const removeBoxes = document.getElementsByClassName('box16');
    // Removing always shrinks array so index must always be 0
    while(removeBoxes.length > 0) {
        removeBoxes[0].parentNode.removeChild(removeBoxes[0]);
    }
    // Readd new boxes
    for(let i = 0; i < menuScale.value * menuScale.value; i++) {
        const createBoxes = document.createElement('div');
        createBoxes.setAttribute('class', 'box16');
        grid.appendChild(createBoxes);
    }
}

// Update grid value
const updateScaleValue = (e) => {
    output.innerHTML = `${menuScale.value}`;
    buildGrid()
}

// Event on scale click
menuScale.addEventListener('click', updateScaleValue);
  

// Initial Grid
const initGrid = () => {
    for(let i = 0; i < menuScale.value * menuScale.value; i++) {
    const createBoxes = document.createElement('div');
    createBoxes.setAttribute('class', 'box16');
    grid.appendChild(createBoxes);
    }
}
initGrid()