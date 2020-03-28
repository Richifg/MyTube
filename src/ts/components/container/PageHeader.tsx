import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import ClockStore from '../../stores/ClockStore';
import Clock from '../presentational/Clock';

const routes = [
  {
    title: 'Search',
    path: '/',
  },
  {
    title: 'Favorites',
    path: '/favorites',
  },
  {
    title: 'History',
    path: '/history',
  },
];

@observer
class PageHeader extends React.Component<RouteComponentProps> {
  @observable isOpen: boolean;
  clockStore: ClockStore;

  constructor(props: any) {
    super(props);
    this.isOpen = false;
    this.clockStore = new ClockStore();
  }

  componentWillUmount() {
    clearInterval(this.clockStore.intervalId);
  }

  toggle = () => { this.isOpen = !this.isOpen; };

  render() {
    const path = this.props.history.location.pathname;
    return (
      <header className="bg-light-black">
        <Navbar dark expand="md" className="justify-content-end">
          <NavbarBrand className="p-0 mr-auto">
            <FontAwesomeIcon icon="play-circle" className="header-icon"/>
            <h1 className="header-title ml-1">MyTube</h1>
          </NavbarBrand>
          {/* clock layout position on screen size < medium */}
          <Clock store={this.clockStore} sm />
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.isOpen} navbar>
            <Nav navbar className="header-link ml-3">
              {routes.map(route => (
                 <NavItem key={route.title} >
                  <NavLink href={`#${route.path}`} className={path === route.path ? 'active' : ''}>
                    {route.title}
                  </NavLink>
                 </NavItem>
              ))}
            </Nav>
          </Collapse>
          {/* clock layout position on screen size > medium */}
          <Clock store={this.clockStore} md />
        </Navbar>
      </header>
    );
  }
}

export default withRouter(PageHeader);
