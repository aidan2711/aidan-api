
exports.paginate = async (model, pageSize, pageLimit, include) => {
  try {
    const limit = parseInt(pageLimit, 10) || 10;
    const page = parseInt(pageSize, 10) || 1;

    let options = {
      offset: getOffset(page, limit),
      limit: limit,
      include: include,
    };

    let { count, rows } = await model.findAndCountAll(options);

    return {
      totalPage: getTotalPage(limit, count),
      currentPage: page,
      previousPage: getPreviousPage(page),
      nextPage: getNextPage(page, limit, count),
      totalItem: count,
      limit: limit,
      data: rows,
    };
  } catch (error) {
    return error;
  }
};

const getOffset = (page, limit) => page * limit - limit;

const getTotalPage = (limit, total) => Math.ceil(total / limit);

const getNextPage = (page, limit, total) => {
  if (total / limit > page) return page + 1;
  return null;
};

const getPreviousPage = (page) => {
  if (page <= 1) return null;
  return page - 1;
};
