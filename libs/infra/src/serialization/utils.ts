import _ from 'lodash';
export const formatResource = (response: any) => {
  return {
    status: 'success',
    data: _.isArray(response) ? response : _.omit(response, ['password']),
  };
};
