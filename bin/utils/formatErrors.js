"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _lodash=_interopRequireDefault(require("lodash"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const formatErrors=(err,models)=>{if(err instanceof models.Sequelize.ValidationError){return err.errors.map(x=>_lodash.default.pick(x,['path','message']));}return[{path:'name',message:'something went wrong'}];};var _default=formatErrors;exports.default=_default;
//# sourceMappingURL=formatErrors.js.map