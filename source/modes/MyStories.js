import React, {useEffect, useState} from 'react';
import {Box, Text, useFocusManager, useInput} from 'ink';
import shortcut from '../lib/shortcut.js';
import Story from '../components/Story.js';

export default function MyStories({ currentMember }) {
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleString())
  const [stories, setStories] = useState([]);
  const [openStory, setOpenStory] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchMyStories() {
      const { data } = await shortcut.search.stories(`owner:${currentMember.mention_name}`)
      setStories(data.data);
    }

    fetchMyStories();
  }, [lastRefreshed]);
  const {focusNext, focusPrevious} = useFocusManager();

  useInput((input, key) => {
    if (input === 'j') {
      focusNext();
    }

    if (input === 'k') {
      focusPrevious();
    }

    if (input === 'r') {
      setLastRefreshed(new Date().toLocaleString());
    }

    if (openStory !== null && key.escape) {
      setOpenStory(null);
    }
  })

  function handleOnInputEnter(story, index) {
    setOpenStory(index);
  }

  return (
    <Box height="100%" flexDirection="column">
      <Text>Last refreshed: { lastRefreshed }</Text>
      {error && <Text>{e.message}</Text>}
      {stories.map((story, i) => <Story story={story} index={i} onInputEnter={handleOnInputEnter} open={openStory == i} />)}
    </Box>
  );
}
