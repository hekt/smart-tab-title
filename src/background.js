// TabTiltes imported by manifest.json
const tabTitles = new TabTitles([' ']);

browser.runtime.onMessage.addListener((message, sender) => {
  console.log("background: message received:");
  console.log(message);

  const tabId = sender.tab.id;
  const title = message.title;

  const updated = tabTitles.update(tabId, title);

  updated.forEach(id => {
    browser.tabs.sendMessage(
      parseInt(id),
      {title: tabTitles.title(id)}
    );
  });
});
