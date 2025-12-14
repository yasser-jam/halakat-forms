import dayjs from 'dayjs';
import type { Campaign } from '~/types';

export const getCampaignDays = (campaign: Campaign) => {
  const { start_date, end_date, days } = campaign;
  
  // Convert campaign days to Arabic
  const arabicDays = Array.isArray(days) 
    ? days.map(day => getDay(day.toLowerCase() as any))
    : days.split(',').map(day => getDay(day.toLowerCase() as any));
  
  // Generate all dates between start_date and end_date that match campaign days
  const validDates: string[] = [];
  const startDate = dayjs(start_date);
  const endDateValue = end_date ? dayjs(end_date) : dayjs().add(1, 'year'); // Default to 1 year if continuous
  
  let currentDate = startDate;
  const campaignDays = Array.isArray(days) ? days : days.split(',');
  
  // Map English days to dayjs day numbers (0 = Sunday, 1 = Monday, etc.)
  const dayMap: { [key: string]: number } = {
    'sunday': 0,
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6
  };
  
  const allowedDayNumbers = campaignDays.map(day => dayMap[day.toLowerCase()]);
  
  while (currentDate.isBefore(endDateValue) || currentDate.isSame(endDateValue, 'day')) {
    if (allowedDayNumbers.includes(currentDate.day())) {
      validDates.push(currentDate.format('MM-DD'));
    }
    currentDate = currentDate.add(1, 'day');
  }
  
  return {
    arabicDays,
    validDates,
    campaignDays
  };
}