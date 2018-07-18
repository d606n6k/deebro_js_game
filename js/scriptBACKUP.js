
		startgame();//starts the game, switch to a button later


			//start game
			function startgame(){

				//this function will setup the game to start
				
				//setup click to move controls for #player
				$('#gamestage').click(function(e){

					//all content related to what happens when you click 
					var truex = e.pageX - $(this).offset().left; 
					var truey = e.pageY- $(this).offset().top;

					$('#hero').stop().animate({
						top: truey,
						left: truex
					}, 1000, 'linear');

					//add a little dot to show where the character is moving to
					var targetdot = $('<div>').addClass('targetdot');
					
					targetdot.css({
						top: truey,
						left: truex
					});


					//add to page
					$('#gamestage').append(targetdot);
					//fade it out after a short duration
					
					targetdot.fadeOut(700, function(){
						$(this).remove();
					});//end fadeOut callback function
				});//end click on gamestage function

			}//end startgame()

		// spawn enemy

		// spawn enemy at random point on gamefield
		var enemyspawn = $('<div>').addClass('enemy');


			function enemy(){
			var enemyspawn = $('<div>').addClass('enemy');

			$('#gamestage').append(enemyspawn);
			



			};//end enemy()
			
			enemy();

			
			// function enemymove(e){
   //          		var truex = e.pageX - $('#gamestage').offset().left; 
			// 		var truey = e.pageY - $('#gamestage').offset().top;
   //          		$('.enemy').animate({top: truex, left: truey}, 1000, 'linear');          			
			// };//enemymove()
            
            // enemymove();

        
    			animateDiv();
    	

			function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    		var h = $('#gamestage').height() - 2;
    		var w = $('#gamestage').width() - 2;
    
    		var nh = Math.floor(Math.random() * h);
    		var nw = Math.floor(Math.random() * w);
    
    		return [nh,nw];    
    
		}

			function animateDiv(){
    			var newq = makeNewPosition();
    			$('.enemy').animate({ 
    				top: newq[0], 
    				left: newq[1] },4750, 'linear', function(){
    			  animateDiv();        
    			});
    
		};

            		



	//BUTTON mouseenter(); and mouseleave();
		//cool contrasting opacity effect

		$(document).ready(function(){
			$('.enemy').mouseenter(function(){
				$('.enemy').fadeTo('fast', 0.5);
			}).mouseleave(function(){
				$('.enemy').fadeTo('fast', 1);

			});
		});


//this code runs a transit.js Scaling effect. Conflicting issues with random animation around $gamestage
		// $('.enemy').hover(function(){
		// 	$('.enemy').transition({scale: 2.2});
		// }),function(){
		// 	$('.enemy').transition({scale: 1});
		// }

// SPRITELY 

		// put this into a function() to throw into an if statement
		$('.explosion').sprite({fps: 15, no_of_frames: 8}, 3000);