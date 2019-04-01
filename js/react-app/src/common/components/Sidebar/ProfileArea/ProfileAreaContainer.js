import { connect } from 'react-redux';
import ProfileArea from './ProfileArea';

const toggleNavExpansion = ownProps => () => {
  const { onProfileBtnClick } = ownProps;
  onProfileBtnClick();
};

const mapStateToProps = ({ user: { currentUser, isFetchingCurrentUser } }, ownProps) => ({
  handleProfileNavExpansionToggle: toggleNavExpansion(ownProps),
  currentUser,
  isFetchingCurrentUser,
});

export default connect(mapStateToProps)(ProfileArea);
