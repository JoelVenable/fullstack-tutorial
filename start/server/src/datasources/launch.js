const { RESTDataSource } = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }

  async getAllLaunches() {
    const response = await this.get('launches');
    return Array.isArray(response)
      ? response.map(launch => this.launchReducer(launch))
      : [];
  }

  async getLaunchById({ launchId }) {
    const response = await this.get('launches', { flight_number: launchId });
    return this.launchReducer(response[0])
  }


  getLaunchesById({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId }))
    )
  }





  launchReducer(l) {
    return {
      id: l.flight_number || 0,
      cursor: `${l.launch_date_unix}`,
      site: l.launch_site && l.launch_site.site_name,
      mission: {
        name: l.mission_name,
        missionPatchSmall: l.links.mission_patch_small,
        missionPatchLarge: l.links.mission_patch,
      },
      rocket: {
        id: l.rocket.rocket_id,
        name: l.rocket.rocket_name,
        type: l.rocket.rocket_type,
      },
    };
  }

}


module.exports = LaunchAPI