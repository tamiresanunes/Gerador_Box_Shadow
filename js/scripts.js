/**
 * Classe para gerar e aplicar a propriedade CSS `box-shadow` em um elemento.
 */
class BoxShadowGenerator {
  /**
   * Construtor da classe BoxShadowGenerator.
   *
   * @param {HTMLElement} horizontal - Input para o deslocamento horizontal da sombra.
   * @param {HTMLElement} horizontalRef - Referência para exibir o valor do deslocamento horizontal.
   * @param {HTMLElement} vertical - Input para o deslocamento vertical da sombra.
   * @param {HTMLElement} verticalRef - Referência para exibir o valor do deslocamento vertical.
   * @param {HTMLElement} blur - Input para o raio de desfoque da sombra.
   * @param {HTMLElement} blurRef - Referência para exibir o valor do desfoque.
   * @param {HTMLElement} spread - Input para o raio de expansão da sombra.
   * @param {HTMLElement} spreadRef - Referência para exibir o valor da expansão.
   * @param {HTMLElement} color - Input para a cor da sombra.
   * @param {HTMLElement} colorRef - Referência para exibir a cor da sombra.
   * @param {HTMLElement} opacity - Input para a opacidade da sombra.
   * @param {HTMLElement} opacityRef - Referência para exibir a opacidade da sombra.
   * @param {HTMLElement} inset - Checkbox para definir se a sombra é interna.
   * @param {HTMLElement} previewBox - Elemento onde a sombra será aplicada.
   * @param {HTMLElement} rule - Elemento para exibir a regra CSS final.
   * @param {HTMLElement} webkitRule - Elemento para exibir a regra CSS com prefixo -webkit-.
   * @param {HTMLElement} mozRule - Elemento para exibir a regra CSS com prefixo -moz-.
   */
  constructor(
    horizontal,
    horizontalRef,
    vertical,
    verticalRef,
    blur,
    blurRef,
    spread,
    spreadRef,
    color,
    colorRef,
    opacity,
    opacityRef,
    inset,
    previewBox,
    rule,
    webkitRule,
    mozRule
  ) {
    this.horizontal = horizontal;
    this.horizontalRef = horizontalRef;
    this.vertical = vertical;
    this.verticalRef = verticalRef;
    this.blur = blur;
    this.blurRef = blurRef;
    this.spread = spread;
    this.spreadRef = spreadRef;
    this.color = color;
    this.colorRef = colorRef;
    this.opacity = opacity;
    this.opacityRef = opacityRef;
    this.inset = inset;
    this.insetRef = inset.checked;
    this.previewBox = previewBox;
    this.rule = rule;
    this.webkitRule = webkitRule;
    this.mozRule = mozRule;
  }

  /**
   * Inicializa os valores dos inputs e aplica a regra CSS inicial.
   */
  initialize() {
    this.horizontalRef.value = this.horizontal.value;
    this.verticalRef.value = this.vertical.value;
    this.blurRef.value = this.blur.value;
    this.spreadRef.value = this.spread.value;
    this.colorRef.value = this.color.value;
    this.opacityRef.value = this.opacity.value;

    this.applyRule();
    this.showRule();
  }

  /**
   * Atualiza o valor de um parâmetro específico e reaplica a regra CSS.
   *
   * @param {string} type - Tipo do parâmetro (e.g., "horizontal", "vertical").
   * @param {string|boolean} value - Novo valor para o parâmetro.
   */
  updateValue(type, value) {
    switch (type) {
      case "horizontal":
        this.horizontalRef.value = value;
        break;
      case "vertical":
        this.verticalRef.value = value;
        break;
      case "spread":
        this.spreadRef.value = value;
        break;
      case "blur":
        this.blurRef.value = value;
        break;
      case "color":
        this.colorRef.value = value;
        break;
      case "opacity":
        this.opacityRef.value = value;
        break;
      case "inset":
        this.insetRef = value;
        break;
    }

    this.applyRule();
    this.showRule();
  }

  /**
   * Aplica a regra de `box-shadow` ao elemento de visualização.
   */
  applyRule() {
    const rgbValue = this.hexToRgb(this.colorRef.value);

    const shadowRule = `${this.insetRef ? "inset" : ""} ${
      this.horizontalRef.value
    }px ${this.verticalRef.value}px ${this.blurRef.value}px ${
      this.spreadRef.value
    }px rgba(${rgbValue}, ${this.opacityRef.value})`;

    this.previewBox.style.boxShadow = shadowRule;
    this.currentRule = shadowRule;
  }

  /**
   * Exibe a regra de `box-shadow` nas referências visuais de regras CSS.
   */
  showRule() {
    const ruleWithSemiColon = `${this.currentRule};`;

    this.rule.innerText = ruleWithSemiColon;
    this.webkitRule.innerText = ruleWithSemiColon;
    this.mozRule.innerText = ruleWithSemiColon;
  }

  /**
   * Converte um valor hexadecimal de cor em RGB.
   *
   * @param {string} hex - Valor hexadecimal da cor (e.g., "#FFFFFF").
   * @returns {string} Valor RGB correspondente (e.g., "255, 255, 255").
   */
  hexToRgb(hex) {
    return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${
      ("0x" + hex[5] + hex[6]) | 0
    }`;
  }
}

// Selecionar elementos
// Inputs e referências visuais para a geração do box-shadow
const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontal-value");
const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical-value");
const blur = document.querySelector("#blur");
const blurRef = document.querySelector("#blur-value");
const spread = document.querySelector("#spread");
const spreadRef = document.querySelector("#spread-value");
const previewBox = document.querySelector("#box");

const color = document.querySelector("#color");
const colorRef = document.querySelector("#color-value");

const opacity = document.querySelector("#opacity");
const opacityRef = document.querySelector("#opacity-value");

const inset = document.querySelector("#inset");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

// Instancia a classe BoxShadowGenerator
const boxShadow = new BoxShadowGenerator(
  horizontal,
  horizontalRef,
  vertical,
  verticalRef,
  blur,
  blurRef,
  spread,
  spreadRef,
  color,
  colorRef,
  opacity,
  opacityRef,
  inset,
  previewBox,
  rule,
  webkitRule,
  mozRule
);

// Inicializa a interface com os valores padrão
boxShadow.initialize();

// Eventos

// Atualiza o deslocamento horizontal da sombra ao alterar o input correspondente
horizontal.addEventListener("input", (e) => {
  const value = e.target.value;
  boxShadow.updateValue("horizontal", value);
});

// Atualiza o deslocamento vertical da sombra ao alterar o input correspondente
vertical.addEventListener("input", (e) => {
  const value = e.target.value;
  boxShadow.updateValue("vertical", value);
});

// Atualiza o desfoque da sombra ao alterar o input correspondente
blur.addEventListener("input", (e) => {
  const value = e.target.value;
  boxShadow.updateValue("blur", value);
});

// Atualiza a expansão da sombra ao alterar o input correspondente
spread.addEventListener("input", (e) => {
  const value = e.target.value;
  boxShadow.updateValue("spread", value);
});

// Atualiza a cor da sombra ao alterar o input correspondente
color.addEventListener("input", (e) => {
  const value = e.target.value;
  boxShadow.updateValue("color", value);
});

// Atualiza a opacidade da sombra ao alterar o input correspondente
opacity.addEventListener("input", (e) => {
  const value = e.target.value;
  boxShadow.updateValue("opacity", value);
});

// Alterna entre sombra interna e externa ao marcar/desmarcar o checkbox
inset.addEventListener("input", (e) => {
  const value = e.target.checked;
  boxShadow.updateValue("inset", value);
});

// Copiar regra
const rulesArea = document.querySelector("#rules-area");
const copyInstructions = document.querySelector("#copy-instructions");

// Copia as regras CSS ao clicar na área de regras
rulesArea.addEventListener("click", () => {
  const rules = rulesArea.innerText.replace(/^\s*\n/gm, "");

  navigator.clipboard.writeText(rules).then(() => {
    copyInstructions.innerText = "Regra copiada com sucesso!";

    setTimeout(() => {
      copyInstructions.innerText =
        "Clique no quadro acima para copiar as regras";
    }, 1000);
  });
});

