import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

export const timeAgoShort = date => {
  if (!date) return '';
  const now = new Date();
  const past = new Date(date);

  const seconds = differenceInSeconds(now, past);
  if (seconds < 60) return `${seconds}s`;

  const minutes = differenceInMinutes(now, past);
  if (minutes < 60) return `${minutes}m`;

  const hours = differenceInHours(now, past);
  if (hours < 24) return `${hours}h`;

  const days = differenceInDays(now, past);
  if (days < 7) return `${days}d`;

  const weeks = differenceInWeeks(now, past);
  if (weeks < 4) return `${weeks}w`;

  const months = differenceInMonths(now, past);
  if (months < 12) return `${months}mo`;

  const years = differenceInYears(now, past);
  return `${years}y`;
};

export const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
