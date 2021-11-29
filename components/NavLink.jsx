import { useRouter } from 'next/router';
import Link from 'next/link';
export { NavLink };
import { useEffect } from 'react';

function NavLink({ children, href, setBtn, className, ...props }) {
    let exact = href === '/'
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    useEffect(() => {
        if (isActive) {
            className += ' active';
            setBtn()
        }
    }, [pathname])

    return (
        <Link href={href} {...props}
        >
            <a className={className}>
                {children}
            </a>
        </Link>
    );
}