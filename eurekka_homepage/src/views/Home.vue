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
      <a id="link" href="#" target="_blank"
        ><img
          src="https://static.wixstatic.com/media/b54765_4abf6834949a4974b5393c094fb09763~mv2.png/v1/fill/w_161,h_47,al_c,q_85,usm_0.66_1.00_0.01/Icons%2520App%2520Store%2520Google%2520play_edit.webp"
          alt="Icons%20App%20Store%20Google%20play_edit"
          style="
            width: 161px;
            height: 47px;
            object-fit: cover;
            object-position: 50% 50%;
          "
      /></a>
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
};
</script>
