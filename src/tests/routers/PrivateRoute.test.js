import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext } from '../../auth/authContext';
import { PrivateRoute } from '../../routers/PrivateRoute';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	Navigate: () => <span>Navigating outside</span>,
}));

describe('Tests in <PrivateRoute /> component', () => {
	Storage.prototype.setItem = jest.fn();

	test('should show the component if user is authenticated and store in local storage', () => {
		const contextValue = {
			user: {
				isAuthenticated: true,
				name: 'Benito',
			},
		};

		const wrapper = mount(
			<AuthContext.Provider value={contextValue}>
				<MemoryRouter initialEntries={['/']}>
					<PrivateRoute path='/'>
						<h1>Private Component</h1>
					</PrivateRoute>
				</MemoryRouter>
			</AuthContext.Provider>
		);

		//console.log(wrapper.html());
		expect(wrapper.text().trim()).toBe('Private Component');
		expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/');
	});

	test('should block the component if user is NOT authenticated', () => {
		const contextValue = {
			user: {
				isAuthenticated: false,
			},
		};

		const wrapper = mount(
			<AuthContext.Provider value={contextValue}>
				<MemoryRouter initialEntries={['/']}>
					<PrivateRoute path='/'>
						<h1>Private Component</h1>
					</PrivateRoute>
				</MemoryRouter>
			</AuthContext.Provider>
		);

		//console.log(wrapper.html());
		expect(wrapper.text().trim()).toBe('Navigating outside');
	});
});
