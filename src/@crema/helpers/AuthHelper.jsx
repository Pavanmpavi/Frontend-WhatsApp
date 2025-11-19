import { authRole } from '@crema/constants/AppConst';

export const getUserFromAuth0 = (user) => {
  if (user)
    return {
      id: 1,
      uid: user.sub,
      name: user.name,
      email: user.email,
      photoURL: user.picture,
      role: authRole.User,
    };
  return user;
};

export const getUserFromFirebase = (user) => {
  if (user)
    return {
      id: 1,
      uid: user.uid,
      name: user.name ? user.name : 'Crema User',
      email: user.email,
      photoURL: user.photoURL ? user.photoURL : '/assets/images/avatar/A11.jpg',
      role: authRole.User,
    };
  return user;
};
export const getUserFromAWS = (user) => {
  if (user)
    return {
      id: 1,
      uid: user.username,
      name: user.attributes.name ? user.attributes.name : 'Crema User',
      email: user.attributes.email,
      photoURL: user.photoURL,
      role: authRole.User,
    };
  return user;
};

export const getUserFromJwtAuth = (user) => {
  if (!user) return user;

  let ruser;

switch (user?.role?.[0]?.toLowerCase()) {
    case 'superadmin':
      ruser = authRole.SuperAdmin;
      break;
    case 'admin':
      ruser = authRole.Admin;
      break;
    case 'manager':
      ruser = authRole.Manager;
      break;
    case 'user':
      ruser = authRole.User;
      break;
    default:
      ruser = authRole.Default;
  }

  return {
    id: user.id,
    uid: user.id,
    name: user.display_name || 'User',
    email: user.email,
    photoURL: user.avatar || '/assets/images/avatar/A11.jpg',
    userProfileId: user.userProfileId,
    // Make role an array
    role: ruser,
  };
};

