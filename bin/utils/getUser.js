"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _auth=require("./auth");var _jsonwebtoken=_interopRequireDefault(require("jsonwebtoken"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _default=async(req,res,next,models)=>{if(req.headers['x-token']){const token=req.headers['x-token'].replace('Bearer ','');try{const{user}=_jsonwebtoken.default.verify(token,process.env.SECRET);req.user=user;}catch(err){const refreshToken=req.headers['x-refresh-token'];const newTokens=await(0,_auth.refreshTokens)(token,refreshToken.replace('Bearer ',''),models,process.env.SECRET,process.env.SECRET2);if(newTokens.token&&newTokens.refreshToken){res.set('Access-Control-Expose-Headers','x-token, x-refresh-token');res.set('x-token',newTokens.token);res.set('x-refresh-token',newTokens.refreshToken);}req.user=newTokens.user;}}next();};exports.default=_default;
//# sourceMappingURL=getUser.js.map