import { NavLink } from 'react-router-dom';
import { writeHomeRoute } from '../../../redux/menutoogle/menutoogle';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

function Links(props) {
  const { name, path } = props;

  const {openMenu} = useSelector(state => state.menuToogle);
  const dispatch = useDispatch();
  
  const handleClick = () => {
      dispatch(writeHomeRoute(path));
  }
  return (
    <NavLink
      to={path}
      onClick={handleClick}
      className={({ isActive }) => (isActive ? 'active-link' : 'not-active-class')}
    >
      {name}
    </NavLink>
  );
}

Links.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Links;
