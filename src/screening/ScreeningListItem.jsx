import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ListGroupItem} from 'react-bootstrap';

let ScreeningListItem = props => {

  const applyFilters =  (list, filters) => {
    if (filters.length === 0) {
      return list;
    } else {
      return applyFilters(list.filter(filters[filters.length - 1]), filters.slice(0, -1));
    }
  };

  const required = applyFilters([props.patient], props.requiredFilters).length > 0;
  const completed = applyFilters([props.patient], props.completedFilters).length > 0;

  return (
    <ListGroupItem href={props.link ? '#' + props.link : ''}>
      { completed &&
        <FontAwesomeIcon icon="check"/>
      }
      { required && !completed &&
        <FontAwesomeIcon icon="arrow-right"/>
      }
      &nbsp;{props.title}
    </ListGroupItem>
  );

};

// TODO we may need to rework the links after we understand how this is all going to work
ScreeningListItem.propTypes = {
  completedFilters: PropTypes.array.isRequired,
  entryLink: PropTypes.string,
  title: PropTypes.string.isRequired,
  patient: PropTypes.object.isRequired,
  requiredFilters: PropTypes.array.isRequired,
  summaryLink: PropTypes.string
};


export default ScreeningListItem;
