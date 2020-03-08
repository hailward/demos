import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
const { Item: MenuItem } = Menu;

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <header style={{ background: 'pink' }}>
                <Menu
                    style={{ float: 'right', background: 'transparent' }}
                    defaultSelectedKeys={['/']}
                    defaultOpenKeys={[]}
                    mode="horizontal"
                    theme="light">
                    <MenuItem key="/">
                        <Link to="/">Index</Link>
                    </MenuItem>
                    <MenuItem key="/home">
                        <Link to="/home">Home</Link>
                    </MenuItem>
                </Menu>
            </header>
        )
    }
}

export default AppHeader;