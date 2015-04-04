var getDomElement = function(str) {
    if($("#"+str).length)
      return $("#"+str);
    $("body").append('<div class="finger" id='+str+' style="width: 20px; height: 20px; position: absolute; background-color: rgb('+[Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)].join(",")+'); "></div>');
    return $("#"+str);
  }

  var difference = function(p1,p2) {
    return Math.sqrt(Math.pow(p1[0]-p2[0],2) + Math.pow(p1[1]-p2[1],2) + Math.pow(p1[2]-p2[2],2));
  }

  var timer = Date.now();
  var prePlace = [0,0,0];
  var isPrimed = false;

  Leap.loop(function(frame) {
    $(".finger").hide();
    frame.hands.forEach(function(hand, indexH) {
      var $hand = getDomElement("hand"+indexH);
      if(isPrimed) {
        if(hand.screenPosition()[0] - prePlace[0] > 10) {
          console.log("Action 1");
          isPrimed = false;
        } else if(hand.screenPosition()[0] - prePlace[0] < -10) {
          console.log("Action 2");
          isPrimed = false;
        }
        timer = Date.now();
      } else if(difference(prePlace, hand.screenPosition()) < 1) {
        if(Date.now() - timer > 500) {
          isPrimed = true;
          console.log("Primed!");
        }
      } else {
        timer = Date.now();
      }
      //console.log(difference(prePlace, hand.screenPosition()))
      prePlace = hand.screenPosition();
      $hand.show();
      //if still
        // 0
      $hand.css("left", hand.screenPosition()[0] + "px");
      $hand.css("top", hand.screenPosition()[1] + "px");
      hand.fingers.forEach(function(fin, indexF) {
        var $fin = getDomElement("finger"+indexH+indexF);
        $fin.show();
          $fin.css("left", fin.tipPosition[0] + hand.screenPosition()[0] + "px");
          $fin.css("top", 300 - fin.tipPosition[1] + "px");
      });
    });

  }).use('screenPosition', {scale: 0.25});
