const INITIAL_STATE = {
    storyId: ''
}

const shareYourStoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_STORY_ID':
            return{
                ...state,
                storyId: action.storyId
            };
        default:
            return state;
    }
};

export default shareYourStoryReducer;