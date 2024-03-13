import React from 'react';
import { Box, Text, useFocus, useInput } from 'ink';

export default function Story({ story, index, open, onInputEnter }) {
  const {isFocused} = useFocus();

  useInput((input, key) => {
    if (isFocused && key.return) {
      onInputEnter(story, index);
    }
  });

  return (
    <Box>
      <Text bold={isFocused} color={open ? 'magenta' : 'blue'}>[{index}] [sc-{story.id}] {story.name}</Text>
    </Box>
  );
}
