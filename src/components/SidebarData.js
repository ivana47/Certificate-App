import React from "react";
import * as FaIcons from "react-icons/fa";
import * as PiIcons from "react-icons/pi";
import * as RiIcons from "react-icons/ri";

//array
export const SideBarData = [
  {
    title: "Start",
    path: "/start",
    icon: <FaIcons.FaHome />,
  },
  {
    title: "Machine Learning",
    path: "/machineLearning",
    icon: <PiIcons.PiListBold />,
    iconClosed: <RiIcons.RiArrowDownSLine />,
    iconOpened: <RiIcons.RiArrowUpSLine />,
    subNav: [
      {
        title: "Example 1",
        path: "/machineLearning/example1",
      },
      {
        title: "Example 2",
        path: "/machineLearning/example2",
      },
      {
        title: "Example 3",
        path: "/machineLearning/example3",
      },
    ],
  },
];
