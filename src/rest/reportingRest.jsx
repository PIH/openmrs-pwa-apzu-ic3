import {axiosInstance} from '@openmrs/react-components';

const api = {

  getIC3Patients: (params) => {

    let queryParams = [];
    if (params.endDate != null) {   // specifically using != instead of !== to catch undefined
      queryParams.push("endDate=" + params.endDate);
    }
    if (params.location != null) {
      queryParams.push("location=" + params.location);
    }
    if (params.cohorts != null) {
      queryParams.push("cohorts=" + params.cohorts);
    }
    if (params.patient != null) {
      queryParams.push("patient=" + params.patient);
    }
    if (params.useCachedValues != null) {
      queryParams.push("useCachedValues=" + params.useCachedValues);
    }

    return axiosInstance.get("pihmalawi/ic3Patients?" + queryParams.join('&'))  // likely fail if no query params, but that's a bogus use case?
      .then((response) => {
        if (response.status !== 200) {
          throw response;
        }
        else {
          return response.data;
        }
      });
  },

  getScreeningData: (params) => {

    let queryParams = [];
    if (params.endDate != null) {   // specifically using != instead of !== to catch undefined
      queryParams.push("endDate=" + params.endDate);
    }
    if (params.location != null) {
      queryParams.push("location=" + params.location);
    }
    if (params.patients != null) {
      queryParams.push("patients=" + params.patients);
    }
    if (params.useCachedValues != null) {
      queryParams.push("useCachedValues=" + params.useCachedValues);
    }

    return axiosInstance.get("pihmalawi/ic3ScreeningData?" + queryParams.join('&'))  // likely fail if no query params, but that's a bogus use case?
      .then((response) => {
        if (response.status !== 200) {
          throw response;
        }
        else {
          return response.data;
        }
      });
  },

  getIC3NutritionHistory: (params) => {
    return axiosInstance.get("pihmalawi/ic3NutritionHistory?patient=" + params.patient)
      .then((response) => {
        if (response.status !== 200) {
          throw response;
        } else {
          return response.data;
        }
      });
  }

};

export default api;
