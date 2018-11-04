exports.buildSuccess = function (status, data) {
    return {
        status: status,
        success: true,
        result: data
    };
};

exports.buildEmptySuccess = function (status, isSuccess) {
    return {
        status: status,
        success: isSuccess
    };
};

exports.buildError = function (status, error) {
    return {
        status: status,
        success: false,
        error: error
    };
};
