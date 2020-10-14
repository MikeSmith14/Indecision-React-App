import React from 'react'

//Option component for individual option on list
const Option = (props) => (
    <div className="option"> 
        <p className="option__text">{props.count}. {props.optionText}</p>
        <button 
            className="button button--link"
            onClick={(e) => {
                props.handleDeleteOption(props.optionText)
            }}
        >
            Remove
        </button>
    </div>
)


export default Option