export default function formateDate(date: Date) {
  return new Date(date).toLocaleString('pt-BR', {
    timeStyle: 'short',
    dateStyle: 'long',
    timeZone: 'America/Sao_Paulo',
    hour12: false,
  });
}
