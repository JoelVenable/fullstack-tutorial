import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { LaunchTile, Header, Button, Loading } from '../components'

const GET_LAUNCHES = gql`
  query launchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        id
        isBooked
        rocket {
          id
          name
        }
        mission {
          name
          missionPatch
        }
      }
    }
  }
`

export default function Launches() {
  const { data, loading, error } = useQuery(GET_LAUNCHES);
  if (loading) return <Loading />;
  if (error) return <p>Error</p>;

  return (
    <>
      <Header />
      {data.launches.launches &&
        data.launches.launches.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))}
    </>
  )
}
