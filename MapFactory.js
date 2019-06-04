function MapFactory()
{

	this.grid = [];
	this.stack = [];
	this.finished_map = false; 
	this.counter = 0;

	for (var j=0; j<rows; j++){
		for (var i=0; i<cols; i++){
			var cell = new Cell(i, j, this.grid);
			this.grid.push(cell);
   		}
   	}

   	this.current = this.grid[0];


   	this.drawmap = function(){

		for (var i=0; i<this.grid.length; i++){
			this.grid[i].show();
		}


		this.current.visited = true;
		this.current.highlight();

		// STEP 1
		var next = this.current.checkNeighbors();
    	if (next){
    		next.visited = true;

    		//STEP 2
    		this.stack.push(this.current);

    		//STEP 3
    		this.removeWalls(this.current, next);

    		//STEP 4
    		this.current = next;
    	} else if (this.stack.length > 0) {
    		this.current = this.stack.pop();
    	} else if (!this.current.i && !this.current.j  && !this.finished_map){
    		this.finished_map = true;
    		console.log('DONE building map!');
    	}

   	}

   	this.removeWalls = function(a, b){

		var x = a.i - b.i;
		if (x == 1){
			a.walls[3] = false;
			b.walls[1] = false;
		} else if (x == -1) {
			a.walls[1] = false;
			b.walls[3] = false;
		}

		var y = a.j - b.j;
		if (y == 1){
			a.walls[0] = false;
			b.walls[2] = false;
		} else if (y == -1){
			a.walls[2] = false;
			b.walls[0] = false;
		}
	}
}