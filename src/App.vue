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
<div class="image-response" v-if="response.cosmetic">
    <img :src="image"/>
    <p>Прогноз ремонта варианта ремонта</p>
    <div>
        <p>Косметический ремонт: {{response.cosmetic.toFixed(4)}}%</p>
        <p>Без ремонта: {{response.without.toFixed(4)}}%</p>
        <p>Люкс: {{response.luxury.toFixed(4)}}%</p>
        <p>Обычный ремонт: {{response.standard.toFixed(4)}}%</p>
    </div>
    <div class="colors">
        <div class="dom-color">
            <p>Доминирующий цвет</p>
            <span class="domin-color" :style="{backgroundColor: `rgb(${response.dominant[0]},${response.dominant[1]},${response.dominant[2]})`}"></span>
        </div>
        <div class="palette">
            <p>Доп.цвета</p>
            <div class="palette-colors">
                  <span v-for="(color, i) in response.palette"
                        :key="`color${i}`"
                        class="child-color"
                        :style="{backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`}"
                  ></span>
            </div>
        </div>
    </div>
</div>
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
          image: '',
          response: '',
          res: {}
      }
    },
  methods: {
      onFileChange: function(e) {
          this.image = e.target.files[0] || e.dataTransfer.files[0];
      },
      async uploadImg() {
          const that = this
          let data = new FormData();
          data.append('file', this.image);
          axios.post('https://hahaton.ngrok.io/upload', data, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
              .then(function(res) {
                  that.response = res.data
                  console.log(res)
              })
          .then(() => {
              this.getImageUploaded()
          })
      },
      async getImageUploaded() {
          axios.get('https://hahaton.ngrok.io/image', {
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
display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
  input[type = 'submit'] {
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
  input[type = 'submit']:hover {
    background-color: darkgrey;
    color: black;
  }

  .colors {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
.domin-color {
    width: 50px;
    height: 50px;
    border-radius: 30px;
}
    .child-color {
        margin-right: 10px;
        width: 30px;
        border-radius: 15px;
        height: 30px;
    }
    .palette {
       display: flex;
        flex-direction: column;
    }
    .dom-color {
        display: flex;
        flex-direction: row;
    }
    .dom-color p {
        margin-right: 10px;
    }
  .palette-colors {
      display: flex;
      flex-direction: row;
      width: 100%;
  }
</style>
