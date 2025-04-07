import React, { useState } from "react";
import styles from "./DropdownMenu.module.css";

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const DropdownMenu = ({ trigger, children }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className={styles.dropdownContainer}>
      <div onClick={toggleMenu} className={styles.trigger}>
        {trigger}
      </div>
      {isOpen && (
        <>
          <div className={styles.overlay} onClick={closeMenu} />
          <div className={styles.menu}>
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default DropdownMenu;