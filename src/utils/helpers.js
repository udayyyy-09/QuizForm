/**
 * Format a date string to a readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date)) throw new Error('Invalid date');
      return date.toLocaleString('en-GB', {
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return dateString;
    }
  };
  
  /**
   * Additional helper functions can be added here
   */