<template>
  <div class="home">
    <Banner />
    <Register />
    <Recipe />
    <Graph />
    <div id="bottom">
      <div id="text-box">
        <h3><span>유통기한부터 레시피까지</span></h3>
        <h3><span id="title">유레까 다운받으러 가기</span></h3>
      </div>
      <a
        id="link"
        href="https://drive.google.com/file/d/1kjAdnft2HD3FVyMIn_VR-c4N85BkQivU/view?usp=sharing"
        target="_blank"
        ><img
          src="@/assets/image/download.png"
          alt="Icons%20App%20Store%20Google%20play_edit"
      /></a>
      <div id="footer">
        <button @click="movePrivacy()">개인정보처리방침</button>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Main/Banner.vue';
import Register from '@/components/Main/Register.vue';
import Recipe from '@/components/Main/Recipe.vue';
import Graph from '@/components/Main/Graph.vue';
export default {
  name: 'Home',
  components: {
    Banner,
    Register,
    Recipe,
    Graph,
  },
  methods: {
    movePrivacy() {
      document.documentElement.scrollTop = 0;
      this.$router.push({ name: 'Privacy' }).catch((error) => {
        if (error.name === 'NavigationDuplicated') {
          location.reload();
        }
      });
    },
  },
};
</script>
<style>
#footer {
  padding-bottom: 1%;
}
#footer button {
  cursor: pointer;
  font-size: 14px;
  font-family: 'ChosunSg';
  font-weight: bold;
  border: none;
  background-color: #e4e9f0;
}
</style>
