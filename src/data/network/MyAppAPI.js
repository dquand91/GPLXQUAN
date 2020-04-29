import API from './API';
import Alerts from './Alerts';

/* eslint-disable camelcase */

class MyAppAPI {
  constructor({api = new API()}) {
    this.api = api;
  }

  getAllQuestionList() {
    return this.api.send({
      method: 'GET',
      path: '/b/5d708b5ede27e46cb7dc647e',
      headers: {
        'secret-key':
          '$2a$10$4XtArsGe9uYy5Dknh1h2Hu/sZzFk0cHe.Fbnp/4jcP7yNnroYdKNi',
      },
      data: null,
      handlerError: Alerts.apiError,
    });
  }

  //   putSignIn(handlerError) {
  //     return this.api
  //       .send({
  //         method: 'PUT',
  //         path: '/external/v1/sign_in',
  //         data: JSON.stringify({
  //           account: {
  //             device_unique_id: DeviceInfo.getUniqueID() || 'undefined',
  //           },
  //         }),
  //         handlerError,
  //       })
  //       .then(json => json.mobile_device.id)
  //       .then(id => `${id}`);
  //   }

  //   putSignOut() {
  //     return this.api.send({
  //       method: 'PUT',
  //       path: '/external/v1/sign_out',
  //       data: JSON.stringify({
  //         account: {
  //           device_unique_id: DeviceInfo.getUniqueID() || 'undefined',
  //         },
  //       }),
  //       handlerError: null,
  //     });
  //   }

  //   postSignUp({name, birthday}, handlerError) {
  //     return this.api
  //       .send({
  //         method: 'POST',
  //         path: '/external/v1/sign_up',
  //         data: JSON.stringify({
  //           account: {
  //             name,
  //             birth_date: birthday,
  //           },
  //         }),
  //         handlerError,
  //       })
  //       .then(json => json.user.mobile_devices[0].id)
  //       .then(id => `${id}`);
  //   }

  //   createInvitation({ inviterId, type }) {
  //     return this.api.send({
  //       method: 'POST',
  //       path: '/external/v1/user_invitations',
  //       data: JSON.stringify({
  //         user_invitation: {
  //           invited_by: inviterId,
  //           user_relationship_type_id: type,
  //         },
  //       }),
  //       handlerError: Alerts.apiError,
  //     })
  //       .then(json => ({
  //         inviCode: json.user_invitation.invitation_code,
  //         relationType: json.user_invitation.user_relationship_type_id,
  //       }));
  //   }

  //   getUserRelationships(type?: 'parent' | 'child' | 'friend') {
  //     return this.api.send({
  //       method: 'GET',
  //       path: `/external/v1/user_relationships${type === null ? '' : `?type=${type}`}`,
  //       data: null,
  //       handlerError: Alerts.apiError,
  //     });
  //   }

  //   getUserRelationship(props: {
  //     userId: string,
  //     type?: 'parent' | 'child' | 'friend',
  //   }) {
  //     return this.api.send({
  //       method: 'GET',
  //       path: `/external/v1/users/${props.userId}/user_relationships/${props.type === null ? '' : `?type=${props.type}`}`,
  //       data: null,
  //       handlerError: Alerts.apiError,
  //     })
  //       .then((json: UserRelationshipId) => json);
  //   }

  //   getMe(handlerError = null) {
  //     return this.api.send({
  //       method: 'GET',
  //       path: '/external/v1/users/me',
  //       data: null,
  //       handlerError,
  //     })
  //       .then(json => parseUserType(json.user));
  //   }

  //   putMe({ name, avatar, birthday }, isEditPartnerName = false) {
  //     return this.api.send({
  //       method: 'PUT',
  //       path: '/external/v1/users/me',
  //       data: JSON.stringify({
  //         user: {
  //           name,
  //           avatar,
  //           birth_date: birthday,
  //           ...isEditPartnerName ? {
  //             partner_name_for_children: name,
  //           } : {},
  //         },
  //       }),
  //       handlerError: Alerts.apiError,
  //     });
  //   }

  //   getUser(userId) {
  //     return this.api.send({
  //       method: 'GET',
  //       path: `/external/v1/users/${userId}`,
  //       data: null,
  //       handlerError: Alerts.apiError,
  //     })
  //       .then(json => parseUserType(json.user));
  //   }

  //   putUser({ userId, name, avatar, birthday }) {
  //     return this.api.send({
  //       method: 'PUT',
  //       path: `/external/v1/users/${userId}`,
  //       data: JSON.stringify({
  //         user: {
  //           name,
  //           avatar,
  //           birth_date: birthday,
  //         },
  //       }),
  //       handlerError: Alerts.apiError,
  //     });
  //   }

  //   getInvitationApproval({ invitationCode, handlerError }) {
  //     return this.api.send({
  //       method: 'GET',
  //       path: `/external/v1/user_invitations/${invitationCode}/approval`,
  //       data: null,
  //       handlerError,
  //     });
  //   }

  //   postUserInvitationApproval({ invitationCode, inviteeId }) {
  //     return this.api.send({
  //       method: 'POST',
  //       path: '/external/v1/user_invitations/approval',
  //       data: JSON.stringify({
  //         user_invitation: {
  //           invitation_code: invitationCode,
  //           invitee_id: inviteeId,
  //         },
  //       }),
  //       handlerError: Alerts.apiError,
  //     });
  //   }

  //   getRooms() {
  //     const RoomUsers = ({
  //       room_users = [],
  //     }) => room_users.map(roomUser => Model.RoomUser(roomUser));
  //     return this.api.send({
  //       method: 'GET',
  //       path: '/external/v1/rooms',
  //       data: null,
  //       handlerError: Alerts.apiError,
  //     })
  //       .then(json => RoomUsers(json));
  //   }

  //   getRoom(roomId) {
  //     return this.api.send({
  //       method: 'GET',
  //       path: `/external/v1/rooms/${roomId}`,
  //       data: null,
  //       handlerError: Alerts.apiError,
  //     })
  //       .then(json => Model.RoomUser(json.room_user));
  //   }

  //   getIotDevices(userId, handlerError) {
  //     return this.api.send({
  //       method: 'GET',
  //       path: `/external/v1/users/${userId}/iot_devices`,
  //       data: null,
  //       validateStatus: status => status !== 409,
  //       handlerError,
  //     })
  //       .then((json) => {
  //         const iotDevices: [IotDeviceType] = json.iot_devices.map((iotDevice) => {
  //           return Model.IotDevice(iotDevice);
  //         });
  //         return iotDevices;
  //       });
  //   }

  //   getIotDevice({ iotDeviceId, handlerError }) {
  //     return this.api.send({
  //       method: 'GET',
  //       path: `/external/v1/iot_devices/${iotDeviceId}`,
  //       data: null,
  //       validateStatus: status => status === 200,
  //       handlerError,
  //     })
  //       .then(json => Model.IotDevice(json.iot_device));
  //   }

  //   deleteIotDevice(iotDeviceId) {
  //     return this.api.send({
  //       method: 'DELETE',
  //       path: `/external/v1/iot_devices/${iotDeviceId}`,
  //       data: null,
  //       handlerError: Alerts.apiError,
  //     });
  //   }

  //   putUserRelationships({ userId, name }) {
  //     return this.api.send({
  //       method: 'PUT',
  //       path: `/external/v1/user_relationships/${userId}`,
  //       data: JSON.stringify({
  //         user_relationship: {
  //           partner_name: name,
  //         },
  //       }),
  //       handlerError: Alerts.apiError,
  //     });
  //   }
}
/* eslint-enable camelcase */

export default MyAppAPI;
