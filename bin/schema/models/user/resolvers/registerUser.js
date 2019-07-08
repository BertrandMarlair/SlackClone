"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _logger=_interopRequireDefault(require("../../../../utils/logger"));var _formatErrors=_interopRequireDefault(require("../../../../utils/formatErrors"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _default=async(parent,args,{models})=>{try{const user=await models.User.create(args);return{ok:true,user};}catch(err){_logger.default.error(err);return{ok:false,errors:(0,_formatErrors.default)(err,models)};}};exports.default=_default;
//# sourceMappingURL=registerUser.js.map