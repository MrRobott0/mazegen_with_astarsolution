function Cell(i,j,grid){
	this.i=i;
	this.j=j;
	this.grid = grid;


    // f, g, and h values for A*
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.vh = 0; //visual heuristic for prioritising path options

    // Neighbors
    this.neighbors = undefined;
//    this.neighboringWalls = undefined;

				//top,  right, bottom, left
	this.walls = [true, true, true, true];
	this.visited = false;

	this.checkNeighbors = function(){
		 var neighbors = [];

		 var top    = this.grid[index(i  , j-1)];
		 var right  = this.grid[index(i+1, j  )];
		 var bottom = this.grid[index(i  , j+1)];
		 var left   = this.grid[index(i-1, j  )];

		 if (top && !top.visited){
		 	neighbors.push(top);
		 }
		 if (right && !right.visited){
		 	neighbors.push(right);
		 }
		 if (bottom && !bottom.visited){
		 	neighbors.push(bottom);
		 }
		 if (left && !left.visited){
		 	neighbors.push(left);
		 }

		 if (neighbors.length > 0){
		 	var r = floor(random(0, neighbors.length));
		 	return neighbors[r];
		 } else {
		 	return undefined; 
		 }
	}

	this.getNeighbors = function() {
		if (!this.neighbors) {
            this.populateNeighbors();
        }
        return this.neighbors;
    }

    //populate neighbor move and neighbor wall arrays
    this.populateNeighbors = function() {
        this.neighbors = [];
 //       this.neighboringWalls = [];

        if (!this.walls[0]){
        	this.neighbors.push(this.grid[index(i  , j-1)]);
        }
        if (!this.walls[1]){
        	this.neighbors.push(this.grid[index(i+1, j  )]);
        }
        if (!this.walls[2]){
        	this.neighbors.push(this.grid[index(i  , j+1)]);
        }
        if (!this.walls[3]){
        	this.neighbors.push(this.grid[index(i-1, j  )]);
        }     
    }


	this.highlight = function(){
		var x = this.i*w;
		var y = this.j*w;
		noStroke();
		fill(0, 255, 0, 200);
		rect(x, y, w, w);
	}

	this.show = function(){
		var x = this.i*w;
		var y = this.j*w;
		stroke(255);

		if (this.walls[0]) //top
			line(x  , y  , x+w, y  );
		if (this.walls[1]) //right
			line(x+w, y  , x+w, y+w);
		if (this.walls[2]) //bottom
			line(x+w, y+w, x  , y+w);
		if (this.walls[3]) //left
			line(x  , y+w, x  , y  );

		if (this.visited){
			noStroke();
			fill(0, 0, 255, 50);
			rect(x, y, w, w);
		}
	}

	this.show2 = function(color){
		var x = this.i*w;
		var y = this.j*w;

		fill(color);
        noStroke();
        rect(x, y, w, w);
	}
}

function index(i, j){
	if (i<0 || j<0 || i>cols-1 || j>rows-1){
		return -1;
	}

	return i+j*cols;
}