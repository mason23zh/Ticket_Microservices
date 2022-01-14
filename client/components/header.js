import Link from "next/link";

export default ({ currentUser }) => {
  const link = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" }, //if no current user
    !currentUser && { label: "Sign In", href: "/auth/signin" }, //if no current user
    currentUser && { label: "Sign Out", href: "/auth/signout" }, //if have current user
  ]
    .filter((linkConfig) => linkConfig) //filter out the false statement. [].filter(Boolen)
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">Ticks</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{link}</ul>
      </div>
    </nav>
  );
};
