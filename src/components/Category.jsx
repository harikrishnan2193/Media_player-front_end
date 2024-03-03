import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Form, Row } from 'react-bootstrap';
import { addToCategory, deleteAcategory, getAllcatagory, getAvideo, updateCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Category() {

  const [categoryName , setCategoryName] = useState("")
  const [show, setShow] = useState(false);
  const [category , setCategory] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //function to add new category
  const handleAddCatogary = async() =>{
    // console.log(categoryName);
    if(categoryName){
      let body = {
        categoryName,
        allVideos:[]
      }
      const responce = await addToCategory(body)
      console.log( responce);
      if(responce.status>=200 && responce.status<300){
        toast.success('Category Uploded Successfully')
        //get all category
        allCategory()
        //to set category name empty
        setCategoryName("")
        //to close the modal
        handleClose()
      }
      else{
        toast.error('Some Thing Went Wrong')
      }
    }
    else{
      toast.info('Please Fill The Catogary Name')
    }
  }

  //function to get all category
  const allCategory = async()=>{
    const {data} = await getAllcatagory()
    // console.log(data);
    setCategory(data)
  }
  // console.log(category);

  //functon to delete a category
  const removeAcategory = async(id)=>{
    await deleteAcategory(id)
    //to get the remining category
    allCategory()
  }

  //function to prevent refresh for drag and drop
  const drageOver = (e)=>{
    e.preventDefault()
  }
  //function to drop video card to category
  const vedioDrop = async (e,categoryId)=>{
    console.log(`category in which video card droped is ${categoryId}`);
    let videoID = e.dataTransfer.getData("vedioID")
    console.log(videoID);
    //api to get a video
    const {data} = await getAvideo(videoID)
    console.log(data);
    //find methed used to get an oject from the array category
    let selectedCategory = category.find((item)=>(item.id===categoryId))
    // console.log(selectedCategory);
    //push the data inside the empty array that inside the selectedCategory
    selectedCategory.allVideos.push(data)
    console.log(selectedCategory);

    await updateCategory(categoryId,selectedCategory)
    allCategory()

  }

  useEffect(()=>{
    allCategory()
  },[])

  return (
    <>
      <div className='d-grid ms-3'>
        <button onClick={handleShow} className='btn btn-warning'>Add New Category</button>
      </div>
      {
        category?.length>0?
        category?.map((item)=>(<div className='m-5 border border-secondary p-3 rounded' droppable onDragOver={(e)=>(drageOver(e))} onDrop={(e)=>(vedioDrop(e,item?.id))}>
        <div className="d-flex justify-content-between align-items-center">
          <h6 className='fw-bold'>{item.categoryName}</h6>
          <button onClick={()=>{removeAcategory(item?.id)}} className='btn border-danger'><i class="fa-solid fa-trash"></i></button>
        </div>
        <Row>
          <Col>
            {
              item?.allVideos.length>0?
              item.allVideos.map((image)=>(<div className='ms-1 mt-3 border border-secondary p-2 rounded'>
                <div className='d-flex'>
                 <img className='ms-2' style={{ width: '160px', height:'80px' }} src={image.url} alt="no image" />

                 {/* <button className='btn  ms-3 mt-4 mb-4'><i class="fa-solid fa-xmark fa-fade fa-flip-horizontal"></i></button> */}
                
                </div>
               <p className='mb-1 d-flex justify-content-center text-warning '>{image.caption}</p>
              </div>))
              : 
              <p className='justify-content-center text-danger m-4'>Nothing To Display</p>
            }
          </Col>
        </Row>
      </div>))
        :
      <p className='fw-bolder fs-5 text-danger m-4'>Nothing To Display</p>
      }

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Category title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className=''>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Category Name" onChange={(e)=>setCategoryName(e.target.value)} />
            </Form.Group>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddCatogary} variant="warning">Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position='top-right' theme='colored' autoClose={2000}/>

    </>
  )
}

export default Category