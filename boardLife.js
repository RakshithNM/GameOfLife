var gameOfLife = {

	boardState = [], //All the cells on the board are dead

	init : function(){
		var self = this; //making this available to the sub function within setInterval
		window.setInterval(function(){
			self.invokeGeneration(); //call the invokeGenearation method every 66ms
		},66);
	},
	invokeGeneration: function() { //method defined to 

		var nextBoardState = this.boardState; //initially empty or no life or all false, assigned each time on call

		for(var i = 0; i < this.rows; i++) { //move through the rows of the grid

			for(var j = 0; j < this.cols; j++) { //move through the columns of the grid

				var countNeighbours = this.noOfAliveNeighbours(i,j); //call method to count no, of alive neighbours for a particular cell and return the count

				if (countNeighbours == 0 || countNeighbours == 1 || countNeighbours > 3) { // check if (count of alive neighbours) = 0,1 for underpopulated generation and (count of alive neighbours) > 3 for overPopulation 
					nextBoardState[i][j] = false; // kill the cell
				}
				else if (countNeighbours ==3) {  // check if (count of alive neighbours) = 3
					nextBoardState[i][j] = true;  // give life to the cell
				}
					
			}
		}
	},
	noOfAliveNeighbours: function(i,j){ //method to count the no of alive neighbours in the particular generation
		var k,l; // variables to traverse through the neighbours of a cell
		var count = 0; // variable to return the count of the number of variables

		for(k =-1; k<=1;k++) //iterating through the rows of the neighbours
			for(l=-1; l<=1;l++) //iterating through the columns of the neighbours
				if(k || l) //perform the count only if either of k or l is 1 or when both are not 0, not pointing to the cell
					if(this.boardState[this.circularX(i,k)][this.circularY(i,k)]) // making the index of the two dimensional array toroidal when the cell is at the boundary, stiching together the ends of the grid from right to left and top to bottom
					count++; // increment the count 
				return count; // 
	},
	circularX: function stitchX(m,n){ // method to stitch the right and left boundaries of the grid together
		m += n; //iterate through the neighbours
		while (m < 0) m += this.cols; //if the cell index goes outside the extreme left, the cell near the extreme right is referenced as neighbour
		while (m >= this.cols) m-= this.cols; //if the cell index goes outside the extreme right, the cell near the extreme left is referenced as neighbour
		return m; //return the neighbour index
	},
	circularY: function stitchY(m,n){ //method to stitch the top and bottom boundaries of the grid together
		m += n; //iterate through the neighbours
		while(m < 0) m += this.rows; //if the cell index goes outside the extreme top, the cell near the extreme bottom is referenced as neighbour
		while(m > this.rows) m -= this.rows; //if the cell index goes outside the extreme bottom, the cell near the extreme top is referenced as neighbour
		return m; //return the neighbour index
	},
		
};
