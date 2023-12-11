(function () {
  const linkStyles = async () => {
    const myCss = GM_getResourceText("styles");
    const styleTag = document.createElement("style");
    styleTag.textContent = myCss;

    document.body.prepend(styleTag);
  };

  const toggleIconsVisibility = (button) => {
    button.classList.toggle("active");
    button
      .querySelectorAll(".copy-icon")
      .forEach((icon) => icon.classList.toggle("invisible"));
  };

  const copyPageLinkIntoClipboard = async (e) => {
    const { currentTarget: button } = e;
    const { pathname, href } = window.location;
    const linkName = pathname.split("/").at(-1);

    const clipboardItem = new ClipboardItem({
      "text/plain": new Blob([`${linkName}`], { type: "text/plain" }),
      "text/html": new Blob([`<a href="${href}">${linkName}</a>`], {
        type: "text/html",
      }),
    });

    await navigator.clipboard.write([clipboardItem]);

    toggleIconsVisibility(button);

    setTimeout(() => {
      toggleIconsVisibility(button);
    }, 3000);
  };

  const generateBtn = () => {
    const btnContainer = document.querySelector(".aui-header-secondary");

    if (!btnContainer) return;

    const btnEl = document.createElement("button");
    btnEl.className = "copy-to-clipboard-btn secondary";
    btnEl.title = "Copy page link to clipboard";
    btnEl.innerHTML = `
        <span class="copy-icon js-copy-icon aui-icon aui-icon-small aui-iconfont-copy" role="img" aria-label="Insert meaningful text here for accessibility"></span>
        <span class="copy-icon copy-icon--success js-copy-success invisible aui-icon aui-icon-small aui-iconfont-check" role="img" aria-label="Insert meaningful text here for accessibility"></span>
      `;
    btnEl.addEventListener("click", (e) => copyPageLinkIntoClipboard(e));

    btnContainer.appendChild(btnEl);
  };

  const init = async () => {
    linkStyles();
    generateBtn();
  };

  init();
})();
