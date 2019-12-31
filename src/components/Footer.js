import React from 'react';

export default function Footer() {
  return (
    <div
      className="small text-center text-white-50"
      style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '60px' /* Height of the footer */,
        background: '#262626',
        zIndex: 1,
      }}
    >
      <div className="container" style={{ height: '100%' }}>
        <br />
        Copyright &copy; The Masculine Mentality 2020
      </div>
    </div>
  );
}
