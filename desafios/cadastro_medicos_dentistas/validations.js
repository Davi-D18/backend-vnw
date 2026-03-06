export function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function telefoneValido(telefone) {
  const regex = /^[0-9]{10,11}$/;
  return regex.test(telefone);
}
