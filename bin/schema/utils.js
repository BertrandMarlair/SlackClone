"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.arangoElementResolver=exports.generateResolvers=exports.generateTypeDefs=void 0;function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){keys.push.apply(keys,Object.getOwnPropertySymbols(object));}if(enumerableOnly)keys=keys.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){if(i%2){var source=arguments[i]!=null?arguments[i]:{};ownKeys(source,true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(arguments[i]));}else{ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(arguments[i],key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}const parseDefinitions=(arr,key)=>arr.map(({[key]:{definitions=""}={}})=>definitions).join("\n");const generateTypeDefs=models=>`
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
`;exports.generateTypeDefs=generateTypeDefs;const generateResolvers=models=>{let resolvers={Query:{},Mutation:{},Subscription:{}};models.forEach(({types={},queries={},mutations={},subscriptions={}})=>{if(types.resolvers){resolvers=_objectSpread({},resolvers,{},types.resolvers);}if(queries.resolvers){resolvers.Query=_objectSpread({},resolvers.Query,{},queries.resolvers);}if(mutations.resolvers){resolvers.Mutation=_objectSpread({},resolvers.Mutation,{},mutations.resolvers);}if(subscriptions.resolvers){resolvers.Subscription=_objectSpread({},resolvers.Subscription,{},subscriptions.resolvers);}});return resolvers;};exports.generateResolvers=generateResolvers;const arangoElementResolver={id({_key}){return _key;}};exports.arangoElementResolver=arangoElementResolver;
//# sourceMappingURL=utils.js.map