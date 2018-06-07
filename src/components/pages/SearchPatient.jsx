import React from 'react';
import { PatientSearch } from '@openmrs/react-components';

const SearchPatient = props => {

    const columnDefs =  [
            {headerName: 'patientUuid', hide: true, valueGetter: 'data.uuid' },
            {headerName: 'ID', valueGetter: 'data.identifier' },
            {headerName: 'First Name', valueGetter: 'data.firstName' },
            {headerName: 'First Name', valueGetter: 'data.firstName' },
            {headerName: 'Last Name', valueGetter: 'data.lastName' },
            {headerName: 'Gender', field: 'gender' },
            {headerName: 'Age', field: 'age' }
        ];

    return(
        <PatientSearch columnDefs={ columnDefs }/>
    )
};

export default SearchPatient;
