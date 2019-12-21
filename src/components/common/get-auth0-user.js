// Get the Auth0 id if authenticated

import { isAuthenticated, getProfile } from '../../utils/auth';

export default function getAuth0User() {
  console.log('getAuth0User');
  return new Promise((resolve, reject) => {
    if (isAuthenticated()) {
      resolve(getProfile());
    } else {
      resolve('not_authenticated');
    }
  });
}
