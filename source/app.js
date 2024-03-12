import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';

import FullScreen from './components/FullScreen.js';

const modes = {
  INITIAL: 'initial',
  MY_STORIES: 'my stories',
  SEARCH_STORIES: 'search stories'
}

function MenuBar() {
  return (
    <Box>
      <Text backgroundColor="green" color="black">
        [m] my stories
      </Text>
      <Text backgroundColor="green" color="black">
        {'  '}[/] search stories
      </Text>
      <Text backgroundColor="green" color="black">
        {'  '}[q] quit
      </Text>
    </Box>
  );
}

const Modes = {
  Initial: function () {
    return (
      <Box height="100%" flexDirection="column" justifyContent="center" alignItems="center" >
        <Text>
          Shorty 0.0.0
        </Text>
        <Text>
          A TUI for Shortcut
        </Text>
      </Box>
    );
  },
  MyStories: function () {
    return (
      <Box height="100%" flexDirection="column" justifyContent="center" alignItems="center" >
        <Text>My Stories</Text>
      </Box>
    );
  },
  SearchStories: function () {
    return (
      <Box height="100%" flexDirection="column" justifyContent="center" alignItems="center" >
        <Text>Search Stories</Text>
      </Box>
    );
  }
}

export default function App() {
  const [mode, setMode] = useState(modes.INITIAL);
  const [menubarIsVisible, setMenubarIsVisible] = useState(true)

  useInput((input, key) => {
    if (input === 'q') {
      process.exit()
    }
    if (key.escape) {
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
        {mode === modes.INITIAL && <Modes.Initial />}
        {mode === modes.MY_STORIES && <Modes.MyStories />}
        {mode === modes.SEARCH_STORIES && <Modes.SearchStories />}
        {menubarIsVisible && <MenuBar />}
      </Box>
    </FullScreen>
  );
}
