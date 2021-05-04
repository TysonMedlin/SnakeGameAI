function snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 0;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  
  this.dir = function(x,y) {
   this.xspeed = x;
   this.yspeed = y;
  };
  
  this.death = function() {
    for(var i = 0; i < this.tail.length; i++)
    {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if(d < 1) {
        this.total = 0;
        this.tail = [];
        if(score > highscore) {
           highscore = score; 
        }
        console.log("--DEATH-------------------DEATH-------------------------");
        console.log("--DEATH-------------------DEATH-------------------------");
        console.log("--DEATH-------------------DEATH-------------------------");
        saveFrames('out', 'png', 1, 25, data => {
          print(data);
        });
        score = 0;
      }
    }
  };
  
  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if(d < 1) {
       this.total++;
       return true; 
    } else {
       return false; 
    }
  };
  
  this.ai = function(pos) {
    var up = dist(this.x, this.y-scl, pos.x, pos.y);
    var down = dist(this.x, this.y+scl, pos.x, pos.y);
    var left = dist(this.x-scl, this.y, pos.x, pos.y);
    var right = dist(this.x+scl, this.y, pos.x, pos.y);
    var choice = Math.min(Math.min(up,down), Math.min(left,right));
    var up_possible = true;
    var down_possible = true;
    var left_possible = true;
    var right_possible = true;
    
    
    // this.x = constrain(this.x, 0, width-scl);
     // this.y = constrain(this.y, 0, height-scl);
     
     var d_c_up = dist(this.x, this.y-scl, this.x, -1);
     var d_c_down = dist(this.x, this.y+scl, this.x, height+1);
     var d_c_left = dist(this.x-scl, this.y, -1, this.y);
     var d_c_right = dist(this.x+scl, this.y, width+1, this.y);
    
    console.log("distance to roof " + d_c_up);
    console.log("distance to floor " + d_c_down);
    console.log("distance to left wall " + d_c_left);
    console.log("distance to right wall " + d_c_right);
    
    for(var i = 0; i < this.tail.length; i++)
    {
      var self_pos = this.tail[i];
      //we need to calculate the distance if we move to that spot
      var d_up = dist(this.x, this.y-scl, self_pos.x, self_pos.y);
      var d_down = dist(this.x, this.y+scl, self_pos.x, self_pos.y);
      var d_left = dist(this.x-scl, this.y, self_pos.x, self_pos.y);
      var d_right = dist(this.x+scl, this.y, self_pos.x, self_pos.y);
      
      
      var limit = 1;
      var limit_scl = scl;
       if(d_up < limit || d_c_up < limit_scl){
        up_possible = false; 
        console.log('dont go up');
      } if(d_down < limit || d_c_up < limit_scl) {
        down_possible = false; 
        console.log('dont go down');
      } if(d_left < limit || d_c_up < limit_scl) {
        left_possible = false; 
        console.log('dont go left');
      }if(d_right < limit || d_c_up < limit_scl) {
        right_possible = false; 
        console.log('dont go right');
      }
    }
      if(choice == up && (up_possible == true) ){
        s.dir(0, -1); 
      } 
       else if(choice == up && (up_possible == false) ){
        //take any other possible move
        console.log('Choosen alternative,  preference L and R');
         if( left_possible == true ){
            s.dir(-1, 0);
            console.log('Choosen alternative left');
          } else if( right_possible == true ){
            s.dir(1, 0);
            console.log('Choosen alternative right');
          } else if(down_possible == true) {
            console.log('Choosen alternative down');
            s.dir(0, 1); 
          } else if(up_possible == true) {
            s.dir(0, -1); 
            console.log('Choosen alternative up');
          } 
      }
      if(choice == down && (down_possible == true) ) {
        s.dir(0, 1); 
      }
      else if(choice == down && (down_possible == false) ){
          //take any other possible move
          console.log('Choosen alternative, preference L and R');
         if( left_possible == true ){
            s.dir(-1, 0);
            console.log('Choosen alternative left');
          } else if( right_possible == true ){
            s.dir(1, 0);
            console.log('Choosen alternative right');
          } else if(down_possible == true) {
            console.log('Choosen alternative down');
            s.dir(0, 1); 
          } else if(up_possible == true) {
            s.dir(0, -1); 
            console.log('Choosen alternative up');
          }
      }
      if(choice == left && (left_possible == true) ) {
        s.dir(-1, 0);
      } 
      else if(choice == left && (left_possible == false) ){
          //take any other possible move
          console.log('Choosen alternative, preference D and U');
          if(up_possible == true) {
            s.dir(0, -1); 
            console.log('Choosen alternative up');
          } else if(down_possible == true) {
            console.log('Choosen alternative down');
            s.dir(0, 1); 
          } else if( right_possible == true ){
            s.dir(1, 0);
            console.log('Choosen alternative right');
          } else if( left_possible == true ){
            s.dir(-1, 0);
            console.log('Choosen alternative left');
          }
      }
      if(choice == right && (right_possible == true) ) {
        s.dir(1, 0);
      }
      else if(choice == right && (right_possible == false) ){
        //take any other possible move
        console.log('Choosen alternative, preference D and U');
          //take any other possible move
          console.log('Choosen alternative, preference D and U');
           if(up_possible == true) {
            s.dir(0, -1); 
            console.log('Choosen alternative up');
          } else if(down_possible == true) {
            console.log('Choosen alternative down');
            s.dir(0, 1); 
          } else if( right_possible == true ){
            s.dir(1, 0);
            console.log('Choosen alternative right');
          } else if( left_possible == true ){
            s.dir(-1, 0);
            console.log('Choosen alternative left');
          }
      }
    
  };
  
  this.update = function() {
     for( var i = 0; i < this.tail.length-1; i++) {
       this.tail[i] = this.tail[i+1];
     }
     if( this.total >= 1) {
        this.tail[this.total -1] = createVector(this.x, this.y); 
     }
    
    
     this.x = this.x + this.xspeed*scl;
     this.y = this.y + this.yspeed*scl;
     
     this.x = constrain(this.x, 0, width-scl);
     this.y = constrain(this.y, 0, height-scl);
     

  };
  
  this.show = function() {
    fill(0,255,0);
    for( var i = 0; i < this.tail.length; i++)
    {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
   rect(this.x,this.y, scl, scl); 
  };
}
