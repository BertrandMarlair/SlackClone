"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _logger=_interopRequireDefault(require("../../../../utils/logger"));var _formatErrors=_interopRequireDefault(require("../../../../utils/formatErrors"));var _permission=require("../../../../utils/permission");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){keys.push.apply(keys,Object.getOwnPropertySymbols(object));}if(enumerableOnly)keys=keys.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){if(i%2){var source=arguments[i]!=null?arguments[i]:{};ownKeys(source,true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(arguments[i]));}else{ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(arguments[i],key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var _default=_permission.requireAuth.createResolver(async(parent,args,{models,user})=>{try{const response=await models.sequelize.transaction(async()=>{const team=await models.Team.create(_objectSpread({},args));await models.Channel.create({name:"general",public:true,teamId:team.id});await models.Member.create({teamId:team.id,userId:user.id,admin:true});return team;});return{ok:true,team:response};}catch(err){_logger.default.error(err);return{ok:false,errors:(0,_formatErrors.default)(err,models)};}});exports.default=_default;
//# sourceMappingURL=addTeam.js.map