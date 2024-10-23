import PropTypes from "prop-types";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import logo from "../assets/react.svg";
import profile from "../assets/react.svg";
import { createContext, useContext, useState } from "react";
import "../styles.css";
import { NavLink } from "react-router-dom/dist";
const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen ">
      <nav className="flex flex-col h-full bg-white border-r shadow-sm">
        <div className="flex items-center justify-between p-4 pb-2">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="flex p-3 border-t">
          <img src={profile} className="w-10 h-10 rounded-md" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            } `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">tester</h4>
              <span className="text-xs text-gray-600">tester@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export function SidebarItem({ icon, text, alert, path }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <NavLink
      to={path}
      className={({
        isActive,
        isPending,
      }) => `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
                        ${
                          isActive
                            ? "bg-gradient-to-tr from-red-200 to-red-100 text-red-800"
                            : isPending
                            ? "pending"
                            : "hover:bg-indigo-50 text-gray-600"
                        }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </NavLink>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  alert: PropTypes.bool,
};
