<template>
  <div id="banner">
    <img id="loading" src="@/assets/image/phone.gif" />
    <div id="text-box">
      <h2>
        <span class="title-bold">유통기한 </span><span class="title">부터</span>
      </h2>
      <h2>
        <span class="title-bold">레시피 </span><span class="title">까지</span>
      </h2>
      <h1 style="margin-top: 25%">
        <span id="title-main">유레까!</span>
      </h1>
      <div id="link-button">
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
  </div>
</template>

<script>
export default {
  name: 'Banner',
};
</script>
