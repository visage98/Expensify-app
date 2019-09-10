import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';
import {shallowToJson} from 'enzyme-to-json';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

test('should render Header correctly', () => {
  const store = mockStore({});
  const wrapper = shallow(<Header store={store} startLogout={()=>{}}/>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});
