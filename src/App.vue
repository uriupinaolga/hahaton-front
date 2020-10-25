<template>
  <div id="app">
      <div class="main-content" id="panel">
          <!-- Topnav -->
          <!-- Header -->
          <!-- Header -->
          <div class="gu-header" :style="{height: dataLoaded ? '70vh':'100vh', marginBottom: dataLoaded ? '30px':'0' }">
              <img :src="bg" :style="{height: dataLoaded ? '70vh':'100vh'}"/>
              <!-- Mask -->
              <span class="gu-mask"></span>
              <!-- Header container -->
              <div class="container-fluid d-flex align-items-center gu-title">
                  <div class="row">
                      <div class="col-lg-7 col-md-10">
                          <h1 data-aos="fade-up" data-aos-delay="100" class="display-2 text-white">Оценка качества ремонта квартиры по цветам </h1>
                          <p data-aos="fade-up" data-aos-delay="200" class="text-white mt-0 mb-5">Мы оцениваем тип ремонта квартиры с помощью анализа ее цветовой палитры.
                              А еще подскажем вам основные и акцентные цвета в дизайне интерьера.</p>
                          <form  data-aos="fade-up" data-aos-delay="300" method="post" enctype="multipart/form-data" @submit.prevent="uploadImg">
                              <input id="upload-file" class="my-form" type="file" name="file" @change="onFileChange">
                          </form>
                          <a data-aos="fade-up" data-aos-delay="400" href="#!" class="btn btn-neutral" @click.prevent="uploadClick">Загрузить фото</a>
                      </div>
                  </div>
              </div>
          </div>
          <!-- Page content -->
          <div class="container-fluid mt--6" v-if="dataLoaded" >
              <div class="row">
                  <div class="col-xl-4 order-xl-2" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="100">
                      <div class="card">
                          <div class="card-header">
                              <div class="row align-items-center">
                                  <div class="col-12">
                                      <h3 class="mb-0">Оценка качества ремонта </h3>
                                  </div>
                              </div>
                          </div>
                          <div class="card-body">
                              <form>
                                  <h2 class="heading-small text-muted mb-4">{{getTypeOfRoom}}</h2>
                                  <div class="table-responsive">
                                      <!-- Projects table -->
                                      <table class="table align-items-center table-flush">
                                          <thead class="thead-light">
                                          <tr>
                                              <th scope="col">Тип ремонта</th>
                                              <th scope="col">Вероятность</th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          <tr>
                                              <th scope="row">
                                                  Косметический ремонт
                                              </th>
                                              <td>
                                                  <div class="d-flex align-items-center">
                                                      <span class="mr-2">{{(response.cosmetic*100).toFixed(2)}}%</span>
                                                      <div class="progress-bar-parent">
                                                              <div class="progress-bar-gu" :style="{background: '#28a745', width: `${(response.cosmetic*100).toFixed(2)}%` }"></div>
                                                      </div>
                                                  </div>
                                              </td>
                                          </tr>
                                          <tr>
                                              <th scope="row">
                                                  Без ремонта
                                              </th>
                                              <td>
                                                  <div class="d-flex align-items-center">
                                                      <span class="mr-2">{{(response.without* 100).toFixed(2)}}%</span>
                                                      <div class="progress-bar-parent">
                                                          <div class="progress-bar-gu" :style="{background: '#007bff', width: `${(response.without* 100).toFixed(2)}%`}"></div>
                                                      </div>
                                                  </div>
                                              </td>
                                          </tr>
                                          <tr>
                                              <th scope="row">
                                                  Люкс
                                              </th>
                                              <td>
                                                  <div class="d-flex align-items-center">
                                                      <span class="mr-2">{{(response.luxury* 100).toFixed(2)}}%</span>
                                                      <div class="progress-bar-parent">
                                                          <div class="progress-bar-gu" :style="{background: '#dc3545', width: `${(response.luxury* 100).toFixed(2)}%`}"></div>
                                                      </div>
                                                  </div>
                                              </td>
                                          </tr>
                                          <tr>
                                              <th scope="row">
                                                  Обычный ремонт
                                              </th>
                                              <td>
                                                  <div class="d-flex align-items-center">
                                                      <span class="mr-2">{{(response.standard*100).toFixed(2)}}%</span>
                                                      <div class="progress-bar-parent">
                                                          <div class="progress-bar-gu" :style="{background: '#ffc107', width: `${(response.standard*100).toFixed(2)}%`}"></div>
                                                      </div>
                                                  </div>
                                              </td>
                                          </tr>
                                          </tbody>
                                      </table>
                                  </div>
                                  <hr class="my-4" />
                                  <!-- Address -->
                                  <h6 class="heading-small text-muted mb-4">Доминирующий цвет</h6>
                                  <div class="pl-lg-4">
                                      <div class="row">
                                          <div class="col-md-12">
                                              <div class="table-responsive">
                                                  <!-- Projects table -->
                                                  <table class="table align-items-center table-flush">
                                                      <thead class="thead-light">
                                                      <tr>
                                                          <th scope="col">Название цвета</th>
                                                          <th scope="col">Изображение</th>
                                                      </tr>
                                                      </thead>
                                                      <tbody>
                                                      <tr>
                                                          <th scope="row">
                                                              {{response.dominant.name}}
                                                          </th>
                                                          <td>
                                                              <div class="color-circle" :style="{backgroundColor: `${response.dominant.color}`}"></div>
                                                          </td>
                                                      </tr>
                                                      </tbody>
                                                  </table>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <hr class="my-4" />
                                  <!-- Description -->
                                  <h6 class="heading-small text-muted mb-4">Дополнительные цвета</h6>
                                  <div class="pl-lg-4">
                                      <div class="row">
                                          <div class="col-md-12">
                                              <!-- Projects table -->
                                              <table class="table align-items-center table-flush">
                                                  <thead class="thead-light">
                                                  <tr>
                                                      <th scope="col">Название цвета</th>
                                                      <th scope="col">Изображение</th>
                                                  </tr>
                                                  </thead>
                                                  <tbody>
                                                  <tr v-for="(color, i) in response.palette" :key="`palette-color${i}`">
                                                      <th scope="row">
                                                          {{color.name}}
                                                      </th>
                                                      <td>
                                                          <div class="color-circle" :style="{backgroundColor: `${color.color}`}"></div>
                                                      </td>
                                                  </tr>
                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>

                  <div class="col-xl-8 order-xl-1" data-aos="fade-right">
                      <div class="card card-profile">
                          <img v-if="dataLoaded" id="preview-image" :src="'https://hahaton.ngrok.io/image.jpg'" alt="Image placeholder" class="card-img-top">
                      </div>
                  </div>

              </div>
              <!-- Footer -->
              <footer class="footer pt-0">
                  <div class="row align-items-center justify-content-lg-between">
                      <div class="col-lg-12">
                          <div class="copyright text-center  text-lg-left  text-muted">
                              &copy; 2020 <a href="https://t.me/Nagowarrior" class="font-weight-bold ml-1" target="_blank">Gu-Est</a>
                          </div>
                      </div>

                  </div>
              </footer>
          </div>
          <div class="row">

          </div>
          <!-- Footer -->

      </div>
  </div>
</template>

<script>
import axios from 'axios'
import AOS from 'aos'
import bg from '../img/theme/profile-cover.jpg'

export default {
  name: 'App',
    data() {
      return {
          image: '',
          response: '',
          res: {},
          dataLoaded: false,
          previewImageLoaded: false,
          bg
      }
    },
    computed: {
        getTypeOfRoom() {
            if(this.response.win === "Стандартный ремонт") {
                return 'Стандартный ремонт'
            }
            if(this.response.win === "Без отделки") {
                return 'Без отделки'
            }
            if(this.response.win === "Требуется косметический ремонт") {
                return 'Требуется косметический ремонт'
            }
            if(this.response.win === "Люкс") {
                return 'Люкс'
            }
            return ''
        },
    },
    mounted() {
      AOS.init({
          duration: 1200,
          once: true
      })
    },
    methods: {
      onFileChange: function(e) {
          this.image = e.target.files[0] || e.dataTransfer.files[0];
          this.uploadImg()
      },
        uploadClick() {
          document.getElementById('upload-file').click()
        },
      async uploadImg() {
          this.dataLoaded = false
          const that = this
          this.dataLoaded = true
          let data = new FormData();
          data.append('file', this.image);
          axios.post('https://hahaton.ngrok.io/upload', data, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          })
              .then(function(res) {
                  that.response = res.data
                  that.dataLoaded = true
                  AOS.refresh()
                  console.log(res)
              })
          document.getElementById('preview-image').onload = function() {
              alert(`Изображение загружено`);
          };
      },
},

}
</script>

<style>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css";
    .gu-header {
        overflow: hidden;
        position: relative;
        z-index: 1;
        height: 70vh;
        transition: all 1s ease-in-out;
        margin-bottom: 40px;
    }
.progress-bar-gu {
    position: absolute;
    z-index: 2;
    height: 4px;
}
.progress-bar-parent {
    width: 130px;
    height: 4px;
    position: relative;
}
.gu-header img {
    position: absolute;
    width: 100%;
    z-index: 1;
    transition: all 1s ease-in-out;
}
.gu-mask {
        position: absolute;
        z-index: 2;
        opacity: 0.8;
        background: linear-gradient(87deg, #172b4d 0, #1a174d 100%) !important;
        width: 100vw;
        height: 100%;
    }
.gu-title {
    z-index: 10;
    position: relative;
}
    .my-form {
       display: none;
    }
    .color-circle {
        width: 48px;
        height: 48px;
        border-radius: 20px;
    }
</style>
