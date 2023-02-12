import { heroes } from '../data/heroes';

const getHeroesByPublisher = ( publisher ) => {

    return heroes.filter( ( hero ) => hero.publisher === publisher );

};

export default getHeroesByPublisher;
