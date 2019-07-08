"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _logger=_interopRequireDefault(require("../../../../utils/logger"));var _permission=require("../../../../utils/permission");var _=require("..");var _pubsub=_interopRequireDefault(require("../../../../utils/pubsub"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};var ownKeys=Object.keys(source);if(typeof Object.getOwnPropertySymbols==='function'){ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable;}));}ownKeys.forEach(function(key){_defineProperty(target,key,source[key]);});}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var _default=_permission.requireAuth.createResolver(async(parent,args,{models,user})=>{try{const message=await models.Message.create(_objectSpread({},args,{userId:user.id}));const asyncFunc=async()=>{const currentUser=await models.User.findOne({where:{id:user.id}});_pubsub.default.publish(_.MESSAGE_ADDED,{channelId:args.channelId,messageAdded:_objectSpread({},message.dataValues,{user:currentUser.dataValues})});};asyncFunc();return true;}catch(err){_logger.default.error(err);return false;}});exports.default=_default;
//# sourceMappingURL=addMessage.js.map