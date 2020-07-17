import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { elastic as Menu } from 'react-burger-menu';



class Navigation extends React.Component {

    state = {
        menuOpen: false
    }

    closeMenu() {
        this.setState({ menuOpen: false })
    }

    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen })
    }

    render() {
        return (
            <Menu isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)} pageWrapId='wrapper' outerContainerId='root'>
                <Link to='/' id="home" className="menu-item" href="/" onClick={() => this.closeMenu()}>Home</Link>
                <Link to='/favorites' id="home" className="menu-item" href="/" onClick={() => this.closeMenu()}>Favorites</Link>
                <Link to='/about' id="home" className="menu-item" href="/" onClick={() => this.closeMenu()}>About</Link>
            </Menu>
        )
    }
}
export default Navigation;
