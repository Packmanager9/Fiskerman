
window.addEventListener('DOMContentLoaded', (event) =>{

    let tip = {}
    let xs
    let ys
    // let tap = {}
    // let xz
    // let yz
    let flammed = 0
    let physicscircles =[]
   

    let objsprings  =[]
   
    
    window.addEventListener('mousedown', e => {
   
   
       flex = tutorial_canvas.getBoundingClientRect();
   
   
       xs = e.clientX - flex.left;
       ys = e.clientY - flex.top;
         tip.x = xs
         tip.y = ys
   
         tip.body = tip
   
         let phy = new Circle(tip.x,tip.y, 50, "red")
         phy.xmom = 0
         phy.ymom = 0
         phy.x = tip.x
         phy.y = tip.y

        // physicscircles.push(phy)
   
    //   window.addEventListener('mousemove', continued_stimuli);
    });
   
    
    let angle = 0
    let gravity = 0
    let friction = .9998
    let pegged = 1
    let keysPressed = {}

    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;
     });
     
     document.addEventListener('keyup', (event) => {
        delete keysPressed[event.key];
     });

     let scrollsum = 0

     function MouseScroll (event) {
        var rolled = 0;
        if ('wheelDelta' in event) {
            rolled = event.wheelDelta;
        }
        else {  // Firefox
                // The measurement units of the detail and wheelDelta properties are different.
            rolled = -40 * event.detail;
        }
        
        tutorial_canvas_context.scale(1+(rolled/1000),1+(rolled/1000))
        if(rolled > 0){
            tutorial_canvas_context.translate(-70,-70)
        }else{
            tutorial_canvas_context.translate(70,70)
        }
        // tutorial_canvas_context.translate((tutorial_canvas.width*(rolled/30000))/2,(tutorial_canvas.height*(rolled/30000))/2)
        // scrollsum+=(rolled/30000)
    }

    // function Init () {
    //         // for mouse scrolling in Firefox
    //     var elem = document.getElementById ("infooverlay");
    //     // var elem = document.getElementById ("tutorial");
    //     if (elem.addEventListener) {    // all browsers except IE before version 9
    //             // Internet Explorer, Opera, Google Chrome and Safari
    //         elem.addEventListener ("mousewheel", MouseScroll, false);
    //             // Firefox
    //         elem.addEventListener ("DOMMouseScroll", MouseScroll, false);
    //     }
    //     else {
    //         if (elem.attachEvent) { // IE before version 9
    //             elem.attachEvent ("onmousewheel", MouseScroll);
    //         }
    //     }
    // }

    // Init()


   
    // function sclaescropp() {
    //     if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    //       tutorial_canvas_context.scale(.9,.9)
    //       tutorial_canvas_context.translate(70,70)
    //       document.body.scrollTop = 0
    //       document.documentElement.scrollTop = 0
    //     } else {
    //     }
    //     if (document.body.scrollTop < 0 || document.documentElement.scrollTop < 0) {
   
    //       tutorial_canvas_context.translate(70,70)
    //       document.body.scrollTop = 0
    //       document.documentElement.scrollTop = 0
    //     } else {
    //     }
    // }


    //  document.addEventListener('scroll', (event) => {

        
    //      tutorial_canvas_context.scale(.9,.9)
    //   });

    let tutorial_canvas = document.getElementById("tutorial");
    let tutorial_canvas_context = tutorial_canvas.getContext('2d');
    let infooverlay = document.getElementById("infooverlay");
    let infooverlay_context = infooverlay.getContext('2d');
    infooverlay.style.background = "transparent"
    infooverlay.style.marginTop = "-720px"
    tutorial_canvas.style.background = "#11AAFF"

    class Triangle{
        constructor(x, y, color, length){
            this.x = x
            this.y = y
            this.color= color
            this.length = length
            this.x1 = this.x + this.length
            this.x2 = this.x - this.length
            this.tip = this.y - this.length*2
            this.accept1 = (this.y-this.tip)/(this.x1-this.x)
            this.accept2 = (this.y-this.tip)/(this.x2-this.x)
        }
        draw(){
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.stokeWidth = 3
            tutorial_canvas_context.moveTo(this.x, this.y)
            tutorial_canvas_context.lineTo(this.x1, this.y)
            tutorial_canvas_context.lineTo(this.x, this.tip)
            tutorial_canvas_context.lineTo(this.x2, this.y)
            tutorial_canvas_context.lineTo(this.x, this.y)
            tutorial_canvas_context.stroke()
        }

        isPointInside(point){
            if(point.x <= this.x1){
                if(point.y >= this.tip){
                    if(point.y <= this.y){
                        if(point.x >= this.x2){
                            this.accept1 = (this.y-this.tip)/(this.x1-this.x)
                            this.accept2 = (this.y-this.tip)/(this.x2-this.x)
                            this.basey = point.y-this.tip
                            this.basex = point.x - this.x
                            if(this.basex == 0){
                                return true
                            }
                            this.slope = this.basey/this.basex
                            if(this.slope >= this.accept1){
                                return true
                            }else if(this.slope <= this.accept2){
                                return true
                            }
                        }
                    }
                }
            }
            return false
        }
    }
    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){
            this.x+=this.xmom
            this.y+=this.ymom
        }
        isPointInside(point){
            if(point.x >= this.x){
                if(point.y >= this.y){
                    if(point.x <= this.x+this.width){
                        if(point.y <= this.y+this.height){
                        return true
                        }
                    }
                }
            }
            return false
        }
    }
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){

            this.height = 0
            this.width = 0
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.lens = 0
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 1
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        unmove(){
             //friction
            //  if(this.x > tutorial_canvas.width){
            //     if(this.xmom > 0){
            //     this.xmom*=-1
            //     }
            // }
            // if(this.y > tutorial_canvas.height){
            //     if(this.ymom > 0){
            //     this.ymom*=-1
            //     }
            // }
            // if(this.x < 0){
            //     if(this.xmom < 0){
            //     this.xmom*=-1
            //     }
            // }
            // if(this.y < 0){
            //     if(this.ymom < 0){
            //         this.ymom*=-1
            //     }
            // }
            this.xmom/=.999
            this.ymom/=.999
            this.x -= this.xmom
            this.y -= this.ymom
        }
        move(){
            //friction
            // if(this.x > tutorial_canvas.width){
            //     if(this.xmom > 0){
            //     this.xmom*=-1
            //     }
            // }
            // if(this.y > tutorial_canvas.height){
            //     if(this.ymom > 0){
            //     this.ymom*=-1
            //     }
            // }
            // if(this.x < 0){
            //     if(this.xmom < 0){
            //     this.xmom*=-1
            //     }
            // }
            // if(this.y < 0){
            //     if(this.ymom < 0){
            //         this.ymom*=-1
            //     }
            // }
            this.xmom*=friction
            this.ymom*=friction
            this.x += this.xmom
            this.y += this.ymom
        }
        isPointInside(point){
            this.areaY = point.y - this.y 
            this.areaX = point.x - this.x
            if(((this.areaX*this.areaX)+(this.areaY*this.areaY)) <= (this.radius*this.radius)){
                return true
            }
            return false
        }
    }
    class Line{
        constructor(x,y, x2, y2, color, width){
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        hypotenuse(){
            let xdif = this.x1-this.x2
            let ydif = this.y1-this.y2
            let hypotenuse = (xdif*xdif)+(ydif*ydif)
            return Math.sqrt(hypotenuse)
        }
        draw(){
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.lineWidth = this.width
            tutorial_canvas_context.beginPath()
            tutorial_canvas_context.moveTo(this.x1, this.y1)         
            tutorial_canvas_context.lineTo(this.x2, this.y2)
            tutorial_canvas_context.stroke()
            tutorial_canvas_context.lineWidth = 1
        }
    }

    class Spring{
        constructor(body = 0){
            if(body == 0){
                this.body = new Circle(350, 350, 5, "red",10,10)
                this.anchor = new Circle(this.body.x, this.body.y+5, 5, "red")
                this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", 5)
                this.length = 1
            }else{
                this.body = body
                this.length = .79
                this.anchor = new Circle(this.body.x-(this.length), this.body.y, 5, "red")
                if(!objsprings.includes(this.anchor)){
                    objsprings.push(this.anchor)
                }
                this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", 5)
            }

        }
        balance(){
            if(keysPressed['p']){
                this.length+=.001
            }else{
                this.length = .79
            }

            // this.length+=.005
            // if(this.length <=2){
            //     this.length = 2
            // }
            this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "yellow", 5)
            let xmomentumaverage 
            let ymomentumaverage
            if(this.anchor != pin2){

             xmomentumaverage = (this.body.xmom+this.anchor.xmom)/1.9999
             ymomentumaverage = (this.body.ymom+this.anchor.ymom)/1.9999
            }else{
                 xmomentumaverage = ((this.body.xmom)+this.anchor.xmom)/1.9999
                 ymomentumaverage = ((this.body.ymom)+this.anchor.ymom)/1.9999

            }

            if(this.body != pin){
                this.body.xmom = ((this.body.xmom)+xmomentumaverage)/1.9999
                this.body.ymom = ((this.body.ymom)+ymomentumaverage)/1.9999
            }

            if(this.anchor != pin2){
            this.anchor.xmom = ((this.anchor.xmom)+xmomentumaverage)/1.9999
            this.anchor.ymom = ((this.anchor.ymom)+ymomentumaverage)/1.9999
            }else{
            this.anchor.xmom = ((this.anchor.xmom)+xmomentumaverage)/1.9999
            this.anchor.ymom = ((this.anchor.ymom)+ymomentumaverage)/1.9999
            }
                if(this.beam.hypotenuse() !=0){
            if(this.beam.hypotenuse() < this.length){
                if(this.body != pin){
                this.body.xmom += (this.body.x-this.anchor.x)/(this.length)/14.1
                this.body.ymom += (this.body.y-this.anchor.y)/(this.length)/14.1
                }

                // if(pegged == 1){
                //     if(this.anchor != pin2){
                //         this.anchor.xmom -= (this.body.x-this.anchor.x)/(this.length)/14.1
                //         this.anchor.ymom -= (this.body.y-this.anchor.y)/(this.length)/14.1
                //     }else{

                //         this.anchor.xmom -= (this.body.x-this.anchor.x)/(this.length)/14.1
                //         this.anchor.ymom -= (this.body.y-this.anchor.y)/(this.length)/14.1
                //     }
                // }else{
                    this.anchor.xmom -= (this.body.x-this.anchor.x)/(this.length)/14.1
                    this.anchor.ymom -= (this.body.y-this.anchor.y)/(this.length)/14.1
                // }
            }else if(this.beam.hypotenuse() > this.length){

                if(this.body != pin){
                this.body.xmom -= (this.body.x-this.anchor.x)/(this.length)/14.1
                this.body.ymom -= (this.body.y-this.anchor.y)/(this.length)/14.1
                }

                // if(pegged == 1){
                //     if(this.anchor != pin2){
                //         this.anchor.xmom += (this.body.x-this.anchor.x)/(this.length)/14.1
                //         this.anchor.ymom += (this.body.y-this.anchor.y)/(this.length)/14.1
                //     }else{
                //         this.anchor.xmom += (this.body.x-this.anchor.x)/(this.length)/14.1
                //         this.anchor.ymom += (this.body.y-this.anchor.y)/(this.length)/14.1
                //     }
                // }else{
                    this.anchor.xmom += (this.body.x-this.anchor.x)/(this.length)/14.1
                    this.anchor.ymom += (this.body.y-this.anchor.y)/(this.length)/14.1
                // }
            }

        }
            // console.log(this)
        }
        draw(){
            this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "black", .5)
            this.beam.draw()
            // this.body.draw()
            // this.anchor.draw()
        }
        move(){
            if(this.body !== pin){
                this.body.move()
            }
            // if(Math.random()<.01){
            //     this.anchor.xmom-=1
            // }
            if(pegged == 1){
                // if(this.anchor != pin2){
                    // this.anchor.ymom+=gravity
                    if(flammed == 0){

                        this.anchor.move()
                    }else{
                        
                if(this.anchor == pin2){
                    pin2.xmom =0
                    pin2.ymom =0
                }else{

                    this.anchor.move()
                }
                    }
                // }
            }else{
                // this.anchor.ymom+=gravity
                this.anchor.move()
            }
        }


    }

    class Human{
        constructor(){
            this.caloricdemand = 2400
            this.calories = 350000
        }
        live(){
            this.calories-=.0001
        }
    }

    class Fish{
        constructor(x,y){
            this.body = new Circle(x,y,3+Math.random()*5, "gray")
            this.anchored = 0
            this.tired = 0
            this.calories = this.body.radius*141
        }
        draw(){
            if(pin2.isPointInside(this.body)){
                this.anchored = 1
            }
            if(this.anchored == 1){
                this.body.x = pin2.x
                this.body.y = pin2.y
                this.tired += 5/this.body.radius
            }
            this.body.x += (Math.random()-.5)
            this.body.y += (Math.random()-.5)
            this.body.draw()
            if(this.body.x > tutorial_canvas.width){
                this.body.x = tutorial_canvas.width
            }
            if(this.body.y > tutorial_canvas.height){
                this.body.y = tutorial_canvas.height
            }
            if(this.body.x <0){
                this.body.x = 0
            }
            if(this.body.y < 0){
                this.body.y = 0
            }
        }
    }

    let springs = []

    let islant =  new Circle(350,350, 120, "green")
    let islant2 =  new Circle(350,350, 130, "tan")

    let pin = new Circle(350,350, 10, "blue")
    let pin2 = new Circle(350,350, 15, "blue")

    let spring = new Spring(pin)
    springs.push(spring)
    for(let k = 0; k<279;k++){
        spring = new Spring(spring.anchor)
        if(k < 278){
            springs.push(spring)
        }else if(k == 278 ){
            spring.anchor = pin2
            springs.push(spring)
        }
    }

    let fish = []

    for(let t = 0;t<25;t++){
        let fishie = new Fish(Math.random()*700,Math.random()*700)
    
        if(!islant2.isPointInside(fishie.body)){
            fish.push(fishie)
        }

    }
    
    let hstop = 0
    let dis = 100
    let locale = new Circle(350,350, 0, "red")

    let list = []
    list.push(springs)

    // pin.x = (dis*(Math.sin(angle)))+locale.x
    // pin.y = (dis*(Math.cos(angle)))+locale.y
    // pin.xmom = 0
    // pin.ymom = 0

    let man = new Human()

    window.setInterval(function(){ 
        flammed = 0
        if(keysPressed[' ']){
            flammed = 1
        }
        tutorial_canvas_context.clearRect(-10000,-10000,tutorial_canvas.width*100, tutorial_canvas.height*100)
        infooverlay_context.clearRect(-10000,-10000,tutorial_canvas.width*100, tutorial_canvas.height*100)
        islant2.draw()
        islant.draw()
        // for(let f = 0; f< physicscircles.length; f++){
        //     physicscircles[f].ymom += gravity
        //     physicscircles[f].move()
        //     physicscircles[f].draw()
        //     for(let w = 0; w< objsprings.length; w++){
        //         if(physicscircles[f].isPointInside(objsprings[w])){
        //             objsprings[w].ymom+=(physicscircles[f].ymom/2)
        //             physicscircles[f].ymom-=(physicscircles[f].ymom/2)
        //             objsprings[w].xmom+=(physicscircles[f].xmom/2)
        //             physicscircles[f].xmom-=(physicscircles[f].xmom/2)
        //             if(w>(objsprings.length/2)){
        //                 if(objsprings[w].xmom > 0){
        //                     physicscircles[f].xmom+=objsprings[w].xmom/2
        //                     objsprings[w].xmom-=objsprings[w].xmom/2
        //                 }
        //             }else{
        //                 if(objsprings[w].xmom < 0){
        //                     physicscircles[f].xmom+=objsprings[w].xmom/2
        //                     objsprings[w].xmom-=objsprings[w].xmom/2
        //                 }
        //             }
        //         }
        //     }
    
        // }

        hstop++
        // for(let t = 0; t<badsprings.length;t++){
        //     badsprings[t].balance()
        //     badsprings[t].draw()
        // }
        // let lx = pin.x
        // let ly = pin.y`

        // pin.x = (dis*(Math.sin(angle)))+locale.x
        // pin.y = (dis*(Math.cos(angle)))+locale.y

        // pin.xmom -=(pin.x-lx)*1
        // pin.ymom += (pin.y-ly)*1
        // // springs[1].anchor.xmom -=(pin.x-lx)*1
        // // springs[1].anchor.ymom += (pin.y-ly)*1

        // pin.xmom *= .90
        // pin.ymom *= .90

        pin.draw()
        for(let u = 0;u<3;u++){

            for(let s = 0; s<springs.length; s++){
                springs[s].balance()
            }
            for(let s = 0; s<springs.length; s++){
    
                springs[s].move()
            }
        }
        for(let s = 0; s<springs.length; s++){

            springs[s].draw()
        }
        // if(keysPressed['c']){
        //     gravity+=.001
        //     if(gravity > 1.5){
        //      gravity = 1.5
        //     }
        //     gravity =   parseFloat(gravity.toPrecision(4))
        // }
        // if(keysPressed['v']){
        //    gravity-=.001
        //    if(gravity < -1.5){
        //     gravity = -1.5
        //    }
        //    gravity =   parseFloat(gravity.toPrecision(4))
        // }
        // if(keysPressed['f']){
        //     friction-=.0001
        //     if(friction < .10){
        //         friction = .10
        //     }
        //     friction =   parseFloat(friction.toPrecision(6))
        // }
        // if(keysPressed['g']){

        //     friction+=.0001
        //     if(friction > 1.001){
        //         friction =1.001
        //     }
        //    friction =   parseFloat(friction.toPrecision(6))
        // }


        // if(keysPressed[' ']){
            if(keysPressed['w']){
                pin.y -= .5
                if(!islant2.isPointInside(pin)){
                   pin.y += .51  
               }
                // pin.ymom -= .5
            }
            if(keysPressed['a']){
                pin.x -= .5
                
                if(!islant2.isPointInside(pin)){
                    pin.x += .51  
                }
                // pin.xmom -= .5
            }
    
            if(keysPressed['s']){
                pin.y += .5
                if(!islant2.isPointInside(pin)){
                   pin.y -= .51  
               }
                // pin.ymom += .5
            }
            if(keysPressed['d']){
                
                pin.x += .5  
                 if(!islant2.isPointInside(pin)){
                    pin.x -= .51  
                }
            }
        // }
      
        // if(keysPressed['e']){
        //     for(let s = 0; s<springs.length; s++){
        //         springs[s].length +=.001
        //     }
        // }
        // if(keysPressed['q']){
        //     for(let s = 0; s<springs.length; s++){
        //         springs[s].length -=.001
        //         if(springs[s].length < .1){
        //             springs[s].length =.1
        //         }
        //     }
        // }
        // pin.xmom = 0
        // pin.ymom = 0
        pin.xmom *= .90
        pin.ymom *= .90
        if(pegged == 1){
        // pin2.xmom = 0
        // pin2.ymom = 0
        }
        // pin2.unmove() 

        // man.live()

        infooverlay_context.fillStyle = "white";
        infooverlay_context.font = `${18}px Arial`;
        infooverlay_context.fillText(`Calories: ${Math.round(man.calories-350000)}`, 10,20);

        // infooverlay_context.fillText(`Gravity; ${gravity} pixels/second`, 10,40);

        // infooverlay_context.fillText(`Taughtness; 1/${springs[0].length.toPrecision(3)}`, 10,60);
        if(!islant2.isPointInside(pin)){
            pin.unmove()     
        }else{
            if(!keysPressed['p']){
                pin.move()
            }
        }
        for(let t = 0;t<fish.length;t++){
            fish[t].draw()
            if(fish[t].anchored == 1){
                pin2.xmom*=.05
                pin2.ymom*=.05
                pin2.xmom -= (pin.x-pin2.x)/(2000+fish[t].tired)
                pin2.ymom -= (pin.y-pin2.y)/(2000+fish[t].tired)
                pin.xmom -= (pin.x-pin2.x)/(6000+fish[t].tired)
                pin.ymom -= (pin.y-pin2.y)/(6000+fish[t].tired)
           
            }
            
        }    for(let t = 0;t<fish.length;t++){
        if(islant2.isPointInside(fish[t].body)){
            if(fish[t].anchored == 1){
                man.calories += fish[t].calories
                for(let g = 0; g<objsprings.length;g++){
                    objsprings[g].xmom = 0
                    objsprings[g].ymom = 0
                }
            }
            fish.splice(t,1)
            let fishie = new Fish(Math.random()*700,Math.random()*700)
    
            if(!islant2.isPointInside(fishie.body)){
                fish.push(fishie)
            }
    
        }
        }
        
    }, 1) 



        
})