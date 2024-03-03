import React, { version } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { uploadAllVideo } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({setUploadVideoStatus}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[videos , setVideos] = useState({
    id:"",
    caption:"",
    url:"",
    empadLink:""
  })
  console.log(videos);

  const empadVedioLink = (e)=>{
    const {value} = e.target
    console.log(value.slice(-11));
    const link = `https://www.youtube.com/embed/${value.slice(-11)}`
    setVideos({...videos,empadLink:link})
  }

  const handleUpload = async()=>{
    const {id,caption,url,empadLink} = videos
    if(!id || !caption || !url || !empadLink){
      toast.warning('Please fill the form completely')
    }
    else{
      const response = await uploadAllVideo(videos)
      console.log(response);
      if(response.status>=200 && response.status<300){
        setUploadVideoStatus(response.status)
        toast.success(`${response.data.caption} is successfully uploaded`)

        //mack the modal empty after upload
        setVideos({
          id:"",
          caption:"",
          url:"",
          embedLink:""
        })

        handleClose()
      }
      else{
        console.log(response);
        toast.error('Something went wrong... Try again later')
      }
    }
  }


  return (
    <>
        <div className='d-flex align-items-center'>
        <h5>Upload New video</h5>
        <button onClick={handleShow} className='btn'><i class="fa-solid fa-cloud-arrow-up fs-5"></i></button>
    </div>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-film "></i> Upload videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Please Fill The Following Detils</p>
        <form className='border border-secondary rounded p-3'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter Video Id" onChange={(e)=>setVideos({...videos,id:e.target.value})}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter Video Caption" onChange={(e)=>setVideos({...videos,caption:e.target.value})}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter Video Image url" onChange={(e)=>setVideos({...videos,url:e.target.value})}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Enter Youtub Video Link" onChange={empadVedioLink}/>
        </Form.Group>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cansel
          </Button>
          <Button variant="warning" onClick={handleUpload}>Upload</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position='top-right' theme='colored' autoClose={2000}/>

    </>
  )
}

export default Add