import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getAllVideos } from '../services/allAPI'

function View({uploadVideoStatus}) {

  const [allVideo , setAllVideo] = useState([])
  const [deleteVideoStatus , setDeleteVideoStatus] = useState(false)

  const getAllUploadeVideos = async()=>{
    const response = await getAllVideos()
    //console.log(response);
    const {data} = response
    // console.log(data);
    setAllVideo(data)
  
  }

  console.log(allVideo);

  useEffect(()=>{
    getAllUploadeVideos()
    setDeleteVideoStatus(false)
  },[uploadVideoStatus , deleteVideoStatus])

  return (
    <>
      <Row>
        {allVideo.length>0?
        allVideo.map((video)=>(<Col sm={12} md={6} lg={4} xl={3}>
          <VideoCard displayVedio={video} setDeleteVideoStatus={setDeleteVideoStatus}/>
        </Col>))
          :
        <p>Nothing to Display</p>
        }
      </Row>
    </>
  )
}

export default View