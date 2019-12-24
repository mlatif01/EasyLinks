
const newBtn = document.querySelector('.btn-new');
const delBtn = document.querySelector('.btn-del');
const para = document.querySelector('p');
const modalIcons = document.querySelector('.modal-icons');
const modalHeader = document.querySelector('.modal-header');
const URL = "http://localhost:3000/links/";

refreshList();

// update icons on the screen
function refreshList() {
    getLinks().then(
        data => {
            data.forEach(element => {
                addIcon(element.url, element.icon, element.id);
            });
        },
        error => {
            console.log('error: ', error)
        }
    );
}

function toggleNewButton() {
    newBtn.style.display === "none" ? newBtn.style.display = "block" : newBtn.style.display = "none";
}

function toggleDelButton() {
    delBtn.style.display === "none" ? delBtn.style.display = "block" : delBtn.style.display = "none";
}

function createInputBoxes() {
    //hide del button
    toggleDelButton();
    // hide new button
    toggleNewButton();
    // hide para
    para.hidden = true;
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

function createDelOptions() {
    // hide new button
    toggleNewButton();
    // hide delete button
    toggleDelButton();
    // hide para
    para.hidden = true;
    // create del options
    // create paragraph and first create div
    const newDiv = document.createElement('div');
    // add content (a new input box) of the element - improve the below implementation
    newDiv.innerHTML = `<p>Choose icon to delete</p>`;
    // finally put it where it needs to appear
    document.getElementById("newElementId").appendChild(newDiv);

    // change all icons to red so that when they are clicked they can be deleted
    // get all elements with class of flex
    const flexElems = document.querySelectorAll('.flex');
    // change all their colours to red to signify they can be deleted
    flexElems.forEach( (element) => {
        let div = element;
        let divId = div.id;
        let a = element.firstChild;
        let i = a.firstChild;
        div.removeChild;
        div.appendChild(i);
        // colour in each i element
        i.style = "color: red";
        // add event listener to icons for deleting and pass in divId as param
        div.addEventListener('click', () => {
            deleteItem(divId);
        });
    });
};

function resetModalContent() {
    // if new button not showing, reset modal content when bottom of screen is clicked (modal-icons div)
    if (newBtn.style.display === "none") {
        const e = document.getElementById("newElementId");
        let child = e.lastElementChild;
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }
        para.hidden = false;
    }
    newBtn.style.display = "block";
    // -------------------------------------------------------
    // delete button reset
    if (delBtn.style.display === "none") {
        const e = document.getElementById("newElementId");
        let child = e.lastElementChild;
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }
        para.hidden = false;

        removeIcons();
        // refresh list of icons
        refreshList();
    }
    delBtn.style.display = "block";
}

function removeIcons() {
    // get all elements with class of flex
    const flexElems = document.querySelectorAll('.flex');
    // remove all icons and then refresh List
    flexElems.forEach( (element) => {
        let div = element;
        div.remove();
    });
}

function addIcon(url, icon, id) {
    // get string values of the url and icon
    const urlVal = url;
    const iconVal = icon;
    const idVal = id;
    // create div with id of flex 
    const newIconDiv = document.createElement('div');
    newIconDiv.className = 'flex';
    newIconDiv.id = id;
    // add url value and icon value
    newIconDiv.innerHTML = `<a href='${urlVal}' target='_blank'><i class='${getIcon(iconVal)}'></i></a>`;
    // finally put it where it needs to appear in the flex container div
    document.querySelector('.flex-container').appendChild(newIconDiv);
    // reset modal content after adding item
    resetModalContent();
}

// this function gets the url and icon value and calls postLink to call http post request to db
function addItem() {
    const urlBox = document.getElementById('inputBox');
    const iconBox = document.getElementById('selectBox');
    const urlVal = urlBox.value;
    const iconVal = iconBox.value;
    postLink(urlVal, iconVal);
    removeIcons();
    resetModalContent();
}

// gets the id for the item to be deleted then calls deleteLink to send http delete request to db with id passed as param
function deleteItem(divId) {
    if (confirm('Are you sure you want to delete icon with ID: ' + divId)) {
        deleteLink(divId);
    } else {
        // do nothing
    }
    resetModalContent();
}

function postLink(urlVal, iconVal) {
        // post to db
        let link = {
            url: urlVal,
            icon: iconVal
        };
    
        let promise = $.post(
            URL, link
        );
        promise.then(
            data => console.log('data: ', data),
            error => console.log('error: ', error)
        );
}

function deleteLink(id) {
    // delete from db
    let promise = $.delete(
        URL + id,
    );
    promise.then(
        data => console.log('Deleted successfully'),
        error => console.log('error: ', error)
    );
}

// takes in an icon value and returns the appropriate font awesome icon class
function getIcon(iconValue) {
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

function getLinks() {
    let promise = $.get(
        "http://localhost:3000/links"
    );
    promise.then(
        data => {
            console.log('data: ', data);

        },
        error => console.log('error: ', error)
    );
    return promise;
}

// Event Listeners
newBtn.addEventListener('click', createInputBoxes);
delBtn.addEventListener('click', createDelOptions);
modalHeader.addEventListener('click', resetModalContent);

// extend $ to use delete
$.delete = function(url, data, callback, type){

    if ( $.isFunction(data) ){
      type = type || callback,
      callback = data,
      data = {}
    }
  
    return $.ajax({
      url: url,
      type: 'DELETE',
      success: callback,
      data: data,
      contentType: type
    });
  }