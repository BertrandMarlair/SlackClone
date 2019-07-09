"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _logger=_interopRequireDefault(require("../../../../utils/logger"));var _permission=require("../../../../utils/permission");var _=require("..");var _pubsub=_interopRequireDefault(require("../../../../utils/pubsub"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){keys.push.apply(keys,Object.getOwnPropertySymbols(object));}if(enumerableOnly)keys=keys.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){if(i%2){var source=arguments[i]!=null?arguments[i]:{};ownKeys(source,true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(arguments[i]));}else{ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(arguments[i],key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var _default=_permission.requireAuth.createResolver(async(parent,args,{models,user})=>{try{const message=await models.Message.create(_objectSpread({},args,{userId:user.id}));const asyncFunc=async()=>{const currentUser=await models.User.findOne({where:{id:user.id}});_pubsub.default.publish(_.MESSAGE_ADDED,{channelId:args.channelId,messageAdded:_objectSpread({},message.dataValues,{user:currentUser.dataValues})});};asyncFunc();return true;}catch(err){_logger.default.error(err);return false;}});exports.default=_default;
//# sourceMappingURL=addMessage.js.map