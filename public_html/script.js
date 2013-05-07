
// once the document is loaded, the
// getElementById("jsTestButton") will return the actual button
// then we set the "click" handler to it.
window.onload = function () {
    document.getElementById("jsTestButton").onclick = doJsTests;    
    
};


function doJsTests(){
    var i;
    //good idea to store the DOM object reference in a local variable
    var aside = document.getElementById("imagine");
    //shows how different style properties can be changed
    aside.style.border = "1px solid red";
    aside.style.backgroundColor = "yellow";
    
    
    //using getElementsByTagName and looping through them
    var alllinks = document.getElementsByTagName("A");
    for (i = 0; i < alllinks.length; i = i + 1 ) {
        alllinks[i].style.color = "#00FF00";
    }
    
    //getElementsByTagName returns a list, hence [0] to get
    //first item 
    var asideHeading = aside.getElementsByTagName("H2")[0];
    //changing the text of some item
    asideHeading.childNodes[0].nodeValue = "Never!";
    
    //accessing the text values on different browsers
    //alert(asideHeading.innerText || asideHeading.textContent);
    
    
    //querySelectorAll works in modern browsers
    var theSteps = document.querySelectorAll(".steps ol li");
    for (i = 0; i < theSteps.length; i = i+1) {
        //theSteps[i].style.backgroundColor = "yellow";
        
        //changing className is more effective than setting 
        //individual style properties
        theSteps[i].className = "something-important";
    }

    
    var allImages = document.getElementsByTagName("IMG");
    for (i = 0; i < allImages.length; i = i + 1) {
        //changing the "src" forces the browser to load a new
        //image from the web
        allImages[i].src = "http://images.sodahead.com/polls/003592453/314558598_Lol_94249156205_xlarge.jpeg";
        
        //this is how event handlers can be bound dynamically
        allImages[i].onclick = imageClicked;
    }
    
    //creating a new hyperlink
    var newLink = document.createElement("A");
    newLink.href = "http://giggle.com";
    
    //the image will be put inside the link
    var newImage = document.createElement("IMG");
    newImage.src = "http://cdnbakmi.kaltura.com/p/695492/sp/69549200/thumbnail/entry_id/0_9bh61zzi/width/634/height/484";
    newImage.alt = "haha lol";
    newImage.title = "haha lol";
    
    newLink.appendChild(newImage);
    
    //and here we add the link to an existing DOM object
    aside.appendChild(newLink);
    
    //way of constructing more complex DOM structures
    var anotherNewLink = document.createElement("A");
    anotherNewLink.innerHTML = "<img src='http://ia.media-imdb.com/images/M/MV5BMTA0MjI5ODA3MjReQTJeQWpwZ15BbWU3MDI1NTE3Njc@._V1_SY317_CR1,0,214,317_.jpg'/> Some text";
    aside.appendChild(anotherNewLink);
}


function imageClicked(event) {
     alert("You just clicked an image: " + event.target.src );
}
