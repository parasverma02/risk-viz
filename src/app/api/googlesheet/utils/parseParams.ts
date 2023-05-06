const parseParams = (param: string) => {
  return param.replaceAll("%20"," ");
}

export { parseParams };