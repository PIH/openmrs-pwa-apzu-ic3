import React from 'react';
import { PatientSearch } from '@openmrs/react-components';

class SearchPatient extends React.Component {

    constructor(props) {
        super(props);
        this.columnDefs =  [
            {headerName: 'patientUuid', hide: true, valueGetter: 'data.uuid' },
            {headerName: 'ID', valueGetter: 'data.identifier' },
            {headerName: 'First Name', valueGetter: 'data.firstName' },
            {headerName: 'Last Name', valueGetter: 'data.lastName' },
            {headerName: 'Gender', field: 'gender' },
            {headerName: 'Age', field: 'age' }
        ];
    }


    parseResults(results) {
        console.log("parseResults callback function, length =  " + results.length);
        let patients = [];
        for (const item of results) {
            let patient = {
                uuid: item.uuid,
                id: item.id,
                firstName: item.person.names[0].givenName,
                lastName: item.person.names[0].familyName,
                gender: item.person.gender,
                age: item.person.age,
                identifier: item.identifiers[0].identifier,
                checkedInTime: null,
                birthdate: item.person.birthdate
            };
            patients.push(patient);
        }
        return patients;
    };

    render() {
        return(
            <PatientSearch columnDefs={ this.columnDefs } parseResults={ this.parseResults.bind(this) }/>
        );
    }
};

export default SearchPatient;
