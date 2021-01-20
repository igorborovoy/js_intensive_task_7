const createButton = document.querySelector('#create-button');
const addInputButton = document.querySelector('#add-button');
const deleteInputButton = document.querySelector('div.inputs');
const blockParent = document.querySelector('div.main');

createButton.addEventListener('click', addBlock);
addInputButton.addEventListener('click', addInput);
deleteInputButton.addEventListener('click', deleteInput);

function addBlock() {
    const height = document.querySelector('#height_input');
    const width = document.querySelector('#width_input');
    const color = document.querySelector('#color_input');
    const validate = blockParamsValidate(height, width, color);
    const oldBlock = document.getElementById('block');
    const errorBlock = document.getElementById('error-block');
    if (errorBlock) {
        errorBlock.remove();
    }
    const inputs = document.getElementsByClassName('text-input');
    if (oldBlock) {
        oldBlock.remove();
    }
    if (validate) {
        drawBlock(height.value, width.value, color.value);
    } else {
        showError();
    }
}

function blockParamsValidate(height, width, color) {
    const inputs = document.getElementsByClassName('text-input');

    if (!height.checkValidity()) {
        return false;
    }
    if (!width.checkValidity()) {
        return false;
    }
    if (!color.checkValidity()) {
        return false;
    }
    for (const iterator of inputs) {
        if (!iterator.firstElementChild.checkValidity()) {
            return false;
        }
    }
    return true;
}

function drawBlock(height, width, color) {
    const block = document.createElement('div');
    const inputs = document.getElementsByClassName('text-input');
    blockParent.append(block);
    block.style.width = `${width}px`;
    block.style.height = `${height}px`;
    block.style.backgroundColor = color;
    block.id = 'block';
    for (const iterator of inputs) {
        block.insertAdjacentHTML('afterbegin', `<p>${iterator.firstChild.value}</p>`);
    }
}

function showError() {
    const newErrorBlock = document.createElement('div');
    newErrorBlock.id = 'error-block';
    newErrorBlock.insertAdjacentText('afterbegin', 'Something wrong. Check inputs.');
    blockParent.append(newErrorBlock);
}

function addInput() {
    const elem = document.querySelector('div.input');
    const input = elem.cloneNode(true);
    input.firstElementChild.firstElementChild.value = "";
    const inputParent = document.querySelector('div.add-button');
    inputParent.before(input);
}

function deleteInput(event) {
    if (event.target.id === 'delete-button') {
        const elem = event.target.parentElement.parentElement;
        if (document.querySelectorAll('div.input').length > 1) {
            elem.remove();
        }
    }
}