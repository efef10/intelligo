import {fileReaderRepository} from '../repositories'



const recursiveFindData = (keysArr, schema, data, acc, isRequired, isVisible) => {
    const fieldKey = keysArr[0];

    if(keysArr.length === 1){
        let json = {};
        if(schema && schema[fieldKey])
            json = JSON.parse(schema[fieldKey]);
        
        json.value = (data && (data[fieldKey] || ""));
        json.required = isRequired;
        json.visibility = isVisible; 

        return {
           [fieldKey]: JSON.stringify(json),
        }
    }
    return {
        [fieldKey]: {
            ...acc[fieldKey],
            ...recursiveFindData(keysArr.slice(1), 
                                schema && schema[fieldKey], 
                                data && data[fieldKey], 
                                acc && acc[fieldKey], 
                                isRequired, 
                                isVisible)
        }
       
    }
};

const getFullDataJson = async (data) => {
    try{
        const config = await fileReaderRepository.readFromJson("config");
        const schema = await fileReaderRepository.readFromJson("schema");
        return config
            .filter(conf => conf.visible)
            .reduce((acc, conf) => {
                return {
                    ...acc, 
                    ...recursiveFindData(conf.fieldKey.split('.'), schema, data, acc, conf.require, conf.visible),
                } 
            }, {});
    }
    catch(err){
        throw `failed to get data, error: ${err}`;
    }
};

export {
    getFullDataJson,
};