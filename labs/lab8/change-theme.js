const nightThemeButton = document.getElementById('night-mode-button'); // btn icon
const nightThemeLink = document.getElementById('night-theme'); // css
const imgTheme = document.getElementById('img-theme'); // icon

let checkTheme = 1;

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    nightThemeLink.disabled = !nightThemeLink.disabled; // светлая тема
    imgTheme.src = 'src/dark-theme.png'
    checkTheme = 2;
  } else {
    nightThemeLink.disabled = !nightThemeLink.disabled; // темная тема
    imgTheme.src = 'src/sun-theme.png'
    checkTheme = 1;
  }

nightThemeButton.addEventListener('click', () => {
    checkTheme += 1;
    nightThemeLink.disabled = !nightThemeLink.disabled;
    if (checkTheme  % 2 === 0) {
        imgTheme.src = 'src/dark-theme.png';
    }
    else {
        imgTheme.src = 'src/sun-theme.png'
    }
});