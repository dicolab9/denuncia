const menuToggle = document.getElementById('menuToggle');
const navList = document.querySelector('nav ul.nav-list');

menuToggle.addEventListener('click', () => {
  navList.classList.toggle('show');
});
