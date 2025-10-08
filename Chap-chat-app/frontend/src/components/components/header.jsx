import React from 'react';
import chatLogo from '../../assets/chatlogo.jpg';

const Header = () => {
  return (
    <div className="flex items-center justify-between gap-4 p-4 ">
      <img
        src={chatLogo}
        alt="Chat App Logo"
        className="w-17 h-17 rounded-full object-cover"
      />
      <h1 className="text-2xl font-bold">Chap-chat</h1>
    </div>
  );
};

export default Header;
