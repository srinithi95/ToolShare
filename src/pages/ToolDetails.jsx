import React from 'react';
import ToolPosting from './toolPosting';

const ToolDetails = (propTool) =>{
    return(
        <div className="story-wrapper">
      <div>
        <b>{propTool.tool.tool_name}</b>
      </div>
      <div>
        <i>{propTool.tool.description}</i>
      </div>
      <div className="story-inside-wrapper">
        <span className="margin-20px width-100px">Availability:</span>
        <span className="margin-20px width-100px">{propTool.tool.availability}</span>
      </div>
      <div>
        <span className="margin-20px width-100px">Make:</span>
        <span className="margin-20px width-100px">{propTool.tool.make}</span>
      </div>
      <div>
        <span className="margin-20px width-100px">Model:</span>
        <span className="margin-20px width-100px">{propTool.tool.model_name}</span>
      </div>
    </div>
    )
}

export default ToolDetails;