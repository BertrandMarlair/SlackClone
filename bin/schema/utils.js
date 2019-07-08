"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.arangoElementResolver=exports.generateResolvers=exports.generateTypeDefs=void 0;function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};var ownKeys=Object.keys(source);if(typeof Object.getOwnPropertySymbols==='function'){ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable;}));}ownKeys.forEach(function(key){_defineProperty(target,key,source[key]);});}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}const parseDefinitions=(arr,key)=>arr.map(({[key]:{definitions=""}={}})=>definitions).join("\n");const generateTypeDefs=models=>`
    ${parseDefinitions(models,"types")}

    type Query {
        ${parseDefinitions(models,"queries")}
    }

    type Mutation {
        ${parseDefinitions(models,"mutations")}
    }

    type Subscription {
        ${parseDefinitions(models,"subscriptions")}
    }
`;exports.generateTypeDefs=generateTypeDefs;const generateResolvers=models=>{let resolvers={Query:{},Mutation:{},Subscription:{}};models.forEach(({types={},queries={},mutations={},subscriptions={}})=>{if(types.resolvers){resolvers=_objectSpread({},resolvers,types.resolvers);}if(queries.resolvers){resolvers.Query=_objectSpread({},resolvers.Query,queries.resolvers);}if(mutations.resolvers){resolvers.Mutation=_objectSpread({},resolvers.Mutation,mutations.resolvers);}if(subscriptions.resolvers){resolvers.Subscription=_objectSpread({},resolvers.Subscription,subscriptions.resolvers);}});return resolvers;};exports.generateResolvers=generateResolvers;const arangoElementResolver={id({_key}){return _key;}};exports.arangoElementResolver=arangoElementResolver;
//# sourceMappingURL=utils.js.map