import React, {useState, useEffect} from 'react';
import ImageCard from './ImageCard';
import '.././assets/css/gallery.css';
import API_BASE_URL from '../apiConfig';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [selectedCount, setSelectedCount] = useState(
    images.filter((image) => image.isSelect).length
    );
    const imageUrl = require('../assets/images/photo.png');
    

    useEffect((()=>{
    let url = `${API_BASE_URL}/imagepost/`;
    const requestOptions = {
        method:"GET",
        headers:{"Content-Type":"application/json"}
    }
    fetch(url,requestOptions)
    .then((res)=>res.json())
    .then((response)=>{
        console.log('res',response.data);
        setImages(response.data);
    })
    }),[]);

    useEffect(() => {
    const count = images.filter((image) => image.isSelect).length;
    setSelectedCount(count);
    }, [images]);
    
    
    const handleAddImage = async (e)=>{
        e.preventDefault();
        let url =  `${API_BASE_URL}/imagepost/`;

        const formData = new FormData();
        formData.append('file',  e.target.files[0]);
        const requestOptions = {
            method: "POST",
            body: formData,
        };
        fetch(url,
            requestOptions
        )
            .then((res) => res.json())
            .then((response) => {
            console.log('data',response)

            // add the new image to the list
            setImages((prevImages) => [...prevImages, response.data]);
        });
        }

    const handleImageClick = (image) => {
        let url =  `${API_BASE_URL}/imageedit/`;
    
        const requestOptions = {
            method: "PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({id:image.id,isSelect: !image.isSelect}),
        };
        fetch(url,
            requestOptions
        )
            .then((res) => res.json())
            .then((response) => {
            console.log('data edit',response)

            //udpate images list
            const updatedImageData = response.data;
            setImages((prevImages) =>
                prevImages.map((image) =>
                image.id === updatedImageData.id ? updatedImageData : image
                )
            );
            calculateTotal(images);
        
        });
    };

    const handleDeleteSelected = async () => {
        let deleteList = [];
        const updatedImageList = images.filter((image) => {
            if(image.isSelect){
                deleteList.push(image.id);
            }else{
                return image;
            }
        });
        if (deleteList.length>0) {
            let url =  `${API_BASE_URL}/imagedelete/`;
    
            const requestOptions = {
                method: "DELETE",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(deleteList),
            };
            fetch(url,
                requestOptions
            )
                .then((res) => res.json())
                .then((response) => {
                console.log('data',response)

                //udpate images list
                setImages(updatedImageList);
                calculateTotal(updatedImageList)
            
            });
        }
        
    };


    const calculateTotal = (data) => {
        const totalItemCount = data.filter((image) => image.isSelect).length;
        setSelectedCount(totalItemCount);
    };



    const onDragEnd = (result) => {
        if (!result.destination) {
          return;
        }
    
        const reorderedImages = [...images];
        const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, reorderedImage);
    
        setImages(reorderedImages);
      };
  return (
    <div>
        <div className='d-flex justify-content-center align-items-center w-100 p-3'>
            <div className='galleryArea shadow bg-white rounded'>
                <div className='p-3 d-flex justify-content-between align-items-center'>
                    <div className="form-check d-flex justify-content-start align-items-center">
                        <input className="form-check-input mt-0" type="checkbox" checked={(selectedCount>0)? true : false} readOnly />
                        <label className="form-check-label fw-bold" style={{marginLeft:6 +'px'}} htmlFor="flexCheckChecked">
                            {selectedCount} Files Selected
                        </label>
                    </div>

                    {selectedCount>0 && 
                        <span className="text-danger fw-bold" style={{cursor:'pointer'}} onClick={handleDeleteSelected}>Delete Files</span>
                    }
                    
                </div>
                <hr className='m-0'/>
                
                <div className="gallery p-2">
                    {images.map((item, index)=>
                    <div key={item.id} className={`${index === 0 ? 'featured' : ''}`}  onClick={() => handleImageClick(item)} >
                    <ImageCard isSelect={item.isSelect} imageUrl={API_BASE_URL + item.file} />
                    </div>
                    )}
                    <div className='imgAdd'>
                        <label htmlFor="imageInput" className="custom-file-upload card" >
                            <input type="file" id="imageInput" accept="image/*" onChange={handleAddImage} />
                            
                            <div className='labelText'>
                                <img src={imageUrl} alt='img icon' className='mb-2' style={{height:20+'px',width:20+'px'}} ></img>
                                Add Images
                            </div>
                             
                        </label>
                    </div>
                </div>
                {/*<div className='gridLayout'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId='Gallery'>
                            {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {images.map((image, index) => (
                                <Draggable key={image.id.toString()} draggableId={image.id.toString()} index={index}>
                                    {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <div key={image.id} className={`${index === 0 ? '' : ''}`}  onClick={() => handleImageClick(image)} >
                                            <ImageCard isSelect={image.isSelect} imageUrl={API_BASE_URL + image.file} />
                                        </div>

                                    </div>
                                    )}
                                </Draggable>
                                ))}
                            </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>*/}
            
                


            </div>
        </div>
    </div>
  )
}

export default Gallery;
