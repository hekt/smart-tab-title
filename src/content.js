const observeTarget = document.querySelector("title");
const observeOptions = {
  characterData: true,
  childList: true,
  subtree: true,
};
const observer = new MutationObserver((mutations) => {
  console.log("content: mutation detected:");
  console.log(mutations);

  for (let mutation of mutations) {
    console.log("content: mutation value:");
    console.log(mutation.target.innerText);

    browser.runtime.sendMessage({
      title: mutation.target.innerText,
    }).then(() => {
      console.log("message successfuly sended");
    }).catch((e) => {
      console.error(e);
    });
  }
});

browser.runtime.onMessage.addListener((message) => {
  console.log("content: message received:");
  console.log(message);

  observer.disconnect();

  document.title = message.title;

  observer.observe(observeTarget, observeOptions);
});

observer.observe(observeTarget, observeOptions);
