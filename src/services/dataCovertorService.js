import {fileReaderRepository} from '../repositories'

const generateValue = (fieldKey, schema, data, isRequired, isVisible) => {
    const json = JSON.parse(schema[fieldKey]);
    json.value = (data && (data[fieldKey] || ""));
    json.required = isRequired;
    json.visibility = isVisible; 
    return JSON.stringify(json);
}

const getConfigAsObject = configArr => {
    return configArr.reduce((acc, conf) => (
        {
            ...acc,
            [conf.fieldKey]: {
                required: conf.require,
                visible: conf.visible,
            }
        }
    ),{})
}

const isEmptyObject = obj => obj && Object.keys(obj).length === 0 && obj.constructor === Object

const shouldNotDisplayRecord = configData => configData && !configData.visible

const recursiveBuildData = (fieldKey, schema, config, data, acc) => {

    const fieldKeysAsArray = fieldKey.split('.');
    const currentFieldKey = fieldKeysAsArray[fieldKeysAsArray.length -1];

    if(typeof schema[currentFieldKey] === "string"){
        const configData = config[fieldKey]

        if(shouldNotDisplayRecord(configData))
            return {...acc}
        return {
            ...acc,
            [currentFieldKey]: generateValue(currentFieldKey, 
                                            schema, 
                                            data, 
                                            configData && configData.required, 
                                            configData && configData.visible)
        }
    }

    const subAggregatedData = 
    Object.keys(schema && schema[currentFieldKey])
    .reduce((subAcc, subFieldKey)=> {
        return {
            ...subAcc,
            ...recursiveBuildData(`${fieldKey}.${subFieldKey}`, schema[currentFieldKey], config, data && data[currentFieldKey], subAcc)
        }
    }, {})

    if (isEmptyObject(subAggregatedData))
        return {...acc}
    return {
        ...acc,
        [currentFieldKey]: subAggregatedData
    }
};

const getFullDataJson = async (data) => {
    try{
        const config = await fileReaderRepository.readFromJson("config");
        const schema = await fileReaderRepository.readFromJson("schema");

        return Object.keys(schema)
        .reduce((acc, fieldKey) => {
            return {
                ...acc,
                ... recursiveBuildData(fieldKey, schema, getConfigAsObject(config), data, {})
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