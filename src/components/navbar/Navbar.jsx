import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import pages from "../../utils/page";
import { useLogoutauthApiMutation } from "../../redux/auth/authApi";
import { userLoggedOut } from "../../redux/auth/authSlice";
import { apiSlice } from "../../apps/apiSlice";

const Navbar = ({ userInfo }) => {

  const dispatch = useDispatch();
  const [userLogout] = useLogoutauthApiMutation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLoggedIn = ['user'].includes(userInfo?.role)

  const visiblePages = pages.filter((page) => {
    if (page.access === "public") return true;
    if (page.access === "authenticated" && isLoggedIn) return true;
    if (page.access === "guest" && !isLoggedIn) return true;
    return false;
  });

  const logOut = async () => {
    await userLogout()
    dispatch(apiSlice.util.resetApiState());
    dispatch(userLoggedOut());

  }
  return (
    <div className="fixed w-full bg-white border-b border-slate-200 shadow-sm z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">

        <Link to="/" className="flex items-center">
          <img
            className="w-40"
            src="https://web.programming-hero.com/home/home2/icons/ph-logo.svg"
            alt="logo-main"
          />
        </Link>

        <nav className="hidden md:flex space-x-6">
          {visiblePages.map((page) => (
            <Link
              key={page.name}
              to={page.path}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              {page.name}
            </Link>
          ))}
        </nav>

        <div className="relative">
          {isLoggedIn ? (
            <>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer py-2"
              >
                <div className="w-8 h-8 relative">
                  <img
                    src="https://web.programming-hero.com/home/home2/icons/ph-logo.svg"
                    alt="user"
                    className="w-full h-full p-1 object-cover ring-2 ring-gray-400 rounded-full"
                  />
                  <span className="absolute -bottom-[4px] -right-[4px] w-3 h-3 bg-green-500 rounded-full ring ring-white"></span>
                </div>
                <div className="text-sm font-bold hidden lg:block text-gray-800">
                  <p>{userInfo?.name}</p>
                </div>
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-[200px] bg-white shadow-lg rounded-md border border-gray-100">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => {
                      logOut()

                    }}

                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { userInfo: state.auth?.userInfo };
}
export default connect(mapStateToProps, null)(Navbar);