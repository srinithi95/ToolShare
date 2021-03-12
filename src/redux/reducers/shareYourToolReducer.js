const INITIAL_STATE = {
    toolId: ''
}

const shareYourToolReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_TOOL_ID':
            return{
                ...state,
                toolId: action.toolId
            };
        default:
            return state;
    }
};

export default shareYourToolReducer;