import * as Actions from './actions';
import {assert} from './utils';

const initial_state = {

    startDate: '2018-07-05',
    endDate: '2019-04-26',

    thematic_section_order: '',
    thematic_surgery_order: '',
    thematic_med_order: '',
    thematic_family_order: '',
    themes: ['', '', ''],

    block1: [
        [ "A block", ['2018-05-07', '2018-06-08'] ],
        [ "Interstitial Day", ['2018-06-11'] ],
        [ "B block", ['2018-06-12', '2018-07-13']],
        [ "C block", ['2018-07-16', '2018-08-16']],
        [ "Interstitial Day", ['2018-08-17'] ],
        [ "Summer vacation" , ['2018-08-18', '2018-08-26']]
    ],

    block2: [
        [ "A block", ['2018-08-27', '2018-09-28'] ],
        [ "B block", ['2018-10-01', '2018-10-31'] ],
        [ "Interstitial Day", ['2018-11-01'] ],
        [ "Careers in medicine", ['2018-11-02'] ],
        [ "C Block", ['2018-11-05', '2018-12-13']],
        [ "Interstitial Day", ['2018-12-14'] ],
        [ "Interstitial Day", ['2018-12-17'] ],
        [ "Careers in Medicine", ['2018-12-18'] ],
        [ "Winter vacation", ['2018-12-19', '2019-01-01'] ]
    ],

    block3: [
        [ "Interstitial Day", ['2019-01-02'] ],
        [ "A block", ['2019-01-03', '2019-02-08'] ],
        [ "B block", ['2019-02-11', '2019-03-15']],
        [ "Spring vacation", ['2019-03-16', '2019-03-24'] ],
        [ "C block", ['2019-03-25', '2019-04-25'] ],
        [ "Careers in Medicine", ['2019-04-25'] ],
        [ "Interstitial", ['2019-04-26'] ]
    ],

    fces1: {
        "a": ['2018-06-04', '2018-06-08'],
        "b": ['2018-07-09', '2018-07-13'],
        "c": ['2018-07-16', '2018-07-20']},

    fces2: {
        "a": ['2018-09-24', '2018-09-28'],
        "b": ['2018-10-01', '2018-10-05'],
        "c": ['2018-11-05', '2018-11-09']},

    fces3: {
        "a": ['2019-02-04', '2019-02-08'],
        "b": ['2019-03-11', '2019-03-15'],
        "c": ['2019-03-25', '2019-03-29']}
};

const reducers = (state = initial_state, action) => {
    console.log(action);

    switch (action.type){
    case Actions.SET_START_DATE:
        return {...state, startDate: action.startDate };
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
        let b = state[action.block];
        assert(action.key === b[action.idx][0]);
        b[action.idx][1] = action.dates;
        return {...state,
                [action.block]: b};
    default:
        return state;
    }
};

export default reducers;
