import React from "react";
import Image from 'next/image';

const navItems = ({ Icon, title }) => {

    return Icon ? (
      <>
        <div className="icon-container group">
          <Icon className="icon" />
          <p className="icon-title">{title}</p>
        </div>
      </>
    ) : (
      <>
        <div className="icon-container group">
          <Image alt="logo" width={200} height={200} src={"https://res.cloudinary.com/https-pilot-tune-herokuapp-com/image/upload/v1632165780/purple_egg_blank_nkyema.png"} />
        </div>
      </>
    );
  };
  
  export default navItems;
  