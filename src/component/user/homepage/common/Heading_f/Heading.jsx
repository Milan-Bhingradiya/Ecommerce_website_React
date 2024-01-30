import React from 'react'
import infinitylogo from "../../../../../assets/Infinity.png"


export default function Heading(props) {
    return (
        <>      
         <div id="heading-maindiv">
         <div id="heading-horizontal-line-div">
                <div></div>
                <img src={infinitylogo}></img>
                <div></div>
                <hr />
            </div>

            <h3>{props.title}</h3>
            <p>{props.desc}</p>

        </div>
           
        </>
    )
}
