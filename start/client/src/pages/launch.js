import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Loading, Header, LaunchDetail } from '../components'
import { ActionButton } from '../containers'
import { LAUNCH_TILE_DATA } from './launches'

export const GET_LAUNCH_DETAILS = gql`
query LaunchDetails($launchId: ID!) {
  launch(id: $launchId) {
    id
    site
    isBooked
    rocket {
      type
    }
    ...LaunchTile
  }
}
${LAUNCH_TILE_DATA}
`;

export default function Launch({ launchId }) {
  const { data, loading, error } = useQuery(GET_LAUNCH_DETAILS, { variables: { launchId } });

  if (loading) return <Loading />
  if (error) return <p>Error: {error.message}</p>



  return (
    <>
      <Header image={data.launch.mission.missionPatch}>
        {data.launch.mission.name}

      </Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />

    </>

  );
}
