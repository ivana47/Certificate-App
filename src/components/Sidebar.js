import { useState } from "react";
import React from "react";
import styled from "styled-components";
import { SideBarData } from "./SidebarData";
import SubMenu from "./SubMenu";

const Container = styled.div`
  display: flex;
`;

const Header = styled.div`
  align-items: center;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  border-bottom: 2px solid #d6d6d6;
  position: absolute; // ide preko sidb
  width: 100%; //cijela sirina
`;

const Header_blue = styled.div`
  background: #3f9acf;
  width: 280px;
  color: white;
  text-align: center;
  line-height: 2;
  font-size: 36px;
  position: fixed;
`;

const SideB = styled.nav`
  width: 280px;
  position: fixed;
  top: 70px;
  left: 0;
  height: calc(100% - 70px);
  background: #e8e9eb;
`;

const LanguageDropdown = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: 20px;
`;

const LanguageButton = styled.button`
  background: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  font-size: 18px;
`;

const LanguageList = styled.ul`
  list-style: none;
  font-size: 15px;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 2px solid #ffff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const LanguageLabel = styled.span`
  font-size: 18px;
  margin-left: 1720px;
`;

const LanguageItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: #3f9acf;
  }
`;

const SideBar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  return (
    <Container>
      <SideB>
        {SideBarData.map((item, index) => {
          return <SubMenu item={item} key={index} />;
        })}
      </SideB>
      <Header>
        <Header_blue>DCCS Tuzla</Header_blue>
        <LanguageLabel>Language:</LanguageLabel>
        <LanguageDropdown>
          <LanguageButton
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
          >
            {selectedLanguage}
          </LanguageButton>

          {/* <LanguageList isOpen={isLanguageDropdownOpen}>
            <LanguageItem onClick={() => handleLanguageChange('English')}>English</LanguageItem>
            <LanguageItem onClick={() => handleLanguageChange('German')}>German</LanguageItem>
          </LanguageList> */}
        </LanguageDropdown>
      </Header>
    </Container>
  );
};

export default SideBar;
