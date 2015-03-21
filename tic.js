
$(function() {

  var ref = new Firebase('https://tic239023.firebaseio.com');
  var boardref = ref.child('board');
  var stateref = ref.child('state');

  stateref.once('value', function(snapshot){
  	message = snapshot.val();
  	localStorage.turn = message.turn;
  });
  
var width = $('.box').width();
	var height = width

	$('#startover').click(function(){
		startover();
	});

	$('.box').height(height);
	$('.box').css('line-height',height + "px");


	$('.box').click(function(){

		if ($(this).text() != ""){
		  return;
	} else{
	  coord=this.id;
	  symbol = localStorage.turn;
	  console.log("symbol"+localStorage.turn);
	 	var cur_pos = {};
		cur_pos[coord] = symbol;
		boardref.update(cur_pos);
		

	  stateref.once('value', function(snapshot){
	  	var message = snapshot.val();
 		if (message.turn == "X"){
	  	  stateref.update({turn:"O"});
	    } else {
	  	  stateref.update({turn:"X"});

	  }


	  });
	
	}
	});
		

	//	$('#'+coord).text(symbol);





  boardref.on('value', function(snapshot) {
	  var message = snapshot.val();
	  	  draw(message);

  });

  stateref.on('value', function(snapshot){
  	var message = snapshot.val();
  	localStorage.turn = message.turn;
  	
  })

//board is json object specifying where everything is on the board
	function draw(board){
		//console.log(board);
		$('#a1').text(board.a1);
		$('#a2').text(board.a2);
		$('#a3').text(board.a3);
		$('#b1').text(board.b1);
		$('#b2').text(board.b2);
		$('#b3').text(board.b3);
		$('#c1').text(board.c1);
		$('#c2').text(board.c2);
		$('#c3').text(board.c3);
		


	}

	function startover(){

		  board = {a1:"", a2:"", a3:"", b1:"",b2:"", b3:"", c1:"", c2:"", c3:""};
		  boardref.set(board);
		  stateref.update({turn:"X"});
		  localStorage.turn = "X";

	}

});