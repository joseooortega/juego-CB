
var keyState = {};

$(document).ready(function(){

  var gameInterval = false;
  var checkCollision = false;
  window.container = $('#canvas');
  var game = new game();

  window.addEventListener('keydown',function(e){
      keyState[e.keyCode || e.which] = true;
  },true);

  window.addEventListener('keyup',function(e){
      keyState[e.keyCode || e.which] = false;
  },true);

  function test(objeto){
    this.width = 100;
  }
  function moverX(x, objeto, velocidad){

    velocidad = typeof velocidad === typeof undefined ? objeto.velocidad : velocidad;

    if (x == 'left'){
      if (objeto.positionX - velocidad > 0){
        objeto.positionX -= velocidad;
        objeto.element.css('left', objeto.positionX);
      }else{
        objeto.positionX = 0;
        objeto.element.css('left', objeto.positionX);
      }
    }

    if (x == 'right'){
      if (window.container.width() > (objeto.positionX + velocidad + objeto.width)){
        objeto.positionX += velocidad;
        objeto.element.css('left', objeto.positionX);
      }else{
        objeto.positionX = window.container.width() - objeto.width;
        objeto.element.css('left', objeto.positionX);
      }
    }

    if (x == 'down'){
      if ((objeto.positionY - velocidad) > 0){
        objeto.positionY -= velocidad;
        objeto.element.css('bottom', objeto.positionY);
      }else{
        objeto.positionY = 0;
        objeto.element.css('bottom', objeto.positionY);
      }
    }

    if (x == 'up'){
      if ((objeto.positionY + velocidad + objeto.height) < window.container.height()){
        objeto.positionY += velocidad;
        objeto.element.css('bottom', objeto.positionY);
      }else{
        objeto.positionY = window.container.height() - objeto.height;
        objeto.element.css('bottom', objeto.positionY);
      }
    }

    return objeto;
  }
  function updatePositions(objeto){
    objeto.element.css('left', objeto.positionX);
    objeto.element.css('bottom', objeto.positionY);
    return objeto;
  }
  function changeDimensions(objeto){
    objeto.element.css('height', this.height);
    objeto.element.css('width', this.width);
    return objeto;
  }

  function game(){

    this.intervalSeconds = 70;
    this.personaje = new personaje();
    this.personajes = [];

    test(this.personaje);
    console.log(this.personaje);

    this.init = function(){
      this.generateEnemies();
      var that = this;
      setInterval(function(){ that.gameLoop(); }, 50);
    }
    this.gameLoop = function() {

      // Key events
      /*if (keyState[37]){ this = moverX('left', this.personaje);}
      if (keyState[39]) this = moverX('right', this.personaje);
      if (keyState[38]) this = moverX('up', this.personaje);
      if (keyState[40]) this = moverX('down', this.personaje);
      if (keyState[32]) {}             //Spacebar*/
    }
    this.generateEnemies = function(){
      var that = this;
      setInterval(function(){
        that.personajes.push(new enemigo_1());
      }, 1000);
    }
    this.init();
  }

  function personaje(){

     this.vida = 100;
     this.daño = 1;
     this.sprite = '';
     this.positionX = 0;
     this.positionY = 0;
     this.width = 20;
     this.height = 20;
     this.element = false;
     this.velocidad = 10;
     this.intervalSeconds = 70;

     this.init = function(){
       var id = Math.floor((Math.random() * 9999) + 0);
       window.container.append('<div class="personaje" id="personaje_'+id+'"></div>');
       this.element = $('#personaje_'+id);
       this = changeDimensions(this);
     }
     this.init();
  }
  function pPrincipal(){
    personaje.apply(this,arguments);
    this.disparos = 10;
    this.proyectiles = [];
    this.vida = 5;
    this.daño = 100;

    this.disparar = function(){
      if (this.disparos > 0){
        this.disparos--;
        this.proyectiles.push(new proyectil());
      }
    }
  }
  function proyectil(){
    this.width = 5;
    this.height = 3;
    this.velocidad = 11;
    this.positionX = 0;
    this.positionY = 0;
    this.intervalSeconds = 70;
    this.element = false;

    this.init(){
      var id = Math.floor((Math.random() * 9999) + 0);
      window.container.append('<div class="personaje" id="personaje_'+id+'"></div>');
      this.element = $('#personaje_'+id);
      this = changeDimensions(this);
      this.mover();
    }
    this.mover = function(){
      var that = this;
      setInterval(function(){
        that = moverX('left', that, that.velocidad);
        that = updatePositions(that);
      }, that.intervalSeconds);
    }
  }
  function enemigo_1(){
    personaje.apply(this,arguments);

    this.width = 30;
    this.height = 10;
    this.positionX = window.container.width();
    this.positionY = Math.floor((Math.random() * (window.container.height() - this.height)) + 0);
    this.velocidad = 20;

    this.init2 = function(){
      this = changeDimensions(this);
      this = updatePositions(this);
      this.mover();
    }
    this.mover = function(){
      var that = this;
      var i = setInterval(function(){

        moverX('left', that, that.velocidad);
        that = updatePositions(that);

        if (that.positionX == 0){
          that.destroy();
          clearInterval(i);
        }
      }, that.intervalSeconds);
    }
    this.destroy = function(){
      this.element.remove();
    }
    this.init2();
  }
});
