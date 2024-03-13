import React from 'react';
import { Box, Text } from 'ink';

export default function MenuBar() {
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
