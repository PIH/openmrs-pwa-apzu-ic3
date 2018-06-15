import React from 'react';

import { push } from 'connected-react-router';

class Form extends React.Component {

  // TODO there really isn't any shared functionality here yet, so this might be overkill, but hopefully it's "room for growth"!

  formSubmittedActionCreator() {
    return push('/');  // needs to be overwritten in implementing methods
  }

}

export default Form;
