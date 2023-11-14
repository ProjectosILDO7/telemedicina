<template>
  <div id="meet"></div>
</template>
<script>
export default {
  data() {
    return {};
  },

  mounted() {
    const domain = "8x8.vc";
    const options = {
      roomName:
        "vpaas-magic-cookie-4e99159b0311426e9f7d508488b69b75/8a482e-SAMPLE_APP",
      jwt: "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtNGU5OTE1OWIwMzExNDI2ZTlmN2Q1MDg0ODhiNjliNzUvOGE0ODJlLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE2OTkwMzE3NTcsImV4cCI6MTY5OTAzODk1NywibmJmIjoxNjk5MDMxNzUyLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtNGU5OTE1OWIwMzExNDI2ZTlmN2Q1MDg0ODhiNjliNzUiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6ImlsZG9jdWVtYSIsImlkIjoiYXV0aDB8NjU0NGM4NzZjMzQyOTkwZDBkZmMyZjA5IiwiYXZhdGFyIjoiIiwiZW1haWwiOiJpbGRvY3VlbWFAZ21haWwuY29tIn19LCJyb29tIjoiKiJ9.DxLKxGumLKuabgMsCp9kRfPgJNCz_m-C5iySGByM5xcsdl0OhcrDa5aUd8CCePpweLhUHxtKv364NlFpgLVFnKwRqa0cj3y-ljQZx4up11QWNoAUvEBJJu6-Q7-cyjb2c6_Llpz1y5fpd6aKOXgmG34z9quc-KSe6QfuVJYrOrzIwhBnatO08Lrm8xkZYCpcVCbd9AKAXE9lXDNWhSlqVupH8EoP_A_fs-Xpa4imiuWqnqpubxr1sr0-02qPHZ7RadtmFBaD6mURvct5bsgKchXd8vuGvXDNQBKGUJA1GcC4FRYujCqX4Lf3AQ4bWrCjkFlGPdi46cFzbFieNEdpVw",
      userInfo: {
        email: "ildocuema@gmail.com.com",
        displayName: "Ildo7 Marques",
      },
      width: 700,
      height: 700,
      parentNode: document.querySelector("#meet"),
    };
    const api = new JitsiMeetExternalAPI(domain, options);
    api.getVideoQuality();
  },

  methods: {},
};
</script>

<style>
#meet {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
