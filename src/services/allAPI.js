import { commonAPI } from "./commonAPI"
import { baseUrl } from "./serverURL"



export const uploadAllVideo = async(reqbody)=>{
    return await commonAPI('POST',`${baseUrl}/videos`,reqbody)
}

//get all vedios from json server

export const getAllVideos =async()=>{
    return await commonAPI('GET',`${baseUrl}/videos`,"")
}

//api to delete a video

export const deleteAVideos =async(id)=>{
    return await commonAPI('DELETE',`${baseUrl}/videos/${id}`,{})
}

//add to wachlist

export const addToHistory = async(vedioDetils)=>{
    return await commonAPI('POST',`${baseUrl}/history`,vedioDetils)
}

//get all history data from jason server

export const getAllWatchHistory =async()=>{
    return await commonAPI('GET',`${baseUrl}/history`,"")
}

//delete an item from wach history

export const deleteAWatchHistory =async(id)=>{
    return await commonAPI('DELETE',`${baseUrl}/history/${id}`,{})
}

//api to add category

export const addToCategory = async(body)=>{
    return await commonAPI('POST',`${baseUrl}/catagories`,body)
}

//api to get catagory

export const getAllcatagory =async()=>{
    return await commonAPI('GET',`${baseUrl}/catagories`,"")
}

//api to delete category

export const deleteAcategory =async(id)=>{
    return await commonAPI('DELETE',`${baseUrl}/catagories/${id}`,{})
}

//api to get a perticular vedio

export const getAvideo =async(id)=>{
    return await commonAPI('GET',`${baseUrl}/videos/${id}`,"")
}

//api to update cateagory

export const updateCategory =async(id,body)=>{
    return await commonAPI('PUT',`${baseUrl}/catagories/${id}`,body)
}


