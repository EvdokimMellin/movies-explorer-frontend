import GlobalNav from "../GlobalNav/GlobalNav";
import Profile from "../Profile/Profile";

export default function ProfilePage(props) {
  return (<>
    <GlobalNav />
    <Profile setLoginState={props.setLoginState} logoutHandler={props.handleLogout} editProfileHandler={props.handleEditProfile} setConflictError={props.setConflictError} conflictError={props.conflictError} isPopupOpened={props.isPopupOpened} setIsPopupOpened={props.setIsPopupOpened} onRequest={props.onRequest} />
  </>);
}
