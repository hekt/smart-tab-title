module.exports = class TabTitles {
  constructor(delimiters) {
    this.delimiters = delimiters.map(d => {
      return new RegExp('(' + d + ')');
    });
    
    // {tabId: suggestedTitle}
    this.tabTitles = {};

    // {tabId: splittedTitle}
    this.splittedTitles = {};
  }

  count() {
    return Object.keys(this.tabTitles).length;
  }

  title(tabId) {
    return this.tabTitles[tabId];
  }

  update(tabId, title) {
    this.tabTitles[tabId] = title;
    this.splittedTitles[tabId] = this.split(title);

    return this.refresh();
  }

  remove(tabId) {
    delete this.tabTitles[tabId];
    delete this.splittedTitles[tabId];

    return this.refresh();
  }

  refresh() {
    let updatedIds = [];

    for (const tabId of Object.keys(this.splittedTitles)) {
      const newTitle = this.shorten(this.splittedTitles[tabId]).join('');
      if (newTitle !== this.tabTitles[tabId]) {
        this.tabTitles[tabId] = newTitle;
        updatedIds.push(tabId);
      }
    }

    return updatedIds;
  }

  shorten(target) {
    let beforeLength = target.length;
    let shortest = 0;
    for (const key of Object.keys(this.splittedTitles)) {
      const splitted = this.splittedTitles[key];

      let i = 0;
      for (const word of target) {
        if (word !== splitted[i]) {
          break;
        }
        i++;
      }
      if (beforeLength !== i) {
        shortest = Math.max(shortest, i);
      }
    }
    return target.slice(shortest);
  }

  split(title) {
    let words = [title];
    for (const delimiter of this.delimiters) {
      words = words.reduce((acc, word) => {
        let splitted = word.split(delimiter);
        return acc.concat(splitted);
      }, []);
    }
    return words;
  }
};
