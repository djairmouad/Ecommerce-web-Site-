import PropTypes from 'prop-types';
import Carts from './Carts';

export default function CartsDashboard({ DUMMYINFO,title,price }) {
    return (
        <>        <h1>{title}</h1>
        <div id="cartDashboard" className='flex flex-row gap-2.5 w-full'>
            <Carts  DUMMYINFO={[...DUMMYINFO]} price={price} />
        </div>
        </>

    );
}

CartsDashboard.propTypes = {
    title: PropTypes.string.isRequired,
};
