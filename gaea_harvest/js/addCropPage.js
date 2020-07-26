
/* 
Saving the inputs given by the user in the 
add crop page and then storing it in the local storage 
and also updating the croplist array when new crops 
are added.Once the crop is been added you return back
to the index page
*/


function saveCrop()
 {
    var name = document.getElementById("name").value;
    var season = document.getElementById("season").value;
    var minTemp = parseFloat(document.getElementById("minTemp").value);
    var maxTemp = parseFloat(document.getElementById("maxTemp").value);
    var lowYield = parseFloat(document.getElementById("lowYield").value);
    var tolerence = parseFloat(document.getElementById("tolerence").value);
    var crop = new Crop(name, season, minTemp, maxTemp, lowYield, tolerence);
    var cropList = localStorage.getItem('cropList');
    if(cropList === null) {
        cropList = [];
    } else {
        cropList = JSON.parse(cropList);
    }
    cropList.push(crop);
    localStorage.setItem('cropList', JSON.stringify(cropList));
    alert('Crop Saved Successfully');

    // returning back to the index page
    window.location.replace("index.html");

}




