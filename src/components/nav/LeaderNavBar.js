import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listPendingRequests } from "../ApiManager";
import { FaLeaf, FaTimes } from "react-icons/fa";
import "./NavBar.css";
import LL2 from "../../images/LL2.svg";

export const LeaderNavBar = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const navRef = useRef();
 
  const links = document.querySelectorAll('.navbar__item');

links.forEach(link => {
  link.addEventListener('click', () => {
    const navMenu = document.querySelector('nav');
    navMenu.classList.remove('responsive_nav');
    const navBtn = document.querySelector('.nav-btn');
    navBtn.classList.remove('open');
  });
});

  useEffect(() => {
    listPendingRequests().then((requestArray) => {
      setRequests(requestArray);
    });
  }, []);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const pendingCount = () => {
    let count = requests.length;
    return count;
  };

  return (
    <header className="nav__header">
      <Link className="navbar__item navbar_home" to="/"><img className="navbar__img" src={LL2} /></Link>
      <nav ref={navRef}>

      <Link className="navbar__item navbar_treasures" to="/family_tree">
          Family
        </Link>

        <Link className="navbar__item navbar_treasures" to="/treasure">
          Treasures
        </Link>

        <Link className="navbar__item navbar_requests" to="/requests">
          Requests {pendingCount()}
        </Link>

        <Link
          className="navbar__item navbar__link"
          to=""
          onClick={() => {
            localStorage.removeItem("family_user");
            navigate("/", { replace: true });
          }}
        >
          Leader Logout
        </Link>

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaLeaf />
      </button>
    </header>
  );
};
