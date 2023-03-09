// import Cars from '../data'
export const defaultState = {
    // cars : [ ],
    user: {},
    filterCatagory: { Sport: true, SUV: true, MPV: true, Sedan: true, Coupe: true, Hatchback: true, },
    filterCapacity: { '2': true, '4': true, '6': true, '8': true, },
}
   


const reducer = (state,action) => {
    switch(action.type) {
        // case 'UPDATE_CAR':
        //     return {
        //         ...state,
        //         cars: action.newCars
        //     }
        // case 'ADD_CAR':
        //     const newCars = [...state.cars,action.car]
        //     return {
        //         ...state, 
        //         cars: newCars
        //     }
        case 'SET_USER': 
            return {
                ...state,
                user: action.user
            }
        case 'SET_FILTER_CATAGORY':
            if(Object.values(action.filterCatagory).every((value) => value === false)) {
                return {
                    ...state,
                    filterCatagory: { Sport: true, SUV: true, MPV: true, Sedan: true, Coupe: true, Hatchback: true, }
                }
            }
            return {
                ...state,
                filterCatagory: action.filterCatagory
            }
        case 'SET_FILTER_CAPACITY':
            if(Object.values(action.filterCapacity).every((value) => value === false)) {
                return {
                    ...state,
                    filterCapacity: { '2': true, '4': true, '6': true, '8': true, }
                }
            }
            return {
                ...state,
                filterCapacity: action.filterCapacity
            }
        default: 
            return state;
    }
}

export default reducer;