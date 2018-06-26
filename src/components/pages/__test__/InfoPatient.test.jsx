import React from 'react'
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer'
import InfoPatient from '../InfoPatient'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

let props, mountedComponent, store;

const mockStore = configureMockStore();
const infoPatient = () => {
    if (!mountedComponent) {
        mountedComponent = mount(
            <Provider store={store}>
                <InfoPatient {...props} />
            </Provider>);
    }
    return mountedComponent;
};

describe('Component: InfoPatient', () => {
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
        expect(toJson(infoPatient())).toMatchSnapshot();
        expect(infoPatient().find(InfoPatient).length).toBe(1);
    });

    it('renders a form element', () => {
        expect(infoPatient().find('form').length).toBe(1);
    });

});

