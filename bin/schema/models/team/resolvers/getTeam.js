"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _permission=require("../../../../utils/permission");var _default=_permission.requireAuth.createResolver((parent,{id},{models})=>models.Team.findOne({where:{id}}));exports.default=_default;
//# sourceMappingURL=getTeam.js.map