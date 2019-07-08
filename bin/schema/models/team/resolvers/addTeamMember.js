"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _logger=_interopRequireDefault(require("../../../../utils/logger"));var _formatErrors=_interopRequireDefault(require("../../../../utils/formatErrors"));var _permission=require("../../../../utils/permission");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _default=_permission.requireAuth.createResolver(async(parent,{email,teamId},{models,user})=>{try{const teamPromise=models.Team.findOne({where:{id:teamId}},{raw:true});const userToAddPromise=models.User.findOne({where:{email}},{raw:true});const[team,userToAdd]=await Promise.all([teamPromise,userToAddPromise]);if(team.owner!==user.id){return{ok:false,errors:[{path:'email',message:"You can't add member to a team because yout are not the owner"}]};}if(!userToAdd){return{ok:false,errors:[{path:'email',message:"No user found for this email"}]};}console.log(userToAdd.id,teamId);await models.Member.create({userId:userToAdd.id,teamId});return{ok:true};}catch(err){_logger.default.error(err);return{ok:false,errors:(0,_formatErrors.default)(err,models)};}});exports.default=_default;
//# sourceMappingURL=addTeamMember.js.map