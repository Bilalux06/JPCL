/**
 * Tender lifecycle hooks for automatic status management
 */

export default {
  // Before creating a tender
  async beforeCreate(event: any) {
    const { data } = event.params;
    
    // Set status to active if closing date is in the future and no status set
    if (!data.Status && data.Closing_Date) {
      const now = new Date();
      const closingDate = new Date(data.Closing_Date);
      
      if (closingDate > now) {
        data.Status = 'active';
      } else {
        data.Status = 'expired';
      }
    }
    
    // Set opening date to now if not specified
    if (!data.Opening_Date) {
      data.Opening_Date = new Date().toISOString();
    }
  },

  // Before updating a tender
  async beforeUpdate(event: any) {
    const { data } = event.params;
    
    // Auto-expire if closing date has passed
    if (data.Closing_Date) {
      const now = new Date();
      const closingDate = new Date(data.Closing_Date);
      
      // Only auto-expire if current status is active or draft
      if (closingDate <= now && (data.Status === 'active' || data.Status === 'draft')) {
        data.Status = 'expired';
      }
      // Reactivate if closing date is extended and status was expired
      else if (closingDate > now && data.Status === 'expired') {
        data.Status = 'active';
      }
    }
  },

  // After finding many - useful for bulk status updates
  async afterFindMany(event: any) {
    const { result } = event;
    
    if (result && result.data) {
      const now = new Date();
      
      // Check each tender for expiry
      for (const tender of result.data) {
        if (tender.Closing_Date && tender.Status === 'active') {
          const closingDate = new Date(tender.Closing_Date);
          
          if (closingDate <= now) {
            // Update status to expired
            await strapi.entityService.update('api::tender.tender', tender.id, {
              data: { Status: 'expired' }
            });
            tender.Status = 'expired';
          }
        }
      }
    }
    
    return result;
  },

  // After finding one - check expiry for individual tender
  async afterFindOne(event: any) {
    const { result } = event;
    
    if (result && result.Closing_Date && result.Status === 'active') {
      const now = new Date();
      const closingDate = new Date(result.Closing_Date);
      
      if (closingDate <= now) {
        // Update status to expired
        await strapi.entityService.update('api::tender.tender', result.id, {
          data: { Status: 'expired' }
        });
        result.Status = 'expired';
      }
    }
    
    return result;
  }
};