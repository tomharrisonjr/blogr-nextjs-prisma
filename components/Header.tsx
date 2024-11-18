import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <div className="bold" data-active={isActive('/')}>
          Feed
        </div>
      </Link>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/">
          <div className="bold" data-active={isActive('/')}>
            Feed
          </div>
        </Link>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <div data-active={isActive('/signup')}>Log in</div>
        </Link>
       </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/">
          <div className="bold" data-active={isActive('/')}>
            Feed
          </div>
        </Link>
        <Link href="/drafts">
          <div data-active={isActive('/drafts')}>My drafts</div>
        </Link>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create">
          <button>
            <div>New post</div>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <div>Log out</div>
        </button>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
    </nav>
  );
};

export default Header;
