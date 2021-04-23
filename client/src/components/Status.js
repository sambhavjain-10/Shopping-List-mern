import React from 'react'

function Status(props) {

    return (
        <div class={props.active ? "status active" : "status"} style={props.action === "ADDED" ? {backgroundColor: "green"} : {backgroundColor: "red"}}>
            <span>{props.action} A ITEM</span>
            <span></span>
        </div>
    )
}

export default Status