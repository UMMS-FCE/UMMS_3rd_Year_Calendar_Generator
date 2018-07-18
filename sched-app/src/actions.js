export const SET_START_DATE = 'SET_START_DATE';
export const setStartDate = (startDate) => ({
    type: SET_START_DATE, startDate });

export const SET_THEMATIC_SECTION_ORDER = 'SET_THEMATIC_SECTION_ORDER'
export const setThematicSectionOrder = (thematic_section_order) => ({
    type: SET_THEMATIC_SECTION_ORDER, thematic_section_order});

export const SET_THEMATIC_MED_ORDER = 'SET_THEMATIC_MED_ORDER'
export const setThematicMedOrder = (order) => ({
    type: SET_THEMATIC_MED_ORDER, order});

export const SET_THEMATIC_FAMILY_ORDER = 'SET_THEMATIC_FAMILY_ORDER'
export const setThematicFamilyOrder = (order) => ({
    type: SET_THEMATIC_FAMILY_ORDER, order});

export const SET_THEMATIC_SURGERY_ORDER = 'SET_THEMATIC_SURGERY_ORDER'
export const setThematicSurgeryOrder = (order) => ({
    type: SET_THEMATIC_SURGERY_ORDER, order});

export const SET_DATES = 'SET_DATES'
export const setDates = (block, idx, key, dates) => ({
    type: SET_DATES, block, idx, key, dates});
