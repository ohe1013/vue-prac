const confirm = {
    delete: (cb) => {
        if (window.confirm('삭제하시겠습니까?')) return cb();
    },
    update: (cb) => {
        if (window.confirm('수정하시겠습니까?')) return cb();
    },
};

export { confirm };
