import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';

import MenuBar from '../components/MenuBar.js';

export default function Initial({ currentMember }) {
  return (
    <Box height="100%" width="100%" flexDirection="column">
      <Box height="100%" flexDirection="column" justifyContent="center" alignItems="center" >
        <Text>
          Shorty 0.0.0
        </Text>
        <Text>
          A TUI for Shortcut
        </Text>
        <Text>
          Connected to Shortcut as @{currentMember?.mention_name}
        </Text>
      </Box>
      <MenuBar />
    </Box>
  );
}
