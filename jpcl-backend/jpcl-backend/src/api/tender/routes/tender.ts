/**
 * tender router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::tender.tender', {
  config: {
    find: {
      middlewares: ['api::tender.tender.populate']
    },
    findOne: {
      middlewares: ['api::tender.tender.populate']  
    }
  }
});

// Custom routes for tender management
export const customRoutes = {
  routes: [
    {
      method: 'GET',
      path: '/tenders/active',
      handler: 'tender.findActive',
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET', 
      path: '/tenders/expiring-soon',
      handler: 'tender.findExpiringSoon',
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/tenders/statistics',
      handler: 'tender.getStats',
      config: {
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST',
      path: '/tenders/update-expired',
      handler: 'tender.updateExpired',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
        middlewares: []
      }
    }
  ]
};
