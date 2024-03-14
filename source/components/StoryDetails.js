import React, {useEffect, useState} from 'react';
import {Box, Text, useFocusManager, useInput} from 'ink';

import shortcut from '../lib/shortcut.js';

export default function StoryDetails({ story }) {
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
      {(story.description != '') &&
        <Text>{story.description}</Text>
      }
      {(story.comments.length > 0) &&
        <Box flexDirection="column">
          <Text color="white">Comments:</Text>
          {story.comments.map(comment => (
            <Box borderStyle="single">
              <Text color="white">{comment.text}</Text>
            </Box>
          ))}
        </Box>
      }
      {requester && (
        <Box flexDirection="column">
          <Text color="magenta">Requester:</Text>
          <Text color="magenta" bold>{requester.mention_name}</Text>
        </Box>
      )}
      {owners && (
        <Box flexDirection="column">
          <Text color="cyan">Owners:</Text>
          {owners.map(owner => <Text color="cyan" bold key={owner.id}>{owner.mention_name}</Text>)}
        </Box>
      )}
    </Box>
  );
}
