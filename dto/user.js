// function thêm mới 1 user
const createUser = async({name, password}) => {
    return await User.create({ name, password });
};
// function lấy ra danh sách users
const Users = async() => {
    return await User.findAll();
};
// function lấy ra 1 users
const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};