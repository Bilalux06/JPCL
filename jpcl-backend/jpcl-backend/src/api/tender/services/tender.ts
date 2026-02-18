/**
 * tender service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::tender.tender', ({ strapi }) => ({
  
  /**
   * Check and update expired tenders
   * This function can be called by cron jobs or manual triggers
   */
  async updateExpiredTenders() {
    try {
      const now = new Date();
      
      // Find all active tenders that have passed their closing date
      const expiredTenders = await strapi.entityService.findMany('api::tender.tender', {
        filters: {
          Status: 'active',
          Closing_Date: {
            $lt: now.toISOString()
          }
        }
      });

      let updatedCount = 0;

      // Update each expired tender
      if (expiredTenders && expiredTenders.length > 0) {
        for (const tender of expiredTenders) {
          await strapi.entityService.update('api::tender.tender', tender.id, {
            data: { Status: 'expired' }
          });
          updatedCount++;
        }
      }

      strapi.log.info(`Tender Expiry Check: Updated ${updatedCount} expired tenders`);
      return { success: true, updatedCount };
      
    } catch (error) {
      strapi.log.error('Error updating expired tenders:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get active tenders (not expired, cancelled, or awarded)
   */
  async getActiveTenders(options = {}) {
    const now = new Date();
    
    return await strapi.entityService.findMany('api::tender.tender', {
      ...options,
      filters: {
        ...options.filters,
        Status: 'active',
        Closing_Date: {
          $gt: now.toISOString()
        }
      },
      sort: { Closing_Date: 'asc' }
    });
  },

  /**
   * Get tenders expiring soon (within specified days)
   */
  async getTendersExpiringSoon(days = 7, options = {}) {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + days);
    
    return await strapi.entityService.findMany('api::tender.tender', {
      ...options,
      filters: {
        ...options.filters,
        Status: 'active',
        Closing_Date: {
          $gt: now.toISOString(),
          $lt: futureDate.toISOString()
        }
      },
      sort: { Closing_Date: 'asc' }
    });
  },

  /**
   * Get tender statistics
   */
  async getTenderStats() {
    const now = new Date();
    
    const stats = await Promise.all([
      // Total tenders
      strapi.database.connection.raw(`
        SELECT COUNT(*) as total FROM tenders
      `),
      
      // Active tenders (not expired)
      strapi.database.connection.raw(`
        SELECT COUNT(*) as active FROM tenders 
        WHERE status = 'active' AND closing_date > ?
      `, [now.toISOString()]),
      
      // Expired tenders
      strapi.database.connection.raw(`
        SELECT COUNT(*) as expired FROM tenders 
        WHERE status = 'expired' OR (status = 'active' AND closing_date <= ?)
      `, [now.toISOString()]),
      
      // Expiring soon (7 days)
      strapi.database.connection.raw(`
        SELECT COUNT(*) as expiring_soon FROM tenders 
        WHERE status = 'active' AND closing_date > ? AND closing_date <= ?
      `, [now.toISOString(), new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()])
    ]);

    return {
      total: stats[0][0]?.total || 0,
      active: stats[1][0]?.active || 0,
      expired: stats[2][0]?.expired || 0,
      expiring_soon: stats[3][0]?.expiring_soon || 0
    };
  }

}));
