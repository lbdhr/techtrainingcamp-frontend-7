import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logout } from "../actions/login" 

class NavigationBar extends React.Component {

    logout(e){
        e.preventDefault();
        this.props.logout();
    }

    render() {
        
        const { isAuthenticated, user } = this.props.auth;

        const userLinks = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/rankings">{`个人中心[${user.username}]`}</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={ this.logout.bind(this) }>退出</a>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/offlinegame">单机模式</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/joinroom">对战模式</Link>
                </li>
            </ul>
        )

        const guestLinks = (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">注册</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">登录</Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">2048游戏</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample05">
                        {isAuthenticated ? userLinks : guestLinks}
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.present.auth,
        user: state.present.user
    }
}

export default connect(mapStateToProps,{logout })(NavigationBar)