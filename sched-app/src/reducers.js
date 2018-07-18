import * as Actions from './actions';

const initial_state = {

    startDate: '2018-07-05',
    endDate: '2019-04-26',

    thematic_section_order: '',
    thematic_surgery_order: '',
    thematic_med_order: '',
    thematic_family_order: '',

    block1: [
        { "a_dates": ['2018-05-07', '2018-06-08'] },
        { "interstitial": ['2018-06-11'] },
        { "b_dates": ['2018-06-12', '2018-07-13']},
        { "c dates": ['2018-07-16', '2018-08-16']},
        { "interstitial": ['2018-08-17'] },
        { "summer_vacation" : ['2018-08-18', '2018-08-26']}
    ],

    block2: [
        { "a_dates": ['2018-08-27', '2018-09-28'] },
        { "b_dates": ['2018-10-01', '2018-10-31'] },
        { "interstitial": ['2018-11-01'] },
        { "careers_in_medicine": ['2018-11-02'] },
        { "c_dates": ['2018-11-05', '2018-12-13']},
        { "interstitial": ['2018-12-14'] },
        { "interstitial": ['2018-12-17'] },
        { "careers_in_medicine": ['2018-12-18'] },
        { "winter_vacation": ['2018-12-19', '2019-01-01'] }
    ],

    block3: [
        { "interstitial": ['2019-01-02'] },
        { "a_dates": ['2019-01-03', '2019-02-08'] },
        { "b_dates": ['2019-02-11', '2019-03-15']},
        { "spring_vacation": ['2019-03-16', '2019-03-24'] },
        { "c_dates": ['2019-03-25', '2019-04-25'] },
        { "careers_in_medicine": ['2019-04-25'] },
        { "interstitial": ['2019-04-26'] }
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
            thematic_section_order: action.thematic_section_order.value };
    case Actions.SET_THEMATIC_MED_ORDER:
        return {...state,
                thematic_med_order: action.order.value };
    case Actions.SET_THEMATIC_SURGERY_ORDER:
        return {...state,
            thematic_surgery_order: action.order.value };
    case Actions.SET_THEMATIC_FAMILY_ORDER:
        return {...state,
            thematic_family_order: action.order.value };
    default:
        return state;
    }
};

export default reducers;
