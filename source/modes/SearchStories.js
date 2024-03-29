import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';

import MenuBar from '../components/MenuBar.js';

export default function SearchStories({ currentMember }) {
    return (
      <Box height="100%" width="100%" flexDirection="column">
        <Box height="100%" flexDirection="column" justifyContent="center" alignItems="center" >
          <Text>Enter your query:</Text>
        </Box>
        <MenuBar />
      </Box>
    );
}
