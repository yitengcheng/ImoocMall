const state = {
    nickName: '',
    cartCount: 0,
    user: {}
};

// mutations
const mutations = {
    updateUserInfo (state, nickName) {
        state.nickName = nickName;
    },
    updateCartCount (state, cartCount) {
        state.cartCount += cartCount;
    },
    emptyCartCount (state) {
        state.cartCount = 0;
    },
    updateUser (state, user) {
        state.user = user;
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
