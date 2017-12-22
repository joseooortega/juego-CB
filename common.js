
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

  function game(){

    var that = this;
    this.intervalSeconds = 70;
    this.personaje = new pPrincipal();
    this.personajes = [];

    this.init = function(){
      this.generateEnemies();
      setInterval(function(){ that.gameLoop(); }, 50);
    }
    this.gameLoop = function() {

      // Key events
      if (keyState[37]){ this.personaje.moverX('left');}
      if (keyState[39]) this.personaje.moverX('right');
      if (keyState[38]) this.personaje.moverX('up');
      if (keyState[40]) this.personaje.moverX('down');
      $(document).keydown(function(e){
        if (e.keyCode == 32){
          console.log('dis1');
          that.personaje.disparar();
        }
      });
    }
    this.generateEnemies = function(){
      setInterval(function(){
        that.personajes.push(new enemigo_1());
      }, 1000);
    }
    this.init();
  }
  function personaje(){
    base.apply(this,arguments);

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
     this.changeDimensions();
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
      console.log('disparo');
      if (this.disparos > 0){
        this.disparos--;
        this.proyectiles.push(new proyectil(this.positionY));
      }
    }
  }
  function proyectil(y){
    base.apply(this,arguments);

    this.width = 5;
    this.height = 3;
    this.velocidad = 11;
    this.positionX = 0;
    this.positionY = y;
    this.intervalSeconds = 70;
    this.element = false;

    this.init = function(){
      var id = Math.floor((Math.random() * 9999) + 0);
      window.container.append('<div class="proyectil" id="proyectil_'+id+'"></div>');
      this.element = $('#proyectil_'+id);
      this.changeDimensions();
      this.mover();
    }
    this.mover = function(){
      var that = this;
      setInterval(function(){
        console.log('asd');
        that.moverX('right', that.velocidad);
        that.updatePositions();
      }, that.intervalSeconds);
    }

    this.init();
  }
  function enemigo_1(){
    personaje.apply(this,arguments);

    this.width = 30;
    this.height = 10;
    this.positionX = window.container.width();
    this.positionY = Math.floor((Math.random() * (window.container.height() - this.height)) + 0);
    this.velocidad = 20;

    this.init2 = function(){
      this.changeDimensions();
      this.updatePositions();
      this.mover();
    }
    this.mover = function(){
      var that = this;
      var i = setInterval(function(){

        that.moverX('left', that.velocidad);
        that.updatePositions();

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
  function base(){

    this.element;
    this.positionX = 0;
    this.positionY = 0;
    this.velocidad = 0;
    this.width = 0;
    this.height = 0;

    this.moverX = function(x, velocidad){

      velocidad = typeof velocidad === typeof undefined ? this.velocidad : velocidad;

      if (x == 'left'){
        if (this.positionX - velocidad > 0){
          this.positionX -= velocidad;
          this.element.css('left', this.positionX);
        }else{
          this.positionX = 0;
          this.element.css('left', this.positionX);
        }
      }

      if (x == 'right'){
        if (window.container.width() > (this.positionX + velocidad + this.width)){
          this.positionX += velocidad;
          this.element.css('left', this.positionX);
        }else{
          this.positionX = window.container.width() - this.width;
          this.element.css('left', this.positionX);
        }
      }

      if (x == 'down'){
        if ((this.positionY - velocidad) > 0){
          this.positionY -= velocidad;
          this.element.css('bottom', this.positionY);
        }else{
          this.positionY = 0;
          this.element.css('bottom', this.positionY);
        }
      }

      if (x == 'up'){
        if ((this.positionY + velocidad + this.height) < window.container.height()){
          this.positionY += velocidad;
          this.element.css('bottom', this.positionY);
        }else{
          this.positionY = window.container.height() - this.height;
          this.element.css('bottom', this.positionY);
        }
      }
    }
    this.updatePositions = function(){
      this.element.css('left', this.positionX);
      this.element.css('bottom', this.positionY);
    }
    this.changeDimensions = function(){
      this.element.css('height', this.height);
      this.element.css('width', this.width);
    }
  }
});
