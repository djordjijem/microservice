// Paginate function
export function paginate(data, pageNumber) {
  const paginatedData = [];
  data.meta.some((x) => {
    paginatedData.push(x);
    return x.currentPage === pageNumber;
  });

  return paginatedData;
}
