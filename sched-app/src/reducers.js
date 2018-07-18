import * as Actions from './actions';

const initial_state = {

    thematic_section_order: '',
    thematic_surgery_order: '',
    thematic_med_order: '',
    thematic_family_order: '',
    themes: ['', '', ''],

    startDate: 'July 5, 2018',
    endDate: 'April 26, 2019',

    fces1: [
        ["1a", ['June 4, 2018', 'June 8, 2018']],
        ["1b", ['July 9, 2018', 'July 13, 2018']],
        ["1c", ['August 16, 2018', 'August 20, 2018']]
    ],

    fces2: [
        ["2a", ['September 24, 2018', 'September 28, 2018']],
        ["2b", ['October 1, 2018', 'October 5, 2018']],
        ["2c", ['November 5, 2018', 'November 9, 2018']]
    ],

    fces3:  [
        ["3a", ['February 4, 2019', 'February 8, 2019']],
        ["3b", ['March 11, 2019', 'March 15, 2019']],
        ["3c", ['March 25, 2019', 'March 29, 2019']]
    ],

    block1:[
        [ "A block", ['May 7, 2018', 'June 8, 2018'] ],
        [ "Interstitial Day", ['June 11, 2018'] ],
        [ "B block", ['June 12, 2018', 'July 13, 2018']],
        [ "C block", ['July 16, 2018', 'August 16, 2018']],
        [ "Interstitial Day", ['August 17, 2018'] ],
        [ "Summer vacation" , ['August 17, 2018', 'August 26, 2018']]
    ],

    block2: [
        [ "A block", ['August 27, 2018', 'September 28, 2018'] ],
        [ "B block", ['October 1, 2018', 'October 31, 2018'] ],
        [ "Interstitial Day", ['November 1, 2018'] ],
        [ "Careers in medicine", ['November 2, 2018'] ],
        [ "C Block", ['2018-11-05', 'December 13, 2018']],
        [ "Interstitial Day", ['December 14, 2018'] ],
        [ "Interstitial Day", ['December 17, 2018'] ],
        [ "Careers in Medicine", ['December 18, 2018'] ],
        [ "Winter vacation", ['December 19, 2018', 'January 1, 2019'] ]
    ],

    block3: [
        [ "Interstitial Day", ['January 2, 2019'] ],
        [ "A block", ['January 3, 2019', 'February 8, 2019'] ],
        [ "B block", ['February 11, 2019', 'March 15, 2019']],
        [ "Spring vacation", ['March 16, 2019', 'March 24, 2019'] ],
        [ "C block", ['March 25, 2019', 'April 25, 2019'] ],
        [ "Careers in Medicine", ['April 25, 2019'] ],
        [ "Interstitial", ['April 26, 2019'] ]
    ],
};

export const reducers = (state = initial_state, action) => {
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
                thematic_med_order: action.order.value };
    case Actions.SET_THEMATIC_SURGERY_ORDER:
        return {...state,
            thematic_surgery_order: action.order.value };
    case Actions.SET_THEMATIC_FAMILY_ORDER:
        return {...state,
                thematic_family_order: action.order.value };
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
