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

// Close drawer when clicking a link
const navLinks = document.querySelectorAll('.SideDrawer a');
navLinks.forEach((link) => {
  link.addEventListener('click', toggleDrawer);
});

// 🚀 CLEANUP: Remove the animation block safely once the layout pipeline stabilizes
document.addEventListener('DOMContentLoaded', () => {
  // A tiny 50ms macro-task delay ensures the browser completes its first layout layout frame cleanly
  setTimeout(() => {
    document.body.classList.remove('preload');
  }, 50);
});
