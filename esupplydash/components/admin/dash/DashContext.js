import { createContext } from "react";

const DashContext = createContext()

function reducer(state, action){
    let { name, payload } = action

    if(name === 'addButtons'){
        return {...state, buttonList: payload }
    }

    if(name === 'setActive'){
        return {...state, activeButton: payload}
    }

    if(name === 'setActive'){
        return {...state, activeHeading: payload}
    }

    if(name === 'addHeadings'){
        return { ...state, headingList: payload }
    }

    if(name === 'addHeadings2x3'){
        return { ...state, headingList2x3: payload }
    }

}

export { DashContext, reducer } ;