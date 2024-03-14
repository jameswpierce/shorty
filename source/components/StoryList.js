import React from 'react';
import { Box, Text, useFocus, useInput } from 'ink';

function Story({ story, index, open, onInputEnter }) {
  const {isFocused} = useFocus();

  useInput((input, key) => {
    if (isFocused && key.return) {
      onInputEnter(story, index);
    }
  });

  return (
    <Box>
      <Text bold={isFocused} color={isFocused ? 'magenta' : 'blue'}>[{index}] [sc-{story.id}] {story.name}</Text>
    </Box>
  );
}

export default function StoryList({stories, onInputEnter}) {
    return (
      <Box height="100%" flexDirection="column">
        {stories.map((story, i) => <Story key={`story-${i}`} story={story} index={i} onInputEnter={onInputEnter} />)}
      </Box>
    );
}
