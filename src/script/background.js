import MessageType from '../model/MessageType';
import TabTitles from '../model/TabTitles';

const delimiters = [' ', '】', '」'];

let windows = {};

const getTabTitles = (windowId) => {
  return windows[windowId] || (windows[windowId] = new TabTitles(delimiters));
};

const notice = (windowId, updated) => {
  updated.forEach(tabId => {
    browser.tabs.sendMessage(parseInt(tabId), {
      type: MessageType.DERIVE_TITLE,
      title: getTabTitles(windowId).title(tabId),
    });
  });
};

const remove = (windowId, tabId) => {
  let tabTitles = getTabTitles(windowId);
  let updated = tabTitles.remove(tabId);

  if (0 === tabTitles.count()) {
    console.log('delete window: ' + windowId);
    delete windows[windowId];
  } else {
    notice(windowId, updated);
  }
};

const update = (windowId, tabId, title) => {
  let tabTitles = getTabTitles(windowId);
  let updated = tabTitles.update(tabId, title);
  notice(windowId, updated);
};

browser.runtime.onMessage.addListener((message, sender) => {
  update(sender.tab.windowId, sender.tab.id, message.title);
});

browser.tabs.onRemoved.addListener((tabId, removeInfo) => {
  remove(removeInfo.windowId, tabId);
});

browser.tabs.onAttached.addListener((tabId, attachInfo) => {
  browser.tabs.sendMessage(tabId, {
    type: MessageType.NEEDS_REQUEST,
  });
});

browser.tabs.onDetached.addListener((tabId, detachInfo) => {
  remove(detachInfo.oldWindowId, tabId);
});
