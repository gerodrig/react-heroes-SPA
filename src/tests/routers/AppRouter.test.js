import { mount } from 'enzyme';
import { AuthContext } from '../../auth/authContext';
import { AppRouter } from '../../routers/AppRouter';

describe('Tests in <AppRouter /> component', () => {
	const contextValue = {
		user: {
			isAuthenticated: false,
		},
	};

	test('should render the login component if user is not authenticated', () => {
		const wrapper = mount(
			<AuthContext.Provider value={contextValue}>
				<AppRouter />
			</AuthContext.Provider>
		);

		//console.log(wrapper.html());
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('Login Screen');
	});

	test('should render the marvel component if user is authenticated', () => {
        const contextValue = {
            user: {
                isAuthenticated: true,
                name: 'Benito'
            },
        };

		const wrapper = mount(
			<AuthContext.Provider value={contextValue}>
				<AppRouter />
			</AuthContext.Provider>
		);

		//console.log(wrapper.html());
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.navbar').exists() ).toBeTruthy();
	});
});
