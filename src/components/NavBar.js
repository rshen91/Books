import React, { Component } from 'react';
import {Navbar, Nav, NavItem }from 'react-bootstrap';

class NavBar extends Component {
    onSearch = e => {
        e.preventDefault();
        let location = this.refs.search.value;

        let encodedLocation = encodeURIComponent(location);

        if (location.length > 0) {
            this.refs.search.value = '';
            window.location.hash = `#/?location=${encodedLocation}`;
        }
    };

    render() {
        return (
        <Navbar className="Nav">
            <Nav>
                <NavItem className="brand active-link" eventKey={1} href="#/">
                Add a book
                </NavItem>
                <NavItem className="brand active-link" eventKey={2} href="#/viewbook">
                View Recent Books 
                </NavItem>
                <NavItem className="brand" eventKey={3} href="#">
                Link
                </NavItem>
            </Nav>
        </Navbar>
        )
    }
}

export default NavBar;
