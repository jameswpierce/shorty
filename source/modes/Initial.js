import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';

export default function Initial() {
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
}
