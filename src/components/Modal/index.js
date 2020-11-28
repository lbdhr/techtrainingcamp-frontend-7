import React from 'react';
import './modal.css';

export default function Modal({ display, children, ...rest }) {
  return (
    <div className={display ? '' : 'hidden'}>
      <div className="card"></div>
      <div className="modal">{children}</div>
    </div>
  );
}
