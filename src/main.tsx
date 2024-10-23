// Learn more at developers.reddit.com/docs
import { Devvit, useState } from '@devvit/public-api';
import { getRandomNumber } from './utils.server.js';

Devvit.configure({
  redditAPI: true,
});

// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: 'Add server code post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    await reddit.submitPost({
      title: 'Post with server code',
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.showToast({ text: 'Created post!' });
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: 'Experience Post',
  height: 'regular',
  render: (_context) => {
    const [displayedNumber,setDisplayedNumber] = useState(0);

    return (
      <vstack height="100%" width="100%" gap="medium" alignment="center middle">
        <image
          url="logo.png"
          description="logo"
          imageHeight={256}
          imageWidth={256}
          height="48px"
          width="48px"
        />
        <text size="large">{`Click counter: ${displayedNumber}`}</text>
        <button appearance="primary" onPress={
            () => {
              const randomNumber = getRandomNumber()
              setDisplayedNumber(() => randomNumber)
        }}>
          Get Random Numbers
        </button>
      </vstack>
    );
  },
});

export default Devvit;
