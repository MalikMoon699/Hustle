import SiteLogo from "../assets/images/SiteLogo.png";
import WatchDemo from "../assets/images/WatchDemo.mov";
import auth1 from "../assets/images/auth1.avif";
import auth2 from "../assets/images/auth2.webp";
import auth3 from "../assets/images/auth3.jpg";
import PlaceHolder from "../assets/images/PlaceHolder.jpg";
import RealisticStyle from "../assets/images/Realistic-style.avif";
import CartoonStyle from "../assets/images/Cartoon-style.avif";
import ComicStyle from "../assets/images/Comic-style.avif";
import WaterColorStyle from "../assets/images/WaterColor-style.avif";
import GTAStyle from "../assets/images/GTA-style.avif";

export const IMAGES = {
  SiteLogo,
  WatchDemo,
  auth1,
  auth2,
  auth3,
  PlaceHolder,
  RealisticStyle,
  CartoonStyle,
  ComicStyle,
  WaterColorStyle,
  GTAStyle,
};

export const SidebarMenuItems = [
  {
    name: "Dashboard",
    icon: "PanelsTopLeft",
    route: "/dashboard",
    activeAt: "/dashboard",
  },
  {
    name: "Create New",
    icon: "FilePlay",
    route: "/create-video",
    activeAt: "/create-video",
  },
  {
    name: "Upgrade",
    icon: "ShieldPlus",
    route: "/pricing",
    activeAt: "/pricing",
    startsWith: ["/payment-success"],
  },
  {
    name: "Account",
    icon: "CircleUser",
    route: "/account",
    activeAt: "/account",
  },
];

export const limit = 4;