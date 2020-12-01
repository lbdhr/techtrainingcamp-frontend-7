import React from 'react';

import onlineIcon from '../../../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {
      users
        ? (
          <div>
            <p></p>
            <h5>房间内玩家状态</h5>
            <div>
              <table class="table table-hover">
                <thead>
                <tr>
                  <th>用户名</th>
                  <th>状态</th>
                </tr>
                </thead>
                <tbody>
                  {users.map(({name}) => (
                    // <div key={name} className="activeItem">
                    //   {name}
                    //   <img alt="Online Icon" src={onlineIcon}/>
                    // </div>
                      <tr>
                        <td>{name}</td>
                        <td><img alt="Online Icon" src={onlineIcon}/></td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;