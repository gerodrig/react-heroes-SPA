import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';

describe('Tests in <DashboardRoutes /> component', () => {
	const contextValue = {
		user: {
			isAuthenticated: true,
			name: 'Benito',
		},
	};

	test('Should render correctly default path Marvel Screen', () => {
		const wrapper = mount(
			<AuthContext.Provider value={contextValue}>
				<MemoryRouter initialEntries={ ['/']}>
					<DashboardRoutes />
				</MemoryRouter>
			</AuthContext.Provider>
		);

		console.log(wrapper.html());
		expect(wrapper).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('Marvel Screen');
	});

	test('Should render correctly DC screen', () => {
		const wrapper = mount(
			<AuthContext.Provider value={contextValue}>
				<MemoryRouter initialEntries={ ['/dc']}>
					<DashboardRoutes />
				</MemoryRouter>
			</AuthContext.Provider>
		);

		console.log(wrapper.html());
		expect(wrapper).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('DC Screen');
	});
});
