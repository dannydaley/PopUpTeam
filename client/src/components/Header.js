import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";

import Button from "./Button";
import Container from "./Container";
import Logo from "./Logo";
import NavLink from "./index/NavLink";
import ScrollTo from "../lib/scrollTo";

function MobileNavigation(props) {
    const { profile } = props;

    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <Popover>
            {/* Mobile menu toggle */}
            <Popover.Button
                className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
                aria-label="Toggle Navigation"
            >
                <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
                    fill="none"
                    strokeWidth={2}
                    strokeLinecap="round"
                    onClick={() => setMobileMenu(!mobileMenu)}
                >
                    {!mobileMenu ? (
                        <path
                            d="M0 1H14M0 7H14M0 13H14"
                        />
                    ) : (
                        <path
                            d="M2 2L12 12M12 2L2 12"
                        />
                    )}
                </svg>
            </Popover.Button>
            
            <Transition.Root show={mobileMenu}>
                {/* Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Popover.Overlay 
                        onClick={() => setMobileMenu(false)}
                        className="fixed inset-0 bg-slate-300/50" 
                    />
                </Transition.Child>

                {/* Menu */}
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        as="div"
                        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
                    >
                        <div 
                            onClick={() => {
                                ScrollTo({ target: "features",  offset: -80, mobileOffset: -100 });
                                setMobileMenu(false);
                            }}
                        >
                            <NavLink>
                                Features
                            </NavLink>
                        </div>
                        <div 
                            onClick={() => {
                                ScrollTo({ target: "testimonials",  offset: -80, mobileOffset: -100 });
                                setMobileMenu(false);
                            }}
                        >
                            <NavLink>
                                Testimonials
                            </NavLink>
                        </div>
                        <div 
                            onClick={() => {
                                ScrollTo({ target: "pricing",  offset: -80, mobileOffset: -100 });
                                setMobileMenu(false);
                            }}
                        >
                            <NavLink>
                                Pricing
                            </NavLink>
                        </div>
                        {/* <NavLink href="/about">
                            About
                        </NavLink> */}
                        <NavLink href="/become-a-creative">
                            Become a creative
                        </NavLink>

                        {profile.email === "" && (
                            <>
                                <hr className="m-2 border-slate-300/40" />
                                <NavLink href="/business-login">
                                    Sign in
                                </NavLink>
                            </>
                        )}
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    );
};

export default function Header(props) {
    const { profile } = props;

    return (
        <header className="py-10">
            <Container>
                <nav className="relative z-50 flex justify-between">
                    {/* Navbar */}
                    <div className="flex items-center lg:gap-x-12">
                        <Logo 
                            width={90}
                            image={"logo.png"} 
                        />

                        {/* Nav links */}
                        <div className="hidden lg:flex lg:gap-x-6">
                            <div onClick={() => ScrollTo({ target: "features", offset: -80 })}>
                                <NavLink>
                                    Features
                                </NavLink>
                            </div>
                            <div onClick={() => ScrollTo({ target: "testimonials", offset: -80 })}>
                                <NavLink>
                                    Testimonials
                                </NavLink>
                            </div>
                            <div onClick={() => ScrollTo({ target: "pricing", offset: -80 })}>
                                <NavLink>
                                    Pricing
                                </NavLink>
                            </div>
                            {/* <NavLink href="/about">
                                About
                            </NavLink> */}
                            <NavLink href="/become-a-creative">
                                Become a creative
                            </NavLink>
                        </div>
                    </div>

                    {/* Sign in and register */}
                    <div className="flex items-center gap-x-5 lg:gap-x-8">
                        {profile.email === "" ? (
                            <>
                                <div className="hidden lg:block">
                                    <NavLink {...props} href="/business-login">
                                        Sign in
                                    </NavLink>
                                </div>

                                <Link to="/business-register">
                                    <Button color="blue">
                                        <span>
                                            Get started{" "}
                                            <span className="hidden lg:inline">
                                                today
                                            </span>
                                        </span>
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <Link
                                to="/directory"
                                className="flex items-center space-x-2.5"
                            >
                                <img
                                    className="inline-block h-9 w-9 rounded-full"
                                    src={
                                        process.env.REACT_APP_SERVER +
                                        "/public/" +
                                        profile.profilePicture
                                    }
                                    alt="Logged in user profile"
                                />

                                <div className="text-sm font-medium">
                                    {profile.firstName} {profile.lastName}
                                </div>
                            </Link>
                        )}

                        {/* Mobile menu */}
                        <div className="-mr-1 lg:hidden">
                            <MobileNavigation profile={profile} />
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    );
};