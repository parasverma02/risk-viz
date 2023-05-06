type Options = {
  sortOption?: string,
  filterOptionsBC?: string[],
  filterOptionsRF?: string[],
  currentPage?: number,
}
const getExtractedOptions = (options: string[]) => {
  const extractedOptions: Options = {};

  options.forEach((option: string, index: number) => {
    if (option.includes("sortby_")) {
      extractedOptions.sortOption= options[index].replace(/^sortby_/, "");
    } else if (option.includes("filterbyBC_")) {
      const filterOptions = options[index].replace(/^filterbyBC_/, "").split("_");
      extractedOptions.filterOptionsBC = filterOptions;
    } else if (option.includes("filterbyRF_")) {
      const filterOptions = options[index].replace(/^filterbyRF_/, "").split("_");
      extractedOptions.filterOptionsRF = filterOptions;
    } else if (option.includes("page_")) {
      const pageOption = options[index].replace(/^page_/, "");
      extractedOptions.currentPage =  Number(pageOption);
    }
  })
  return extractedOptions;
}

export { getExtractedOptions }
export type { Options };