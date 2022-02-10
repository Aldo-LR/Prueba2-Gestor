import { post } from "services/apiMykonos/api.service";

export const signIn = async ({ data }) => {
  try {
    const res = await post({
      url: "signin",
      data,
    });
    if (!res.success) throw res;
    return { ...res, data: { ...res.data, token: "fpadoshfe9o" } };
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    const res = await post({
      url: "logout",
    });
    if (!res.success) throw res;
    return res;
  } catch (error) {
    throw error;
  }
};
