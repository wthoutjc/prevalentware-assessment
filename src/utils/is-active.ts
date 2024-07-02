const isActive = (path: string, pathname: string) => {
  const regex = new RegExp(`^${path}(/|$)`);
  return regex.test(pathname);
};

export { isActive };
