import 'babel-polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
jest.unmock('@openmrs/react-components');  // kind of hacky, would rather just disable automock here

configure({ adapter: new Adapter() });
