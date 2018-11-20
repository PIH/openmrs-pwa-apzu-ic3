import {axiosInstance} from '@openmrs/react-components';

const api = {

  getIC3Patients: (params) => {
    return axiosInstance.get("pihmalawi/ic3Patients"
      + (params.endDate ? "?endDate=" + params.endDate : '')
      + (params.location ? "&location=" + params.location : '')
      + (params.patient ? "&patient=" + params.patient : '')
    )
      .then((response) => {
        if (response.status !== 200) {
          throw response;
        }
        else {
          return response.data;
        }
      });
  }

};

export default api;
