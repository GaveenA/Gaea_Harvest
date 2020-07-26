// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.


/*
 Creating the crop list which is been
 displayed in the index.html page. This is
 done calling the createCropItem function below.
*/
var cropList = JSON.parse(localStorage.getItem('cropList'));
if(cropList != null) {
    cropList.forEach(createCropItem);
}

function createCropItem(crop)
 {
    var ul = document.getElementById("cropList");
    var li = document.createElement("li");
    li.className = "mdl-list__item";
    var spanElement = document.createElement('span');
    var deleteIcon = document.createElement('i');
    deleteIcon.className = "material-icons mdl-list__item-icon";
    deleteIcon.appendChild(document.createTextNode('delete'));
    deleteIcon.addEventListener("click", function () {
        this.deleteCrop(crop);
    }.bind(this));
    spanElement.appendChild(document.createTextNode(crop.name));
    spanElement.appendChild(deleteIcon);
    li.appendChild(spanElement);
    ul.appendChild(li);
}


/*
 The deleteCrop function deals with 
 removing of the desired crop and then updating 
 the croplist with a new crop list.
*/
function deleteCrop(cropToBeDeleted)
{   
    // creating a pop up so that the user is notified 
    // if the delete button was pressed accidently.
    var confirmation = confirm ('Are you OK with deleting this crop ? ');
    if (confirmation === true)
    {
    var newCropList = [];
    cropList.forEach(function (crop) {
        if(crop.name != cropToBeDeleted.name) {
            newCropList.push(crop);
        }
    });
    localStorage.setItem('cropList', JSON.stringify(newCropList));
    location.reload();
    }
}

function createLocationItem(item) 
{
    var ul = document.getElementById("locationList");
    var li = document.createElement("li");
    li.className = "mdl-list__item";
    var spanElement = document.createElement('span');
    var iTag = document.createElement('i');
    iTag.className = "material-icons mdl-list__item-icon";
    iTag.appendChild(document.createTextNode('location_on'));
    spanElement.appendChild(document.createTextNode(item.name));
    spanElement.appendChild(iTag);
    li.appendChild(spanElement);
    li.addEventListener("click", function () {
        this.viewLocation(item);
    }.bind(this));
    ul.appendChild(li);
}
/*
 Creating the location list which is been
 displayed in the index.html page. This is
 done calling the createLocationItem function above.
*/
var locationMap = JSON.parse(localStorage.getItem('locationMap'));
if (locationMap != null) {
    locationMap.forEach(createLocationItem);
}

/*
 Once the user clicks on one of the saved 
 location in the loaction list the user is 
 taken to the view location page of that
 current location.
*/
function viewLocation(selectedLocation) {
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", JSON.stringify(selectedLocation));
    // And load the view location page.
    location.href = 'viewlocation.html';
}
