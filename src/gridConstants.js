import utils from "./utils";

export const PATIENT_IDENTIFIER_FILTERS = [
  {
    label: "ART",
    filter: patient => utils.getPatientArtIdentifier(patient)
  },
  {
    label: "EID",
    filter: patient => utils.getPatientEidIdentifier(patient)
  },
  {
    label: "NCD",
    filter: patient => utils.getPatientNcdIdentifier(patient)
  }
];

export const COLUMN_DEFS = {
  'UUID': { headerName: 'uuid', hide: true, field: 'uuid' },
  'IDENTIFIER': {
    headerName: 'Identifier',
    autoHeight: true,
    cellStyle: { 'line-height': "26px" },
    cellRenderer: function(params){
      return utils.getPatientIdentifiers(params.data);
    },
    getQuickFilterText: function(params) {
      return utils.getPatientIdentifiers(params.data);
    }
  },
  'GIVEN_NAME': { headerName: 'Given Name', field: 'name.givenName' },
  'FAMILY_NAME': { headerName: 'Family Name', field: 'name.familyName' },
  'GENDER': { headerName: 'Gender', field: 'gender' },
  'AGE': { headerName: 'Age', field: 'age' },
  'VILLAGE': { headerName: 'Village', field: 'address.village' },
  'ACTIONS': { headerName: 'Actions', field: 'actions' },
  'APPOINTMENT_DATE': {
    headerName: 'Appt Date',
    unSortIcon: true,
    valueGetter: function getApptDate(params) {
      if (params.data.lastAppointmentDate) {
        return utils.formatReportRestDate(params.data.lastAppointmentDate);
      }
    }
  },
  'CHECKED_IN_TIME': {
    headerName: 'Checked-in Time',
    valueGetter: function getCheckedInTime(params) {
      return utils.getPatientCheckedInTime(params.data);
    }
  }
};

export const BASIC_GRID = [
  COLUMN_DEFS.UUID,
  COLUMN_DEFS.IDENTIFIER,
  COLUMN_DEFS.GIVEN_NAME,
  COLUMN_DEFS.FAMILY_NAME,
  COLUMN_DEFS.GENDER,
  COLUMN_DEFS.AGE,
  COLUMN_DEFS.VILLAGE
];
