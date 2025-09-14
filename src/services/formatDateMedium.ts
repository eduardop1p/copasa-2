export default function formatDateMedium() {
  return new Date().toLocaleString('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });
}
