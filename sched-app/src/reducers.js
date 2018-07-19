import * as Actions from './actions';

const initial_state = (constants) => ({

    thematic_section_order: '',
    themes: ['', '', ''],

    thematic_surgery_order: '',
    thematic_family_order: '',
    thematic_med_order: '',

    rotationsByTheme: {Family: ['', '', ''],
                       Surgery: ['', '', ''],
                       Medicine: ['', '', '']},

    ...constants
});

export const reducers = (constants) => (state = initial_state(constants),
                                        action) => {
    switch (action.type){
    case Actions.SET_START_DATE:
        return {...state, startDate: action.startDate };
    case Actions.SET_END_DATE:
        return {...state, endDate: action.endDate };
    case Actions.SET_THEMATIC_SECTION_ORDER:
        return {...state,
                thematic_section_order: action.thematic_section_order.value,
                themes: action.thematic_section_order.value.split('-')
               };
    case Actions.SET_THEMATIC_MED_ORDER:
        return {...state,
                thematic_med_order: action.order.value,
                rotationsByTheme: {...state.rotationsByTheme,
                                   Medicine: action.order.value.split('-')}
               };
    case Actions.SET_THEMATIC_SURGERY_ORDER:
        return {...state,
                thematic_surgery_order: action.order.value,
                rotationsByTheme: {...state.rotationsByTheme,
                                   Surgery: action.order.value.split('-')}
               };
    case Actions.SET_THEMATIC_FAMILY_ORDER:
        return {...state,
                thematic_family_order: action.order.value,
                rotationsByTheme: {...state.rotationsByTheme,
                                   Family: action.order.value.split('-')}
               };
    case Actions.SET_DATES:
        let dates = [
            ...state[action.block].slice(0, action.idx),
            [action.key, action.dates],
            ...state[action.block].slice(action.idx+1)
        ];
        return {...state,
                [action.block]: dates};
    default:
        return state;
    }
};
