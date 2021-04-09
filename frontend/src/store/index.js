import Vue from "vue";
import Vuex from "vuex";
import ax from "axios";
import router from "./../router";
import CryptoJS from "crypto-js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API: "http://localhost:3000",
    flows: [],
    allFlows: [],
    followed: [],
  },
  mutations: {
    setFollowed(state, followed) {
      state.followed = followed;
    },
    setFlows(state, flows) {
      state.flows = flows.flows;
      state.allFlows = flows.allFlows;
    },
  },
  actions: {
    async checkStatus(ctx) {
      const token = sessionStorage.getItem("shuiToken");

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
        router.push("/login");
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
      await ax.delete(`${ctx.state.API}/deletehashtag`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
        },
        data: { hashtag },
      });
    },

    async addHashtag(ctx, hashtag) {
      await ax.post(
        `${ctx.state.API}/addhashtag`,
        { hashtag },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
          },
        }
      );
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
      await ax.post(
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
    },
    async getFlows(ctx) {
      try {
        const flows = await ax.get(`${ctx.state.API}/flows`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
          },
        });
        
        

        // decrypting user the userKey in the session storage
        flows.data.flows.forEach((flow) => {
          let bytes = CryptoJS.AES.decrypt(
            flow.info,
            sessionStorage.getItem("userKey")
          );
          let text = bytes.toString(CryptoJS.enc.Utf8);
          flow.info = text;
        });
        // decrypting user the userKey in the session storage
        flows.data.allFlows.forEach((flow) => {
          let bytes = CryptoJS.AES.decrypt(
            flow.info,
            sessionStorage.getItem("userKey")
          );
          let text = bytes.toString(CryptoJS.enc.Utf8);
          flow.info = text;
        });
        
        ctx.commit("setFlows", flows.data);
      } catch (error) {
        console.error(error);
      }
    },
    async signup(ctx, data) {
      try {
        await ax.post(`${ctx.state.API}/user`, {
          username: data.username,
          password: data.password,
        });

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
        sessionStorage.setItem("userKey", token.data.userkey);
        router.push("/flows");
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
  getters: {
    allHashtags(state) {
      return state.allFlows.map((flow) => flow.hashtags);
    },
  },
});
