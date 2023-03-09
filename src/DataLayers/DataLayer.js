import React, {createContext,useContext, useReducer} from "react";

export const DataLayerContext = createContext(); 

export const DataLayer = ({defaultState, reducer, children}) => {
    return(
        <DataLayerContext.Provider value={useReducer(reducer, defaultState)}>
            {
                children
            }
        </DataLayerContext.Provider>
    )
}

export const useDataLayerValue = () => useContext(DataLayerContext);

































