import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '../../../components/ui/Navbar';
import { AuthContext } from '../../../auth/authContext';
import { types } from '../../../types/types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Tests in <Navbar /> component', () => {
	const contextValue = {
		user: {
			isAuthenticated: true,
			name: 'Benito',
		},
		dispatch: jest.fn(),
	};

		const wrapper = mount(
			<AuthContext.Provider value={contextValue}>
				<MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route path="/" element={<Navbar />} />
                    </Routes>
				</MemoryRouter>
			</AuthContext.Provider>
		);

	test('should render Navbar correctly', () => {
		//TODO user displayed in Navbar should be Benito


		//test should compare with a snapshot
		expect(wrapper).toMatchSnapshot();
		//find .text-info component and it should be equal to the user Benito
        expect(wrapper.find('.text-info').text().trim()).toBe('Benito');
	});

	test('should call the logout action , call navigate and dispatch with the arguments', () => {
		
        wrapper.find('button').prop('onClick')();
        expect(contextValue.dispatch).toHaveBeenCalledWith({'type': types.logout});
        expect(mockNavigate).toHaveBeenCalledWith('/login', {replace: true});
	});
});
