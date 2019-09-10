import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginPage from '../../components/Login';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

test('should render LoginPage correctly', () => {
    const store = mockStore({});
    const startLogin = jest.fn();
    const wrapper = shallow(<Provider store={store}><LoginPage startLogin={startLogin} /></Provider>);
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
    const store = mockStore({});
    const startLogin = jest.fn();
    const wrapper = shallow(<LoginPage store={store} startLogin={startLogin} />).shallow();
    const wrapper2 = mount(wrapper.find("button").get(0)).setProps({onClick : startLogin});
    wrapper2.update();
    wrapper2.find("button").simulate("click");
    expect(startLogin).toHaveBeenCalled();
});