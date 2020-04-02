import * as Repositories from "../repositories";

export default async function usersService(req) {
    const usersResult = await Repositories.UsersRepository(req);

    return new Promise((resolve, reject) => {
       return resolve(usersResult);
    });
}