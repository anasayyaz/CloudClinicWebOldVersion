import React, { useContext } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import TranslationContext from "../context/translation";

const TheHeaderDropdownLang = () => {
  const { setLanguage } = useContext(TranslationContext);

  const englishLanguageHandler = () => {
    setLanguage("english");
  };

  const frenchLanguageHandler = () => {
    setLanguage("french");
  };

  return (
    <CDropdown inNav className="c-header-nav-item">
      <CDropdownToggle caret={false}>
        <FontAwesomeIcon icon={faLanguage} size="3x"/>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem onClick={englishLanguageHandler} style={{justifyContent: 'space-around'}}>
          <CIcon name="cif-us"/>
          English
        </CDropdownItem>
        <CDropdownItem onClick={frenchLanguageHandler} style={{justifyContent: 'space-around'}}>
          <CIcon name="cif-fr"/>
          French
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownLang;
