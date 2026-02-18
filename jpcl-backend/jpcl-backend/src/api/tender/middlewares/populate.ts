/**
 * Middleware to populate tender relationships and computed fields
 */

export default (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    // Only apply to tender endpoints
    if (ctx.url.includes('/api/tenders') && ctx.response.body) {
      const { data } = ctx.response.body;
      
      if (data) {
        // Handle single tender
        if (data.id) {
          enrichTenderData(data);
        }
        // Handle array of tenders  
        else if (Array.isArray(data)) {
          data.forEach(tender => enrichTenderData(tender));
        }
      }
    }
  };
};

/**
 * Enrich tender data with computed fields
 */
function enrichTenderData(tender: any) {
  if (!tender || !tender.Closing_Date) return;

  const now = new Date();
  const closingDate = new Date(tender.Closing_Date);
  const openingDate = tender.Opening_Date ? new Date(tender.Opening_Date) : null;

  // Add computed fields
  tender.computed = {
    // Days remaining (can be negative if expired)
    daysRemaining: Math.ceil((closingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    
    // Hours remaining  
    hoursRemaining: Math.ceil((closingDate.getTime() - now.getTime()) / (1000 * 60 * 60)),
    
    // Is expired
    isExpired: closingDate <= now,
    
    // Is expiring soon (within 7 days)
    isExpiringSoon: closingDate > now && closingDate <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
    
    // Duration in days (from opening to closing)
    durationDays: openingDate ? Math.ceil((closingDate.getTime() - openingDate.getTime()) / (1000 * 60 * 60 * 24)) : null,
    
    // Status badge color for frontend
    statusColor: getStatusColor(tender.Status, closingDate <= now),
    
    // Human readable time remaining
    timeRemaining: getTimeRemainingText(closingDate, now)
  };
}

/**
 * Get status color for UI display
 */
function getStatusColor(status: string, isExpired: boolean): string {
  if (isExpired && status === 'active') return 'red';
  
  switch (status) {
    case 'active': return 'green';
    case 'expired': return 'red';
    case 'cancelled': return 'gray';
    case 'awarded': return 'blue';
    case 'draft': return 'yellow';
    default: return 'gray';
  }
}

/**
 * Get human readable time remaining text
 */
function getTimeRemainingText(closingDate: Date, now: Date): string {
  const diffMs = closingDate.getTime() - now.getTime();
  
  if (diffMs <= 0) {
    return 'Expired';
  }
  
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''} remaining`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''} remaining`;
  } else {
    return 'Less than 1 hour remaining';
  }
}