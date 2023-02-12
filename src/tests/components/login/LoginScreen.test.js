import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Tests in <LoginScreen /> component', () => {

    const contextValue = {
		user: {
			isAuthenticated: false,
		},
		dispatch: jest.fn(),
	};

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path='/login' element={<LoginScreen />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );
    
    test('should match with the snapshot', () => {
        expect(wrapper ).toMatchSnapshot();
    });

    test('should execute the dispatch and navigation', () => {

        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();
        //make sure the dispatch is called with Benito username
        expect( contextValue.dispatch ).toHaveBeenCalledWith({'type': types.login, 'payload': {'name': 'Benito'}});

        //evaluate that mock navigate is (/marvel, {replace: true})
        expect( mockNavigate ).toHaveBeenCalledWith('/marvel', {replace: true});

        //localstorage.setItem('lastPath', '/dc');
        localStorage.setItem('lastPath', '/dc');

        //handleClick
        handleClick();

        //mockNavigate... ('/dc', {replace: true});
        expect( mockNavigate ).toHaveBeenCalledWith('/dc', {replace: true});
    });
    
    
});
