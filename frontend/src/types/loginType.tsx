export type loginType = {
    username:string,
    password:string
}

export type usersType = {
    id_users: number,
    nama: string,
    username: string,
    role_user: string,
    is_active: number
}

let userData: usersType | null = null;

export const setUser = (user: usersType) => {
  userData = user;
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): usersType | null => {
  if (!userData) {
    const userStr = localStorage.getItem("user");
    if (userStr) userData = JSON.parse(userStr);
  }
  return userData;
};

export const clearUser = () => {
  userData = null;
  localStorage.removeItem("user");
};