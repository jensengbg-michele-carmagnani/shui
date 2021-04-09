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
    SECRET: "dasfascergeqdsaf<dfas>!öäÅk*;",
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
      console.log("token isLoggedin", typeof token);

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
      console.log("hashtag delete Hashtag", hashtag);
      await ax.delete(`${ctx.state.API}/deletehashtag`, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("shuiToken")}`,
        },
        data: { hashtag },
      });
    },

    async addHashtag(ctx, hashtag) {
      console.log("hashtag to ADD", hashtag);
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
      console.log("FOLLOWEDHASHTAG ", followed);
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
        console.log("FLOWS IN GETFLOWS", flows.data);
        console.log("CRIPTOJS IN INDEX", CryptoJS);

         flows.data.flows.forEach((flow) => {
          let bytes = CryptoJS.AES.decrypt(flow.info, sessionStorage.getItem('userKey'));
          let text = bytes.toString(CryptoJS.enc.Utf8);
          flow.info = text;
        });
        flows.data.allFlows.forEach((flow) => {
          let bytes = CryptoJS.AES.decrypt(flow.info, sessionStorage.getItem('userKey'));
          let text = bytes.toString(CryptoJS.enc.Utf8);
          flow.info = text;
        });
        console.log("DECRYPTED FLOWS INDEX ", flows.data.flows + flows.data.allFlows);
        console.log("FLOWS IN INDEX ", flows.data);
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
      console.log("ALLHASHTAG IN GETTER", state.flows);

      return state.allFlows.map((flow) => flow.hashtags);

      // .reduce((arr, elem) => arr.concat(elem))
    },
  },
});
