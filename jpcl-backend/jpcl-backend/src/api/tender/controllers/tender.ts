/**
 * tender controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::tender.tender', ({ strapi }) => ({
  
  // Custom endpoint to get only active tenders
  async findActive(ctx) {
    try {
      const { query } = ctx;
      const activeTenders = await strapi.service('api::tender.tender').getActiveTenders(query);
      
      ctx.body = {
        data: activeTenders,
        meta: {
          message: 'Active tenders retrieved successfully'
        }
      };
    } catch (error) {
      ctx.badRequest('Failed to retrieve active tenders', { error: error.message });
    }
  },

  // Custom endpoint to get tenders expiring soon
  async findExpiringSoon(ctx) {
    try {
      const { query } = ctx;
      const days = query.days ? parseInt(query.days) : 7;
      
      const expiringTenders = await strapi.service('api::tender.tender').getTendersExpiringSoon(days, query);
      
      ctx.body = {
        data: expiringTenders,
        meta: {
          days: days,
          message: `Tenders expiring within ${days} days`
        }
      };
    } catch (error) {
      ctx.badRequest('Failed to retrieve expiring tenders', { error: error.message });
    }
  },

  // Custom endpoint to get tender statistics
  async getStats(ctx) {
    try {
      const stats = await strapi.service('api::tender.tender').getTenderStats();
      
      ctx.body = {
        data: stats,
        meta: {
          message: 'Tender statistics retrieved successfully',
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      ctx.badRequest('Failed to retrieve tender statistics', { error: error.message });
    }
  },

  // Manual trigger to update expired tenders (admin only)
  async updateExpired(ctx) {
    try {
      // Check if user has admin permissions
      if (!ctx.state.user || ctx.state.user.role?.type !== 'authenticated') {
        return ctx.unauthorized('Access denied');
      }

      const result = await strapi.service('api::tender.tender').updateExpiredTenders();
      
      ctx.body = {
        data: result,
        meta: {
          message: 'Expired tenders update completed',
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      ctx.badRequest('Failed to update expired tenders', { error: error.message });
    }
  }

}));
  async find(ctx) {
    // Call the default core action
    const { data, meta } = await super.find(ctx);
    
    // Update status based on dates for each tender
    const updatedData = data.map((tender) => {
      const now = new Date();
      const closingDate = new Date(tender.attributes.Closing_Date);
      const openingDate = tender.attributes.Opening_Date ? new Date(tender.attributes.Opening_Date) : null;
      
      let status = tender.attributes.Status;
      
      // Auto-update status logic
      if (status !== 'cancelled' && status !== 'awarded') {
        if (now > closingDate) {
          status = 'expired';
        } else if (openingDate && now >= openingDate && now <= closingDate) {
          status = 'active';
        } else if (!openingDate && now <= closingDate) {
          status = 'active'; 
        }
      }
      
      // Update the tender in database if status changed
      if (status !== tender.attributes.Status) {
        strapi.entityService.update('api::tender.tender', tender.id, {
          data: { Status: status }
        });
        tender.attributes.Status = status;
      }
      
      return tender;
    });

    return { data: updatedData, meta };
  },

  async findOne(ctx) {
    const { data, meta } = await super.findOne(ctx);
    
    // Update status for single tender
    if (data) {
      const now = new Date();
      const closingDate = new Date(data.attributes.Closing_Date);
      const openingDate = data.attributes.Opening_Date ? new Date(data.attributes.Opening_Date) : null;
      
      let status = data.attributes.Status;
      
      if (status !== 'cancelled' && status !== 'awarded') {
        if (now > closingDate) {
          status = 'expired';
        } else if (openingDate && now >= openingDate && now <= closingDate) {
          status = 'active';
        } else if (!openingDate && now <= closingDate) {
          status = 'active';
        }
      }
      
      if (status !== data.attributes.Status) {
        await strapi.entityService.update('api::tender.tender', data.id, {
          data: { Status: status }
        });
        data.attributes.Status = status;
      }
    }

    return { data, meta };
  }
}));
