// Variáveis globais (ex: tamanho do canvas, arrays para guardar as plantas)
let plantas = [];
let umidadeSolo = 50; // Exemplo de variável ambiental
let luzSolar = 100; // Exemplo de variável ambiental

function setup() {
  createCanvas(800, 600); // Cria o canvas
  // Inicializa as plantas ou o ambiente
  // Por exemplo, cria algumas plantas iniciais
  for (let i = 0; i < 20; i++) {
    plantas.push(new Trigo(random(width), random(height)));
  }
}

function draw() {
  background(135, 206, 235); // Céu azul
  // Desenha o solo
  fill(139, 69, 19);
  rect(0, height * 0.7, width, height * 0.3);

  // Atualiza e desenha cada planta
  for (let i = 0; i < plantas.length; i++) {
    plantas[i].crescer(umidadeSolo, luzSolar); // Passa variáveis ambientais
    plantas[i].display();
  }

  // Exibe informações (opcional)
  fill(0);
  textSize(16);
  text(`Umidade do Solo: ${umidadeSolo}%`, 10, 20);
  text(`Luz Solar: ${luzSolar}%`, 10, 40);
}

// Classe para representar uma planta de trigo
class Trigo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = 5; // Altura inicial da planta
    this.fase = 0; // 0: semente, 1: germinação, 2: crescimento, 3: espiga, 4: maduro
    this.saude = 100; // Saúde da planta
  }

  crescer(umidade, luz) {
    // Lógica de crescimento baseada nas condições ambientais e na fase
    // Exemplo simplificado:
    if (this.fase < 4) {
      this.altura += 0.1 * (umidade / 100) * (luz / 100);
      if (this.altura > 20 && this.fase === 0) this.fase = 1; // Germinou
      if (this.altura > 50 && this.fase === 1) this.fase = 2; // Crescendo
      if (this.altura > 80 && this.fase === 2) this.fase = 3; // Com espiga
      if (this.altura > 100 && this.fase === 3) this.fase = 4; // Maduro
    }
  }

  display() {
    push(); // Salva as configurações de estilo atuais
    translate(this.x, this.y); // Move a origem para a posição da planta

    // Desenha a planta de acordo com a fase
    if (this.fase === 0) {
      // Desenha a semente ou pequena plântula
      fill(100, 70, 40);
      ellipse(0, 0, 5, 5);
    } else {
      // Desenha o caule
      stroke(34, 139, 34); // Verde do caule
      strokeWeight(2);
      line(0, 0, 0, -this.altura);

      if (this.fase >= 3) {
        // Desenha a espiga (simplificado)
        fill(205, 133, 63); // Cor de trigo maduro
        noStroke();
        ellipse(0, -this.altura - 5, 10, 15);
      }
    }
    pop(); // Restaura as configurações de estilo
  }
}