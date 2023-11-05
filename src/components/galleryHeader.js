import React from 'react'

const GalleryHeader = (props)=> {
  const {selectedCount} = props;
  return (
    <>
        <div className="form-check d-flex justify-content-start align-items-center">
            {(selectedCount>0)?<>
                <input className="form-check-input mt-0" type="checkbox" checked={(selectedCount>0)? true : false} readOnly />
                <label className="form-check-label fw-bold" style={{marginLeft:6 +'px'}} htmlFor="flexCheckChecked">
                    {selectedCount} Files Selected
                </label>
            </>:<>
                <span className='fw-bold'>Gallery</span>
            </>}
            
        </div>
    </>
  )
}
export default GalleryHeader;
