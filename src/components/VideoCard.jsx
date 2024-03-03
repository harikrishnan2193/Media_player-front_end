import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { addToHistory, deleteAVideos } from '../services/allAPI';
import Modal from 'react-bootstrap/Modal';

function VideoCard({displayVedio , setDeleteVideoStatus}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async() => {
    setShow(true)

    //function to add to history
    const {caption , empadLink} = displayVedio
    const today = new Date()
    let timeStamp = new Intl.DateTimeFormat('en-GB',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(today)
    // console.log(timeStamp);

    let vedioDetils = {
      caption:caption,
      empadLink:empadLink,
      timeStamp
    }

    const responce = await addToHistory(vedioDetils)
    console.log(responce);
  }

  const removeVideo = async(id)=>{
    const responce = await deleteAVideos(id)
    setDeleteVideoStatus(true)
  }

  //function to drag a perticular card
  const dragStart = (e,id)=>{
    console.log(`card that draged is ${id}`);
    

    //using a method id sent to category
    e.dataTransfer.setData("vedioID",id)
  }

  return (
    <>
      <Card className='mb-4' style={{ width: '100%', height:'320px' }} draggable onDragStart={(e)=>dragStart(e,displayVedio?.id)}>
      <Card.Img onClick={handleShow} height={'200px'} variant="top" src={displayVedio.url} />
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-center'> <h6>{displayVedio.caption}</h6>
        <button onClick={()=>{removeVideo(displayVedio.id)}} className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
        </Card.Title>
      </Card.Body>
    </Card>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width="100%" height="315" src={`${displayVedio.empadLink}?autoplay=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default VideoCard