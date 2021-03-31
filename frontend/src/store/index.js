import Vue from "vue";
import Vuex from "vuex";
import ax from "axios";
import router from "./../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API: "http://localhost:3000",
    flows:Array
  },
  mutations: {
    setFlows(state, flows) {
      state.flows = flows
    }
  },
  actions: {
    async checkStatus() {
      
    },
    async newFlow(ctx, newFlow) {
      await ax.post(`${ctx.state.API}/newflow`, {
        info: newFlow.info,
        hashtags: newFlow.hashtags
       })
    },
    async getFlows(ctx) {
      try {
        const flows = await ax.get(`${ctx.state.API}/flows`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
          },
        });
        console.log('FLOWS',flows)
        ctx.commit('setFlows',flows.data)
      } catch (error) {
        console.error(error)
      }
    },
    async signup(ctx, data) {
      try {
        const res = await ax.post(`${ctx.state.API}/user`, {
          username: data.username,
          password: data.password,
        });
        console.log("NEW USER", res);

        // goto  flows page
        router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },
    async login(ctx, data) {
      try {
        const token = await ax.post(
          `${ctx.state.API}/auth/login`,
          {
            username: data.username,
            password: data.password,
          },
          
        );
        console.log("TOKEN & USERKEY", token.data);
        sessionStorage.setItem("shuiToken", token.data.token);
        sessionStorage.setItem("shuiToken", token.data.userkey);
        router.push('/flows')
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});
