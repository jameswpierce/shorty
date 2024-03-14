import React, {useEffect, useState} from 'react';
import {Box, Text, useFocusManager, useInput} from 'ink';

import shortcut from '../lib/shortcut.js';

import StoryList from '../components/StoryList.js';
import StoryDetails from '../components/StoryDetails.js';
import MenuBar from '../components/MenuBar.js';


export default function MyStories({ currentMember }) {
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleString())
  const [stories, setStories] = useState([]);
  const [openStory, setOpenStory] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchMyStories() {
      const { data } = await shortcut.search.stories(`owner:${currentMember.mention_name} !state:completed !is:archived`)
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

    if (openStory !== null && input === 'x') {
      setOpenStory(null);
    }
  })

  function handleOnInputEnter(story, index) {
    setOpenStory(index);
  }

  return (
    <Box height="100%" width="100%" flexDirection="column">
        <Box height="100%" flexDirection="column" overflowY="hidden">
          {(openStory !== null) && (
            <StoryDetails story={stories[openStory]} />
          )}
          {(openStory === null) && (
            <StoryList stories={stories} onInputEnter={handleOnInputEnter} />
          )}
        </Box>
      <MenuBar />
    </Box>
  );
}
