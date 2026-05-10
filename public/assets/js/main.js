const drawerToggle = document.querySelector('.header__drawer-toggle');
const sideDrawer = document.querySelector('#side-drawer');
const backdrop = document.querySelector('#backdrop');

function toggleDrawer() {
  sideDrawer.classList.toggle('open');
  backdrop.classList.toggle('show');
}

// Open drawer on toggle click
drawerToggle.addEventListener('click', toggleDrawer);

// Close drawer when clicking the backdrop
backdrop.addEventListener('click', toggleDrawer);

// Close drawer when clicking a link (optional, but good for UX)
const navLinks = document.querySelectorAll('.SideDrawer a');
navLinks.forEach((link) => {
  link.addEventListener('click', toggleDrawer);
});
