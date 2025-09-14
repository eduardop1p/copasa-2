export default function validationCNPJ(value: string) {
  value = value.replace(/[^\d]+/g, '');

  if (value.length !== 14) {
    return false;
  }

  // Elimina CNPJs conhecidos que são inválidos
  if (/^(\d)\1+$/.test(value)) {
    return false;
  }

  // Validação do primeiro dígito verificador
  let length = value.length - 2;
  let numbers = value.substring(0, length);
  let digits = value.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += +numbers.charAt(length - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0), 10)) {
    return false;
  }

  // Validação do segundo dígito verificador
  length = length + 1;
  numbers = value.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += +numbers.charAt(length - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1), 10)) {
    return false;
  }

  return true;
}
