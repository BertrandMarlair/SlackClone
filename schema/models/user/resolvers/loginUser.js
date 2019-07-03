import { tryLogin } from '../../../../utils/auth'

export default async (parent, {
    email,
    password
}, {
    models,
    SECRET,
    SECRET2
}) => tryLogin(email, password, models, SECRET, SECRET2)
