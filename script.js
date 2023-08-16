// Set the trees variable as an empty array 
let trees = [];
let borderPercent = .4;
let destroyToggle = false;
let clickedTrees = [];
let opacityTrees = [];
let totalCount = 0;
// let DestroyButton = document.getElementbyId("destroy");

//Upon pressing, the destroy button should change from red to dark red
//Rn tho, it's not working
//

// Load up images
function preload() {
  treeImg = loadImage('./treeImage.webp')
  brokenTreeImg = loadImage('./splitTree.png')

  grass = loadImage('./Grass.jpg')
}

// setup
function setup() {
  // Canvas w green background (responsive)
  createCanvas(windowWidth, windowHeight * .75);
  background(141, 212, 85);

  // getting buttons from page
  plantButton = document.getElementById("plant")
  destroyButton = document.getElementById("destroy")

   // if (destroyToggle = true){
   //    DestroyButton.style.background-color = "rgb(115, 0, 0)";
   //  }
     
  // On click of plantBtn, clear trees currently and add them
  plantButton.onclick = function() { // opacity
    background(141, 212, 85);
    trees = []; // clearing trees
    clickedTrees = []; // clearing the clicked trees
    opacityTrees = []; // clearing opacity trees
    addTrees()
  }

  // when someone clicks the destroy button, give them the option to destroy trees
  destroyButton.onclick = function() {
    destroyToggle = !destroyToggle;
    console.log("destroy trees")
  }

  if(clickedTrees.length > 0) {
      setInterval(function() {
      for(let i = 0; i<trees.length; i++) {
        if(clickedTrees.indexOf(i) >= 0) {
          opacityTrees[i] =  opacityTrees[i] - 20;
        }
      }
      regenerateTrees();
        console.log(" is occuring" + " clicked trees length: " + clickedTrees.length)
    }, 100);
    

  }
  
}


// (Constantly updating btw)
function draw() {

  // Changing text whilst it's being updated  
  let carbonFootprint = document.getElementById("footprint")  
  carbonFootprint.innerText = "Carbon Footprint: " + totalCount + " pounds";

  /*
  Update: 
  First: opacity trees should have the opacity of every tree 
  When we notice that there is a clicked tree, use a setInterval function to update the opacity on it
  Rather than having the opacity change in the draw function, have it change in the setup function where there is a setInterval function that will run and change opacity every x seconds
  */
  
  
    // Removing all of the trees that are meant to fade out (once they've faded out)
    // if(opacityTrees[i].opacity <= 0) { // the opacity is lower than 255
    //   opacityTrees.splice(i, 1);
    //   continue;
    // }
  
}  



function mousePressed() {
 if (mouseButton === LEFT && mouseY >= 150 && mouseY <= height && destroyToggle) {
    console.log("x: " + mouseX + " y: " + mouseY); 

    for(let i = 0; i<trees.length; i++) { // iterating through the tree array
      // If you're actually on a tree
      if((mouseX-75 < trees[i].x && trees[i].x < mouseX+75) && 
         (mouseY-5 < (trees[i].y + (windowHeight * .08)) && (trees[i].y + (windowHeight * .08)) < mouseY+75)) {

        if(clickedTrees.indexOf(i) < 0) {
          clickedTrees.push(i); // pushing the clicked  index
          // opacityTrees.push({ind: i, opacity: 255});  // pushing opacity
          // console.log("mouseX: " + mouseX + " treeX: " + trees[i].x)\
          totalCount += Math.floor(random(38)) + 20;  
        }
      }
    }  
   console.log(clickedTrees)
   regenerateTrees();
  }

  // prevent default behavior
  return false;
}
  
// adding trees
function addTrees() {
  console.log("adding trees")
  
  for (let i = 0; i < 15; i++) { // adding random x & y positions as trees

    // adjusting the generation limits
    let x = random(windowWidth - (windowWidth*.1));
    let y = random(windowHeight*.7 - (windowHeight * .22)) + (windowHeight * .08);
    trees.push({ x: x, y: y });
    opacityTrees.push(255);
  }

  // iterating through the tree array and creating the tree images
  for (let i = 0; i < trees.length; i++) { 
    fill(255, 255, 255); 
    // rect(trees[i].x, trees[i].y, 100, 100)
    image(treeImg, trees[i].x, trees[i].y, 100, 100);
    // textSize(14);
    // text("x: " + Math.floor(trees[i].x) + " y: " + Math.floor(trees[i].y), trees[i].x, trees[i].y+(windowHeight * .08));
  }
  console.log(trees)
}

// Recreating broken trees
function regenerateTrees() {
  background(141, 212, 85);
  
  // iterating through the tree array and creating the tree images
  fill(255, 255, 255); 
  for (let i = 0; i < trees.length; i++) { 
    if(clickedTrees.indexOf(i) >= 0) {
      tint(255, opacityTrees[i])
      image(brokenTreeImg, trees[i].x, trees[i].y, 100, 100);
    } else {
      image(treeImg, trees[i].x, trees[i].y, 100, 100);
    }
  }
  // clickedTrees = [];
}


// Function for fading out trees
function fadeOut(i){
  
}



