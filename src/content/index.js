import MessageType from '../MessageType';

function send(title) {
  browser.runtime.sendMessage({
    type: MessageType.REQUEST_TITLE,
    title: title,
  }).then(() => {
    console.log("message successfuly sent");
  }).catch(e => {
    console.error(e.message);
  });
}

let rawTitle = document.title;
const observeTarget = document.querySelector('title');
const observeOptions = {
  characterData: true,
  childList: true,
  subtree: true,
};
const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    let title = mutation.target.innerText;
    rawTitle = title;
    send(title);
  }
});

browser.runtime.onMessage.addListener((message) => {
  if (!message.type) {
    console.error('unknown message');
    return;
  }

  if (message.type === MessageType.NEEDS_REQUEST) {
    document.title = rawTitle;
    return;
  }

  if (message.type === MessageType.DERIVE_TITLE) {
    observer.disconnect();
    document.title = message.title;
    observer.observe(observeTarget, observeOptions);
    return;
  }

  console.error('unknown message type');
});

observer.observe(observeTarget, observeOptions);

send(document.title);
