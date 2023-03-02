import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import Button from "./Button";
import Container from "./Container";
import Logo from "./Logo";
import NavLink from "./index/NavLink";

function MobileNavLink({ href, children }) {
    return (
        <Popover.Button as={Link} href={href} className="block w-full p-2">
            {children}
        </Popover.Button>
    );
}

function MobileNavIcon({ open }) {
    return (
        <svg
            aria-hidden="true"
            className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
        >
            <path
                d="M0 1H14M0 7H14M0 13H14"
                className={clsx(
                    "origin-center transition",
                    open && "scale-90 opacity-0"
                )}
            />
            <path
                d="M2 2L12 12M12 2L2 12"
                className={clsx(
                    "origin-center transition",
                    !open && "scale-90 opacity-0"
                )}
            />
        </svg>
    );
}

function MobileNavigation(props) {
    const { profile } = props;

    return (
        <Popover>
            <Popover.Button
                className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
                aria-label="Toggle Navigation"
            >
                {({ open }) => <MobileNavIcon open={open} />}
            </Popover.Button>
            <Transition.Root>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
                </Transition.Child>
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
                        <MobileNavLink href="/#features">
                            Features
                        </MobileNavLink>
                        <MobileNavLink href="/#testimonials">
                            Testimonials
                        </MobileNavLink>
                        <MobileNavLink href="/about">About</MobileNavLink>
                        <MobileNavLink href="/become-a-creative">
                            Become a creative
                        </MobileNavLink>
                        <MobileNavLink href="/#pricing">Pricing</MobileNavLink>

                        {profile.email === "" && (
                            <>
                                <hr className="m-2 border-slate-300/40" />
                                <MobileNavLink href="/businesslogin">
                                    Sign in
                                </MobileNavLink>
                            </>
                        )}
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    );
}

export default function Header(props) {
    const { profile, setProfile } = props;

    return (
        <header className="py-10">
            <Container>
                <nav className="relative z-50 flex justify-between">
                    {/* Navbar */}
                    <div className="flex items-center md:gap-x-12">
                        <Logo 
                            width={70}
                            image={"logo.png"} 
                        />

                        <div className="hidden md:flex md:gap-x-6">
                            <NavLink href="/#features">Features</NavLink>
                            <NavLink href="/#testimonials">
                                Testimonials
                            </NavLink>
                            <NavLink href="/about">About</NavLink>
                            <NavLink href="/#pricing">Pricing</NavLink>
                            <NavLink href="/become-a-creative">
                                Become a creative
                            </NavLink>
                        </div>
                    </div>

                    {/* Sign in and register */}
                    <div className="flex items-center gap-x-5 md:gap-x-8">
                        {profile.email === "" ? (
                            <>
                                <div className="hidden md:block">
                                    <NavLink {...props} href="/business-login">
                                        Sign in
                                    </NavLink>
                                </div>

                                <a href="/business-register">
                                    <Button color="blue">
                                        <span>
                                            Get started{" "}
                                            <span className="hidden lg:inline">
                                                today
                                            </span>
                                        </span>
                                    </Button>
                                </a>
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

                        <div className="-mr-1 md:hidden">
                            <MobileNavigation
                                profile={profile}
                                setProfile={setProfile}
                            />
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    );
}
