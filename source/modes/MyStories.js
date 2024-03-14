import React, {useEffect, useState} from 'react';
import {Box, Text, useFocusManager, useInput} from 'ink';

import shortcut from '../lib/shortcut.js';

import Story from '../components/Story.js';
import MenuBar from '../components/MenuBar.js';

function StoryDetails({ story }) {
  const [owners, setOwners] = useState(null);
  const [requester, setRequester] = useState(null);

  useEffect(() =>{
    async function fetchOwners() {
      const owners = await Promise.all(
        story.owner_ids.map(async (id) => {
          const { data } = await shortcut.members.get(id);
          return data;
        })
      );
      setOwners(owners.map(owner => owner?.profile));
    }
    fetchOwners();
  }, []);

  useEffect(() =>{
    async function fetchRequester() {
      const { data } = await shortcut.members.get(story.requested_by_id);
      setRequester(data.profile);
    }
    fetchRequester();
  }, []);

  return (
    <Box flexDirection="column" gap={1}>
      <Text bold color="blue">{story.name}</Text>
      <Text color="green">{story.app_url}</Text>
      <Text>{story.description}</Text>
      <Box flexDirection="column">
        {story.comments?.map(comment => (
          <Text>{comment.text}</Text>
        ))}
      </Box>
      <Box flexDirection="column">
        <Text>Requester:</Text>
        <Text>{requester?.mention_name}</Text>
      </Box>
      <Box flexDirection="column">
        <Text>Owners:</Text>
        {owners?.map(owner => <Text key={owner.id}>{owner.mention_name}</Text>)}
      </Box>
    </Box>
  );
}

export default function MyStories({ currentMember }) {
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleString())
  const [stories, setStories] = useState([]);
  const [openStory, setOpenStory] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchMyStories() {
      const { data } = await shortcut.search.stories(`owner:${currentMember.mention_name} !state:completed !is:archived`)
      setStories(data.data);
    }

    fetchMyStories();
  }, [lastRefreshed]);
  const {focusNext, focusPrevious} = useFocusManager();

  useInput((input, key) => {
    if (input === 'j') {
      focusNext();
    }

    if (input === 'k') {
      focusPrevious();
    }

    if (input === 'r') {
      setLastRefreshed(new Date().toLocaleString());
    }

    if (openStory !== null && input === 'x') {
      setOpenStory(null);
    }
  })

  function handleOnInputEnter(story, index) {
    setOpenStory(index);
  }

  return (
    <Box height="100%" width="100%" flexDirection="column">
        {(openStory !== null) && (
          <Box height="100%" flexDirection="column" overflowY="hidden">
            <StoryDetails story={stories[openStory]} />
          </Box>
        )}
        {(openStory === null) && (
          <Box height="100%" flexDirection="column" overflowY="hidden">
            <Text>Last refreshed: { lastRefreshed }</Text>
            <Box flexDirection="column">
              {stories.map((story, i) => <Story key={`story-${i}`} story={story} index={i} onInputEnter={handleOnInputEnter} />)}
            </Box>
          </Box>
        )}
      <MenuBar />
    </Box>
  );
}
