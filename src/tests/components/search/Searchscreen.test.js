import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate,
}));

describe('Tests in <SearchScreen /> component', () => {
	test('Should render search snapshot correctly with default values', () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/search']}>
				<SearchScreen />
			</MemoryRouter>
		);

		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('.alert-info').text().trim()).toBe(
			'Search for a Hero'
		);
	});

	test('should render Batman and the input should contain the queryString', () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/search?q=batman']}>
				<SearchScreen />
			</MemoryRouter>
		);

		expect(wrapper.find('input').prop('value')).toBe('batman');
	});

	test('should show an error if the hero is not found', () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/search?q=batman123']}>
				<SearchScreen />
			</MemoryRouter>
		);

		expect(wrapper.find('.alert-danger').text().trim()).toBe(
			'No results found for batman123'
		);
	});

	test('should call the navigate to the new pathname', () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/search']}>
				<SearchScreen />
			</MemoryRouter>
		);

        wrapper
            .find('input')
            .simulate('change', {
                target: { name: 'searchText', value: 'batman' },
            });
        act(() => {
    
            wrapper.find('form').prop('onSubmit')({ preventDefault(){} });
        });

		expect(mockNavigate).toHaveBeenCalledWith('?q=batman');
	});
});
