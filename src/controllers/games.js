import {JsonController, Get} from "routing-controllers";

@JsonController
export class gamesController{
    @Get("/games")
    async getGames(req,res){
        res.json({response:"bbb"})
    }
}

// export default async function (req, res) {
//     debugger
//     const usersResult = await UsersService(req);

//     res.json({response: usersResult});
// }