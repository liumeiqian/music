import React from 'react'
import '../../assets/css/home.css'
import { recMusic, newSong, banner } from '../../utils/axios'
import axios from 'axios'
import 'swiper/css/swiper.css'
import 'swiper/js/swiper.js'
import Swiper from 'swiper'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      cardInfo: [],
      listInfo: [],
      bannerList: []
    }
  }

  card(id) {
    this.props.history.push('/list?id=' + id)
  }

  componentDidMount() {
    axios.all([recMusic({ limit: 6 }), newSong(), banner()])
      .then(axios.spread((recMusic, newSong, banner) => {
        if (recMusic.code === 200) {
          this.setState({
            cardInfo: recMusic.result
          })
        }
        if (newSong.code === 200) {
          this.setState({
            listInfo: newSong.result
          })
        }
        if (banner.code === 200) {
          this.setState({
            bannerList: banner.banners
          }, () => {
            this.setState({
              bannerList: banner.banners
            })
          })
        }
      }))
  }

  componentDidUpdate() {
    new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 2000,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      observer: true,
      observeParents: true,
    });
  }

  changeCount(count) {
    if (count / 10000 < 1) {
      return count
    } else if (count / 10000 >= 1 && count / 100000000 < 1) {
      return (count / 10000).toFixed(1) + '万'
    } else if (count / 100000000 >= 1) {
      return (count / 10000).toFixed(1) + '亿'
    }
  }

  toPlay(id) {
    this.props.history.push('/play?id=' + id)
  }

  render() {
    let { cardInfo, listInfo, bannerList } = this.state

    return (<div className='home'>
      {/* 轮播 */}

      <div className="swiper-container">
        <div className="swiper-wrapper">
          {
            bannerList.map(item => {
              return (<div className="swiper-slide banner" key={item.pic}><img src={item.pic} /></div>)
            })
          }
        </div>
        {
          bannerList.map((item, i) => {
            return (<div className="swiper-pagination" key={i}></div>)
          })
        }
      </div>

      <h2 className='title'>推荐歌单</h2>
      <ul className='card'>
        {
          cardInfo.map(item => {
            return (<li key={item.id} onClick={this.card.bind(this, item.id)}>
              <p className='playNum'><i></i>{this.changeCount(item.playCount)}</p>
              <img src={item.picUrl} />
              <p className='msg'>{item.name}</p>
            </li>)
          })
        }
      </ul>
      <h2 className='title'>最新音乐</h2>
      <ul className='list'>
        {
          listInfo.map(item => {
            return (<li key={item.id} onClick={this.toPlay.bind(this, item.id)}>
              <div className='left'>
                <p>{item.name}<span>{item.note}</span></p>
                <h6><i></i>{
                  item.song.artists.map((singer, i, arr) => {
                    let a = arr.length - 1 === i ? '' : ' / '
                    return singer.name + a
                  })
                } - {item.song.album.name}</h6>
              </div>
              <div className='right'></div>
            </li>)
          })
        }
      </ul>

      <div className='foot'>
        <div className='svgcon'>
          <svg className="logosvg" viewBox="0 0 1238 231" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="recommond_logo"><path d="M168.72,78.5 C160.96,73.594 151.451,70.902 141.666,70.419 L139.484,62.611 L139.549,62.684 C139.465,62.452 139.39,62.225 139.317,62.004 L138.672,59.695 C137.182,53.018 139.898,49.832 141.288,48.685 C141.526,48.512 141.771,48.337 142.036,48.167 C148.419,44.022 157.51,50.662 158.02,51.051 C162.054,54.839 169.438,55.776 173.421,51.899 C177.447,47.981 176.488,40.653 172.465,36.733 C166.201,30.636 146.969,20.843 130.604,31.465 C115.889,41.015 115.597,54.456 118.017,62.223 L120.949,72.734 C116.038,74.111 111.326,76.085 107.02,78.65 C90.909,88.259 82.828,104.475 84.848,123.143 C86.919,142.305 101.631,156.21 119.832,156.21 C139.156,156.21 154.873,140.906 154.873,122.093 C154.611,117.6 154.665,117.654 154.044,113.639 C153.439,109.721 147.505,91.307 147.505,91.307 C151.15,92.128 154.56,93.47 157.5,95.327 C190.729,116.355 176.902,149.813 176.278,151.287 C167.128,172.668 147.172,185.431 121.53,186.314 C104.822,186.892 88.806,180.803 76.448,169.18 C63.41,156.93 55.933,139.763 55.933,122.092 C55.933,95.473 73.129,71.3 98.72,61.952 C104.047,60.003 108.351,54.457 105.405,48.015 C103.086,42.953 96.805,41.211 91.478,43.16 C57.89,55.434 35.323,87.154 35.323,122.081 C35.323,145.171 45.094,167.595 62.131,183.609 C77.842,198.375 98.06,206.411 119.344,206.408 C120.311,206.408 121.285,206.392 122.255,206.359 C155.794,205.206 183.102,187.502 195.263,159.085 C202.855,141.827 207.089,102.771 168.73,78.49 M134.257,122.094 C134.257,129.838 127.785,136.139 119.828,136.139 C110.996,136.139 106.131,128.314 105.343,121.041 C103.844,107.176 111.283,99.641 117.787,95.761 C120.425,94.19 123.325,92.958 126.351,92.065 C126.351,92.065 133.366,113.8 133.914,117.167 C134.516,120.89 134.257,122.094 134.257,122.094" id="Shape" fill="#FFFFFF" fillRule="nonzero"></path><g id="Group"><g transform="translate(288.000000, 31.000000)"><rect id="Rectangle-path" x="623.569" y="135.165" width="94.828" height="18.519"></rect><polygon id="Shape" points="654.29 60.29 687.611 60.29 704.865 30.004 637.037 30.004"></polygon><rect id="Rectangle-path" x="234.994" y="47.716" width="98.632" height="15.138"></rect><rect id="Rectangle-path" x="234.994" y="19.768" width="98.632" height="15.137"></rect><polygon id="Shape" points="623.569 102.427 623.569 120.946 718.398 120.946 718.398 116.754 718.398 102.427 704.931 102.427"></polygon><path d="M225.252,75.666 L343.231,75.666 C346.767,75.666 349.635,72.798 349.635,69.261 L349.635,13.362 C349.635,9.824 346.768,6.956 343.231,6.956 L225.252,6.956 C221.715,6.956 218.848,9.824 218.848,13.362 L218.848,69.261 C218.848,72.798 221.715,75.666 225.252,75.666 Z M234.994,19.768 L333.626,19.768 L333.626,34.905 L234.994,34.905 L234.994,19.768 Z M234.994,47.716 L333.626,47.716 L333.626,62.854 L234.994,62.854 L234.994,47.716 Z" id="Shape" fill="#001317" fillRule="nonzero"></path><path d="M348.789,88.207 L226.692,88.207 C224.712,88.207 222.842,89.124 221.629,90.691 L208.854,108.518 L196.161,125.913 C195.378,126.986 196.144,128.494 197.473,128.494 L211.536,128.494 C212.657,128.494 213.708,127.959 214.367,127.056 L232.71,101.956 L258.476,101.956 L212.458,165.266 C211.66,166.364 212.444,167.903 213.801,167.903 L227.702,167.903 C228.86,167.903 229.945,167.35 230.625,166.414 L277.48,101.956 L303.788,101.956 L257.732,165.345 C256.958,166.41 257.719,167.903 259.035,167.903 L273.207,167.903 C274.254,167.903 275.238,167.401 275.855,166.554 L322.791,101.956 L331.403,101.956 L339.186,101.976 L339.186,130.77 L339.186,136.108 L339.186,140.935 C339.186,146.985 334.283,151.889 328.235,151.889 L315.135,151.889 C314.089,151.889 313.107,152.39 312.492,153.236 L303.804,165.193 C302.985,166.321 303.79,167.904 305.185,167.904 L328.231,167.904 C343.122,167.904 355.197,155.829 355.197,140.932 L355.197,94.614 C355.195,91.076 352.328,88.207 348.789,88.207 Z" id="Shape" fill="#001317" fillRule="nonzero"></path><path d="M557.045,67.977 L395.026,67.977 C394.055,67.977 393.266,68.765 393.266,69.736 L393.266,73.92 C393.266,79.13 397.489,83.354 402.698,83.354 L444.853,83.354 L406.363,156.317 C405.415,158.112 405.072,160.215 405.634,162.167 C406.599,165.526 409.622,167.699 412.942,167.699 L542.324,167.699 C544.119,167.699 545.918,167.186 547.316,166.06 C550.106,163.813 550.901,160.107 549.534,157.031 L528.513,116.534 C528.153,115.722 527.348,115.199 526.46,115.199 L514.124,115.199 C512.499,115.199 511.411,116.871 512.071,118.357 L530.28,152.519 L425.527,152.519 L462.015,83.353 L550.115,83.353 C554.907,83.353 558.793,79.468 558.793,74.675 L558.793,69.722 C558.792,68.76 558.01,67.977 557.045,67.977 Z" id="Shape" fill="#001317" fillRule="nonzero"></path><path d="M416.255,30.004 L536.069,30.004 C540.997,30.004 544.991,26.009 544.991,21.08 L544.991,16.547 C544.991,15.487 544.131,14.628 543.072,14.628 L409.142,14.628 C407.995,14.628 407.068,15.557 407.068,16.703 L407.068,20.815 C407.067,25.889 411.181,30.004 416.255,30.004 Z" id="Shape" fill="#001317" fillRule="nonzero"></path><path d="M153.161,8.901 L8.224,8.901 C3.803,8.901 0.219,12.486 0.219,16.908 L0.219,166.364 C0.219,167.377 1.042,168.2 2.054,168.2 L14.395,168.2 C15.408,168.2 16.231,167.377 16.231,166.364 L16.231,24.916 L145.156,24.916 L145.156,37.526 L145.156,141.229 C145.156,147.279 140.253,152.184 134.205,152.184 L125.417,152.184 C124.388,152.184 123.421,152.676 122.817,153.508 L113.733,166.012 C113.072,166.922 113.722,168.199 114.847,168.199 L134.202,168.199 C148.85,168.199 160.781,156.452 161.135,141.887 L161.168,141.887 L161.168,37.527 L161.168,16.908 C161.166,12.486 157.582,8.901 153.161,8.901 Z" id="Shape" fill="#001317" fillRule="nonzero"></path><path d="M117.453,133.268 L131.565,133.268 C132.773,133.268 133.528,131.965 132.929,130.917 L108.727,88.551 L132.929,46.184 C133.528,45.137 132.773,43.833 131.567,43.833 L117.452,43.833 C116.888,43.833 116.367,44.135 116.088,44.624 L99.871,73.009 L83.654,44.624 C83.375,44.135 82.853,43.833 82.29,43.833 L68.177,43.833 C66.97,43.833 66.214,45.137 66.813,46.184 L91.015,88.55 L66.813,130.917 C66.214,131.965 66.971,133.268 68.177,133.268 L82.29,133.268 C82.853,133.268 83.375,132.966 83.654,132.476 L99.871,104.092 L116.088,132.476 C116.37,132.966 116.89,133.268 117.453,133.268 Z" id="Shape" fill="#001317" fillRule="nonzero"></path><path d="M70.14,89.199 C70.427,88.736 70.486,88.136 70.179,87.597 L45.595,44.624 C45.316,44.135 44.794,43.833 44.231,43.833 L29.952,43.833 C28.745,43.833 27.989,45.137 28.588,46.184 L52.737,88.4 L28.454,130.918 C27.855,131.966 28.612,133.269 29.818,133.269 L44.096,133.269 C44.661,133.269 45.181,132.967 45.46,132.477 L70.108,89.324 C70.131,89.282 70.121,89.24 70.14,89.199 Z" id="Shape" fill="#001317" fillRule="nonzero"></path><path d="M751.672,60.29 L705.301,60.29 L722.555,30.004 L732.168,30.004 C737.267,30.004 741.4,25.87 741.4,20.77 L741.4,16.431 C741.4,15.436 740.593,14.628 739.597,14.628 L680.328,14.628 L673.125,2.082 C672.456,0.919 671.217,0.201 669.876,0.201 L657.185,0.201 C655.911,0.201 655.114,1.579 655.75,2.684 L662.613,14.629 L602.407,14.629 C601.356,14.629 600.503,15.481 600.503,16.533 L600.503,20.771 C600.503,25.871 604.637,30.005 609.736,30.005 L619.349,30.005 L636.603,60.291 L590.22,60.291 C589.098,60.291 588.188,61.2 588.188,62.323 L588.188,66.518 C588.188,71.571 592.283,75.667 597.334,75.667 L744.776,75.667 C749.712,75.667 753.712,71.665 753.712,66.729 L753.712,62.332 C753.713,61.203 752.799,60.29 751.672,60.29 Z M687.611,60.29 L654.29,60.29 L637.037,30.004 L704.865,30.004 L687.611,60.29 Z" id="Shape" fill="#001317" fillRule="nonzero"></path><path d="M726.722,88.207 L704.931,88.207 L615.179,88.207 C610.935,88.207 607.492,91.65 607.492,95.896 L607.492,160.216 C607.492,164.46 610.935,167.904 615.179,167.904 L726.722,167.904 C730.966,167.904 734.409,164.461 734.409,160.216 L734.409,116.754 L734.409,95.896 C734.41,91.651 730.966,88.207 726.722,88.207 Z M718.398,153.684 L623.57,153.684 L623.57,135.165 L718.398,135.165 L718.398,153.684 Z M718.398,116.754 L718.398,120.946 L623.57,120.946 L623.57,102.427 L704.932,102.427 L718.398,102.427 L718.398,116.754 Z" id="Shape" fill="#001317" fillRule="nonzero"></path><path d="M944.179,78.986 L944.179,74.468 C944.179,73.564 943.447,72.832 942.543,72.832 L877.84,72.832 L877.84,39.647 C877.84,38.637 877.022,37.819 876.012,37.819 L871.003,37.819 C865.936,37.819 861.827,41.928 861.827,46.996 L861.827,72.831 L808.487,72.831 L813.841,32.535 C859.311,30.358 905.645,24.841 924.535,22.421 C929.394,21.798 932.807,17.329 932.126,12.477 L931.434,7.55 C931.316,6.709 930.565,6.118 929.724,6.233 C919.732,7.586 861.528,15.237 806.664,17.463 C802.893,17.616 799.79,20.49 799.343,24.241 L792.204,79.615 C791.948,81.796 792.632,83.981 794.093,85.624 C795.552,87.265 797.644,88.207 799.839,88.207 L861.828,88.207 L861.828,140.944 C861.828,146.996 856.925,151.901 850.874,151.901 L848.072,151.901 C846.941,151.901 845.878,152.444 845.216,153.363 L836.873,164.928 C835.975,166.174 836.865,167.915 838.402,167.915 L850.874,167.915 C865.766,167.915 877.84,155.84 877.84,140.943 L877.84,88.206 L934.958,88.206 C940.052,88.207 944.179,84.079 944.179,78.986 Z" id="Shape" fill="#001317" fillRule="nonzero"></path><path d="M834.914,102.427 L823.694,102.427 C820.606,102.427 817.738,103.969 816.053,106.558 C808.338,118.41 797.51,139.693 786.834,156.664 C785.915,158.125 786.929,160.018 788.656,160.018 L798.856,160.018 C801.928,160.018 804.842,158.5 806.476,155.897 C818.523,136.69 829.814,115.751 836.256,104.869 C836.898,103.782 836.176,102.427 834.914,102.427 Z" id="Shape" fill="#001317" fillRule="nonzero"></path><path d="M948.871,156.663 C938.197,139.693 927.369,118.409 919.652,106.557 C917.967,103.968 915.101,102.426 912.012,102.426 L900.791,102.426 C899.53,102.426 898.807,103.781 899.449,104.867 C905.892,115.749 917.182,136.689 929.231,155.895 C930.863,158.498 933.779,160.016 936.851,160.016 L947.05,160.016 C948.777,160.017 949.792,158.125 948.871,156.663 Z" id="Shape" fill="#001317" fillRule="nonzero"></path></g><g fillRule="nonzero" id="Shape"><path d="M177.772,0.2 L52.453,0.2 C23.666,0.2 0.113,23.753 0.113,52.54 L0.113,177.86 C0.113,206.647 23.666,230.2 52.453,230.2 L177.773,230.2 C206.56,230.2 230.113,206.647 230.113,177.86 L230.113,52.54 C230.113,23.753 206.559,0.2 177.772,0.2 Z" fill="#DD001B"></path><path d="M139.399,71.14 C138.764,68.733 137.798,65.056 137.058,62.295 C136.496,60.258 136.237,57.944 136.837,55.883 C137.005,55.304 137.263,54.783 137.548,54.253 C138.787,51.952 141.102,50.364 143.671,49.938 C144.837,49.745 146.035,49.804 147.177,50.105 C148.374,50.421 149.502,50.986 150.488,51.73 C151.52,52.51 152.328,53.518 153.27,54.394 C154.797,55.819 156.844,56.691 159.096,56.691 C163.817,56.691 167.645,52.863 167.645,48.143 C167.645,46.742 167.305,45.422 166.708,44.257 C166.656,44.156 166.602,44.054 166.545,43.953 C166.507,43.887 166.468,43.819 166.428,43.753 C165.472,42.142 164.09,40.743 162.665,39.52 C159.926,37.167 156.692,35.391 153.254,34.296 C151.637,33.78 149.971,33.415 148.285,33.222 C144.574,32.796 140.782,33.184 137.236,34.357 C123.26,38.971 116.557,51.997 120.564,66.78 C120.96,68.259 121.645,70.869 122.006,72.228 C119.015,72.871 116.046,73.75 113.131,74.873 C99.479,80.13 88.644,91.804 84.855,105.341 C83.508,110.156 83.046,115.147 83.485,120.18 C84.432,131.055 90.233,141.186 98.999,147.275 C107.258,153.013 117.137,154.697 126.825,152.026 C133.682,150.132 139.778,146.057 143.99,140.553 C150.655,131.847 152.643,120.404 149.587,108.335 C148.475,103.944 147.075,99.066 145.723,94.346 C145.232,92.641 144.742,90.928 144.261,89.23 C150.057,90.721 155.402,93.541 159.746,97.599 C174.837,111.694 177.746,135.972 166.511,154.076 C156.644,169.978 137.424,180.252 117.545,180.252 C84.025,180.252 56.755,152.983 56.755,119.465 C56.755,116.488 56.986,113.475 57.44,110.517 C57.805,108.131 58.32,105.752 58.968,103.441 C59.608,101.163 60.391,98.897 61.296,96.712 C62.196,94.54 63.231,92.406 64.378,90.359 C65.511,88.331 66.784,86.343 68.155,84.447 C69.511,82.57 71,80.747 72.574,79.03 C74.143,77.318 75.83,75.681 77.587,74.159 C79.342,72.64 81.209,71.205 83.133,69.893 C85.064,68.576 87.091,67.363 89.159,66.284 C90.294,65.693 91.444,65.137 92.613,64.621 C93.24,64.343 93.874,64.077 94.511,63.823 C98.897,62.075 101.034,57.103 99.286,52.717 C97.539,48.331 92.568,46.19 88.18,47.945 C87.352,48.275 86.529,48.623 85.69,48.991 C84.186,49.658 82.702,50.371 81.249,51.132 C78.595,52.517 75.993,54.074 73.51,55.765 C71.042,57.447 68.65,59.286 66.399,61.237 C64.149,63.185 61.984,65.286 59.976,67.479 C57.955,69.679 56.049,72.018 54.305,74.425 C52.547,76.856 50.916,79.409 49.462,82.01 C47.99,84.636 46.658,87.38 45.502,90.169 C44.337,92.984 43.329,95.898 42.509,98.828 C41.676,101.796 41.015,104.856 40.544,107.92 C39.957,111.736 39.659,115.622 39.659,119.466 C39.659,162.411 74.599,197.347 117.543,197.347 C143.2,197.347 168.122,183.9 181.033,163.089 C196.741,137.782 192.694,104.985 171.411,85.107 C162.699,76.968 151.356,72.193 139.399,71.14 Z M130.416,130.163 C128.454,132.726 125.559,134.641 122.271,135.55 C116.242,137.208 111.591,135.208 108.753,133.237 C104.106,130.01 101.027,124.571 100.512,118.697 C100.254,115.72 100.522,112.778 101.315,109.949 C103.678,101.509 110.558,94.182 119.273,90.825 C121.613,89.925 123.997,89.242 126.391,88.773 C127.298,92.122 128.296,95.604 129.288,99.062 C130.628,103.728 131.956,108.35 133.014,112.531 C134.251,117.411 134.804,124.432 130.416,130.163 Z" fill="#FFFFFF"></path></g></g></g></g></svg>
        </div>
        <div className='openApp'>打开APP，发现更多好音乐</div>
      </div>
    </div>)
  }
}
export default Home