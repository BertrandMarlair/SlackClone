"use strict";var _express=_interopRequireDefault(require("express"));var _http=_interopRequireDefault(require("http"));var _cors=_interopRequireDefault(require("cors"));var _bodyParser=_interopRequireDefault(require("body-parser"));var _middleware=require("graphql-voyager/middleware");var _index=_interopRequireWildcard(require("./schema/index"));var _logger=_interopRequireDefault(require("./utils/logger"));var _apolloServerExpress=require("apollo-server-express");var _graphqlTools=require("graphql-tools");var _getUser=_interopRequireDefault(require("./utils/getUser"));require("dotenv/config");function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}const app=(0,_express.default)();const httpServer=_http.default.createServer(app);var corsOptions={origin:'*',credentials:true};app.use((0,_cors.default)(corsOptions));app.use("/map",(0,_middleware.express)({endpointUrl:`http://localhost:${process.env.PORT}/`}));app.use(_bodyParser.default.text({type:"application/graphql"}));(0,_index.default)().then(models=>{if(!models){_logger.default.error('Could not connect to server');return null;}app.use((req,res,next)=>(0,_getUser.default)(req,res,next,models));const createServer=()=>new _apolloServerExpress.ApolloServer({schema:(0,_graphqlTools.makeExecutableSchema)({typeDefs:_index.typeDefs,resolvers:_index.resolvers}),context:({req})=>({models,user:req&&req.user,SECRET:process.env.SECRET,SECRET2:process.env.SECRET2})});createServer(true,true).applyMiddleware({app,path:"/explore"});models.sequelize.sync({force:false}).then(()=>{const endpoint=createServer();endpoint.installSubscriptionHandlers(httpServer);endpoint.applyMiddleware({app,path:"/"});httpServer.listen(process.env.PORT,()=>_logger.default.info(`Server ready. -> start on http://localhost:${process.env.PORT}/`));});});
//# sourceMappingURL=index.js.map