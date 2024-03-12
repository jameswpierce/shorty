import React from 'react';
import { Text, useFocus } from 'ink';

export default function Story({ story, index }) {
  const {isFocused} = useFocus();

  return <Text bold={isFocused} color={isFocused ? 'magenta' : 'green'}>[{index}] {story.name}</Text>;
}
