import React from 'react'
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import SearchPatient from '../SearchPatient';

let props, mountedComponent, store;

const mockStore = configureMockStore();
const searchPatient = () => {
    if (!mountedComponent) {
        mountedComponent = shallow(
            <Provider store={store}>
                <SearchPatient {...props} />
            </Provider>);
    }
    return mountedComponent;
};

describe('Component: searchPatient', () => {
    beforeEach(() => {
        props = {};
        store = mockStore(
            {
                selected: {
                    patient: {
                        id: 1,
                        lastName: "Wilkin",
                        firstName: "Dessin",
                        gender: "M",
                        age: 25,
                    }
                }
            });
        mountedComponent = undefined;
    });

    it('renders properly', () => {
        expect(toJson(searchPatient())).toMatchSnapshot();
        //expect(searchPatient().prop('className')).to.equal(1);
    });

});

