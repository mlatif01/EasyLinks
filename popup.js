const newBtn = document.querySelector('.btn-new');
const modalIcons = document.querySelector('.modal-icons');
const modalHeader = document.querySelector('.modal-header');

function toggleNewButton() {
    newBtn.style.display === "none" ? newBtn.style.display = "block" : newBtn.style.display = "none";
}

function createInputBoxes() {
    // hide button
    toggleNewButton();
    // create input boxes
    // first create div
    const txtNewInputBox = document.createElement('div');
    // add content (a new input box) of the element - improve the below implementation
    txtNewInputBox.innerHTML = `URL: <input type='text' id='inputBox' class='input'><br>
                              Icon: <select name='icon' id='selectBox' class='input'> 
                                        <option value=''>--Please Choose--</option> 
                                        <option value='website'>Website</option>
                                        <option value='reddit'>Reddit</option>
                                        <option value='github'>Github</option>
                                        <option value='blog'>Blog</option>
                                        <option value='portfolio'>Portfolio</option> 
                                    </select> 
                                    <button type='button' class='btn btn-success btn-add'>Add</button>`;
    // finally put it where it needs to appear
    document.getElementById("newElementId").appendChild(txtNewInputBox);
    // create addBtn variable and assign event listener to click event
    window.addBtn = document.querySelector('.btn-add');
    window.addBtn.addEventListener('click', addItem);
}

function resetModalContent() {
    // if new button not showing, reset modal content when bottom of screen is clicked (modal-icons div)
    if (newBtn.style.display === "none") {
        const e = document.getElementById("newElementId");
        let child = e.lastElementChild;
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }
    }
    newBtn.style.display = "block";
}

// creates icon elements
function addItem() {
    const urlBox = document.getElementById('inputBox');
    const iconBox = document.getElementById('selectBox');
    // create div with id of flex
    const newIconDiv = document.createElement('div');
    newIconDiv.className = 'flex';
    // add url value and icon value
    newIconDiv.innerHTML = `<a href='${urlBox.value}' target='_blank'><i class='${checkIcon(iconBox.value)}'></i></a>`;
    console.log(newIconDiv);
    // finally put it where it needs to appear in the flex container div
    document.querySelector('.flex-container').appendChild(newIconDiv);
    // reset modal content after adding item
    resetModalContent();
}

// takes in an icon value and returns the appropriate font awesome icon class
function checkIcon(iconValue) {
    switch(iconValue) {
        case "website":
            return "fa fa-globe";
        case "reddit":
            return "fa fa-reddit";
        case "github":
            return "fa fa-github";
        case "blog":
            return "fa fa-rss";
        case "portfolio":
            return "fa fa-briefcase";
    }
}

// Event Listeners
newBtn.addEventListener('click', createInputBoxes);
modalIcons.addEventListener('click', resetModalContent);
modalHeader.addEventListener('click', resetModalContent);


