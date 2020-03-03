import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {NavLink} from 'react-router-dom'
class NavBar extends React.Component{
    render()
    {
        return(
                <div className="ui inverted menu">
                    <NavLink className="active item" to="/">
                        React
                    </NavLink>
                    <NavLink className="item" to="/customers">
                         Customers
                    </NavLink>
                    <NavLink className="item" to="/products">
                        Products
                    </NavLink>
                    <NavLink className="item" to="/stores">
                        Stores
                    </NavLink>
                    <NavLink className="item" to="/sales">
                        Sales
                    </NavLink>
                </div>
        )
    }
}
export default NavBar