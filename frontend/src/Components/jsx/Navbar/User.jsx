import React from 'react';

const User = () => {
    return (
        <ul className="navbar-nav">

            <li className="nav-item dropdown">
                <a
                    data-mdb-dropdown-init
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#user-profile"
                    id="navbarDropdownMenuLink"
                    role="button"
                    aria-expanded="false"
                >
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                        className="rounded-circle"
                        height="22"
                        loading="lazy"
                        alt={"avatar-profile"}
                    />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li>
                        <a className="dropdown-item" href="#my-profile">My profile</a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#help">Help</a>
                    </li>

                </ul>
            </li>
        </ul>
    )
}

export default User;