import Cookies from "js-cookie";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useContext, useState } from "react";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineUserAdd,
} from "react-icons/ai";
import {
  BiHome,
  BiImageAdd,
  BiLogOutCircle,
  BiMessageRoundedEdit,
} from "react-icons/bi";
import { BsBook, BsFillInboxesFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { GiHamburgerMenu, GiTeacher } from "react-icons/gi";
import { HiViewList } from "react-icons/hi";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { Store } from "utils/Store";

const Sidebar = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const logoutClickHandler = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("cartItems");
    Cookies.remove("userInfo");
    router.push("/");
    Cookies.remove();
  };
  return (
    <>
      <React.Fragment>
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        />
        <div className="absolute inline-block">
          <button
            className="mt-6 ml-6 lg:w-0 lg:h-0 btn-menu lg:hidden"
            onClick={(): void => setIsSidebarOpen(true)}
            type="button"
          >
            <GiHamburgerMenu name="burger" className="w-8 h-8" />
          </button>
        </div>
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-80 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
            isSidebarOpen
              ? "ease-out translate-x-0"
              : "ease-in -translate-x-full"
          }`}
        >
          <div className="flex items-center justify-center px-3 py-6 text-center">
            <Link href="/">
              <a>
                <h4 className="font-extrabold">Cheesy_Kitchen</h4>
              </a>
            </Link>
          </div>
          <div>
            {userInfo?.isAdmin && (
              <div className="text-center mb-4">
                <div className="flex justify-center">
                  <img
                    src={userInfo?.img}
                    className="h-20 w-20 mb-3 rounded-full bg-gray-400 p-2"
                    alt="Admin logo"
                  />
                </div>
                <h3 className="text-lg font-bold">{userInfo?.name}</h3>
                <p>{userInfo?.email}</p>
              </div>
            )}
          </div>

          {userInfo?.admin && (
            <Navigation
              activeItemId={router.pathname}
              onSelect={({ itemId }) => {
                router.push({ pathname: itemId });
              }}
              items={[
                {
                  title: "Dashboard",
                  itemId: "/dashboard",
                  elemBefore: () => <BsFillInboxesFill name="inbox" />,
                },
                {
                  title: "Users",
                  itemId: "",
                  elemBefore: () => <AiOutlineUserAdd name="users" />,
                  subNav: [
                    {
                      title: "Admin",
                      itemId: "/",
                      elemBefore: () => (
                        <AiOutlineFundProjectionScreen name="project" />
                      ),
                    },
                    {
                      title: "Teacher",
                      itemId: "/",
                      elemBefore: () => <GiTeacher name="teacher" />,
                    },
                    {
                      title: "Student",
                      itemId: "/",
                      elemBefore: () => <BsBook name="book" />,
                    },
                  ],
                },
              ]}
            />
          )}

          {userInfo?.isAdmin && (
            <Navigation
              activeItemId={router.pathname}
              onSelect={({ itemId }) => {
                router.push({ pathname: itemId });
              }}
              items={[
                {
                  title: "Dashboard",
                  itemId: "/dashboard",
                  elemBefore: () => <BsFillInboxesFill name="inbox" />,
                },
                {
                  title: "Add new food",
                  itemId: "/dashboard/foods/addFoods",
                  elemBefore: () => <BiImageAdd name="foods" />,
                },
                {
                  title: "Manage Food",
                  itemId: "/dashboard/foods/managefoods",
                  elemBefore: () => <FaEdit name="food" />,
                },

                // {
                //   title: "Food Category",
                //   itemId: "/dashboard/courses/addcategories",
                //   elemBefore: () => <BsBook name="book" />,
                // },
                {
                  title: "View All Order",
                  itemId: "/dashboard/allOrder",
                  elemBefore: () => <HiViewList name="view" />,
                },
                {
                  title: "Admin Manage",
                  itemId: "/dashboard/admin/manageAdmin",
                  elemBefore: () => <BiMessageRoundedEdit name="project" />,
                },
                // {
                //   title: "Manage Food",
                //   itemId: "/dashboard/admin/manageFood",
                //   elemBefore: () => <FaEdit name="project" />,
                // },
                {
                  title: "Add Admin",
                  itemId: "/dashboard/admin/addadmin",
                  elemBefore: () => <BiImageAdd name="teacher" />,
                },
              ]}
            />
          )}

          <div className="justify-center pt-20 mt-20 border-t-2 logout__wrapper">
            <Link href="/">
              <button className="flex px-8 py-2 mx-auto mb-4 text-white rounded bg-amazon-600 hover:bg-gray-900">
                <BiHome
                  className="w-5 h-5 mr-2 text-violet-400"
                  aria-hidden="true"
                />
                Home
              </button>
            </Link>

            <button
              className="flex px-8 py-2 mx-auto text-white bg-red-600 rounded hover:bg-gray-900"
              onClick={logoutClickHandler}
            >
              <BiLogOutCircle
                className="w-5 h-5 mr-2 text-violet-400"
                aria-hidden="true"
              />
              Log out
            </button>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export default Sidebar;
