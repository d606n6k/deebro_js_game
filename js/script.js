// ----------ITEMS ------->
myarray = ["strength", "regen", "venom", "ice", "lightning"];
//XP VARIABLE
var xp = 0;

// ----------AUDIO-------->
// old audio implementation - does not work after a 2018 Chrome Update 66
// myAudio = new Audio("assets/music.wav");
// myAudio.addEventListener(
//   "ended",
//   function () {
//     this.currentTime = 0;
//     this.play();
//   },
//   false
// );
// myAudio.play();

// New audio implementation - Aug 2022
var myAudio = document.getElementById("myAudio");
myAudio.volume = 0.15;
var isPlaying = false;

function togglePlay() {
  isPlaying ? myAudio.pause() : myAudio.play();
};

myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = false;
};

// var audio = new SeamlessLoop();

// function SeamlessLoop(){
// $('#audio').loop.addUri('../assets/music.wav', 1, 'sound1');
// }

// SeamlessLoop();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} //end getRandomInt()

//<-----------------Hero movement------------------>

var dir = {
  up: false,
  down: false,
  left: false,
  right: false,
};

//while we can move more than 1 direction at a time, we can only face one direction at a time --
var facing = {
  up: false,
  down: false,
  left: true,
  right: false,
};

var facingleft = true;
var facingup = false;

var speed = 6;
var gamePlaying = false;

//now we need a function which completes 1 frame of animation
// if dir.up and dir.left are true, I would add speed to those directions
function movement() {
  //check all directions and add/subtract to top and left
  var newtop = 0;
  var newleft = 0;

  if (dir.up == true) {
    newtop -= speed;
  }
  if (dir.down == true) {
    newtop += speed;
  }
  if (dir.left == true) {
    newleft -= speed;
  }
  if (dir.right == true) {
    newleft += speed;
  }

  //add newtop and current top together
  var herotop = $("#hero").position().top;
  var bheight = $("#gamestage").height();

  if (herotop + newtop < 0 || herotop + newtop + 50 > bheight) {
    //herotop+newleft cant be less than 0 or greater than browserheight
    newtop = 0; //dont move in up/down direction
  }

  //add newtop and current top together
  var heroleft = $("#hero").position().left;
  var bwidth = $("#gamestage").width();

  if (heroleft + newleft < 0 || heroleft + newleft + 50 > bwidth) {
    //herotop+newleft cant be less than 0 or greater than browserheight
    newleft = 0; //dont move in up/down direction
  }

  $("#hero").css({ top: "+=" + newtop, left: "+=" + newleft });

  // var heroTop = $('#hero').top;
  // var heroLeft = $('#hero').left;
  // var enemyTop = $('.enemy').top;
  // var enemyLeft = $('.enemy').left;

  // if(heroTop == enemyTop){
  //     $('#healthamount').width(width - 10);
  // }
} //end movement()
startgame(); //starts the game, switch to a button later

$(document).keydown(function (e) {
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

  switch (e.which) {
    case 87:
    case 38:
      //code goes here
      dir.up = true;
      facingup = true;
      //object parameters
      facing = { up: true, down: false, left: false, right: false };
      break;
    case 83:
    case 40:
      dir.down = true;
      facingup = false;
      //object parameters
      facing = { up: false, down: true, left: false, right: false };
      break;
    case 65:
    case 37:
      dir.left = true;
      facingleft = true;
      //object parameters
      facing = { up: false, down: false, left: true, right: false };
      break;
    case 68:
    case 39:
      dir.right = true;
      facingleft = false;
      //object parameters
      facing = { up: false, down: false, left: false, right: true };
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

$(document).keyup(function (e) {
  // console.log(e.which); //which key was pressed

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

  switch (e.which) {
    // S key - UP
    case 87:
      dir.up = false;
      break;
    //38 up UP
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

  itempickup($("#hero"));
});
function attack1() {
  var hitbox = $("<div>").addClass("hitbox");

  //get character location
  var playertop = $("#hero").position().top;
  var playerleft = $("#hero").position().left;
  var playerwidth = $("#hero").width();
  var playerheight = $("#hero").height();
  var playerface = "";

  //iterate which is true:
  $.each($(facing), function () {
    $.each(this, function (name, value) {
      // var prop = name;
      if (value) {
        playerface = name;
      }
      //    console.log(name + '=' + value);
      //   console.log('playerface', playerface);
    });
  });
  var hoffset;
  var voffset;

  if (playerface == "left") {
    hoffset = -playerwidth;
    voffset = 5;
  }

  if (playerface == "right") {
    hoffset = playerwidth;
    voffset = 5;
  }
  if (playerface == "up") {
    voffset = -40; //hit box height
    hoffset = 0;
  }
  if (playerface == "down") {
    voffset = playerheight;
    hoffset = 0;
  }
  //ternary operator
  //var something = (condition) ? 'value if true' : 'value if false';

  //80x80 is the size of ****HITBOX*****

  //position it
  hitbox.css({
    top: playertop + voffset,
    left: playerleft + hoffset,
    width: 34,
    height: 34,
  });

  //add it to the page
  $("#gamestage").append(hitbox);

  removeattack(hitbox); //sends hitbox to removeattack

  //check hit for this attack
  attackhit(hitbox);
} //end attack1()

function attackhit(hitbox) {
  //check hitbox against all .enemy
  $(".enemy").each(function () {
    var currentenemy = $(this);

    if (recthit(hitbox, currentenemy)) {
      var itemposY = currentenemy.position().top;
      var itemposX = currentenemy.position().left;
      currentenemy.remove();
      xp = xp + getRandomInt(3, 7);
      $("#xpcount").css({ width: xp + "%" });
      if (xp > 99) {
        gameover();
      } else {
        enemy();
      } //end else

      function gameover() {
        clearTimeout(createenemy);
        clearInterval(movehero);
        clearInterval(ehInterval);
        gamePlaying = false;
        $(".enemy").remove();
        $(".item").hide();
        $("#gamestage").html("<h1 id=youwin>" + "YOU WIN!" + "</h1>");
      } //end gameover()

      var itemspawn = $("<div>")
        .addClass(myarray[getRandomInt(0, 4)])
        .addClass("item");
      console.log(itemspawn.attr("class"));
      itemspawn.css({
        top: itemposY,
        left: itemposX,
      });
      $("#gamestage").append(itemspawn);
    }
  });
} //end attackhit()

function removeattack(hitbox) {
  setTimeout(function () {
    hitbox.remove(); //removes from page
  }, 250);
} //end removeattack()

function recthit(rectone, recttwo) {
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

  if (
    r1y + r1h < r2y ||
    r1y > r2y + r2h ||
    r1x > r2x + r2w ||
    r1x + r1w < r2x
  ) {
    //      console.log('recthit-false')
    return false;
  } else {
    //   console.log('recthit-true')
    return true;
  }
} //end function

function itempickup(hero) {
  //check hitbox against all .enemy
  $(".item").each(function () {
    var currentitem = $(this);

    if (recthit(hero, currentitem)) {
      if (currentitem.hasClass("strength")) {
        //THIS IS WHERE YOU WILL PUT IN THE STRENGTH BUFF EFFECT CODE
      }
      // var itemclass = currentitem.attr('class');

      // itemclass = itemclass.replace(' item', '');

      currentitem.remove();
    }
  });
} //end attackhit()


//---------------start game---------------------------
function startgame() {
  gamePlaying = true;
  movehero = setInterval(movement, 1000 / 30);
  enemy();
} //end startgame()

// spawn enemy

// spawn enemy at random point on gamefield
var enemyspawn = $("<div>").addClass("enemy");

var totalenemies = 4;
var createenemy; //name of timeout

function enemy() {
  if (gamePlaying) {
    var enemyspawn = $("<div>").addClass("enemy");

    $("#gamestage").append(enemyspawn);

    animateenemy(enemyspawn);

    if ($(".enemy").length < 4) {
      createenemy = setTimeout(enemy, 2500);
    }
  } //end if gamePlaying = true;
} //end enemy()

function animateenemy(enemy) {
  var newtop = getRandomInt(0, 815 - 100); //between 0 and browser height
  var newleft = getRandomInt(0, 1000 - 80); //between 0 and browser width

  var speed = getRandomInt(500, 4000); //random number between 500-4000

  //apply the new top and left using an animate
  enemy.animate(
    {
      top: newtop,
      left: newleft,
    },
    speed,
    function () {
      //animation callback (animation complete)
      animateenemy($(this));
    }
  );
} //end animateenemy()

// function enemymove(e){
//          		var truex = e.pageX - $('#gamestage').offset().left;
// 		var truey = e.pageY - $('#gamestage').offset().top;
//          		$('.enemy').animate({top: truex, left: truey}, 1000, 'linear');
// };//enemymove()

// enemymove();

animateDiv();

function makeNewPosition() {
  // Get viewport dimensions (remove the dimension of the div)
  var h = $("#gamestage").height() - 2;
  var w = $("#gamestage").width() - 2;

  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);

  return [nh, nw];
}

function animateDiv() {
  var newq = makeNewPosition();
  $(".enemy").animate(
    {
      top: newq[0],
      left: newq[1],
    },
    4750,
    "linear",
    function () {
      animateDiv();
    }
  );
}

var health = 10;

function enemyhit() {
  $(".enemy").each(function () {
    if (recthit($(this), $("#hero"))) {
      health--;
      //console.log(health);
      var divwidth = health * 10;
      //console.log(divwidth);
      $("#healthamount").css({ width: health * 10 + "%" });

      if (health < 1) {
        youdied();
      }
    } //end if
  });
}

function youdied() {
  clearTimeout(createenemy);
  clearInterval(movehero);
  clearInterval(ehInterval);
  gamePlaying = true;
  $(".enemy").remove();
  $(".item").hide();
  $("#gamestage").html(
    "<h1 id=youdied>" + "Ummm, You Died..."+"<a href=index.html>"+"Try Again?"+"</a>" + "</h1>"
  );
  // setTimeout( function(){
  //     youdied
  // },1000);
  startgame();
}

ehInterval = setInterval(enemyhit, 1000); //end setInterval

//this code runs a transit.js Scaling effect. Conflicting issues with random animation around $gamestage
// $('.enemy').hover(function(){
// 	$('.enemy').transition({scale: 2.2});
// }),function(){
// 	$('.enemy').transition({scale: 1});
// }

// SPRITELY

// put this into a function() to throw into an if statement
// $('.explosion').sprite({fps: 15, no_of_frames: 8}, 3000);
