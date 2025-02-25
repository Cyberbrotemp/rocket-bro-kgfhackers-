import { User, Launch } from '../types';

export const saveUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveLaunch = (launch: Launch) => {
  const launches = getLaunches();
  launches.push(launch);
  localStorage.setItem('launches', JSON.stringify(launches));
};

export const getLaunches = (): Launch[] => {
  const launches = localStorage.getItem('launches');
  return launches ? JSON.parse(launches) : [];
};

export const authenticateUser = (emailOrUsername: string, password: string): User | null => {
  const users = getUsers();
  return users.find(
    (user) =>
      (user.email === emailOrUsername || user.username === emailOrUsername) &&
      user.password === password
  ) || null;
};