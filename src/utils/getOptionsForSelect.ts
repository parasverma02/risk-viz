const getOptionsForSelect = (options: string[]) => {
  return options.map((option: string) => ({ label: option, value: option}))
}

export { getOptionsForSelect}