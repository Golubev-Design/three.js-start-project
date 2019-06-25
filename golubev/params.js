setCSSParams();
function setCSSParams() {
  setParams();
  window.addEventListener('resize', () => setParams());

  function setParams() {
    let vw = document.documentElement.clientWidth * 0.01,
      vh = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
    document.documentElement.style.setProperty('--vw', vw + 'px');
  }
}
