const smoothScroll = () => {
  var links = document.querySelectorAll('a[href^="#"]');
  if (!links.length) {
    return;
  }
  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      var href = this.getAttribute("href");
      if (href) {
        var targetId = href.substring(1);
        var targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scroll({ top: 0, left: 0, behavior: "smooth" });
        }
        // proses selanjutnya
      } else {
        console.warn("Element doesn't have href attribute:", this);
        // handling untuk kasus ini

      }
    });
  });
};

export default smoothScroll;
