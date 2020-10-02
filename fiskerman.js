
window.addEventListener('DOMContentLoaded', (event) =>{


    let time = 300000
    let day = 0
    let inventorizing = -1
    let tip = {}
    let xs
    let ys
    let hunting = 0

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


        let wet = 0
        for(let t = 0;t<man.accessing.contents.length;t++){
            if(man.accessing.contents[t].graphic.isPointInside(tip)){
                man.accessing.contents[t].selected *= -1
                if(inventorizing == 1){
                    wet = 1
                }
                break
            }
        }
        if(inventorizing == 1){
        for(let t = 0;t<man.accessing.contents.length;t++){
            if(man.accessing.contents[t].selected == 1){
                if( man.accessing.contents[t].object.options.option2box.isPointInside(tip)){
                    man.accessing.contents[t].object.options.option2func()
                    wet = 1
                    break
                }
                if( man.accessing.contents[t].object.options.option1box.isPointInside(tip)){
                    man.accessing.contents[t].object.options.option1func()
                    wet = 1
                    break
                }
                if( man.accessing.contents[t].object.options.option3box.isPointInside(tip)){
                    man.accessing.contents[t].object.options.option3func()
                    wet = 1
                    break
                }

            }
        }
    }
        if(man.accessing.box.isPointInside(tip)){
            if(inventorizing == 1){
                wet = 1
            }
        }
        if(exit.isPointInside(tip)){
            wet = 1
            unFish()
            unHunt()
        }
        if(fisher.isPointInside(tip)){
            wet = 1
            goFishing()
        }
        if(hunter.isPointInside(tip)){
            wet = 1
            goHunting()
        }
        if(wet == 0){

            inventorizing *=-1
        }
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

    class Animal{
        constructor(x,y){
            this.body = new Circle(x,y,3+Math.random()*5, "brown")
            if(Math.random()<.8){
                this.body = new Circle(x,y,3+Math.random()*4, "tan")
            }
            this.anchored = 0
            this.tired = 0
            this.calories = this.body.radius*141
            this.graphic = new Circgraphic(this.body)
            this.options = new Options(0, this)
            this.xmom = Math.random()-.5
            this.ymom = Math.random()-.5
        }
        draw(){
            if(pin.isPointInside(this.body)){
                if(this.tired == 1){
                    man.inventory.add(new Item(this, man.inventory))
                    this.graphic = new Circgraphic(this.body)
                    if(animals.includes(this)){

                        animals.splice(animals.indexOf(this),1)
                    }
                }
            }
            if(man.cord.isPointInside(this.body)){
                this.body = new BulletCircle(this.body.x, this.body.y, this.body.radius, this.body.color)
                this.tired = 1
            }
            if(this.tired == 0){
                this.body.x+=this.xmom
                this.body.y+=this.ymom
            }
            if(this.body.x > 3500){
                if(this.xmom > 0){
                    this.xmom*=-1
                }
            }
            if(this.body.x  < 0){
                if(this.xmom < 0){
                    this.xmom*=-1
                }
            }
            if(this.body.y > 3500){
                if(this.ymom > 0){
                    this.ymom*=-1
                }
            }
            if(this.body.y  < 0){
                if(this.ymom < 0){
                    this.ymom*=-1
                }
            }
            this.body.draw()
        }
    }
    class BulletCircle{        
        
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
        tutorial_canvas_context.lineWidth = this.radius - .5
        tutorial_canvas_context.strokeStyle = this.color
        tutorial_canvas_context.beginPath();
        tutorial_canvas_context.arc(this.x, this.y, this.radius-1, 0, (Math.PI*2), true)
        tutorial_canvas_context.fillStyle = "red"
       tutorial_canvas_context.fill()
        tutorial_canvas_context.stroke(); 
    }
    unmove(){
        this.xmom/=.999
        this.ymom/=.999
        this.x -= this.xmom
        this.y -= this.ymom
    }
    move(){
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
            this.xmom/=.999
            this.ymom/=.999
            this.x -= this.xmom
            this.y -= this.ymom
        }
        move(){
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
            }else if(keysPressed['o']){
                if(this.length >= .3){
                    this.length-=.0001
                }
            }else{
                this.length = .79 //.3
            }
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
                    this.anchor.xmom -= (this.body.x-this.anchor.x)/(this.length)/14.1
                    this.anchor.ymom -= (this.body.y-this.anchor.y)/(this.length)/14.1
              }else if(this.beam.hypotenuse() > this.length){

                if(this.body != pin){
                this.body.xmom -= (this.body.x-this.anchor.x)/(this.length)/14.1
                this.body.ymom -= (this.body.y-this.anchor.y)/(this.length)/14.1
            }
                this.anchor.xmom += (this.body.x-this.anchor.x)/(this.length)/14.1
                this.anchor.ymom += (this.body.y-this.anchor.y)/(this.length)/14.1
            }
          }
        }


        draw(){
            this.beam = new Line(this.body.x, this.body.y, this.anchor.x, this.anchor.y, "black", .5)
            this.beam.draw()
        }
        move(){
            if(this.body !== pin){
                this.body.move()
            }
            if(pegged == 1){
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
            }else{
                this.anchor.move()
            }
        }


    }
      
    class Item{
        constructor(object, isin){
            this.selected = -1
            this.object = object
            this.options = object.options
            this.isin = isin
            if(this.object == 0){
                this.graphic = new Rectangle(0,0,20,20,"gray")
            }else{
                    this.graphic = this.object.graphic
            }
        }
        draw(){
            this.graphic.draw()
            if(this.selected == 1){
                if(this.object!==0){

                    // console.log(this)
                    this.object.options.draw()
                }
            }
        }
    }
    class Inventory{
        constructor(object, size){
            this.box = new Rectangle(10,40, 350, 260, "#555555")
            this.object = object
            
            this.contents = []
            for(let t = 0;t<size;t++){
                this.contents.push(new Item(0, this))
            }
        }
        draw(){
            this.box.draw()
            let y = -25
            for(let t=0;t<this.contents.length;t++){
                if(t%9 ==0){
                    y+=25
                }
                this.contents[t].graphic.x = this.box.x+19+((t%9)*25)
                this.contents[t].graphic.y = this.box.y+15+y
            }
            for(let t=0;t<this.contents.length;t++){
                if(this.contents[t].selected == 1){
                    this.contents[t].graphic.color = "yellow"
                }else{
                    this.contents[t].graphic.color =  "#DDDDDD"
                }
                this.contents[t].draw()
            }
        }
        add(object){
            for(let t = 0;t<this.contents.length;t++){
                if(this.contents[t].object == 0){
                    this.contents[t].object = object
                    this.contents[t].graphic = object.graphic
                    this.contents[t].isin = this
                    break
                }
            }
        }
    }

    class Graph{
        constructor(human){
            this.human = human
        }
    }  
    class Human{
        constructor(){
            this.caloricdemand = 2400
            this.calories = 350000
            this.yearlycalories = this.caloricdemand*365.25
            this.graph = new Graph(this)
            this.inventory = new Inventory(this, 117)
            this.accessing = this.inventory
            this.angle = 0
            this.dis = 10
            this.mag = 10
            
            this.triggered = 0
        }
        live(){
            this.cord = new Circle(pin.x+(Math.sin(this.angle)*this.dis),pin.y+(Math.cos(this.angle)*this.dis), 7, "black")
            this.calories-=this.caloricdemand/300000
            if(hunting == 1){

                if(keysPressed['l']){
                    this.angle+=.05
                }
                if(keysPressed['j']){
                    this.angle-=.05
                }
                
                this.cord = new Circle(pin.x+(Math.sin(this.angle)*this.dis),pin.y+(Math.cos(this.angle)*this.dis), 7, "black")
                this.cord.draw()

                if(this.triggered == 1){
                    this.dis += this.mag
                }
                if(this.dis >=10){
                    this.dis*=.98
                    this.mag*=.9
                }else{
                    this.triggered = 0
                }
                if(keysPressed[' ']){
                    this.triggered = 1
                    this.mag = 10
                }
            }
        }
    }
    let man = new Human()
    
    class Circgraphic{
        constructor(ball){
            this.color =  "#DDDDDD"
            this.x = 0
            this.y = 0
            this.body = new Rectangle(0,0,20,20, "#DDDDDD")
            this.ball = ball
        }
        draw(){
            this.body.color = this.color
            this.body.x = this.x
            this.body.y = this.y
            this.ball.x = this.body.x+(this.body.width*.5)
            this.ball.y = this.body.y+(this.body.height*.5)
            this.body.draw()
            this.ball.draw()
        }
        isPointInside(point){
            if(this.body.isPointInside(point)){
                return true
            }
            return false
        }
    }
    class Options{
        constructor(type, object){
      
            this.object = object
            if(type >= 0){
                
                this.type = type
                }else{
                    this.type = 0
                    this.object.calories = 0
                }
            this.option1 = "delete"
            this.option1box = new Rectangle(man.inventory.box.width+man.inventory.box.x- 75,man.inventory.box.height+man.inventory.box.y, 50, 75, "red" )
         
            
            this.option2 = " "
            this.option3 = " "
            this.option2box = new Rectangle(man.inventory.box.width+man.inventory.box.x- 150,man.inventory.box.height+man.inventory.box.y, 50, 75, "yellow" )


            this.option3box = new Rectangle(man.inventory.box.width+man.inventory.box.x- 225,man.inventory.box.height+man.inventory.box.y, 50, 75, "gray" )



            switch (this.type){
                case 0:
                    //food

                    this.option2 = "eat"
                    this.option3 = "cancel"          
                    
                    
                break
                case 1:
                    //wood?
                    this.option2 = "wood"

                break
            }
        }
        option1func(){
            if(this.type == 0){
                for(let t = 0;t<man.inventory.contents.length;t++){
                    if(man.inventory.contents[t].selected == 1){
                        man.inventory.contents[t] =new Item(0, this)
                    }
                }
            }
        }
        option2func(){
            if(this.type == 0){
                for(let t = 0;t<man.inventory.contents.length;t++){
                    if(man.inventory.contents[t].selected == 1){
                        // console.log(man.inventory.contents[t])
                        man.calories+=man.inventory.contents[t].object.object.calories
                        man.inventory.contents[t] =new Item(0, this)
                    }
                }
            }
        }
        option3func(){
            if(this.type == 0){
                for(let t = 0;t<man.inventory.contents.length;t++){
                    if(man.inventory.contents[t].selected == 1){
                        man.inventory.contents[t].selected = -1
                    }
                }
            }
        }
        draw(){
            
            this.option1box.draw()
            tutorial_canvas_context.fillStyle = "black";
            tutorial_canvas_context.font = `${18}px Arial`;
            tutorial_canvas_context.fillText(`${this.option1}`, 10+this.option1box.x,25+this.option1box.y);
            this.option2box.draw()
            tutorial_canvas_context.fillStyle = "black";
            tutorial_canvas_context.font = `${18}px Arial`;
            tutorial_canvas_context.fillText(`${this.option2}`, 10+this.option2box.x,25+this.option2box.y);
            this.option3box.draw()
            tutorial_canvas_context.fillStyle = "black";
            tutorial_canvas_context.font = `${18}px Arial`;
            tutorial_canvas_context.fillText(`${this.option3}`, 10+this.option3box.x,25+this.option3box.y);
        }
    }
    class Fish{
        constructor(x,y){
            this.body = new Circle(x,y,3+Math.random()*5, "#666611")
            this.anchored = 0
            this.tired = 0
            this.calories = this.body.radius*141
            this.graphic = new Circgraphic(this.body)
            this.options = new Options(0, this)
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

    let islant 
    let islant2 

    let pin = new Circle(350,350, 10, "blue")
    let pin2

    let spring
    let fish = []
    let animals = []

    // let bear = new Animal(200,200)
    // animals.push(bear)

    let hstop 
    let dis
    let locale

    let list = []
    list.push(springs)
    goFishing()

    let exit = new Rectangle(0,0,20,20,"red")
    let fisher = new Rectangle(20,0,20,20,"blue")
    let hunter = new Rectangle(40,0,20,20,"brown")

    window.setInterval(function(){ 
        
        time--
        if(time == 0){
            day+=1
             time = 300000
        }
        flammed = 0
        if(keysPressed[' ']){
            flammed = 1
        }
        tutorial_canvas_context.clearRect(-10000,-10000,tutorial_canvas.width*100, tutorial_canvas.height*100)
        infooverlay_context.clearRect(-10000,-10000,tutorial_canvas.width*100, tutorial_canvas.height*100)
        islant2.draw()
        islant.draw()

        hstop++

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

        // if(keysPressed[' ']){
            if(keysPressed['w']){
                pin.y -= .5
                // if(hunting == 1){
                //     tutorial_canvas_context.translate(0,.5)
                //     hunter.y-=.5
                //     exit.y-=.5
                //     fisher.y-=.5
                //     man.inventory.box.y-=.5
                // }
                if(!islant2.isPointInside(pin)){
                   pin.y += .51  
               }
                // pin.ymom -= .5
            }
            if(keysPressed['a']){
                pin.x -= .5
                // if(hunting == 1){
                //     tutorial_canvas_context.translate(.5,0)
                //     hunter.x-=.5
                //     fisher.x-=.5
                //     exit.x-=.5
                //     man.inventory.box.x-=.5
                // }
                
                if(!islant2.isPointInside(pin)){
                    pin.x += .51  
                }
                // pin.xmom -= .5
            }
    
            if(keysPressed['s']){
                pin.y += .5
                // if(hunting == 1){
                // tutorial_canvas_context.translate(0,-.5)
                // hunter.y+=.5
                // fisher.y+=.5
                // exit.y+=.5
                // man.inventory.box.y+=.5
                // }
                if(!islant2.isPointInside(pin)){
                   pin.y -= .51  
               }
                // pin.ymom += .5
            }
            if(keysPressed['d']){
                
                pin.x += .5  
                // if(hunting == 1){
                //     tutorial_canvas_context.translate(-.5,0)
                //     hunter.x+=.5
                //     fisher.x+=.5
                //     exit.x+=.5
                //     man.inventory.box.x+=.5
                // }
                 if(!islant2.isPointInside(pin)){
                    pin.x -= .51  
                }
            }
        pin.xmom *= .90
        pin.ymom *= .90
        if(pegged == 1){
        // pin2.xmom = 0
        // pin2.ymom = 0
        }
        // pin2.unmove() 

        man.live()

        infooverlay_context.fillStyle = "white";
        infooverlay_context.font = `${18}px Arial`;
        infooverlay_context.fillText(`Calories: ${Math.round(man.calories-350000)}`, 10,20);
        if(inventorizing ==1){

            infooverlay_context.fillText(`Day: ${day}`, 610,20);
        }

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
            
        }    
        for(let t = 0;t<animals.length;t++){
            animals[t].draw()
            }
            
        
        for(let t = 0;t<fish.length;t++){
        if(islant2.isPointInside(fish[t].body)){
            if(fish[t].anchored == 1){
                // man.calories += fish[t].calories
                man.inventory.add(new Item(fish[t], man.inventory))
                // unFish()
                // goFishing()
                for(let g = 0; g<objsprings.length;g++){
                    objsprings[g].xmom = 0
                    objsprings[g].ymom = 0
                }
            }
            // console.log(man)
            fish.splice(t,1)
            let fishie = new Fish(Math.random()*700,Math.random()*700)
    
            if(!islant2.isPointInside(fishie.body)){
                fish.push(fishie)
            }
    
        }
        }
        if(inventorizing == 1){
        man.inventory.draw()
        }
        
        exit.draw()
        fisher.draw()
        hunter.draw()
    }, 1) 


    function goFishing(){
        
        hunting = 0
     springs = []

     islant =  new Circle(350,350, 120, "green")
     islant2 =  new Circle(350,350, 130, "tan")

     pin = new Circle(350,350, 10, "blue")
     pin2 = new Circle(350,350, 15, "blue")

     spring = new Spring(pin)
    springs.push(spring)
    for( let k = 0; k<279;k++){
        spring = new Spring(spring.anchor)
        if(k < 278){
            springs.push(spring)
        }else if(k == 278 ){
            spring.anchor = pin2
            springs.push(spring)
        }
    }

     fish = []

    for( t = 0;t<25;t++){
         fishie = new Fish(Math.random()*700,Math.random()*700)
    
        if(!islant2.isPointInside(fishie.body)){
            fish.push(fishie)
        }

    }
    
     hstop = 0
     dis = 100
     locale = new Circle(350,350, 0, "red")

     list = []
    list.push(springs)


    }

    function unFish(){
        fish = []
        animals = []
        unHunt()


        exit = new Rectangle(0,0,20,20,"red")
        fisher = new Rectangle(20,0,20,20,"blue")
        hunter = new Rectangle(40,0,20,20,"brown")
        islant =  new Circle(350,350, 1200, "green")
        islant2 =  new Circle(350,350, 1300, "tan")
        springs = []
    }
    function goHunting(){
        unFish()
        unHunt()
        
     pin = new Circle(350,350, 10, "blue")
        hunting = 1
        fish = []

        islant =  new Circle(350,350, 1200000, "green")
        islant2 =  new Circle(350,350, 1300000, "tan")
        springs = []

        
    for( t = 0;t<102;t++){
        fishie = new Animal(-3500+Math.random()*7000,-3500+Math.random()*7000)
   
       if(islant2.isPointInside(fishie.body)){
           animals.push(fishie)
       }

   }
    }


    function unHunt(){
        hunting = 0
        fish = []
        animals = []

         exit = new Rectangle(0,0,20,20,"red")
         fisher = new Rectangle(20,0,20,20,"blue")
         hunter = new Rectangle(40,0,20,20,"brown")
        islant =  new Circle(350,350, 1200, "green")
        islant2 =  new Circle(350,350, 1300, "tan")
        springs = []
    }

        
})