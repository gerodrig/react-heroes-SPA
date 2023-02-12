import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/hero/HeroScreen';
import { act } from '@testing-library/react';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate,
}));

describe('Test in <HeroScreen /> component', () => {
	const wrapper = mount(
		<MemoryRouter initialEntries={['/hero']}>
			<Routes>
				<Route path='/hero' element={<HeroScreen />} />
				<Route path='/' element={<h1>No Hero Page</h1>} />
			</Routes>
		</MemoryRouter>
	);

	test('should test that component is rendering correctly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('should not show the HeroScreen if there is no hero in the url', () => {
		//console.log(wrapper.html());
		expect(wrapper.find('h1').text().trim()).toBe('No Hero Page');
	});

	test('should  show the hero if the parameter exists and is found', () => {
		const wrapper2 = mount(
			<MemoryRouter initialEntries={['/hero/marvel-spider']}>
				<Routes>
					<Route path='/hero/:Id' element={<HeroScreen />} />
					<Route path='/' element={<h1>No Hero Page</h1>} />
				</Routes>
			</MemoryRouter>
		);

		//console.log(wrapper2.html());
		expect( wrapper2.find('.row').exists() ).toBeTruthy();
	});

    test('should return to the previous screen', () => {
        const wrapper2 = mount(
			<MemoryRouter initialEntries={['/hero/marvel-spider']}>
				<Routes>
					<Route path='/hero/:Id' element={<HeroScreen />} />
					<Route path='/' element={<h1>No Hero Page</h1>} />
				</Routes>
			</MemoryRouter>
		);

        //console.log(wrapper2.html());

        act(() => {
            wrapper2.find('button').prop('onClick')();
        });

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    test('should show the No hero page if the no hero is found', () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={['/hero/marvel-spiderman32342']}>
				<Routes>
					<Route path='/hero/:Id' element={<HeroScreen />} />
					<Route path='/' element={<h1>No Hero Page</h1>} />
				</Routes>
			</MemoryRouter>
		);


		expect( wrapper.text().trim() ).toBe('No Hero Page');
	});

    
});
