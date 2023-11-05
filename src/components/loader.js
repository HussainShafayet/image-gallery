import React from 'react'

const Loader = (props)=> {
    const { className, style } = props;
  return (
    <>
    <div className={className} style={style}>
        <div class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    </>
  )
}
export default Loader;