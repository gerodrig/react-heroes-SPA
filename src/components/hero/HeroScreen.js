import { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = () => {

    const navigate = useNavigate();

	const { Id } = useParams();

	const hero = useMemo(() => getHeroById(Id), [ Id] );

	if (!hero) {
		return <Navigate to='/' />;
	}

	const {
		id,
		superhero,
		publisher,
		alter_ego,
		first_appearance,
		characters,
	} = hero;

	const imagePath = `/assets/heroes/${id}.jpg`;

	//Navigate to the previous screen
	const handleReturn = () => {
		navigate(-1);
	};

	return (
		<div className='row mt-5'>
			<div className='col-md-4'>
				<img
					src={imagePath}
					alt={superhero}
					className='img-thumbnail animate__animated animate__fadeInLeft'
				/>
			</div>
			<div className='col-md-8 animate__animated animate__fadeInRight'>
				<h3>{superhero}</h3>
				<ul className='list-group list-group-flush'>
					<li className='list-group-item'>
						<b>Alter ego:</b> {alter_ego}
					</li>
					<li className='list-group-item'>
						<b>Publisher:</b> {publisher}
					</li>
					<li className='list-group-item'>
						<b>First Appearance:</b> {first_appearance}
					</li>
				</ul>

				<h5 className='mt-3'>Characters</h5>
				<p> {characters} </p>

				<button className='btn btn-outline-info' onClick={handleReturn}>
					Return
				</button>
			</div>
		</div>
	);
};
