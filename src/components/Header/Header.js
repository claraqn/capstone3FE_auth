import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  ButtonGroup,
  Button,
} from 'reactstrap';
import Notifications from '../Notifications';
import PowerIcon from '../Icons/HeaderIcons/PowerIcon';
import BellIcon from '../Icons/HeaderIcons/BellIcon';
import SettingsIcon from '../Icons/HeaderIcons/SettingsIcon';
import BurgerIcon from '../Icons/HeaderIcons/BurgerIcon';
import ArrowIcon from '../Icons/HeaderIcons/ArrowIcon';
import user from '../../assets/people/user.png';

import { logoutUser } from '../../actions/user';
import {
  openSidebar,
  closeSidebar,
  changeSidebarPosition,
  changeSidebarVisibility,
} from '../../actions/navigation';

import avatar from '../../assets/people/a7.jpg';

import s from './Header.module.scss';
import 'animate.css';
import { Link } from 'react-router-dom';
import { userService } from '../../actions/user.service';
import { userActions } from '../../actions/user.actions';

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebarPosition: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this);
    this.toggleSupportDropdown = this.toggleSupportDropdown.bind(this);
    this.toggleSettingsDropdown = this.toggleSettingsDropdown.bind(this);
    this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleSearchOpen = this.toggleSearchOpen.bind(this);

    this.state = {
      visible: true,
      messagesOpen: false,
      supportOpen: false,
      settingsOpen: false,
      searchFocused: false,
      searchOpen: false,
      notificationsOpen: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  toggleNotifications = () => {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen,
    });
  };

  onDismiss() {
    this.setState({ visible: false });
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  toggleMessagesDropdown() {
    this.setState({
      messagesOpen: !this.state.messagesOpen,
    });
  }

  toggleSupportDropdown() {
    this.setState({
      supportOpen: !this.state.supportOpen,
    });
  }

  toggleSettingsDropdown() {
    this.setState({
      settingsOpen: !this.state.settingsOpen,
    });
  }

  toggleAccountDropdown() {
    this.setState({
      accountOpen: !this.state.accountOpen,
    });
  }

  toggleSearchOpen() {
    this.setState({
      searchOpen: !this.state.searchOpen,
    });
  }

  toggleSidebar() {
    this.props.isSidebarOpened
      ? this.props.dispatch(closeSidebar())
      : this.props.dispatch(openSidebar());
  }

  moveSidebar(position) {
    this.props.dispatch(changeSidebarPosition(position));
  }

  toggleVisibilitySidebar(visibility) {
    this.props.dispatch(changeSidebarVisibility(visibility));
  }

  render() {
    const { users } = this.props;
    return (
      <Navbar className={`d-print-none `}>
        <div className={s.burger}>
          <NavLink
            onClick={this.toggleSidebar}
            className={`d-md-none ${s.navItem} text-white`}
            href="#"
          >
            <BurgerIcon className={s.headerIcon} />
          </NavLink>
        </div>

        <div className={`d-print-none ${s.root}`}>
          <Nav className="ml-md-0">
            <Dropdown
              nav
              isOpen={this.state.notificationsOpen}
              toggle={this.toggleNotifications}
              id="basic-nav-dropdown"
              className={`${s.notificationsMenu}`}
            >
              <DropdownToggle
                nav
                caret
                style={{ color: '#C1C3CF', padding: 0 }}
              >
                <span
                  //rounded-circle, thumb-sm ,, 부트스트랩 css
                  className={`${s.avatar} rounded-circle thumb-sm float-left`}
                >
                  <img src={user} alt="..." />
                </span>
                <span className={`small d-sm-down-none ${s.accountCheck}`}>
                  {/* 사용자이름&nbsp;&nbsp; */}
                  {users.items && (
                    <ul>
                      {users.items.map((user, index) => (
                        <li key={user.id}>
                          {user.firstName + ' ' + user.lastName}
                        </li>
                      ))}
                    </ul>
                  )}
                </span>
              </DropdownToggle>
            </Dropdown>
            <NavItem className={`${s.divider} d-none d-sm-block`} />
            <Dropdown
              className="d-none d-sm-block"
              nav
              isOpen={this.state.settingsOpen}
              toggle={this.toggleSettingsDropdown}
            >
              <DropdownToggle nav className={`${s.navItem} text-white`}>
                <SettingsIcon
                  addId="header-settings"
                  className={s.headerIcon}
                />
              </DropdownToggle>
              <DropdownMenu className={`${s.dropdownMenu} ${s.settings}`}>
                <h6>Sidebar on the</h6>
                <ButtonGroup size="sm">
                  <Button
                    color="primary"
                    onClick={() => this.moveSidebar('left')}
                    className={
                      this.props.sidebarPosition === 'left' ? 'active' : ''
                    }
                  >
                    Left
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => this.moveSidebar('right')}
                    className={
                      this.props.sidebarPosition === 'right' ? 'active' : ''
                    }
                  >
                    Right
                  </Button>
                </ButtonGroup>
                <h6 className="mt-2">Sidebar</h6>
                <ButtonGroup size="sm">
                  <Button
                    color="primary"
                    onClick={() => this.toggleVisibilitySidebar('show')}
                    className={
                      this.props.sidebarVisibility === 'show' ? 'active' : ''
                    }
                  >
                    Show
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => this.toggleVisibilitySidebar('hide')}
                    className={
                      this.props.sidebarVisibility === 'hide' ? 'active' : ''
                    }
                  >
                    Hide
                  </Button>
                </ButtonGroup>
              </DropdownMenu>
            </Dropdown>

            <NavItem>
              <Link
                // onClick={this.doLogout}
                className={`${s.navItem} text-white`}
                // href="#"
                to={`/login`}
              >
                <PowerIcon className={s.headerIcon} />
              </Link>
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  const { users, authentication } = store;
  const { user } = authentication;
  return {
    isSidebarOpened: store.navigation.sidebarOpened,
    sidebarVisibility: store.navigation.sidebarVisibility,
    sidebarPosition: store.navigation.sidebarPosition,
    user,
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
