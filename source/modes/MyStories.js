import React, {useEffect, useState} from 'react';
import {Box, Text, useInput} from 'ink';
import shortcut from '../lib/shortcut.js';

export default function MyStories(currentUser) {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    setStories(shortcut.search.stories(`owner:${currentUser.mention_name}`))
  }, []);

  return (
    <Box height="100%" flexDirection="column" justifyContent="center" alignItems="center" >
      <Text>{JSON.stringify(stories)}</Text>
    </Box>
  );
}
