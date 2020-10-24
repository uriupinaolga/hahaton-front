<template>
  <div id="app">
    <div class="wrapper">
    <header class="header">
  <p>Gu-est - is the best!!!1!</p>
</header>
      <div class="wrapper-body">
          <p>Выберите изображение для анализа</p>
          <form method="post" enctype="multipart/form-data" @submit.prevent="uploadImg">
              <input type="file" name="file" @change="onFileChange">
              <input type="submit" value="Submit">
          </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
    data() {
      return {
          img: '',
          response: ''
      }
    },
  methods: {
      onFileChange: function(e) {
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
              return;
          this.createImage(files[0]);
      },
      createImage: function(file) {
          let reader = new FileReader();
          let vm = this;
          reader.onload = function(e) {
              vm.image = e.target.result;
          };
          reader.readAsDataURL(file);

      },
     async uploadImg() {
         let data = new FormData();
         data.append('file.jpg', this.image);

         axios.post('https://hahaton.ngrok.io/upload', data, {
             headers: {
                 ''
             }
         })
             .then(function(res) {
                 console.log(res)
             });
      }
},

}
</script>

<style>
  body {
    margin: 0;
  }

.wrapper {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.wrapper-body {
padding: 7% 15%;

}
.header {
  width: 100vw;
  height: 40px;
  background-color: black;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.header p {
  color: white;
}
  button {
    transition: all 0.3s ease;
    background-color: black;
    color: white;
    border-radius: 20px;
    height: 40px;
    min-width: 50px;
    text-align: center;
    padding: 0 20px;
    cursor: pointer;
    border: none;
  }
  button:hover {
    background-color: darkgrey;
    color: black;
  }

</style>
