function openNav(){
    document.getElementById('overlay-nav').style.height = "100%"; 
}
function closeNav(){
    document.getElementById('overlay-nav').style.height = "0%";
}
function imageZoom(imgID, resultID){
    var img, lens, result, cx, cy; 
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    //Create Lens//
    lens = document.createElement("div");
    lens.setAttribute("class", "img-zoom-lens");
    //Insert Lens into HTML//
    img.parentElement.insertBefore(lens, img);
    //Calculate the ratio between the result div and lens div//
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    //Set background properties for the result div//
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    //Execute a function when someone moves the cursor over the image, or the lens//
    lens.addEventListener("mouseover", moveLens);
    img.addEventListener("mouseover", moveLens);
    //Include responses for touch screens//
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    //Start moveLens function//
    function moveLens(e){
        var pos, x, y;
        //Prevent any other actions that may occur when moving over the image (such as hover effects)//
        e.preventDefault();
        //Get the cursors x and y position//
        pos = getCursorPos(e);
        //Calculate the position of the lens//
        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);
        //Prevent the lens from being positioned outside the image//
        if (x > (img.width - lens.offsetWidth)){ x = img.width - lens.offsetWidth;}
        if (x < 0){ x = 0;}
        if (y > (img.height - lens.offsetHeight)){ y = img.height - lens.offsetHeight;}
        if (y < 0){ y = 0;}
        //Set the position of the lens//
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        //Display what the lens sees in the result div//
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
        console.log("I am running");
        }
        function getCursorPos(e){
            var a, x = 0, y = 0;
            e = e || window.event;
            //Get the x and y positions of the image//
            a = img.getBoundingClientRect();
            //Calculate the cursor's x and y coordinates, relative to the image//
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            //Consider any page scrolling//
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            console.log("I am running");
            return {x : x, y : y};
        }
}