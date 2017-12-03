import TabTitles from './TabTitles';

const tabTitles = new TabTitles([' ', '】', '」']);

const notice = (updated) => {
  updated.forEach(id => {
    browser.tabs.sendMessage(
      parseInt(id),
      {title: tabTitles.title(id)}
    );
  });
}

browser.tabs.onRemoved.addListener((tabId) => {
  const updated = tabTitles.remove(tabId);
  notice(updated);
});

browser.runtime.onMessage.addListener((message, sender) => {
  console.log("background: message received:");
  console.log(message);

  const tabId = sender.tab.id;
  const title = message.title;

  const updated = tabTitles.update(tabId, title);
  notice(updated);
});
