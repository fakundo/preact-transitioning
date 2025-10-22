import { addons } from '@storybook/manager-api';
import theme from './theme';

addons.setConfig({
  theme: theme,
  showToolbar: false,
});

addons.register('TitleAddon', api => {
  const setTitle = () => {
    let title = 'preact-transitioning';
    let storyData = null;
    try {
      storyData = api.getCurrentStoryData();
      title = `${title} ⋅ ${storyData.title.replace(/\//g, ' / ')} / ${storyData.name}`;
    } catch {}
    document.title = title;
  };

  new MutationObserver(() => {
    if (document.title.endsWith('Storybook')) {
      setTitle();
    }
  }).observe(document.querySelector('title')!, { childList: true, subtree: true, characterData: true });
});
