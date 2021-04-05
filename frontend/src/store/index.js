import Vue from "vue";
import Vuex from "vuex";
import ax from "axios";
import router from "./../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API: "http://localhost:3000",
    flows: Array,
    followed: Array,
  },
  mutations: {
    setFollowed(state, followed) {
      state.followed = followed;
    },
    setFlows(state, flows) {
      state.flows = flows;
    },
  },
  actions: {
    async checkStatus(ctx) {
      const token = sessionStorage.getItem("shuiToken");
      console.log('token isLoggedin', typeof(token))
      
      if (token) {
        try {
          await ax.get(`${ctx.state.API}/isloggedin`, {
            headers: {
              authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
            },
          });
          router.push("/flows");
        } catch (error) {
          console.error(error);
        }
      } else {
        router.push('/login')
      }
    },

    async deleteUser(ctx) {
      await ax.delete(`${ctx.state.API}/deleteuser`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
        },
      });
      sessionStorage.clear();
    
    },

    async deleteHashtag(ctx, hashtag) {
      console.log("hashtag delete Hashtag", hashtag);
      await ax.delete(`${ctx.state.API}/deletehashtag`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
        },
        data: { hashtag },
      });
      
    },

    async addHastag(ctx, hashtag) {
      const hash = await ax.post(
        `${ctx.state.API}/addhashtag`,
        { hashtag },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
          },
        }
      );
      console.log("HASHTAG ADDED", hash);
    },

    async followedHashtags(ctx) {
      const followed = await ax.get(
        `${ctx.state.API}/followedhashtags`,

        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
          },
        }
      );
     
      ctx.commit("setFollowed", followed.data);
    },
    async createFlow(ctx, newFlow) {
      const createdflow = await ax.post(
        `${ctx.state.API}/newflow`,
        {
          info: newFlow.info,
          hashtags: newFlow.hashtags,
        },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
          },
        }
      );
      router.push("/flows");
      console.log("newflow", createdflow);
    },
    async getFlows(ctx) {
      try {
        const flows = await ax.get(`${ctx.state.API}/flows`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
          },
        });
        console.log("FLOWS", flows);
        ctx.commit("setFlows", flows.data);
      } catch (error) {
        console.error(error);
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
        const token = await ax.post(`${ctx.state.API}/auth/login`, {
          username: data.username,
          password: data.password,
        });
        console.log("TOKEN & USERKEY", token.data);
        sessionStorage.setItem("shuiToken", token.data.token);
        router.push("/flows");
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
  getters: {
    allHashtags(state) {
      return state.flows.map((flow) => flow.hashtags);
      // .reduce((arr, elem) => arr.concat(elem))
    },
  },
});
