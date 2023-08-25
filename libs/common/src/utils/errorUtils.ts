export const ErrorUtils = {
  getMessage: (fieldName: string, msg: string) => {
    return { message: fieldName + ' ' + msg };
  },
};
