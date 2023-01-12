import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon} from '@heroicons/react/24/outline';
import { ChevronLeftIcon, EnvelopeIcon, FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';

import Message from '../components/directory/Message';

import io from 'socket.io-client';
import SideBar from '../components/directory/SideBar';
import axios from 'axios';
const socket = io.connect('http://localhost:8080');

const user = {
    name: 'Tom Cook',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const tabs = [
    { name: 'Profile', href: '#', current: true },
    { name: 'Past Projects', href: '#', current: false },
    { name: 'Messages', href: '#', current: false },
];

const profile = {
    name: 'Ricardo Cooper',
    imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    coverImageUrl:
        'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    about: `
        <p> ABOUT THE CREATIVE FROM DATABASE </p>
    `,
    fields: {
        Phone: '+44 7836718800',
        Email: 'ricardocooper@example.com',
        Title: 'Senior Front-End Developer',
        Team: 'Product Development',
        Country: 'United Kinngdom',
        City: 'Falmouth',
        HourlyRate: '$50',
        Birthday: 'June 8, 1990',
    },
};

let rawDirectory;
let rawDirectoryLength;

let directory = {
    A: [
    ],
    B: [       
    ],
    C: [
    ],
    D: [
    ],
    E: [
    ],
    F: [
    ],
    G: [
    ],
    H: [
    ],
    I: [
    ],
    J: [
    ],
    K: [
    ],
    L: [
    ],    
    M: [
    ],
    N: [
    ],
    O: [
    ],
    P: [
    ],
    Q: [
    ],
    R: [
    ],
    S: [
    ],
    T: [
    ],
    U: [
    ],
    V: [
    ],
    W: [
    ],
    X: [
    ],
    Y: [
    ],
};

let searchResults = {
    A: [
    ],
    B: [       
    ],
    C: [
    ],
    D: [
    ],
    E: [
    ],
    F: [
    ],
    G: [
    ],
    H: [
    ],
    I: [
    ],
    J: [
    ],
    K: [
    ],
    L: [
    ],    
    M: [
    ],
    N: [
    ],
    O: [
    ],
    P: [
    ],
    Q: [
    ],
    R: [
    ],
    S: [
    ],
    T: [
    ],
    U: [
    ],
    V: [
    ],
    W: [
    ],
    X: [
    ],
    Y: [
    ],
}

const team = [
    {
        name: 'Leslie Alexander',
        handle: 'lesliealexander',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Michael Foster',
        handle: 'michaelfoster',
        role: 'Co-Founder / CTO',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        role: 'Manager, Business Relations',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        role: 'Front-end Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
};

export default function CreativeDirectory(props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [renderMessage, setRenderMessage] = useState(false);
    const [directoryLoaded, setDirectoryLoaded] = useState(false);
    const [directoryList, changeDirectoryList] = useState('directory');

    // //Replace this with currently logged username string
    // const username = "John Smith";

    const selectRecipient = () => {
        //Emits recipient to back end
        socket.emit('select_recipient', profile.name);
    };    
    

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');


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


function getDirectory(){
    axios.get('http://localhost:8080/search/getDirectory')
        .then(res => {   
            rawDirectory = res.data;
            rawDirectoryLength = rawDirectory.length
            // loop through each of the fetched user elements
            let sortedUsers = [];
            rawDirectory.forEach(element => {                
                if (!sortedUsers.includes(element.user_name)) {                
                //     // loop through each of the directory keys ie A, B, C etc
                    sortedUsers.push(element.user_name)
                    Object.keys(directory).forEach(letter => {
                        // if first letter of users last name, raised to upper case matches the directory key
                        if (element.last_name[0].toUpperCase() === letter) {
                            // add the element to that directory key
                            directory[letter].push(element)
                        }
                    });
                } else {
                    return;
                }    
            });
            setDirectoryLoaded(true);              
    }).catch(err => {
        console.log(err);
    });
}
    
function searchDirectory(query) {
    // only search if query is greater than 3 characters
    if (query.length > 3) {
        // empty the search results list
        searchResults = {
A: [
],
B: [       
],
C: [
],
D: [
],
E: [
],
F: [
],
G: [
],
H: [
],
I: [
],
J: [
],
K: [
],
L: [
],    
M: [
],
N: [
],
O: [
],
P: [
],
Q: [
],
R: [
],
S: [
],
T: [
],
U: [
],
V: [
],
W: [
],
X: [
],
Y: [
],
        }
        // loop through each user in the raw directory list
        rawDirectory.forEach(element => {
            // if the first and last name when joined together (raised to uppercase) contains the query (raised to uppercase)..
            if ((element.first_name + " " + element.last_name).toLocaleUpperCase().includes(query.toUpperCase())) {                
                // loop through each of the directory keys ie A, B, C etc
                Object.keys(searchResults).forEach(letter => {
                    // if first letter of users last name, raised to upper case matches the directory key
                    if (element.last_name[0].toUpperCase() === letter) {
                        // add the element to that directory key
                        searchResults[letter].push(element)
                    }
                });
            } else {
                return;
            }    
        });
        // change the state to trigger search results being displayed
        changeDirectoryList('searchResults')
    } else {
        // any less than 3 characters in query, show full directory
        changeDirectoryList('directory')
    }
}
    
getDirectory(props);
    return (
        <div class="flex">
            <SideBar userData={props.userData} />
            <div className="flex w-screen h-auto">
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
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
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"passwordSa
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
                                                src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
                                                alt="Your Company"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                                        <a href="#" className="group block flex-shrink-0">
                                            <div className="flex items-center">
                                                <div>
                                                    <img className="inline-block h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{user.name}</p>
                                                    <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
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
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                    <div className="lg:hidden">
                        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
                            <div>
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
                                    alt="Your Company"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="relative z-0 flex flex-1 overflow-hidden">
                        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
                            {/* Breadcrumb */}
                            <nav className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden" aria-label="Breadcrumb">
                                <a href="/directory" className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900">
                                    <ChevronLeftIcon className="-ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <span>Directory</span>
                                </a>
                            </nav>
                            <article>
                                {/* Profile header */}
                                <div>
                                    <div>
                                        <img className="h-32 w-full object-cover lg:h-48" src={profile.coverImageUrl} alt="" />
                                    </div>
                                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                                        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                                            <div className="flex">
                                                <img
                                                    className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                                                    src={"http://localhost:8080/public/" + profilePicture}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                                                <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                                                    <h1 className="truncate text-2xl font-bold text-gray-900">{firstName + " " + lastName}</h1>
                                                </div>
                                                <div className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setRenderMessage(!renderMessage);
                                                            selectRecipient();
                                                        }}                                                            
                                                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                                                    >
                                                        <EnvelopeIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        {renderMessage ? (
                                                            <span>Close Message</span>
                                                        ) : (
                                                            <span>Message</span>
                                                        )}
                                                    </button>
                                                
                                                    {/* <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                                                    >
                                                        <PhoneIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        <span>Call</span>
                                                    </button> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                                            <h1 className="truncate text-2xl font-bold text-gray-900">{firstName + " " + lastName}</h1>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="mt-6 sm:mt-2 2xl:mt-5">
                                    <div className="border-b border-gray-200">
                                        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                                            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                                {tabs.map((tab) => (
                                                    <a
                                                        key={tab.name}
                                                        href={tab.href}
                                                        className={classNames(
                                                            tab.current
                                                                ? 'border-blue-600 text-gray-900'
                                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                                            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                                                        )}
                                                        aria-current={tab.current ? 'page' : undefined}
                                                    >
                                                        {tab.name}
                                                    </a>
                                                ))}
                                            </nav>
                                        </div>
                                    </div>
                                </div>

                                {/* If state is true render Messaging component */}
                                {renderMessage ? (
                                    <Message socket={socket} sender={username} recipient={profile.name}/> 
                                ) : (
                                    <>
                                        {/* Description list */}
                                        <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                                {Object.keys(profile.fields).map((field) => (
                                                    <div key={field} className="sm:col-span-1">
                                                        <dt className="text-sm font-medium text-gray-500">{field}</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{profile.fields[field]}</dd>
                                                    </div>
                                                ))}
                                                <div className="sm:col-span-2">
                                                    <dt className="text-sm font-medium text-gray-500">About</dt>
                                                    <dd
                                                        className="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                                                        dangerouslySetInnerHTML={{ __html: profile.about }}
                                                    />
                                                </div>
                                            </dl>
                                        </div>

                                        {/* Team member list */}
                                        <div className="mx-auto mt-8 max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
                                            <h2 className="text-sm font-medium text-gray-500">Previously worked with</h2>
                                            <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                {team.map((person) => (
                                                    <div
                                                        key={person.handle}
                                                        className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:border-gray-400"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <a href="#" className="focus:outline-none">
                                                                <span className="absolute inset-0" aria-hidden="true" />
                                                                <p className="text-sm font-medium text-gray-900">{person.name}</p>
                                                                <p className="truncate text-sm text-gray-500">{person.role}</p>
                                                            </a>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </article>
                        </main>


                        
                        <aside className="hidden w-96 flex-shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
                            <div className="px-6 pt-6 pb-4">
                                <h2 className="text-lg font-medium text-gray-900">Directory</h2>
                                <p className="mt-1 text-sm text-gray-600">Search directory of {rawDirectoryLength} employees</p>
                                <form className="mt-6 flex space-x-4" action="#">
                                    <div className="min-w-0 flex-1">
                                        <label htmlFor="search" className="sr-only">
                                            Search
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                type="search"
                                                name="search"
                                                id="search"
                                                className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                                                placeholder="Search"
                                                onChange={event => searchDirectory(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                                    >
                                        <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        <span className="sr-only">Search</span>
                                    </button>
                                </form>
                            </div>
                            {/* Directory list */}
                          
                            {directoryLoaded ?
                                <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">                                    
                                    {directoryList === 'directory' ?
                                        Object.keys(directory).map((letter) => (
                                            <div key={letter} className="relative">
                                                <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                                                    <h3>{letter}</h3>
                                                </div>
                                                <ul role="list" className="relative z-0 divide-y divide-gray-200">
                                                    {directory[letter].map((person) => (
                                                        <li key={person.id}>
                                                            <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 hover:bg-gray-50">
                                                                <div className="flex-shrink-0">
                                                                    <img className="h-10 w-10 rounded-full" src={"http://localhost:8080/public/" + person.profile_picture} alt="" />
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <a href="#" className="focus:outline-none">
                                                                        {/* Extend touch target to entire panel */}
                                                                        <span className="absolute inset-0" aria-hidden="true" />
                                                                        <p className="text-sm font-medium text-gray-900">{person.first_name + " " + person.last_name}</p>
                                                                        <p className="truncate text-sm text-gray-500">{person.work}</p>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))
                                        :
                                        Object.keys(searchResults).map((letter) => (
                                            <div key={letter} className="relative">
                                                <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                                                    <h3>{letter}</h3>
                                                </div>
                                                <ul role="list" className="relative z-0 divide-y divide-gray-200">
                                                    {searchResults[letter].map((person) => (
                                                        <li key={person.id}>
                                                            <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 hover:bg-gray-50">
                                                                <div className="flex-shrink-0">
                                                                    <img className="h-10 w-10 rounded-full" src={"http://localhost:8080/public/" + person.profile_picture} alt="" />
                                                                </div>
                                                                <div className="min-w-0 flex-1">
                                                                    <a href="#" className="focus:outline-none">
                                                                        {/* Extend touch target to entire panel */}
                                                                        <span className="absolute inset-0" aria-hidden="true" />
                                                                        <p className="text-sm font-medium text-gray-900">{person.first_name + " " + person.last_name}</p>
                                                                        <p className="truncate text-sm text-gray-500">{person.work}</p>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))                                    
                                    }
                                </nav>
                                    
                                : <></>}
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};
