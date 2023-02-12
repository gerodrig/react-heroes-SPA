import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';
import { useMemo } from 'react';

export const SearchScreen = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { q = '' } = queryString.parse(location.search);

	const [formValues, handleInputChange, reset] = useForm({
		searchText: q,
	});

	const { searchText } = formValues;

	const heroesFiltered = useMemo( () => getHeroesByName(q), [q]);

	const handleSearch = (e) => {
		e.preventDefault();
		//print search Text
		navigate(`?q=${searchText}`);
		reset();
	};

	return (
		<>
			<h1>Hero Finder</h1>
			<hr />

			<div className='row'>
				<div className='col-5 animate__animated animate__fadeIn animate__slow'>
					<h4>Search</h4>
					<hr />

					<form onSubmit={handleSearch}>
						<input
							type='text'
							name='searchText'
							className='form-control'
							autoComplete='off'
							placeholder='Search for a hero'
							value={searchText}
							onChange={handleInputChange}
							required
						/>

						<button
							className='btn btn-primary btn-block mt-2'
							type='submit'
						>
							Search
						</button>
					</form>
				</div>
				<div className='col-7 animate__animated animate__fadeIn animate__slow'>
					<h4>Results</h4>
					<hr />

					{q === '' ? (
						<div className='alert alert-info animate__animated animate__bounceInDown'>
							Search for a Hero
						</div>
					) : (
						heroesFiltered.length === 0 && (
							<div className='alert alert-danger animate__animated animate__bounceInDown'>
								No results found for { q }
							</div>
						)
					)}

					{heroesFiltered.map((hero) => (
						<HeroCard key={hero.id} {...hero} />
					))}
				</div>
			</div>
		</>
	);
};
