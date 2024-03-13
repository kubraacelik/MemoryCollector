import React from "react";
import { GoChevronDown } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";
import { useState } from "react";

//? KİŞİLERİN YER ALDĞI HER BİR PANEL

function ExpandablePanels({ children, header }) {
  const [expanded, setExpanded] = useState(false);

  // açıksa kapansın, kapalıysa açılsın
  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="panelDiv">
      <div className="topArrangement">
        <div className="topArrangement">{header}</div>
        <div onClick={handleClick} value={expanded}>
          {expanded ? (
            <GoChevronDown style={{ cursor: "pointer" }} />
          ) : (
            <GoChevronLeft style={{ cursor: "pointer" }} />
          )}
        </div>
      </div>

      {/* expanded && : expanded doğru olduğu müddetçe demek */}
      {expanded && <div>{children}</div>}
    </div>
  );
}

export default ExpandablePanels;
