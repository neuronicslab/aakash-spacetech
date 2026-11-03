// AAKASH site: sign-in gate + mobile menu.
// NOTE: this is a simple client-side gate for an internal preview. It is NOT real
// security - the credentials are visible to anyone who reads this file.
(function () {
  var USER = "cst", PASS = "cst123", KEY = "aakash_auth";
  var root = document.documentElement;
  function ss(fn) { try { return fn(sessionStorage); } catch (e) { return null; } }

  var form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var u = document.getElementById("u").value.trim();
      var p = document.getElementById("p").value;
      if (u === USER && p === PASS) {
        ss(function (s) { s.setItem(KEY, "1"); });
        root.classList.add("authed");
        window.scrollTo(0, 0);
      } else {
        document.getElementById("err").textContent = "Incorrect username or password.";
        document.getElementById("p").value = "";
      }
    });
  }

  var out = document.getElementById("signout");
  if (out) {
    out.addEventListener("click", function () {
      ss(function (s) { s.removeItem(KEY); });
      root.classList.remove("authed");
      if (form) form.reset();
    });
  }

  var nav = document.querySelector("nav.main");
  if (nav) {
    var tog = nav.querySelector(".menu-toggle");
    tog.addEventListener("click", function () {
      var o = nav.classList.toggle("open");
      tog.setAttribute("aria-expanded", o);
    });
    [].forEach.call(nav.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        tog.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
