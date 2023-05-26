//variáveis da bolinha
//posição inicial da bolinha
//posicao x e y de onde a bolinha irá iniciar
let xBolinha = 300;
let yBolinha = 200;
let diametro = 24;
let raio = diametro / 2;


//movimento da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da minha raquete
//posição inicial dela através do x e y
//devido o seu formato ser diferente da bolinha
//haverão mais atributos
let xRaquete = 0;
let yRaquete = 150;

//tamanho padrão das raquetes dos jogadores
let comprimentoRaquete = 10;
let alturaRaquete = 80;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let colidiu = false;
let chanceDeErrar = 0;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;


//sons do jogo
let raquetada;
let ponto;
let trilha;

//variaveis trava raquete
let travaRaqueteY;
let travaRaqueteYOponenete

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//fundo do jogo
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrarBolinha();
  velocidadeBolinha();
  verificaBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaquete, yRaquete)
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostrarBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

//a bolinha vai se movimentar a partir da posição x e y 
//e acrescentando as variaves velocidadeXY ela irá se movimentar
function velocidadeBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaBorda() {
  if (xBolinha + raio > width || xBolinha < 0) {
    velocidadeXBolinha *= -1;
    
  }
  if (yBolinha + raio > height || yBolinha < 0) {
    velocidadeYBolinha *= -1;
  }
}
//utiliza a mesma função para as duas raquetes
//e muda somente os parametros 
function mostraRaquete(x, y) {
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente(){
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
}

//function movimentaRaqueteOponente() {
//velocidadeYOponente = yBolinha - yRaqueteOponente - 
//comprimentoRaquete  / 2 - 30;
//yRaqueteOponente += velocidadeYOponente
//calculaChanceDeErrar();
//}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39) {
      chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35
    }
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar() {
  stroke(255);
  textSize(16);
  textAlign(CENTER);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 0) {
    pontosOponente += 1;
    ponto.play();
  }
}
