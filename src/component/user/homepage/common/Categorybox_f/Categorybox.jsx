import React from 'react'

export default function Categorybox(props) {
    return (
        <div id="categorybox-maindiv">

            <div id="categorybox-subdiv1">
                <img src={props.img} ></img>
            </div>
            <div id="categorybox-subdiv2">
                <div id="categorybox-subdiv2-namediv">{props.name}</div>
                <div id="categorybox-subdiv2-explorediv">Explore</div>
            </div>
        </div>
    )
}
