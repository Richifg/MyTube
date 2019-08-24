import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
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
import Clock from './Clock';

@observer
class PageHeader extends React.Component {
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
            <Nav navbar>
              <NavItem>
                <NavLink href="#/">Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#/favorites">Favorites</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          {/* clock layout position on screen size > medium */}
          <Clock store={this.clockStore} md />
        </Navbar>
      </header>
    );
  }
}

export default PageHeader;
