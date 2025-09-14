export default function parseCurrencyFloat(value: string) {
  return parseFloat(
    value
      .replace('R$', '') // remove "R$"
      .replace(/\./g, '') // remove pontos de milhar
      .replace(',', '.') // troca vírgula por ponto
      .trim() // remove espaços em branco
  );
}
