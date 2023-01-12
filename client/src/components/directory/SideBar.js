import { Fragment, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, CalendarIcon, FolderIcon, Cog6ToothIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '../Logo';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
};

export default function SideBar(props) {
    const navigate = useNavigate()
    const location = useLocation()
    
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');


    //Must be brought into function to prevent top level hook error
    const navigation = [
        { name: 'Dashboard', href: 'dashboard', icon: HomeIcon, current: (location.pathname === "/dashboard" ? true : false) },
        { name: 'Directory', href: 'directory', icon: UsersIcon, current: (location.pathname === "/directory" ? true : false) },
        { name: 'Projects', href: 'projects', icon: FolderIcon, current: (location.pathname === "/projects" ? true : false) },
        { name: 'Kanban', href: 'kanban', icon: CalendarIcon, current: (location.pathname === "/kanban" ? true : false) },
        { name: 'Settings', href: 'settings', icon: Cog6ToothIcon, current: (location.pathname === "/settings" ? true : false) },
    ];

    useEffect(() => {
        // Get session user data
        axios.get('http://localhost:8080/auth/signin') 
            .then(res => {
                //If user is logged in set login data
                if (res.data.loggedIn === true) {
                    setUsername(res.data.username);
                    setFirstName(res.data.firstName);
                    setLastName(res.data.lastName);
                    setProfilePicture(res.data.profilePicture);
                };
            }).catch(err => {
                console.log(err);
            });
    }, []);

    // Logout user
    const onSignOut = () => {
        // Logout user
        axios.post('http://localhost:8080/auth/signout')
            .then(res => {
                //Default data
                setUsername('');
                setFirstName('');
                setLastName(''); 
                setProfilePicture('');

                navigate('/'); // Redirects to home page
            }).catch(err => {
                console.log(err);
            });
    };

    return (
        <>
            {/* Mobile sidebar */}
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                                    <div className="flex flex-shrink-0 items-center px-4">
                                        <img
                                            className="h-8 w-auto"
                                            src=""
                                            alt="PopUpTeam"
                                        />
                                    </div>
                                    <nav className="mt-5 space-y-1 px-2">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-indigo-800 text-white'
                                                        : 'text-white hover:bg-indigo-600 hover:bg-opacity-75',
                                                    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                )}
                                            >
                                                <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
                                                {item.name}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                                <div className="flex flex-shrink-0 border-t border-indigo-800 p-4">
                                    <a href="#" className="group block flex-shrink-0">
                                        <div className="flex items-center">
                                            <div>
                                                <img
                                                    className="inline-block h-10 w-10 rounded-full"
                                                    src=""
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-base font-medium text-white">!!</p>
                                                <p className="text-sm font-medium text-indigo-200 group-hover:text-white">View profile</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0" aria-hidden="true">
                            {/* Force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Sidebar toggle button */}
            <div className="flex flex-1 flex-col md:pl-64">
                <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </div>

            {/* Desktop sidebar*/}
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                <div className="flex min-h-0 flex-1 flex-col bg-indigo-700">
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <div className="flex flex-shrink-0 items-center px-4">
                            {/* Replace with logo component */}
                            <svg
                                onClick={() => navigate('/')}
                                fill="#006bff"
                                xmlns="http://www.w3.org/2000/svg"
                                width="170"
                                height="70"
                                version="1"
                                viewBox="0 0 1628 802"
                                className="h-10 w-auto hover:cursor-pointer"
                            >
                                <path
                                    d="M4517 6818l-877-703v-832l28-39c116-158 267-267 452-325 65-21 95-24 230-24 167 0 211 9 337 65 124 56 262 167 352 284l41 53v820l366 419c201 231 470 538 597 683 128 146 238 273 245 283 13 17-3 18-441 18h-454l-876-702zM6559 7362c-69-86-186-231-259-322-164-202-364-450-578-716l-162-201v-850l32-44c100-139 266-256 438-310 65-21 95-24 230-24 171 0 240 15 365 77 120 61 281 199 349 302l26 39v822l31 85c17 47 35 96 39 110 5 14 29 81 55 150s50 136 55 150c4 14 25 70 45 125s40 111 45 125c4 14 25 70 45 125s40 111 45 125c4 14 25 70 45 125s47 129 60 165 26 73 30 83c7 16-16 17-401 17h-409l-126-158zM7814 7509c-4-6-11-28-16-48s-14-52-19-71c-12-40-5-16-104-365-42-148-80-283-85-300-8-26-31-106-72-250-6-22-15-53-19-70-5-16-25-84-44-151l-35-121v-854l32-47c87-126 253-248 415-305 84-30 96-31 248-32 178 0 244 14 375 80 119 60 266 185 336 286l25 36-1 429c0 240-5 444-10 464-5 19-24 96-41 170s-42 180-54 235c-13 55-36 152-50 215-15 63-35 151-45 195-11 44-31 132-45 195-61 265-68 296-71 308-5 17-709 18-720 1zM8890 7505c0-9 9-44 19-78 11-34 32-102 47-152 15-49 37-124 50-165 12-41 37-122 54-180s42-139 55-180c24-78 63-209 110-365 15-49 38-124 51-165 24-74 24-78 24-503s0-429 22-460c111-161 276-282 458-339 65-20 96-23 230-23 171 0 241 15 365 77 120 61 250 171 332 282l43 58v397c0 358-2 399-17 421-19 27-671 902-897 1203l-140 187h-403c-356 0-403-2-403-15zM10087 7508c4-7 261-322 570-701l563-687v-843l27-36c103-137 244-246 383-298 118-44 142-48 300-48 134 0 165 3 225 23 187 61 360 186 477 346l28 39v814l-162 129c-90 70-365 288-613 484-247 196-573 454-724 573l-273 217h-405c-321 0-403-3-396-12zM5486 4350c-16-5-44-24-63-42-62-60-63-71-63-673 0-556 5-652 41-784 92-340 373-498 849-478 246 11 404 70 535 202 109 109 161 228 185 425 6 49 10 315 10 630 0 598-2 619-57 672-76 73-194 78-267 10-62-59-60-39-66-702-5-548-8-610-24-660-44-134-100-200-202-241-51-20-76-23-194-23-116 0-143 3-191 22-105 42-170 117-205 237-16 53-18 129-23 665-7 663-5 644-67 701-50 45-127 60-198 39zM365 4321c-79-20-123-62-144-136-15-56-15-1614 0-1670 53-193 315-190 369 4 6 20 10 165 10 332v297l278 5c239 4 288 8 361 26 118 30 202 73 275 141 104 98 153 212 163 385 18 312-136 537-412 601-57 14-143 17-470 20-220 1-413-1-430-5zm676-295c176-32 242-109 243-286 1-110-16-152-83-213-71-64-142-79-388-85l-213-4v602h183c107-1 213-6 258-14zM9113 4318c-17-6-46-26-64-44-28-29-33-43-36-91-5-73 18-119 73-147 36-19 60-21 292-24l252-3v-727c0-495 4-740 11-767 40-145 213-192 322-87 57 54 57 58 57 853v728l258 3c250 3 258 4 295 26 47 30 69 72 69 132s-22 102-69 132l-38 23-695 2c-456 1-706-2-727-9zM2395 3816c-345-66-556-341-555-721 1-261 107-478 295-604 136-90 282-128 465-118 129 7 201 25 305 76 229 113 366 358 365 656-2 345-188 609-490 695-96 27-286 35-385 16zm308-290c132-64 207-219 207-426 0-208-75-362-208-427-50-24-69-28-147-28s-97 4-147 28c-141 69-216 239-205 462 11 215 93 355 239 407 77 27 187 21 261-16zM11238 3820c-282-51-466-218-540-487-32-115-32-356 0-466 37-131 85-212 176-302 90-90 158-129 291-166 106-31 353-34 455-6 222 61 393 215 393 353 0 50-20 79-72 101-58 24-100 10-183-63-154-136-219-167-358-168-89-1-100 1-163 32-108 53-177 160-193 297l-7 54 419 3c374 3 424 6 466 22 99 37 131 125 105 285-39 242-210 431-447 497-65 18-275 27-342 14zm232-256c79-23 159-107 188-194 11-36 24-86 28-112l6-48h-654l6 38c30 171 114 288 230 321 50 15 138 12 196-5zM12865 3823c-159-20-297-75-380-154-162-153-139-359 40-359 64 0 81 12 148 108 30 42 72 89 93 104 75 52 225 72 344 47 92-20 139-83 156-211l7-46-74-22c-41-12-153-40-249-61-96-22-216-48-266-59-230-52-357-175-371-363-13-168 75-315 230-388 199-92 443-56 674 101 40 28 74 50 77 50 2 0 18-22 35-49 40-61 121-138 156-147 68-17 150 23 187 92l22 42-34 123-34 124-6 355c-6 326-8 360-28 420-57 173-164 253-382 286-86 13-270 17-345 7zm402-835c-8-150-26-201-96-269-78-76-145-102-266-103-81-1-95 2-137 26-56 34-90 85-96 148-10 106 56 167 226 207 83 19 350 85 371 92 2 0 1-45-2-101zM3681 3798c-19-13-44-39-55-58-21-35-21-45-21-905 0-865 0-870 21-916 52-111 229-106 286 9 22 46 23 56 26 363l3 315 77-75c87-86 150-124 243-146 260-61 528 66 647 306 57 115 82 219 89 364 15 327-111 586-340 701-224 113-463 76-641-100l-74-73-4 56c-9 116-61 173-163 179-50 3-66 0-94-20zm717-263c66-20 152-97 187-168 33-68 55-174 55-267 0-277-153-466-362-447-146 13-261 121-303 284-19 73-19 239 0 321 51 216 231 334 423 277zM7511 3798c-19-13-44-39-55-58-21-35-21-45-21-905 0-865 0-870 21-916 52-111 229-106 286 9 22 46 23 56 26 363l3 315 77-75c87-86 150-124 243-146 260-61 528 66 647 306 57 115 82 219 89 364 15 327-111 586-340 701-224 113-463 76-641-100l-74-73-4 56c-9 116-61 173-163 179-50 3-66 0-94-20zm717-263c66-20 152-97 187-168 33-68 55-174 55-267 0-277-153-466-362-447-146 13-261 121-303 284-19 73-19 239 0 321 51 216 231 334 423 277zM14104 3806c-39-17-71-58-84-107-7-25-10-241-8-616l3-578 27-47c69-117 242-116 308 2l25 45 6 380c6 390 10 426 52 528 36 84 136 134 253 124 102-8 145-53 164-175 6-31 10-228 10-437 0-247 4-394 11-420 16-57 46-95 93-116 100-45 208-4 251 96 5 11 12 193 15 405 5 333 8 393 24 448 64 218 342 277 422 89 17-38 19-86 24-482 5-430 5-441 27-481 76-142 289-116 332 41 7 26 11 189 11 470-1 552-8 600-116 715-55 59-125 97-211 115-194 41-362-7-497-141-36-37-66-62-66-57 0 23-77 106-131 142-136 91-352 94-513 8-33-17-88-59-122-92l-62-60-4 58c-5 61-23 95-71 131-34 25-129 32-173 12zM9709 1815c-83-16-115-33-181-92-75-67-244-175-378-241-128-64-197-91-380-150-19-6-87-23-150-36-647-140-1328-11-1835 346-142 100-169 111-290 111-91 1-106-2-166-30-77-35-127-82-157-146-40-86-21-195 46-263 75-74 335-239 504-318 446-209 886-306 1389-306 184 0 237 4 449 31 493 64 992 263 1375 549 154 116 195 174 195 278 0 132-103 236-265 267-42 8-80 15-83 14-4 0-37-7-73-14z"
                                    transform="matrix(.1 0 0 -.1 0 802)"
                                ></path>
                            </svg>
                            {/* <img
                                className="h-8 w-auto"
                                // WHITE LOGO VARIATION BELOW
                                src={logo}
                                alt="PopUpTeam"
                            /> */}
                        </div>
                        <nav className="mt-5 flex-1 space-y-1 px-2">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-indigo-800 text-white' : 'text-white hover:bg-indigo-600 hover:bg-opacity-75',
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                    )}
                                >
                                    <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="flex flex-shrink-0 border-t border-indigo-800 p-4">
                        <a href="#" className="group block w-full flex-shrink-0">
                            <div className="flex items-center">
                                <div>
                                    <img
                                        className="inline-block h-9 w-9 rounded-full"
                                        // USER PROFILE PHOTO BELOW
                                        src={'http://localhost:8080/public/' + profilePicture}
                                        alt="Logged in user profile picture"
                                    />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-white">{firstName} {lastName}</p>
                                    <div className="ml-3 columns-2">
                                        <p className="text-xs font-medium text-indigo-200 hover:text-white">View profile</p>
                                        <p onClick={onSignOut} className="text-xs font-medium text-indigo-200 hover:text-white">Logout</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
         