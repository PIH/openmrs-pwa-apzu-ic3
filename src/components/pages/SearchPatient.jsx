import React from 'react';
import { PatientSearch } from '@openmrs/react-components';

const SearchPatient = props => {

    this.state =  {
        columnDefs: [
            {headerName: 'patientUuid', hide: true, valueGetter: 'data.uuid' },
            {headerName: 'ID', valueGetter: 'data.identifier' },
            {headerName: 'First Name', valueGetter: 'data.firstName' },
            {headerName: 'First Name', valueGetter: 'data.firstName' },
            {headerName: 'Last Name', valueGetter: 'data.lastName' },
            {headerName: 'Gender', field: 'gender' },
            {headerName: 'Age', field: 'age' }
        ]
    };

    return(
        <PatientSearch columnDefs={this.state.columnDefs}/>
    )
};

export default SearchPatient;
