import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import RoomIcon from "@material-ui/icons/Room";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";

const Sidebardata = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  {
    title: "Escrows",
    icon: <LocalAtmIcon />,
    link: "/escrows",
  },
  {
    title: "Wallet",
    icon: <AccountBalanceWalletIcon />,
    link: "/wallet",
  },
  {
    title: "User Profile",
    icon: <SupervisorAccountIcon />,
    link: "/userprofile",
  },
  {
    title: "Track",
    icon: <RoomIcon />,
    link: "/track",
  },
  {
    title: "Partner",
    icon: <ThumbsUpDownIcon />,
    link: "/partner",
  },
];

export default Sidebardata;
