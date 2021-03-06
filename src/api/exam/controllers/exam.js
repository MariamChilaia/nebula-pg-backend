"use strict";

/**
 *  exam controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::exam.exam", ({ strapi }) => ({
  setMessengerId: async (ctx, next) => {
    const { messengerId, chatbotKey } = ctx.request.body;
    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({
        where: { chatbotKey: chatbotKey },
      });
    const entry = await strapi.db
      .query("plugin::users-permissions.user")
      .update({
        where: { id: user.id },
        data: {
          messengerId: messengerId,
        },
      });
    return user.id;
  },
}));
