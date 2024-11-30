import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
//import NavItems from "./NavItems";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import NavItems from "./NavItems";
import StyledBrandName from "./StyledBrandName";
import Link from "next/link";
import { IUser } from "@/lib/database/models/user.model";
type MobileProps = {
  userstatus: string;
  userId: string;
  comp: IUser;
};
const MobileNav = ({ userstatus, userId, comp }: MobileProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleclicklink = () => {
    setIsSheetOpen(false);
  };
  return (
    <nav className="">
      <Sheet open={isSheetOpen}>
        <SheetTrigger
          className="align-middle"
          onClick={() => {
            setIsSheetOpen(true);
          }}
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 tooltip tooltip-bottom hover:text-black hover:cursor-pointer">
            <MenuIcon />
          </div>
        </SheetTrigger>
        <SheetContent
          className="flex flex-col gap-6 bg-white"
          onClick={handleclicklink}
        >
          <SheetTitle>
            <div className="flex items-center">
              <div className="rounded-full overflow-hidden">
                <Image
                  src={comp.imageUrl ?? "/assets/images/logo.png"}
                  alt={comp.businessname ?? "logo"}
                  width={26}
                  height={26}
                />
              </div>
              <StyledBrandName comp={comp} />
            </div>
          </SheetTitle>
          <Separator className="border border-gray-50" />
          <NavItems userstatus={userstatus} userId={userId} />
          <Separator className="border border-gray-50" />
          <div className="flex text-xs">
            <div className="flex gap-1 w-full text-gray-600">
              <div className="transition-colors text-[10px] hover:text-emerald-600 hover:cursor-pointer">
                <Link
                  href="/about"
                  className="no-underline hover:text-emerald-500 "
                >
                  About
                </Link>
              </div>
              <div>|</div>
              <div className="transition-colors text-[10px] hover:text-emerald-600 hover:cursor-pointer">
                <Link
                  href="/terms"
                  className="no-underline hover:text-emerald-500 "
                >
                  <div>Terms & Conditions</div>
                </Link>
              </div>
              <div>|</div>
              <div className="transition-colors text-[10px] hover:text-emerald-600 hover:cursor-pointer">
                <Link
                  href="/privacy"
                  className="no-underline hover:text-emerald-500 "
                >
                  Privacy Policy
                </Link>
              </div>
              <div>|</div>
              <div className="transition-colors text-[10px] hover:text-emerald-600 hover:cursor-pointer">
                <Link
                  href="/safety"
                  className="no-underline hover:text-emerald-500 "
                >
                  Safety Tips
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
