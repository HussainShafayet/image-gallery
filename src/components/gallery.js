import React, {useState, useEffect} from 'react';
import ImageCard from './ImageCard';
import '.././assets/css/gallery.css';
import API_BASE_URL from '../apiConfig';

const Gallery = () => {
      const [images, setImages] = useState([]);
      const [selectedCount, setSelectCount] = useState(0);

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
          setImages(response.data)
        })
      }),[]);
       
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

          const handleImageClick = (imageId) => {
            const updatedImages = images.map((image) => {
            if (image.id === imageId) {
                image.isSelect = !image.isSelect;
            }
            return image;
            });

            setImages(updatedImages);
            calculateTotal()
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
            const totalItemCount = updatedImageList.filter((image) => image.isSelect).length;
            setSelectCount(totalItemCount);
           
        });
        }
        
    };

    
    const calculateTotal = () => {
		const totalItemCount = images.filter((image) => image.isSelect).length;
        console.log(totalItemCount,images.filter((image) => image.isSelect));
		setSelectCount(totalItemCount);
	};
  return (
    <div>
    Total Selected:{selectedCount} 
    <button onClick={handleDeleteSelected}>Delete Selected</button>
        <div className="gridLayout">
        {images.map((item)=>
            <div key={item.id} className={`${item.isFeatured ? 'child' : ''}`}  onClick={() => handleImageClick(item.id)} >
            <ImageCard isSelect={item.isSelect} imageUrl={API_BASE_URL + item.file} />
            </div>
            )}
            <div>
                <label htmlFor="imageInput" className="custom-file-upload card" >
                    <input type="file" id="imageInput" accept="image/*" onChange={handleAddImage} />
                        Upload Image
                </label>
            </div>
        </div>

    </div>
  )
}

export default Gallery;
