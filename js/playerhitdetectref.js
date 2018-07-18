

    // if you need the file:
    // nickstark.me/day7_freemove.html
    // http://nickstark.me/recthit.html

    
    var dir = {
        up: false,
        down: false,
        left: false,
        right: false
    }

    //while we can move more than 1 direction at a time, we can only face one direction at a time --
    var facing = {
        up:false,
        down:false,
        left:true,
        right:false
    }

    var facingleft = true;
    var facingup = false;

    //this is an object which hold a property:value set of items
    //items can be accessed like this:
    // dir.up 
    // dir.left
    
    //keep track of speed
    var speed = 6;
    
    
    //now we need a function which completes 1 frame of animation
        // if dir.up and dir.left are true, I would add speed to those directions
    function movement(){
        
        //check all directions and add/subtract to top and left
        var newtop = 0;
        var newleft = 0;
        
        if( dir.up == true ){
            newtop -= speed; 
        }
        if( dir.down == true ){
            newtop += speed; 
        }
        if( dir.left == true ){
            newleft -= speed; 
        }
        if( dir.right == true ){
            newleft += speed; 
        }
        
        //add newtop and current top together
        var shiptop = $('#ship').position().top;
        var bheight = $(window).height();
        
        if( shiptop + newtop < 0 || shiptop + newtop + 50 > bheight ){
            //shiptop+newleft cant be less than 0 or greater than browserheight
            newtop = 0; //dont move in up/down direction
        }
        
        //add newtop and current top together
        var shipleft = $('#ship').position().left;
        var bwidth = $(window).width();
        
        if( shipleft + newleft < 0 || shipleft + newleft + 50 > bwidth ){
            //shiptop+newleft cant be less than 0 or greater than browserheight
            newleft = 0; //dont move in up/down direction
        }
        
        $('#ship').css({top: '+='+newtop, left: '+='+newleft});
        
        
    } //end movement()
    
    
    //run the movement function at a regular interval (framerate)
    setInterval( movement, 1000/30 );
    
    
    //setup keyboard to set directions
    $(document).keydown(function(e){
        
     //   console.log(e.which); //which key was pressed
        
        //38 up
        //40 down
        //37 left
        //39 right
        //87 w
        //65 a
        //83 s
        //68 d
        //13 enter
        //222 is the '/"
        
        switch(e.which){
            case 87:
            case 38:
                //code goes here
                dir.up = true;
                facingup =true;
                //object parameters
                facing = {up:true,down:false,left:false,right:false};
            break;
            case 83:
            case 40:
                dir.down = true;
                facingup = false;
                //object parameters
                facing = {up:false,down:true,left:false,right:false};
            break;
            case 65:
            case 37:
                dir.left = true;
                facingleft = true;
                //object parameters
                facing = {up:false,down:false,left:true,right:false};
            break;
            case 68:
            case 39:
                dir.right = true;
                facingleft = false;
                //object parameters
                facing = {up:false,down:false,left:false,right:true}
            break;
            case 16:
                speed = 10;
            break;
            case 13:
            case 32:
                attack1();
            break;
            case 222:
                //attack2();
            break;
        }
            
    });
    
    $(document).keyup(function(e){
        
       // console.log(e.which); //which key was pressed
        
        //38 up
        //40 down
        //37 left
        //39 right
        
        switch(e.which){
            case 87:
            case 38:
                //code goes here
                dir.up = false;
            break;
            case 83:
            case 40:
                dir.down = false;
            break;
            case 65:
            case 37:
                dir.left = false;
            break;
            case 68:
            case 39:
                dir.right = false;
            break;
            case 16:
                speed = 6;
            break;
        }
    
    });

    
    function attack1(){
        
        var hitbox = $('<div>').addClass('hitbox');
        
        //get character location
        var playertop = $('#ship').position().top;
        var playerleft = $('#ship').position().left;
        var playerwidth = $('#ship').width();
        var playerheight = $('#ship').height();
        var playerface = ''; 

//iterate which is true:
      $.each($(facing), function() {
    $.each(this, function(name, value) {
       // var prop = name; 
        if(value){
            playerface = name;
        }
 //    console.log(name + '=' + value);
 //   console.log('playerface', playerface);
  });
});
        var hoffset;
        var voffset;

        if(playerface == 'left'){
            hoffset = -playerwidth;
            voffset = 0;
        }

        if(playerface == 'right'){
            hoffset = playerwidth;
            voffset = 0;
        }
        if(playerface == 'up'){
            voffset = -80; //hit box height
            hoffset = 0;
        }
        if(playerface == 'down'){
            voffset = playerheight;
            hoffset = 0;
        }
    //ternary operator
    //var something = (condition) ? 'value if true' : 'value if false';
        
        var attkhv = (hoffset != 0) ? 200 : 80 ; //attacking horizontally

   //    console.log(dir);
 //      console.log(facingleft, facingup);
 //      console.log(facing);

        //position it
            hitbox.css({
                top:playertop + voffset, 
                left:playerleft + hoffset,
                width:80,
                height:attkhv
            });
        
        //add it to the page
        $('body').append(hitbox);
        
        removeattack(hitbox); //sends hitbox to removeattack
        
        //check hit for this attack
        attackhit(hitbox);
        
    }//end attack1()
    
    function attackhit(hitbox){
        
        //check hitbox against all .enemy
        $('.enemy').each(function(){
        
            var currentenemy = $(this);
            
            if( recthit( hitbox, currentenemy ) ){
                currentenemy.remove();
            }
        
        });
        
        
    }//end attackhit()
    
    
        
    function removeattack(hitbox){
        
        setTimeout(function(){
        
            hitbox.remove(); //removes from page
        
        }, 250);
        
    }//end removeattack()

    
function recthit(rectone, recttwo){
    //console.log('recthit called');
    var r1 = $(rectone);
    var r2 = $(recttwo);
    
    var r1x = r1.offset().left;
    var r1w = r1.width();
    var r1y = r1.offset().top;
    var r1h = r1.height();
    
    var r2x = r2.offset().left;
    var r2w = r2.width();
    var r2y = r2.offset().top;
    var r2h = r2.height();
    
    if( r1y+r1h < r2y ||
        r1y > r2y+r2h ||
        r1x > r2x+r2w ||
        r1x+r1w < r2x ){
  //      console.log('recthit-false')
        return false;
    }else{
   //   console.log('recthit-true')
        return true;   
    }
    
}//end function 

