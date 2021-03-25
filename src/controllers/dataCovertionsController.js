import {dataCovertorService} from '../services';

const getFullDataJson = async (req, res) => {
    try {
        res.json({data: await dataCovertorService.getFullDataJson(req.body)});
    }
    catch(err){
        res.send(JSON.stringify(err));
    }
};

export {
    getFullDataJson,
};
