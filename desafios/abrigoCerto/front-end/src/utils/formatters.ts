/**
 * Formata o tempo decorrido desde uma data até agora
 */
export const formatTimeAgo = (dateString: string): string => {
  if (!dateString) return 'Data não disponível';
  const now = new Date();
  const updated = new Date(dateString);
  if (isNaN(updated.getTime())) return 'Data inválida';
  
  const diffInMinutes = Math.floor((now.getTime() - updated.getTime()) / 60000);

  if (diffInMinutes < 1) return 'Atualizado agora';
  if (diffInMinutes < 60) return `Atualizado há ${diffInMinutes} min`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `Atualizado há ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `Atualizado há ${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'}`;
};
