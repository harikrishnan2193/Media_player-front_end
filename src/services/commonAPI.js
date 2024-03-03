import axios from "axios"



export const commonAPI = async (httpMethod,url,reqbody)=>{
    let reqConfig = {
        method:httpMethod,
        url:url,
        data:reqbody,
        Headers:{
            "Content-Type":"application/json"
        }
    }
    return await axios(reqConfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
}