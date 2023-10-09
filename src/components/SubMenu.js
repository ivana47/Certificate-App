import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SideBarLink = styled(Link)`
  display: flex;
  color: #325870;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
  list-style: none;
  height: 40px;
  text-decoration: none;
  font-size: 19px;

  &:hover {
    color: #4497c5;
    border-left: 15px solid #4497c5;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 6px; //space between icon and text
`;

const DropdownLink = styled(Link)`
  color: #325870;
  height: 25px;
  padding-left: 40px;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    color: #4497c5;
    border-left: 15px solid #4497c5;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
      <SideBarLink to={item.path} onClick={item.subNav && showSubnav}>
        {" "}
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
              ? item.iconClosed
              : null}{" "}
        </div>
      </SideBarLink>
      {/* subnav data */}
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title} </SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
