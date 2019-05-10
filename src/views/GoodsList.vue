<template>
  <div>
    <nav-header/>
    <nav-bread>
      <span slot="bread">Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a @click="sortGoods" href="javascript:void(0)" class="price">
            Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a
                  href="javascript:void(0)"
                  :class="{'cur': priceChecked==='all'}"
                  @click="setPriceFilter('all')"
                >All</a>
              </dd>
              <dd v-for="(item,index) in priceFilter" :key="index" @click="setPriceFilter(index)">
                <a
                  href="javascript:void(0)"
                  :class="{'cur':priceChecked === index}"
                >{{`${item.startPrice} - ${item.endPrice}`}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList" :key="index">
                  <div class="pic">
                    <a href="#">
                      <img v-lazy="'static/'+item.productImage" :key="item.productImage" alt>
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a
                        href="javascript:;"
                        class="btn btn--m"
                        @click="addCart(item.productId)"
                      >加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div
                class="load-more"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="busy"
                infinite-scroll-distance="10"
              >
                <img v-show="!busy" src="./../assets/loading/loading-spinning-bubbles.svg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <nav-footer/>
  </div>
</template>
<script>
import NavHeader from './../components/NavHeader';
import NavFooter from './../components/NavFooter';
import NavBread from './../components/NavBread';
import axios from 'axios';
export default {
    components: { NavHeader, NavFooter, NavBread },
    data () {
        return {
            goodsList: [],
            priceFilter: [
                {
                    startPrice: '0.00',
                    endPrice: '500.00'
                },
                {
                    startPrice: '500.00',
                    endPrice: '1000.00'
                },
                {
                    startPrice: '1000.00',
                    endPrice: '2000.00'
                }
            ],
            priceChecked: 'all',
            filterBy: false,
            overLayFlag: false,
            sortFalg: true,
            page: 1,
            busy: true
        };
    },
    methods: {
        getGoodsList (pushFalg) {
            let params = {
                page: this.page,
                sort: this.sortFalg ? 1 : -1,
                priceLevel: this.priceChecked
            };
            axios.post('/goods', params).then(result => {
                let { data } = result;
                let { list, success, msg, count } = data;
                if (success) {
                    if (pushFalg) {
                        this.goodsList = this.goodsList.concat(list);
                        if (count === 0) {
                            this.busy = true;
                        } else {
                            this.busy = false;
                        }
                    } else {
                        this.goodsList = list;
                        this.busy = false;
                    }
                } else {
                    alert(`error: ${msg}`);
                }
            });
        },
        setPriceFilter (index) {
            this.priceChecked = index;
            this.page = 1;
            this.getGoodsList();
            this.closePop();
        },
        showFilterPop () {
            this.filterBy = true;
            this.overLayFlag = true;
        },
        closePop () {
            this.filterBy = false;
            this.overLayFlag = false;
        },
        sortGoods () {
            this.sortFalg = !this.sortFalg;
            this.page = 1;
            this.getGoodsList();
        },
        loadMore () {
            this.busy = true;
            setTimeout(() => {
                this.page++;
                this.getGoodsList(true);
            }, 1000);
        },
        addCart (productId) {
            axios.post('/goods/addCart', { productId }).then(res => {
                let { data } = res;
                if (data.success) {
                    alert('加入购物车成功');
                } else {
                    alert(data.msg);
                }
            });
        }
    },
    mounted () {
        this.getGoodsList();
    }
};
</script>
<style scoped>
.load-more {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>
