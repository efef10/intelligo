import {UsersService} from '../services'

export default async function (req, res) {
    debugger
    const usersResult = await UsersService(req);

    res.json({response: usersResult});
}