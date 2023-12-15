Array.from(document.querySelectorAll("input, textarea")).forEach((input) => {
  input.addEventListener("keyup", () => {
    if (input.getAttribute("data-format") == "json") {
      validateJSON(input);
    }
    if (input.getAttribute("data-config")) {
      textAreaAdjust(document.getElementById("didomiConfig"));
      writeConfig(input, document.querySelector('[data-qp="cbody"]'));
    }
    updateUrl();
  });

  input.addEventListener("change", (e) => {
    textAreaAdjust(document.getElementById("didomiConfig"));

    if (input.getAttribute("data-config")) {
      writeConfig(input, document.querySelector('[data-qp="cbody"]'));
    }

    updateUrl();
  });
});

function textAreaAdjust(element) {
  element.style.height = "1px";
  element.style.height = 25 + element.scrollHeight + "px";
}

window.onload = function () {
  document
    .getElementById("sidebar_toggle")
    .addEventListener("click", function () {
      document.getElementById("container").classList.toggle("deployed");
    });

  updateInputs();
  textAreaAdjust(document.getElementById("didomiConfig"));

  makeConfigObject();
  makeIframe(
    document.getElementById("didomiConfig").value,
    document.querySelector("[data-acb]").value,
  );

  makeConfigObject();

  document.getElementById("refresh").addEventListener("click", function () {
    makeIframe(
      document.getElementById("didomiConfig").value,
      document.querySelector("[data-acb]").value,
    );
  });
  document.getElementById("check").addEventListener("click", function () {
    var html64 = btoa(
      document.querySelector("#iframe_container iframe").getAttribute("srcdoc"),
    );
    window.open("https://playground.amp.dev/#share=" + html64);
  });
};
