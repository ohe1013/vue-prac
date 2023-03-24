const confirm = {
    delete: (cb) => {
        if (window.confirm('삭제하시겠습니까?')) return cb();
    },
    update: (cb) => {
        if (window.confirm('수정하시겠습니까?')) return cb();
    },
};
function guid() {
    function s4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export { confirm, guid };
