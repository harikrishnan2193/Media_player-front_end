import React, { useState } from 'react'
import Add from '../components/Add'
import Category from '../components/Category'
import { Link } from 'react-router-dom'
import View from '../components/View'

function Home() {

  const [uploadVideoStatus , setUploadVideoStatus] = useState({})
  
  return (
    <>
      <div className='container mt-5 mb-5 d-flex justify-content-between align-items-center'>
      <div className='add-videos'>
        <Add setUploadVideoStatus={setUploadVideoStatus}/>
      </div>
      <div>
        <div className='mb-5'>
          <Link to={'/'} className={'d-flex align-items-center'} style={{textDecoration:'none',color:'orange',fontSize:'20px'}}>
          <i class="fa-solid fa-arrow-right"></i>Back to Dashbord</Link>
        </div>
        <Link to={'/watch-history'} style={{textDecoration:'none',color:'white',fontSize:'30px'}}>Watch History</Link>
      </div>
     </div>
     <div className='container-fluid w-100 mt-5 mb-5 d-flex justify-content-between' >
      <div className='all-videos col-lg-9'>
        <h4 className='mb-5'>All Vedios</h4>
        <View uploadVideoStatus={uploadVideoStatus} />
      </div>
      <div className='category col-lg-3'>
        <Category/>
      </div>
     </div>
    </>
  )
}

export default Home