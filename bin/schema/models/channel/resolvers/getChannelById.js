"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _permission=require("../../../../utils/permission");var _default=_permission.requireAuth.createResolver((parents,{id,teamId},{models})=>models.Channel.findOne({where:{id,teamId}}));exports.default=_default;
//# sourceMappingURL=getChannelById.js.map