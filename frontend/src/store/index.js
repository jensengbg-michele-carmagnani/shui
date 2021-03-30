import Vue from "vue";
import Vuex from "vuex";
import ax from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API: "http://localhost:3000",
  },
  mutations: {},
  actions: {
    async signup(ctx, data) {
      let res = ax.post(`${ctx.state.API}/user`, {
        username: data.username,
        password: data.password,
      });
    },
    async login(ctx, data) {
      try {
        let resp = await ax.post(
          `${ctx.state.API}/auth/login`,
          {
            username: data.username,
            password: data.password,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
            },
          }
        );
        console.log("response", resp);
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});
