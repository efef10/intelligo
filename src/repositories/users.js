import models from '../db/connect';

export default async function (req) {

    const user = new models.User({
        username: req.body.username,
        users: [],
        language: "en",
    });

    try {
        await user.save();
        return "successfuly save user";
    }
    catch(err){
        console.log(error)
    }
}