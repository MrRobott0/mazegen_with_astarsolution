var cols = 50; 
var rows = 45;
var w = 20;
var canvasW = 1000;
var canvasH = 1000;

var uiElements = [];
var gamemap;
var mapGraphic = null;
var pathfinder;




function Button(label, x, y, w, h, callback) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.callback = callback;

    this.show = function() {
        stroke(0);
        strokeWeight(5);
        noFill();
        rect(this.x, this.y, this.w, this.h);
        fill(0);
        noStroke();
        text(this.label, this.x + 5, this.y + 5, this.w - 10, this.h - 10);
    }

    this.mouseClick = function(x, y) {
        if (this.callback != null &&
            x > this.x && x <= this.x + this.w &&
            y > this.y && y <= this.y + this.h) {
            this.callback(this);
        }
    }
}

function doGUI() {
    for (var i = 0; i < uiElements.length; i++) {
        uiElements[i].show();
    }
}

function restart(button) {
//    logTimings();
//    clearTimings();
    initaliseSearchExample(cols, rows);
//    pauseUnpause(true);
}

function mouseClicked() {
    for (var i = 0; i < uiElements.length; i++) {
        uiElements[i].mouseClick(mouseX, mouseY);
    }

}

function initaliseSearchExample(rows, cols) {
    mapGraphic = null;
    gamemap = new MapFactory(cols, rows);
    start = gamemap.grid[0];
    end = gamemap.grid[(cols * rows) - 1];
    gamemap.finished_map=false;
    pathfinder = new AStarPathFinder(gamemap, start, end, false);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setup() {


   if (getURL().toLowerCase().indexOf("fullscreen") === -1) {
       createCanvas(canvasH, canvasW);
   } else {
       var sz = min(windowWidth, windowHeight);
       createCanvas(sz, sz);
   }

   console.log('A*');

   initaliseSearchExample(cols, rows);


   uiElements.push(new Button("RESTART", 300, 935, 70, 30, restart));

}

function searchStep() {

        var result = pathfinder.step();

        switch (result) {
            case -1:
                status = "No Solution";
                //logTimings();
                //pauseUnpause(true);
                break;
            case 1:
                status = "Goal Reached!";
                //logTimings();
                //pauseUnpause(true);
                break;
            case 0:
                status = "Still Searching"
                break;
        }
    
}

function draw() {

	background(100);
	doGUI();
	if (gamemap.finished_map){
		searchStep();
		text("Search status - " + status, 400, 950);
	}

	gamemap.drawmap();

    for (var i = 0; i < pathfinder.closedSet.length; i++) {
//        pathfinder.closedSet[i].show2(color(39, 245, 156, 50));
        pathfinder.closedSet[i].show2(color(255, 0, 156, 50));

        //pathfinder.closedSet[i].show2(color(0, 255, 255, 255));

    }

    var infoNode = null;

    for (var i = 0; i < pathfinder.openSet.length; i++) {
        var node = pathfinder.openSet[i];
 //       node.show2(color(39, 245, 156, 50));
        node.show2(color(0, 255, 0, 200));

        if (mouseX > node.x && mouseX < node.x + node.width &&
            mouseY > node.y && mouseY < node.y + node.height) {
            infoNode = node;
        }
    }

    fill(0);

    var path = calcPath(pathfinder.lastCheckedNode);
    drawPath(path);

}

function calcPath(endNode) {
//    startTime();
    // Find the path by working backwards
    path = [];
    var temp = endNode;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }
//    recordTime("Calc Path");
    return path
}


function drawPath(path) {
    // Drawing path as continuous line
    noFill();
    stroke(255, 0, 200);
    strokeWeight(gamemap.w / gamemap.cols / 2);
    beginShape();
    for (var i = 0; i < path.length; i++) {
 //       vertex(path[i].x + path[i].width / 2, path[i].y + path[i].height / 2);
        vertex(path[i].i * w + w / 2, path[i].j * w + w / 2);

    }
    endShape();
}