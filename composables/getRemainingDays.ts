// Calculate duration between start and end dates
export const getRemainingDays = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) {
      return 'غير محدد';
    }
  
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
      if (diffDays === 1) return 'يوم واحد';
      if (diffDays === 2) return 'يومان';
      if (diffDays <= 10) return `${diffDays} أيام`;
      return `${diffDays} يوماً`;
    } catch (error) {
      return 'غير محدد';
    }
  };
  