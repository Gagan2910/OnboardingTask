import React from 'react'
const IdComponent=(props)=>{
    return(
      <button style={{backgroundColor:"#2185d0",color:"white",float:"right"}} onClick={props.onClick} value={props.name}>{props.name}</button>
      )
  }
  export default IdComponent