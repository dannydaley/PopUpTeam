import { Link } from 'react-router-dom';
import { Popover } from '@headlessui/react';

export default function NavLink({ href, children }) {
  return (
    <Link
      to={href}
      as={Popover.Button}
      className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  );
};