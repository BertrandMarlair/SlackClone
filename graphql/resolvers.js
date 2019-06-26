/* eslint-disable no-unused-vars */
import axios from 'axios';

const resolvers = {
    Query: {
        hi: (parent, args, context, indo) => {
            return axios.get(`www.apiurl.com/people`)
                .then((response) => response.data)
                .catch((error) => console.log(error))
        }
    }
};

export default resolvers;