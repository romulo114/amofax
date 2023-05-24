import { createContext } from "react";
import axios from "axios";

const RulesContext = createContext()

function reducer(state, action){
    let { name, payload } = action

    if(name === 'SET_IGNORED_SHOPS'){
        return { ...state, ignoredShops: [...payload] }
    }

    if(name === 'SET_MARGINS'){
        return { ...state, margins: [...payload] }
    }

    if(name === 'SET_INVENTORY'){
        return { ...state, inventory: [...payload] }
    }

    if(name === 'SET_ACTIVE'){
        return { ...state, active: payload}
    }

    if(name === 'SET_ACTIVE_FEED'){
        return { ...state, activeFeed: payload}
    }

    if(name === 'SET_ACTIVE_INVENTORY'){
        return { ...state, activeInventory: payload }
    }

    if(name === 'SHOW_IGNORED_SHOPS'){
        return { ...state, showIgnoredShops: !state.showIgnoredShops}
    }

    if(name === 'SHOW_MARGINS'){
        return { ...state, showMargins: !state.showMargins }
    }

    if(name === 'SET_LOADING_MESSAGE'){
        return { ...state, loadingMessage: payload }
    }

    if(name === 'SET_PRINTERS_DATA'){
        return { ...state, printersData: payload}
    }

    if(name === 'SET_PRICES_GLOBAL_CONFIGURATION_STARTED'){
        return { ...state, pricesGlobalConfigurationRun: payload}
    }

    if(name === 'SET_PRICES_GLOBAL_CONFIGURATION_ACTIVE_INDEX'){
        return { ...state, pricesGlobalConfigurationActiveIndex: payload }
    }

    if(name === 'SET_PROGRESS_BAR_WIDTH'){
        return { ...state, progressBarWidth: payload }
    }
    
    if(name === 'SET_PRICES_GLOBAL_CONFIGURATION_CURRENT_STATE'){
        return { ...state, pricesGlobalConfigurationCurrentState: [ ...state.pricesGlobalConfigurationCurrentState , payload ] }
    }

    if(name === 'SET_PROFIT_MARGINS'){
        return { ...state, profitMargins: payload }
    }

    if(name === 'SHOW_PROFIT_MARGINS'){
        return { ...state, showProfitMargins: !state.showProfitMargins }
    }

    if(name === 'SET_SOURCES'){
        return { ...state, sources: payload}
    }

    if(name === 'EXTERNAL_SEARCH_TRIGGERED'){
        return { ...state, externalSearchTriggered: !state.externalSearchTriggered }
    }

    return { ...state}
}

function middleware(dispatch){
    return async action => {
        let { name, payload } = action;

        if(name === 'GET_IGNORED_SHOPS'){
            let res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + '/get_ignored_shops')

            dispatch({name: 'SET_IGNORED_SHOPS', payload: res.data})
        }else if(name === 'GET_MARGINS'){
            let res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + '/get_margins')

            dispatch({name: 'SET_MARGINS', payload: res.data})
        }else if(name === 'GET_INVENTORY'){
            let res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + '/admin/get_inventory', {matnr: payload})

            let { sources, combinedSources } = res.data;

            dispatch({name: 'SET_INVENTORY', payload: combinedSources})
        }else if(name === 'GET_PRINTERS_DATA'){
            const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + '/get_printers_admin')

            dispatch({ name: 'SET_PRINTERS_DATA', payload: res.data })
        }else if(name === 'GET_PROFIT_MARGINS'){
            let res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + '/admin/get_profit_margins')

            dispatch({name: 'SET_PROFIT_MARGINS', payload: res.data })
        }
        else{
            dispatch(action)
        }
    }
}
export { RulesContext, reducer, middleware} ;