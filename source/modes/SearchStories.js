import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';

export default function SearchStories() {
    return (
      <Box height="100%" flexDirection="column" justifyContent="center" alignItems="center" >
        <Text>{JSON.stringify(stories)}</Text>
      </Box>
    );
}
