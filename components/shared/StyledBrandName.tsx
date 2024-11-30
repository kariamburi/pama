import { IUser } from "@/lib/database/models/user.model";
import React from "react";
type MobileProps = {
  comp: IUser;
};
const StyledBrandName = ({ comp }: MobileProps) => {
  return (
    <h1 className="text-lg lg:text-xl">
      <span className="text-[#000000] font-bold">
        {comp.businessname ?? "Business Name"}
      </span>
    </h1>
  );
};

export default StyledBrandName;
