import React, {useState, useEffect} from 'react';
import {Box, Text, useInput} from 'ink';

import FullScreen from './components/FullScreen.js';

import shortcut from './lib/shortcut.js';
import Modes from './modes/index.js';

const modes = {
  INITIAL: 'initial',
  MY_STORIES: 'my stories',
  SEARCH_STORIES: 'search stories'
}

function MenuBar() {
  return (
    <Box>
      <Text backgroundColor="magentaBright" color="black">
        [m] my stories
      </Text>
      <Text backgroundColor="magentaBright" color="black">
        {'  '}[/] search stories
      </Text>
      <Text backgroundColor="magentaBright" color="black">
        {'  '}[q] quit
      </Text>
    </Box>
  );
}

export default function App() {
  const [mode, setMode] = useState(modes.INITIAL);
  const [menubarIsVisible, setMenubarIsVisible] = useState(true)
  const [currentMember, setCurrentMember] = useState(null);

  useEffect(() => {
    async function fetchCurrentMember() {
      const { data } = await shortcut.member();
      setCurrentMember(data);
    }

    fetchCurrentMember();
  }, []);

  useInput((input, key) => {
    if (input === 'q') {
      process.exit()
    }
    if (input === 'h') {
      setMenubarIsVisible(!menubarIsVisible);
    }
    if (menubarIsVisible) {
      if (input === 'm') {
        setMode(modes.MY_STORIES);
        setMenubarIsVisible(false);
      }
      if (input === '/') {
        setMode(modes.SEARCH_STORIES)
        setMenubarIsVisible(false);
      }
    }
  })

  return (
    <FullScreen>
      <Box height="100%" width="100%" flexDirection="column">
        {mode === modes.INITIAL && <Modes.Initial currentMember={currentMember} />}
        {mode === modes.MY_STORIES && <Modes.MyStories currentMember={currentMember} />}
        {mode === modes.SEARCH_STORIES && <Modes.SearchStories currentMember={currentMember} />}
        {menubarIsVisible && <MenuBar />}
      </Box>
    </FullScreen>
  );
}
