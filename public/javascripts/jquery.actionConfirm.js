//this class simply handles actions that should not fire without a firm commit by the user

$.fn.actionConfirm = function() {
    
    $(this).submit(function(event){
	   
	    event.preventDefault();

		var actionConfirm=confirm("Are U Sure U Want To?");
		if (actionConfirm===true){ $(this).unbind('submit').submit();}
		 
	 });


};