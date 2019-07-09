// import {requireAuth} from "../../../../utils/permission";

// export default requireAuth.createResolver(
//     (parent, {teamid, ortherUser}, {models}) => {
//         return models.DirectMessage.findAll({
//             where: {
//                 teamid,
//                 [$or]: [
//                     {
//                         [$and]: [
//                             {sendId: ortherUser},
//                             {receiverId: userInfo.id},
//                         ],
//                     },
//                     {
//                         [$and]: [
//                             {sendId: userInfo.id},
//                             {receiverId: ortherUser},
//                         ],
//                     },
//                 ],
//             },
//             order: [["created_at", "DESC"]],
//         });
//     },
// );

export default (parent, args, {models}) => models.DirectMessage.findAll({});
