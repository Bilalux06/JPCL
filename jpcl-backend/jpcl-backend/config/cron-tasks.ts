/**
 * Cron jobs configuration for JPCL Backend
 */

export default {
  /**
   * Auto-expire tenders based on closing date
   * Runs every hour to check for expired tenders
   */
  'tender-expiry-check': {
    task: async ({ strapi }) => {
      strapi.log.info('Running tender expiry check...');
      
      try {
        const result = await strapi.service('api::tender.tender').updateExpiredTenders();
        
        if (result.success) {
          strapi.log.info(`Tender expiry check completed: ${result.updatedCount} tenders updated`);
        } else {
          strapi.log.error('Tender expiry check failed:', result.error);
        }
      } catch (error) {
        strapi.log.error('Error in tender expiry cron job:', error);
      }
    },
    options: {
      rule: '0 * * * *', // Every hour at minute 0
      tz: 'Asia/Karachi' // Pakistan timezone
    },
  },

  /**
   * Daily tender statistics logging
   * Runs at 9 AM Pakistan time every day
   */
  'daily-tender-stats': {
    task: async ({ strapi }) => {
      try {
        const stats = await strapi.service('api::tender.tender').getTenderStats();
        
        strapi.log.info('Daily Tender Statistics:', {
          total: stats.total,
          active: stats.active, 
          expired: stats.expired,
          expiring_soon: stats.expiring_soon
        });
        
        // You could also save these stats to a statistics content type if needed
        
      } catch (error) {
        strapi.log.error('Error in daily stats cron job:', error);
      }
    },
    options: {
      rule: '0 9 * * *', // Every day at 9 AM
      tz: 'Asia/Karachi'
    },
  },

  /**
   * Weekly tender expiry notification check
   * Runs every Monday at 10 AM to check tenders expiring in the next 7 days
   */
  'weekly-expiry-notification': {
    task: async ({ strapi }) => {
      try {
        const expiringTenders = await strapi.service('api::tender.tender').getTendersExpiringSoon(7);
        
        if (expiringTenders && expiringTenders.length > 0) {
          strapi.log.warn(`${expiringTenders.length} tenders expiring in the next 7 days:`, 
            expiringTenders.map(t => ({
              id: t.Reference_ID,
              title: t.Title,
              closing: t.Closing_Date
            }))
          );
          
          // Here you could send notifications, emails, etc.
          // await strapi.service('api::notification.notification').sendExpiryWarnings(expiringTenders);
        }
        
      } catch (error) {
        strapi.log.error('Error in weekly expiry notification cron job:', error);
      }
    },
    options: {
      rule: '0 10 * * 1', // Every Monday at 10 AM
      tz: 'Asia/Karachi'
    },
  }
};