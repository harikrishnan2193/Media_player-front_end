import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteAWatchHistory, deleteAllWatchHistory, getAllWatchHistory } from '../services/allAPI'

function WatchHistory() {

  const [history , setHistory] = useState([])

  const WatchAllHistory = async()=>{
    const {data} = await getAllWatchHistory()
    // console.log(data);
    setHistory(data)
  }
  // console.log(history);

  //function for delete a watch history
  const removeWatchHistory = async(id)=>{
    await deleteAWatchHistory(id)
    //function for get all removing history
    WatchAllHistory()
  }



  useEffect(()=>{
    WatchAllHistory()
  },[])

  return (
    <>
      <div className="container mt-5 d-flex justify-content-between">
      <h3>Watch History</h3>
      
      <Link to={'/home'} className={'d-flex align-items-center'} style={{textDecoration:'none',color:'white',fontSize:'20px'}}>
      <i class="fa-solid fa-arrow-right"></i> Back to Home</Link>
     </div>

     <div className='d-flex justify-content-end align-items-center'>
      {/* <h5 className='mt-4 me-4'> <a href="" className='text-warning me-5 fw-bold' style={{textDecoration:'none'}}><i class="fa-solid fa-rotate-right fa-spin"></i> Clear All Watch History </a> </h5> */}
     </div>

     <table className='table mt-5 mb-5 container'>
      <thead>
      <tr>
        <th>#</th>
        <th>caption</th>
        <th>url</th>
        <th>time stemp</th>
        <th>Action</th>
      </tr>
      </thead>
      <tBody>
        {
          history?.length>0?
          history?.map((item , index)=>(<tr>
            <td style={{color:'white'}}>{index+1}</td>
            <td style={{color:'white'}}>{item.caption}</td>
            <td><a href={item.empadLink} target='_blank'>{item.empadLink}</a></td>
            <td style={{color:'white'}}>{item.timeStamp}</td>
            <td><button onClick={()=>{removeWatchHistory(item.id)}} className='btn btn-danger'><i class="fa-solid fa-trash"></i></button></td>
          </tr>))
        :
        <p className='fw-bolder fs-5 text-danger m-4'>NOTHING TO DISPLAY</p>
        }
      </tBody>
     </table>
    </>
  )
}

export default WatchHistory