import userPic from "@/public/user.jpg";
import Image from "next/image";
import { useCallback, useState } from "react";
import { DropdownItem } from "../dropdown/dropdown_item";
import { DropdownMenu } from "../dropdown/dropdown_menu";

export function DashboardHeaderUser() {
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);

  const toggleDropdown = useCallback(() => {
    setDropdownIsOpen(!dropdownIsOpen);
  }, [dropdownIsOpen]);

  return (
    <>
      <div id="user" onClick={toggleDropdown}>
        <Image
          alt="user"
          width={20}
          height={20}
          src={userPic}
          className="rounded-full cursor-pointer"
        />
      </div>
      <DropdownMenu isOpen={dropdownIsOpen} onExitHover={toggleDropdown}>
        <DropdownItem>
          <a> selam </a>
        </DropdownItem>
      </DropdownMenu>
    </>
  );
}
