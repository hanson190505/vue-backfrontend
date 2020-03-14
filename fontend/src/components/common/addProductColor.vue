<template>
  <div>
    <el-tag v-for="(item, index) in colorList" :key="index" :color="item.html_color">{{item.value}}</el-tag>
    <el-popover placement="left-end" width="300" trigger="click">
      <el-button type="primary" size="mini" @click="addColor(parentProColor)">+</el-button>
      <el-table :data="colorList" :header-row-style="colorTableHeader">
        <el-table-column width="120">
          <template slot-scope="scope">
            <el-autocomplete
              class="inline-input"
              v-model="scope.row.value"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="setSelect"
            ></el-autocomplete>
          </template>
        </el-table-column>
        <el-table-column width="100">
          <template slot-scope="scope">
            <div
              :style="{
              backgroundColor: scope.row.html_color,
              width: '80px',
              height: '30px'
            }"
            ></div>
          </template>
        </el-table-column>
        <el-table-column width="60">
          <template slot-scope="scope">
            <el-button type="warning" @click="rmColor(scope.row, scope.$index)">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        slot="reference"
        @click="visible = !PopoverVisible"
        size="mini"
        :disabled="addColorBtn"
      >+</el-button>
    </el-popover>
  </div>
</template>

<script>
// import { pantoneColor } from '@/api/pantoneColor'
export default {
  name: 'addProductColor',
  data() {
    return {
      PopoverVisible: false,
      colorList: [],
      //TODO:pantone颜色数据要从后台获取
      restaurants: [
        {
          value: '100 C',
          html_color: '#F6EB61'
        },
        {
          value: '106 C',
          html_color: '#F9E547'
        },
        {
          value: '108 C',
          html_color: '#FEDB00'
        },
        {
          value: '103 C',
          html_color: '#C5A900'
        },
        {
          value: '104 C',
          html_color: '#AF9800'
        },
        {
          value: '107 C',
          html_color: '#FBE122'
        },
        {
          value: '105 C',
          html_color: '#897A27'
        },
        {
          value: '102 C',
          html_color: '#FCE300'
        },
        {
          value: '101 C',
          html_color: '#F7EA48'
        },
        {
          value: '109 C',
          html_color: '#FFD100'
        },
        {
          value: '112 C',
          html_color: '#9C8412'
        },
        {
          value: '110 C',
          html_color: '#DAAA00'
        },
        {
          value: '113 C',
          html_color: '#FAE053'
        },
        {
          value: '111 C',
          html_color: '#AA8A00'
        },
        {
          value: '114 C',
          html_color: '#FBDE40'
        },
        {
          value: '115 C',
          html_color: '#FDDA25'
        },
        {
          value: '116 C',
          html_color: '#FFCD00'
        },
        {
          value: '117 C',
          html_color: '#C99700'
        },
        {
          value: '121 C',
          html_color: '#FCD757'
        },
        {
          value: '119 C',
          html_color: '#897322'
        },
        {
          value: '123 C',
          html_color: '#FFC72C'
        },
        {
          value: '118 C',
          html_color: '#AC8400'
        },
        {
          value: '122 C',
          html_color: '#FED141'
        },
        {
          value: '120 C',
          html_color: '#FBDB65'
        },
        {
          value: '124 C',
          html_color: '#EAAA00'
        },
        {
          value: '125 C',
          html_color: '#B58500'
        },
        {
          value: '126 C',
          html_color: '#9A7611'
        },
        {
          value: '1205 C',
          html_color: '#F8E08E'
        },
        {
          value: '1265 C',
          html_color: '#886B25'
        },
        {
          value: '1215 C',
          html_color: '#FBD872'
        },
        {
          value: '1245 C',
          html_color: '#C69214'
        },
        {
          value: '1255 C',
          html_color: '#AD841F'
        },
        {
          value: '1225 C',
          html_color: '#FFC845'
        },
        {
          value: '1235 C',
          html_color: '#FFB81C'
        },
        {
          value: '127 C',
          html_color: '#F3DD6D'
        },
        {
          value: '128 C',
          html_color: '#F3D54E'
        },
        {
          value: '129 C',
          html_color: '#F3D03E'
        },
        {
          value: '130 C',
          html_color: '#F2A900'
        },
        {
          value: '131 C',
          html_color: '#CC8A00'
        },
        {
          value: '132 C',
          html_color: '#A07400'
        },
        {
          value: '135 C',
          html_color: '#FFC658'
        },
        {
          value: '133 C',
          html_color: '#6C571B'
        },
        {
          value: '134 C',
          html_color: '#FDD26E'
        },
        {
          value: '136 C',
          html_color: '#FFBF3F'
        },
        {
          value: '1365 C',
          html_color: '#FFB549'
        },
        {
          value: '138 C',
          html_color: '#DE7C00'
        },
        {
          value: '139 C',
          html_color: '#AF6D04'
        },
        {
          value: '140 C',
          html_color: '#74531C'
        },
        {
          value: '1345 C',
          html_color: '#FDD086'
        },
        {
          value: '1355 C',
          html_color: '#FFC56E'
        },
        {
          value: '137 C',
          html_color: '#FFA400'
        },
        {
          value: '144 C',
          html_color: '#ED8B00'
        },
        {
          value: '1395 C',
          html_color: '#996017'
        },
        {
          value: '1405 C',
          html_color: '#6E4C1E'
        },
        {
          value: '141 C',
          html_color: '#F2C75C'
        },
        {
          value: '142 C',
          html_color: '#F1BE48'
        },
        {
          value: '143 C',
          html_color: '#F1B434'
        },
        {
          value: '1375 C',
          html_color: '#FF9E1B'
        },
        {
          value: '1385 C',
          html_color: '#D57800'
        },
        {
          value: '150 C',
          html_color: '#FFB25B'
        },
        {
          value: '151 C',
          html_color: '#FF8200'
        },
        {
          value: '152 C',
          html_color: '#E57200'
        },
        {
          value: '145 C',
          html_color: '#CF7F00'
        },
        {
          value: '146 C',
          html_color: '#A76D11'
        },
        {
          value: '147 C',
          html_color: '#715C2A'
        },
        {
          value: '148 C',
          html_color: '#FECB8B'
        },
        {
          value: '149 C',
          html_color: '#FFC27B'
        },
        {
          value: '1495 C',
          html_color: '#FF8F1C'
        },
        {
          value: '153 C',
          html_color: '#BE6A14'
        },
        {
          value: '154 C',
          html_color: '#9B5A1A'
        },
        {
          value: '1485 C',
          html_color: '#FFAE62'
        },
        {
          value: '1505 C',
          html_color: '#FF6900'
        },
        {
          value: '1525 C ',
          'html_color ': '#B94700 '
        },
        {
          value: '1535 C',
          html_color: '#94450B'
        },
        {
          value: '1545 C',
          html_color: '#653818'
        },
        {
          value: '155 C',
          html_color: '#EFD19F'
        },
        {
          value: '157 C',
          html_color: '#ECA154'
        },
        {
          value: '158 C',
          html_color: '#E87722'
        },
        {
          value: '159 C',
          html_color: '#CB6015'
        },
        {
          value: '160 C',
          html_color: '#A1561C'
        },
        {
          value: '161 C',
          html_color: '#603D20'
        },
        {
          value: '156 C',
          html_color: '#EFBE7D'
        },
        {
          value: '1555 C',
          html_color: '#FFB990'
        },
        {
          value: '1565 C',
          html_color: '#FFA06A'
        },
        {
          value: '162 C',
          html_color: '#FFBE9F'
        },
        {
          value: '1575 C',
          html_color: '#FF7F32'
        },
        {
          value: '1585 C',
          html_color: '#FF6A14'
        },
        {
          value: '1595 C',
          html_color: '#D86018'
        },
        {
          value: '1605 C',
          html_color: '#A65523'
        },
        {
          value: '1615 C',
          html_color: '#8B4720'
        },
        {
          value: '163 C',
          html_color: '#FF9D6E'
        },
        {
          value: '164 C',
          html_color: '#FF7F41'
        },
        {
          value: '165 C',
          html_color: '#FF6720'
        },
        {
          value: '166 C',
          html_color: '#E35205'
        },
        {
          value: '167 C',
          html_color: '#BE531C'
        },
        {
          value: '168 C',
          html_color: '#73391D'
        },
        {
          value: '1625 C',
          html_color: '#FFA38B'
        },
        {
          value: '1635 C',
          html_color: '#FF8D6D'
        },
        {
          value: '1645 C',
          html_color: '#FF6A39'
        },
        {
          value: '1655 C',
          html_color: '#FC4C02'
        },
        {
          value: '1665 C',
          html_color: '#DC4405'
        },
        {
          value: '1675 C',
          html_color: '#A9431E'
        },
        {
          value: '1685 C',
          html_color: '#833921'
        },
        {
          value: '169 C',
          html_color: '#FFB3AB'
        },
        {
          value: '170 C',
          html_color: '#FF8674'
        },
        {
          value: '171 C',
          html_color: '#FF5C39'
        },
        {
          value: '172 C',
          html_color: '#FA4616'
        },
        {
          value: '173 C',
          html_color: '#CF4520'
        },
        {
          value: '174 C',
          html_color: '#963821'
        },
        {
          value: '175 C',
          html_color: '#6B3529'
        },
        {
          value: '176 C',
          html_color: '#FFB1BB'
        },
        {
          value: '177 C',
          html_color: '#FF808B'
        },
        {
          value: '178 C',
          html_color: '#FF585D'
        },
        {
          value: '179 C',
          html_color: '#E03C31'
        },
        {
          value: '1788 C',
          html_color: '#EE2737'
        },
        {
          value: '181 C',
          html_color: '#81312F'
        },
        {
          value: '1775 C',
          html_color: '#FF8DA1'
        },
        {
          value: '180 C',
          html_color: '#BE3A34'
        },
        {
          value: '1785 C',
          html_color: '#F8485E'
        },
        {
          value: '1795 C',
          html_color: '#D22730'
        },
        {
          value: '1805 C',
          html_color: '#AF272F'
        },
        {
          value: '1765 C',
          html_color: '#FFA3B5'
        },
        {
          value: '1767 C',
          'html_color ': '#FCAFC0'
        },
        {
          value: '1817 C',
          html_color: '#643335'
        },
        {
          value: '1777 C',
          html_color: '#FB637E'
        },
        {
          value: '1815 C',
          html_color: '#7C2629'
        },
        {
          value: '1797 C',
          html_color: '#CB333B'
        },
        {
          value: '1807 C',
          html_color: '#A4343A'
        },
        {
          value: '1787 C',
          html_color: '#F4364C'
        },
        {
          value: '189 C',
          html_color: '#F8A3BC'
        },
        {
          value: '182 C',
          html_color: '#FABBCB'
        },
        {
          value: '186 C',
          html_color: '#C8102E'
        },
        {
          value: '187 C',
          html_color: '#A6192E'
        },
        {
          value: '188 C',
          html_color: '#76232F'
        },
        {
          value: '183 C',
          html_color: '#FC9BB3'
        },
        {
          value: '184 C',
          html_color: '#F65275'
        },
        {
          value: '185 C',
          html_color: '#E4002B'
        },
        {
          value: '195 C',
          html_color: '#782F40'
        },
        {
          value: '1895 C',
          html_color: '#F5B6CD'
        },
        {
          value: '1905 C',
          html_color: '#F59BBB'
        },
        {
          value: '190 C',
          html_color: '#F67599'
        },
        {
          value: '191 C',
          html_color: '#EF426F'
        },
        {
          value: '192 C',
          html_color: '#E40046'
        },
        {
          value: '193 C',
          html_color: '#BF0D3E'
        },
        {
          value: '194 C',
          html_color: '#9B2743'
        },
        {
          value: '1945 C',
          html_color: '#A60A3D'
        },
        {
          value: '1915 C',
          html_color: '#EF4B81'
        },
        {
          value: '1925 C',
          html_color: '#E0004D'
        },
        {
          value: '1935 C',
          html_color: '#C5003E'
        },
        {
          value: '1955 C',
          html_color: '#8A1538'
        },
        {
          value: '196 C',
          html_color: '#ECC7CD'
        },
        {
          value: '197 C',
          html_color: '#E89CAE'
        },
        {
          value: '198 C',
          html_color: '#DF4661'
        },
        {
          value: '199 C',
          html_color: '#D50032'
        },
        {
          value: '200 C',
          html_color: '#BA0C2F'
        },
        {
          value: '202 C',
          html_color: '#862633'
        },
        {
          value: '203 C',
          html_color: '#ECB3CB'
        },
        {
          value: '204 C',
          html_color: '#E782A9'
        },
        {
          value: '205 C',
          html_color: '#E0457B'
        },
        {
          value: '206 C',
          html_color: '#CE0037'
        },
        {
          value: '201 C',
          html_color: '#9D2235'
        },
        {
          value: '207 C',
          html_color: '#A50034'
        },
        {
          value: '214 C',
          html_color: '#CE0F69'
        },
        {
          value: '209 C',
          html_color: '#6F263D'
        },
        {
          value: '210 C',
          html_color: '#F99FC9'
        },
        {
          value: '213 C',
          html_color: '#E31C79'
        },
        {
          value: '208 C',
          html_color: '#862041'
        },
        {
          value: '211 C',
          html_color: '#F57EB6'
        },
        {
          value: '212 C',
          html_color: '#F04E98'
        },
        {
          value: '215 C',
          html_color: '#AC145A'
        },
        {
          value: '219 C',
          html_color: '#DA1984'
        },
        {
          value: '220 C',
          html_color: '#A50050'
        },
        {
          value: '216 C',
          html_color: '#7D2248'
        },
        {
          value: '217 C',
          html_color: '#EABEDB'
        },
        {
          value: '218 C',
          html_color: '#E56DB1'
        },
        {
          value: '221 C',
          html_color: '#910048'
        },
        {
          value: '222 C',
          html_color: '#6C1D45'
        },
        {
          value: '223 C',
          html_color: '#EF95CF'
        },
        {
          value: '224 C',
          html_color: '#EB6FBD'
        },
        {
          value: '225 C',
          html_color: '#DF1995'
        },
        {
          value: '226 C',
          html_color: '#D00070'
        },
        {
          value: '227 C',
          html_color: '#AA0061'
        },
        {
          value: '228 C',
          html_color: '#890C58'
        },
        {
          value: '229 C',
          html_color: '#672146'
        },
        {
          value: '230 C',
          html_color: '#F4A6D7'
        },
        {
          value: '231 C',
          html_color: '#F277C6'
        },
        {
          value: '239 C',
          html_color: '#DB3EB1'
        },
        {
          value: '232 C',
          html_color: '#E93CAC'
        },
        {
          value: '233 C',
          html_color: '#C6007E'
        },
        {
          value: '234 C',
          html_color: '#A20067'
        },
        {
          value: '235 C',
          html_color: '#840B55'
        },
        {
          value: '236 C',
          html_color: '#F1A7DC'
        },
        {
          value: '237 C',
          html_color: '#EC86D0'
        },
        {
          value: '238 C',
          html_color: '#E45DBF'
        },
        {
          value: '241 C',
          html_color: '#AF1685'
        },
        {
          value: '240 C',
          html_color: '#C5299B'
        },
        {
          value: '2385 C',
          html_color: '#D539B5'
        },
        {
          value: '2395 C',
          html_color: '#C800A1'
        },
        {
          value: '2405 C',
          html_color: '#B0008E'
        },
        {
          value: '242 C',
          html_color: '#80225F'
        },
        {
          value: '2365 C',
          html_color: '#EFBAE1'
        },
        {
          value: '2375 C',
          html_color: '#E277CD'
        },
        {
          value: '2415 C',
          html_color: '#9E007E'
        },
        {
          value: '246 C',
          html_color: '#C724B1'
        },
        {
          value: '247 C',
          html_color: '#BB16A3'
        },
        {
          value: '248 C',
          html_color: '#A51890'
        },
        {
          value: '2425 C',
          html_color: '#830065'
        },
        {
          value: '243 C',
          html_color: '#EAB8E4'
        },
        {
          value: '244 C',
          html_color: '#E59BDC'
        },
        {
          value: '245 C',
          html_color: '#DD7FD3'
        },
        {
          value: '249 C',
          html_color: '#80286C'
        },
        {
          value: '250 C',
          html_color: '#E7BAE4'
        },
        {
          value: '251 C',
          html_color: '#DD9CDF'
        },
        {
          value: '252 C',
          html_color: '#C964CF'
        },
        {
          value: '253 C',
          html_color: '#AD1AAC'
        },
        {
          value: '254 C',
          html_color: '#981E97'
        },
        {
          value: '255 C',
          html_color: '#72246C'
        },
        {
          value: '256 C',
          html_color: '#D6BFDD'
        },
        {
          value: '257 C',
          html_color: '#C6A1CF'
        },
        {
          value: '258 C',
          html_color: '#8C4799'
        },
        {
          value: '259 C',
          html_color: '#6D2077'
        },
        {
          value: '260 C',
          html_color: '#642667'
        },
        {
          value: '261 C',
          html_color: '#5D295F'
        },
        {
          value: '262 C',
          html_color: '#51284F'
        },
        {
          value: '2562 C',
          html_color: '#D7A9E3'
        },
        {
          value: '2572 C',
          html_color: '#C98BDB'
        },
        {
          value: '2582 C',
          html_color: '#AC4FC6'
        },
        {
          value: '2592 C',
          html_color: '#9B26B6'
        },
        {
          value: '2602 C',
          html_color: '#87189D'
        },
        {
          value: '2612 C',
          html_color: '#772583'
        },
        {
          value: '2563 C',
          html_color: '#CBA3D8'
        },
        {
          value: '2573 C',
          html_color: '#B884CB'
        },
        {
          value: '2583 C',
          html_color: '#A05EB5'
        },
        {
          value: '2622 C',
          html_color: '#653165'
        },
        {
          value: '2603 C',
          html_color: '#702082'
        },
        {
          value: '2613 C',
          html_color: '#671E75'
        },
        {
          value: '2623 C',
          html_color: '#5F2167'
        },
        {
          value: '2597 C',
          html_color: '#5C068C'
        },
        {
          value: '2567 C',
          html_color: '#C1A0DA'
        },
        {
          value: '2577 C',
          html_color: '#A77BCA'
        },
        {
          value: '2587 C',
          html_color: '#8246AF'
        },
        {
          value: '2593 C',
          html_color: '#84329B'
        },
        {
          value: '267 C',
          html_color: '#5F249F'
        },
        {
          value: '263 C',
          html_color: '#D7C6E6'
        },
        {
          value: '264 C',
          html_color: '#C1A7E2'
        },
        {
          value: '2607 C',
          html_color: '#500878'
        },
        {
          value: '2617 C',
          html_color: '#470A68'
        },
        {
          value: '2627 C',
          html_color: '#3C1053'
        },
        {
          value: '265 C',
          html_color: '#9063CD'
        },
        {
          value: '266 C',
          html_color: '#753BBD'
        },
        {
          value: '268 C',
          html_color: '#582C83'
        },
        {
          value: '269 C',
          html_color: '#512D6D'
        },
        {
          value: '2685 C',
          html_color: '#330072'
        },
        {
          value: '2645 C',
          html_color: '#AD96DC'
        },
        {
          value: '2655 C',
          html_color: '#9678D3'
        },
        {
          value: '2665 C',
          html_color: '#7D55C7'
        },
        {
          value: '2635 C',
          html_color: '#C5B4E3'
        },
        {
          value: '2695 C',
          html_color: '#2E1A47'
        },
        {
          value: '270 C',
          html_color: '#B4B5DF'
        },
        {
          value: '271 C',
          html_color: '#9595D2'
        },
        {
          value: '273 C',
          html_color: '#24125F'
        },
        {
          value: '274 C',
          html_color: '#221551'
        },
        {
          value: '275 C',
          html_color: '#211747'
        },
        {
          value: '276 C',
          html_color: '#221C35'
        },
        {
          value: '272 C',
          html_color: '#7474C1'
        },
        {
          value: '2705 C',
          html_color: '#A7A4E0'
        },
        {
          value: '2715 C',
          html_color: '#8B84D7'
        },
        {
          value: '2716 C',
          html_color: '#9FAEE5'
        },
        {
          value: '2726 C',
          html_color: '#485CC7'
        },
        {
          value: '2735 C',
          html_color: '#2E008B'
        },
        {
          value: '2745 C',
          html_color: '#280071'
        },
        {
          value: '2755 C',
          html_color: '#250E62'
        },
        {
          value: '2765 C',
          html_color: '#201547'
        },
        {
          value: '2706 C',
          html_color: '#CBD3EA'
        },
        {
          value: '2725 C',
          html_color: '#685BC7'
        },
        {
          value: '2736 C',
          html_color: '#1E22AA'
        },
        {
          value: '2756 C',
          html_color: '#151F6D'
        },
        {
          value: '2766 C',
          html_color: '#141B4D'
        },
        {
          value: '2707 C',
          html_color: '#C3D7EE'
        },
        {
          value: '2717 C',
          html_color: '#A7C6ED'
        },
        {
          value: '2727 C',
          html_color: '#307FE2'
        },
        {
          value: '2746 C',
          html_color: '#171C8F'
        },
        {
          value: '2747 C ',
          'html_color ': '#001A72'
        },
        {
          value: '2748 C',
          html_color: '# 001871 '
        },
        {
          value: '2757 C',
          html_color: '#001E60'
        },
        {
          value: '2767 C',
          html_color: '#13294B'
        },
        {
          value: '2708 C',
          html_color: '#B8CCEA'
        },
        {
          value: '2718 C',
          html_color: '#5C88DA'
        },
        {
          value: '2728 C',
          html_color: '#0047BB'
        },
        {
          value: '2738 C',
          html_color: '#06038D'
        },
        {
          value: '2758 C',
          html_color: '#001E62'
        },
        {
          value: '2768 C',
          html_color: '#071D49'
        },
        {
          value: '280 C',
          html_color: '#012169'
        },
        {
          value: '281 C',
          html_color: '#00205B'
        },
        {
          value: '282 C',
          html_color: '#041E42'
        },
        {
          value: '277 C',
          html_color: '#ABCAE9'
        },
        {
          value: '278 C',
          html_color: '#8BB8E8'
        },
        {
          value: '279 C',
          html_color: '#418FDE'
        },
        {
          value: '283 C',
          html_color: '#92C1E9'
        },
        {
          value: '284 C',
          html_color: '#6CACE4'
        },
        {
          value: '285 C',
          html_color: '#0072CE'
        },
        {
          value: '286 C',
          html_color: '#0032A0'
        },
        {
          value: '287 C',
          html_color: '#003087'
        },
        {
          value: '288 C',
          html_color: '#002D72'
        },
        {
          value: '289 C',
          html_color: '#0C2340'
        },
        {
          value: '290 C',
          html_color: '#B9D9EB'
        },
        {
          value: '291 C',
          html_color: '#9BCBEB'
        },
        {
          value: '292 C',
          html_color: '#69B3E7'
        },
        {
          value: '293 C',
          html_color: '#003DA5'
        },
        {
          value: '294 C',
          html_color: '#002F6C'
        },
        {
          value: '295 C',
          html_color: '#002855'
        },
        {
          value: '296 C',
          html_color: '#051C2C'
        },
        {
          value: '2905 C',
          html_color: '#8DC8E8'
        },
        {
          value: '2915 C',
          html_color: '#62B5E5'
        },
        {
          value: '2925 C',
          html_color: '#009CDE'
        },
        {
          value: '297 C',
          html_color: '#71C5E8'
        },
        {
          value: '298 C',
          html_color: '#41B6E6'
        },
        {
          value: '299 C',
          html_color: '#00A3E0'
        },
        {
          value: '2935 C',
          html_color: '#0057B7'
        },
        {
          value: '2945 C',
          html_color: '#004C97'
        },
        {
          value: '2955 C',
          html_color: '#003865'
        },
        {
          value: '2965 C',
          html_color: '#00263E'
        },
        {
          value: '300 C',
          html_color: '#005EB8'
        },
        {
          value: '302 C',
          html_color: '#003B5C'
        },
        {
          value: '301 C',
          html_color: '#004B87'
        },
        {
          value: '303 C',
          html_color: '#002A3A'
        },
        {
          value: '2975 C',
          html_color: '#99D6EA'
        },
        {
          value: '2985 C',
          html_color: '#5BC2E7'
        },
        {
          value: '2995 C',
          html_color: '#00A9E0'
        },
        {
          value: '3005 C',
          html_color: '#0077C8'
        },
        {
          value: '3015 C',
          html_color: '#00629B'
        },
        {
          value: '305 C',
          html_color: '#59CBE8'
        },
        {
          value: '308 C',
          html_color: '#00587C'
        },
        {
          value: '3035 C',
          html_color: '#003E51'
        },
        {
          value: '3025 C',
          html_color: '#004F71'
        },
        {
          value: '304 C',
          html_color: '#9ADBE8'
        },
        {
          value: '306 C',
          html_color: '#00B5E2'
        },
        {
          value: '307 C',
          html_color: '#006BA6'
        },
        {
          value: '309 C',
          html_color: '#003B49'
        },
        {
          value: '310 C',
          html_color: '#6AD1E3'
        },
        {
          value: '311 C',
          html_color: '#05C3DD'
        },
        {
          value: '312 C',
          html_color: '#00A9CE'
        },
        {
          value: '313 C',
          html_color: '#0092BC'
        },
        {
          value: '314 C',
          html_color: '#007FA3'
        },
        {
          value: '315 C',
          html_color: '#00677F'
        },
        {
          value: '316 C',
          html_color: '#004851'
        },
        {
          value: '3105 C',
          html_color: '#67D2DF'
        },
        {
          value: '3115 C',
          html_color: '#00C1D4'
        },
        {
          value: '3125 C',
          html_color: '#00AEC7'
        },
        {
          value: '3135 C',
          html_color: '#008EAA'
        },
        {
          value: '3145 C',
          html_color: '#00778B'
        },
        {
          value: '3155 C',
          html_color: '#006271'
        },
        {
          value: '3165 C',
          html_color: '#004F59'
        },
        {
          value: '317 C',
          html_color: '#B1E4E3'
        },
        {
          value: '318 C',
          html_color: '#88DBDF'
        },
        {
          value: '320 C',
          html_color: '#009CA6'
        },
        {
          value: '321 C',
          html_color: '#008C95'
        },
        {
          value: '322 C',
          html_color: '#007377'
        },
        {
          value: '323 C',
          html_color: '#005F61'
        },
        {
          value: '319 C',
          html_color: '#2CCCD3'
        },
        {
          value: '324 C',
          html_color: '#9CDBD9'
        },
        {
          value: '325 C',
          html_color: '#64CCC9'
        },
        {
          value: '326 C',
          html_color: '#00B2A9'
        },
        {
          value: '327 C',
          html_color: '#008675'
        },
        {
          value: '328 C',
          html_color: '#007367'
        },
        {
          value: '329 C',
          html_color: '#00685E'
        },
        {
          value: '330 C',
          html_color: '#00534C'
        },
        {
          value: '3242 C',
          html_color: '#71DBD4'
        },
        {
          value: '3252 C',
          html_color: '#2AD2C9'
        },
        {
          value: '3262 C',
          html_color: '#00BFB2'
        },
        {
          value: '3272 C',
          html_color: '#00A499'
        },
        {
          value: '3282 C',
          html_color: '#008578'
        },
        {
          value: '3292 C',
          html_color: '#00594F'
        },
        {
          value: '3302 C',
          html_color: '#004C45'
        },
        {
          value: '3245 C',
          html_color: '#7CE0D3'
        },
        {
          value: '3255 C',
          html_color: '#2CD5C4'
        },
        {
          value: '3265 C',
          html_color: '#00C7B1'
        },
        {
          value: '3275 C',
          html_color: '#00B398'
        },
        {
          value: '3285 C',
          html_color: '#009681'
        },
        {
          value: '3295 C',
          html_color: '#007864'
        },
        {
          value: '3305 C',
          html_color: '#004E42'
        },
        {
          value: '3248 C',
          html_color: '#6DCDB8'
        },
        {
          value: '3258 C',
          html_color: '#49C5B1'
        },
        {
          value: '3268 C',
          html_color: '#00AB8E'
        },
        {
          value: '3278 C',
          html_color: '#009B77'
        },
        {
          value: '3288 C',
          html_color: '#008264'
        },
        {
          value: '3298 C',
          html_color: '#006A52'
        },
        {
          value: '334 C',
          html_color: '#009775'
        },
        {
          value: '331 C',
          html_color: '#A7E6D7'
        },
        {
          value: '332 C',
          html_color: '#8CE2D0'
        },
        {
          value: '333 C',
          html_color: '#3CDBC0'
        },
        {
          value: '335 C',
          html_color: '#007B5F'
        },
        {
          value: '336 C',
          html_color: '#00664F'
        },
        {
          value: '337 C',
          html_color: '#8FD6BD'
        },
        {
          value: '3308 C',
          html_color: '#024638'
        },
        {
          value: '341 C',
          html_color: '#007A53'
        },
        {
          value: '339 C',
          html_color: '#00B388'
        },
        {
          value: '340 C',
          html_color: '#00965E'
        },
        {
          value: '338 C',
          html_color: '#6ECEB2'
        },
        {
          value: '342 C',
          html_color: '#006747'
        },
        {
          value: '343 C',
          html_color: '#115740'
        },
        {
          value: '3375 C',
          html_color: '#7AE1BF'
        },
        {
          value: '3385 C',
          html_color: '#47D7AC'
        },
        {
          value: '3425 C',
          html_color: '#006341'
        },
        {
          value: '3405 C',
          html_color: '#00AF66'
        },
        {
          value: '3415 C',
          html_color: '#007749'
        },
        {
          value: '3395 C',
          html_color: '#00C389'
        },
        {
          value: '3435 C',
          html_color: '#154734'
        },
        {
          value: '344 C',
          html_color: '#A0DAB3'
        },
        {
          value: '345 C',
          html_color: '#91D6AC'
        },
        {
          value: '346 C',
          html_color: '#71CC98'
        },
        {
          value: '348 C',
          html_color: '#00843D'
        },
        {
          value: '349 C',
          html_color: '#046A38'
        },
        {
          value: '350 C',
          html_color: '#2C5234'
        },
        {
          value: '347 C',
          html_color: '#009A44'
        },
        {
          value: '351 C',
          html_color: '#A2E4B8'
        },
        {
          value: '352 C',
          html_color: '#8FE2B0'
        },
        {
          value: '353 C',
          html_color: '#80E0A7'
        },
        {
          value: '354 C',
          html_color: '#00B140'
        },
        {
          value: '358 C',
          html_color: '#ADDC91'
        },
        {
          value: '355 C',
          html_color: '#009739'
        },
        {
          value: '356 C',
          html_color: '#007A33'
        },
        {
          value: '357 C',
          html_color: '#215732'
        },
        {
          value: '359 C',
          html_color: '#A1D884'
        },
        {
          value: '360 C',
          html_color: '#6CC24A'
        },
        {
          value: '361 C',
          html_color: '#43B02A'
        },
        {
          value: '362 C',
          html_color: '#509E2F'
        },
        {
          value: '370 C',
          html_color: '#658D1B'
        },
        {
          value: '364 C',
          html_color: '#4A7729'
        },
        {
          value: '365 C',
          html_color: '#C2E189'
        },
        {
          value: '366 C',
          html_color: '#B7DD79'
        },
        {
          value: '367 C',
          html_color: '#A4D65E'
        },
        {
          value: '368 C',
          html_color: '#78BE21'
        },
        {
          value: '369 C',
          html_color: '#64A70B'
        },
        {
          value: '363 C',
          html_color: '#4C8D2B'
        },
        {
          value: '371 C',
          html_color: '#546223'
        },
        {
          value: '378 C',
          html_color: '#59621D'
        },
        {
          value: '373 C',
          html_color: '#CDEA80'
        },
        {
          value: '374 C',
          html_color: '#C5E86C'
        },
        {
          value: '375 C',
          html_color: '#97D700'
        },
        {
          value: '376 C',
          html_color: '#84BD00'
        },
        {
          value: '377 C',
          html_color: '#7A9A01'
        },
        {
          value: '372 C',
          html_color: '#D4EC8E'
        },
        {
          value: '379 C',
          html_color: '#E2E868'
        },
        {
          value: '386 C',
          html_color: '#E9EC6B'
        },
        {
          value: '382 C',
          html_color: '#C4D600'
        },
        {
          value: '381 C',
          html_color: '#CEDC00'
        },
        {
          value: '380 C',
          html_color: '#DBE442'
        },
        {
          value: '383 C',
          html_color: '#A8AD00'
        },
        {
          value: '384 C',
          html_color: '#949300'
        },
        {
          value: '385 C',
          html_color: '#787121'
        },
        {
          value: '387 C',
          html_color: '#E3E935'
        },
        {
          value: '388 C',
          html_color: '#E0E722'
        },
        {
          value: '389 C',
          html_color: '#D0DF00'
        },
        {
          value: '394 C',
          html_color: '#EDE939'
        },
        {
          value: '395 C',
          html_color: '#ECE81A'
        },
        {
          value: '390 C',
          html_color: '#B5BD00'
        },
        {
          value: '391 C',
          html_color: '#9A9500'
        },
        {
          value: '392 C',
          html_color: '#827A04'
        },
        {
          value: '393 C',
          html_color: '#F0EC74'
        },
        {
          value: '396 C',
          html_color: '#E1E000'
        },
        {
          value: '397 C',
          html_color: '#BFB800'
        },
        {
          value: '3945 C',
          html_color: '#F3E600'
        },
        {
          value: '3935 C',
          html_color: '#F3EA5D'
        },
        {
          value: '3955 C',
          html_color: '#EFDF00'
        },
        {
          value: '3965 C',
          html_color: '#EEDC00'
        },
        {
          value: '398 C',
          html_color: '#ADA400'
        },
        {
          value: '399 C',
          html_color: '#A09200'
        },
        {
          value: '3975 C',
          html_color: '#BBA600'
        },
        {
          value: '404 C',
          html_color: '#776E64'
        },
        {
          value: '400 C',
          html_color: '#C4BFB6'
        },
        {
          value: '3985 C',
          html_color: '#9A8700'
        },
        {
          value: '3995 C',
          html_color: '#685C20'
        },
        {
          value: '401 C',
          html_color: '#AFA9A0'
        },
        {
          value: '402 C',
          html_color: '#9D968D'
        },
        {
          value: '403 C',
          html_color: '#8C857B'
        },
        {
          value: '405 C',
          html_color: '#696158'
        },
        {
          value: '406 C',
          html_color: '#C4BCB7'
        },
        {
          value: '407 C',
          html_color: '#B2A8A2'
        },
        {
          value: '412 C',
          html_color: '#382F2D'
        },
        {
          value: '408 C',
          html_color: '#978C87'
        },
        {
          value: '409 C',
          html_color: '#857874'
        },
        {
          value: '410 C',
          html_color: '#746661'
        },
        {
          value: '411 C',
          html_color: '#5E514D'
        },
        {
          value: '413 C',
          html_color: '#BABBB1'
        },
        {
          value: '414 C',
          html_color: '#A8A99E'
        },
        {
          value: '415 C',
          html_color: '#919388'
        },
        {
          value: '418 C',
          html_color: '#51534A'
        },
        {
          value: '420 C',
          html_color: '#C7C9C7'
        },
        {
          value: '416 C',
          html_color: '#7E7F74'
        },
        {
          value: '421 C',
          html_color: '#B2B4B2'
        },
        {
          value: '417 C',
          html_color: '#65665C'
        },
        {
          value: '419 C',
          html_color: '#212322'
        },
        {
          value: '422 C',
          html_color: '#9EA2A2'
        },
        {
          value: '425 C',
          html_color: '#545859'
        },
        {
          value: '427 C',
          html_color: '#D0D3D4'
        },
        {
          value: '423 C',
          html_color: '#898D8D'
        },
        {
          value: '428 C',
          html_color: '#C1C6C8'
        },
        {
          value: '424 C',
          html_color: '#707372'
        },
        {
          value: '429 C',
          html_color: '#A2AAAD'
        },
        {
          value: '426 C',
          html_color: '#25282A'
        },
        {
          value: '430 C',
          html_color: '#7C878E'
        },
        {
          value: '432 C',
          html_color: '#333F48'
        },
        {
          value: '433 C',
          html_color: '#1D252D'
        },
        {
          value: '434 C',
          html_color: '#D0C4C5'
        },
        {
          value: '435 C',
          html_color: '#C1B2B6'
        },
        {
          value: '436 C',
          html_color: '#AB989D'
        },
        {
          value: '431 C',
          html_color: '#5B6770'
        },
        {
          value: '437 C',
          html_color: '#7B6469'
        },
        {
          value: '438 C',
          html_color: '#584446'
        },
        {
          value: '446 C',
          html_color: '#3F4443'
        },
        {
          value: '442 C',
          html_color: '#A2ACAB'
        },
        {
          value: '444 C',
          html_color: '#717C7D'
        },
        {
          value: '439 C',
          html_color: '#453536'
        },
        {
          value: '440 C',
          html_color: '#382E2C'
        },
        {
          value: '441 C',
          html_color: '#BEC6C4'
        },
        {
          value: '443 C',
          html_color: '#919D9D'
        },
        {
          value: '445 C',
          html_color: '#505759'
        },
        {
          value: '447 C',
          html_color: '#373A36'
        },
        {
          value: '448 C ',
          'html_color ': '#4A412A'
        },
        {
          value: '449 C',
          html_color: '# 524627 '
        },
        {
          value: '450 C ',
          'html_color ': '#594A25'
        },
        {
          value: '451 C',
          html_color: '# 9 B945F '
        },
        {
          value: '452 C ',
          'html_color ': '#B0AA7E '
        },
        {
          value: '4505 C',
          html_color: '#998542'
        },
        {
          value: '4515 C',
          html_color: '#B3A369'
        },
        {
          value: '453 C',
          html_color: '#BFBB98'
        },
        {
          value: '454 C',
          html_color: '#CAC7A7'
        },
        {
          value: '4485 C',
          html_color: '#614F25'
        },
        {
          value: '4495 C',
          html_color: '#8C7732'
        },
        {
          value: '4525 C',
          html_color: '#C5B783'
        },
        {
          value: '4535 C',
          html_color: '#CFC493'
        },
        {
          value: '457 C',
          html_color: '#B89D18'
        },
        {
          value: '456 C',
          html_color: '#A28E2A'
        },
        {
          value: '458 C',
          html_color: '#D9C756'
        },
        {
          value: '459 C',
          html_color: '#DECD63'
        },
        {
          value: '4545 C',
          html_color: '#D5CB9F'
        },
        {
          value: '455 C',
          html_color: '#695B24'
        },
        {
          value: '460 C',
          html_color: '#E4D77E'
        },
        {
          value: '461 C',
          html_color: '#E9DF97'
        },
        {
          value: '4625 C',
          html_color: '#4F2C1D'
        },
        {
          value: '465 C',
          html_color: '#B9975B'
        },
        {
          value: '468 C',
          html_color: '#DDCBA4'
        },
        {
          value: '463 C',
          html_color: '#744F28'
        },
        {
          value: '462 C',
          html_color: '#5C462B'
        },
        {
          value: '464 C',
          html_color: '#8B5B29'
        },
        {
          value: '466 C',
          html_color: '#C6AA76'
        },
        {
          value: '467 C',
          html_color: '#D3BC8D'
        },
        {
          value: '4635 C',
          html_color: '#946037'
        },
        {
          value: '4645 C',
          html_color: '#AD7C59'
        },
        {
          value: '469 C',
          html_color: '#693F23'
        },
        {
          value: '470 C',
          html_color: '#A45A2A'
        },
        {
          value: '4655 C',
          html_color: '#BF9474'
        },
        {
          value: '4665 C',
          html_color: '#CDA788'
        },
        {
          value: '4675 C',
          html_color: '#DCBFA6'
        },
        {
          value: '4685 C',
          html_color: '#E0C6AD'
        },
        {
          value: '471 C',
          html_color: '#B86125'
        },
        {
          value: '473 C',
          html_color: '#F0BF9B'
        },
        {
          value: '474 C',
          html_color: '#F1C6A6'
        },
        {
          value: '475 C',
          html_color: '#F3CFB3'
        },
        {
          value: '4695 C',
          html_color: '#5B3427'
        },
        {
          value: '4705 C',
          html_color: '#7C4D3A'
        },
        {
          value: '4715 C',
          html_color: '#956C58'
        },
        {
          value: '472 C',
          html_color: '#E59E6D'
        },
        {
          value: '4725 C',
          html_color: '#AE8A79'
        },
        {
          value: '4745 C',
          html_color: '#CDB5A7'
        },
        {
          value: '4755 C',
          html_color: '#D7C4B7'
        },
        {
          value: '476 C',
          html_color: '#4E3629'
        },
        {
          value: '477 C',
          html_color: '#623B2A'
        },
        {
          value: '478 C',
          html_color: '#713F2A'
        },
        {
          value: '479 C',
          html_color: '#AA8066'
        },
        {
          value: '4735 C',
          html_color: '#C0A392'
        },
        {
          value: '480 C',
          html_color: '#C6A992'
        },
        {
          value: '482 C',
          html_color: '#DBC8B6'
        },
        {
          value: '483 C',
          html_color: '#653024'
        },
        {
          value: '484 C',
          html_color: '#9A3324'
        },
        {
          value: '485 C',
          html_color: '#DA291C'
        },
        {
          value: '486 C',
          html_color: '#E8927C'
        },
        {
          value: '487 C',
          html_color: '#EAA794'
        },
        {
          value: '481 C',
          html_color: '#D3BBA8'
        },
        {
          value: '488 C',
          html_color: '#ECBAA8'
        },
        {
          value: '490 C',
          html_color: '#5D2A2C'
        },
        {
          value: '491 C',
          html_color: '#7F3035'
        },
        {
          value: '492 C',
          html_color: '#8F3237'
        },
        {
          value: '493 C',
          html_color: '#DC8699'
        },
        {
          value: '494 C',
          html_color: '#E9A2B2'
        },
        {
          value: '495 C',
          html_color: '#F1BDC8'
        },
        {
          value: '489 C',
          html_color: '#ECC3B2'
        },
        {
          value: '496 C',
          html_color: '#F2C6CF'
        },
        {
          value: '4975 C',
          html_color: '#3F2021'
        },
        {
          value: '497 C',
          html_color: '#512F2E'
        },
        {
          value: '498 C',
          html_color: '#6A3735'
        },
        {
          value: '499 C',
          html_color: '#7A3E3A'
        },
        {
          value: '500 C',
          html_color: '#C6858F'
        },
        {
          value: '501 C',
          html_color: '#DAA5AD'
        },
        {
          value: '502 C',
          html_color: '#E5BAC1'
        },
        {
          value: '503 C',
          html_color: '#E9C5C7'
        },
        {
          value: '4985 C',
          html_color: '#874B52'
        },
        {
          value: '4995 C',
          html_color: '#9C6169'
        },
        {
          value: '5005 C',
          html_color: '#B07C83'
        },
        {
          value: '5015 C',
          html_color: '#CCA1A6'
        },
        {
          value: '5025 C',
          html_color: '#DBB7BB'
        },
        {
          value: '5035 C',
          html_color: '#DFC2C3'
        },
        {
          value: '504 C',
          html_color: '#572932'
        },
        {
          value: '505 C',
          html_color: '#6F2C3F'
        },
        {
          value: '510 C',
          html_color: '#EBBECB'
        },
        {
          value: '506 C',
          html_color: '#84344E'
        },
        {
          value: '507 C',
          html_color: '#D592AA'
        },
        {
          value: '508 C',
          html_color: '#E4A9BB'
        },
        {
          value: '509 C',
          html_color: '#E8B3C3'
        },
        {
          value: '511 C',
          html_color: '#612C51'
        },
        {
          value: '512 C',
          html_color: '#833177'
        },
        {
          value: '513 C',
          html_color: '#93328E'
        },
        {
          value: '514 C',
          html_color: '#D48BC8'
        },
        {
          value: '517 C',
          html_color: '#EBC6DF'
        },
        {
          value: '516 C',
          html_color: '#E6BEDD'
        },
        {
          value: '5115 C',
          html_color: '#512A44'
        },
        {
          value: '5125 C',
          html_color: '#693C5E'
        },
        {
          value: '5135 C',
          html_color: '#7E5475'
        },
        {
          value: '5145 C',
          html_color: '#9B7793'
        },
        {
          value: '515 C',
          html_color: '#E2ACD7'
        },
        {
          value: '5155 C',
          html_color: '#BFA5B8'
        },
        {
          value: '5165 C',
          html_color: '#D3C0CD'
        },
        {
          value: '522 C',
          html_color: '#BA9CC5'
        },
        {
          value: '5175 C',
          html_color: '#D8C8D1'
        },
        {
          value: '518 C',
          html_color: '#4B3048'
        },
        {
          value: '519 C',
          html_color: '#59315F'
        },
        {
          value: '520 C',
          html_color: '#642F6C'
        },
        {
          value: '521 C',
          html_color: '#A57FB2'
        },
        {
          value: '524 C',
          html_color: '#D5C2D8'
        },
        {
          value: '523 C',
          html_color: '#C9B1D0'
        },
        {
          value: '5185 C',
          html_color: '#4A3041'
        },
        {
          value: '5195 C',
          html_color: '#66435A'
        },
        {
          value: '5205 C',
          html_color: '#86647A'
        },
        {
          value: '5215 C',
          html_color: '#AF95A6'
        },
        {
          value: '5225 C',
          html_color: '#C6B0BC'
        },
        {
          value: '5235 C',
          html_color: '#D0BEC7'
        },
        {
          value: '5245 C',
          html_color: '#DBCDD3'
        },
        {
          value: '526 C',
          html_color: '#702F8A'
        },
        {
          value: '527 C',
          html_color: '#8031A7'
        },
        {
          value: '528 C',
          html_color: '#B580D1'
        },
        {
          value: '525 C',
          html_color: '#572C5F'
        },
        {
          value: '529 C',
          html_color: '#CAA2DD'
        },
        {
          value: '530 C',
          html_color: '#D7B9E4'
        },
        {
          value: '531 C',
          html_color: '#DFC8E7'
        },
        {
          value: '5255 C',
          html_color: '#1E1A34'
        },
        {
          value: '5265 C',
          html_color: '#403A60'
        },
        {
          value: '5315 C',
          html_color: '#D8D7DF'
        },
        {
          value: '5275 C',
          html_color: '#595478'
        },
        {
          value: '5285 C',
          html_color: '#8D89A5'
        },
        {
          value: '5295 C',
          html_color: '#B3B0C4'
        },
        {
          value: '5305 C',
          html_color: '#C6C4D2'
        },
        {
          value: '532 C',
          html_color: '#1D1F2A'
        },
        {
          value: '533 C',
          html_color: '#202A44'
        },
        {
          value: '534 C',
          html_color: '#1B365D'
        },
        {
          value: '536 C',
          html_color: '#A2B2C8'
        },
        {
          value: '537 C',
          html_color: '#BBC7D6'
        },
        {
          value: '538 C',
          html_color: '#C5CFDA'
        },
        {
          value: '539 C',
          html_color: '#00263A'
        },
        {
          value: '535 C',
          html_color: '#8E9FBC'
        },
        {
          value: '540 C',
          html_color: '#003057'
        },
        {
          value: '541 C',
          html_color: '#003C71'
        },
        {
          value: '542 C',
          html_color: '#7BAFD4'
        },
        {
          value: '543 C',
          html_color: '#A4C8E1'
        },
        {
          value: '5425 C',
          html_color: '#7A99AC'
        },
        {
          value: '544 C',
          html_color: '#BDD6E6'
        },
        {
          value: '545 C',
          html_color: '#C6DAE7'
        },
        {
          value: '5395 C',
          html_color: '#091F2C'
        },
        {
          value: '5405 C',
          html_color: '#4F758B'
        },
        {
          value: '5415 C',
          html_color: '#5B7F95'
        },
        {
          value: '5435 C',
          html_color: '#A6BBC8'
        },
        {
          value: '551 C',
          html_color: '#A3C7D2'
        },
        {
          value: '5445 C',
          html_color: '#B7C9D3'
        },
        {
          value: '548 C',
          html_color: '#003D4C'
        },
        {
          value: '549 C',
          html_color: '#6BA4B8'
        },
        {
          value: '5455 C',
          html_color: '#BFCED6'
        },
        {
          value: '546 C',
          html_color: '#072B31'
        },
        {
          value: '547 C',
          html_color: '#00313C'
        },
        {
          value: '550 C',
          html_color: '#8DB9CA'
        },
        {
          value: '5463 C',
          html_color: '#07272D'
        },
        {
          value: '5493 C',
          html_color: '#7FA9AE'
        },
        {
          value: '5503 C',
          html_color: '#94B7BB'
        },
        {
          value: '5513 C',
          html_color: '#ABC7C9'
        },
        {
          value: '5473 C',
          html_color: '#115E67'
        },
        {
          value: '5483 C',
          html_color: '#4F868E'
        },
        {
          value: '5523 C',
          html_color: '#B6CFD0'
        },
        {
          value: '552 C',
          html_color: '#B9D3DC'
        },
        {
          value: '553 C',
          html_color: '#284734'
        },
        {
          value: '5477 C',
          html_color: '#3E5D58'
        },
        {
          value: '5487 C',
          html_color: '#5E7975'
        },
        {
          value: '5507 C',
          html_color: '#9DB0AC'
        },
        {
          value: '5517 C',
          html_color: '#B1C0BC'
        },
        {
          value: '5527 C',
          html_color: '#BCC9C5'
        },
        {
          value: '5467 C',
          html_color: '#18332F'
        },
        {
          value: '5497 C',
          html_color: '#829995'
        },
        {
          value: '554 C',
          html_color: '#205C40'
        },
        {
          value: '5545 C',
          html_color: '#43695B'
        },
        {
          value: '557 C',
          html_color: '#85B09A'
        },
        {
          value: '558 C',
          html_color: '#9ABEAA'
        },
        {
          value: '559 C',
          html_color: '#ADCAB8'
        },
        {
          value: '5535 C',
          html_color: '#183029'
        },
        {
          value: '555 C',
          html_color: '#28724F'
        },
        {
          value: '556 C',
          html_color: '#6FA287'
        },
        {
          value: '5555 C',
          html_color: '#5C7F71'
        },
        {
          value: '5565 C',
          html_color: '#7F9C90'
        },
        {
          value: '5575 C',
          html_color: '#92ACA0'
        },
        {
          value: '5585 C',
          html_color: '#A7BDB1'
        },
        {
          value: '5595 C',
          html_color: '#BFCEC2'
        },
        {
          value: '560 C',
          html_color: '#1D3C34'
        },
        {
          value: '561 C',
          html_color: '#00594C'
        },
        {
          value: '562 C',
          html_color: '#006F62'
        },
        {
          value: '563 C',
          html_color: '#6BBBAE'
        },
        {
          value: '5625 C',
          html_color: '#708573'
        },
        {
          value: '565 C',
          html_color: '#A1D6CA'
        },
        {
          value: '5615 C',
          html_color: '#5E7461'
        },
        {
          value: '5635 C',
          html_color: '#94A596'
        },
        {
          value: '564 C',
          html_color: '#86C8BC'
        },
        {
          value: '566 C',
          html_color: '#B9DCD2'
        },
        {
          value: '5605 C',
          html_color: '#22372B'
        },
        {
          value: '5645 C',
          html_color: '#A3B2A4'
        },
        {
          value: '5655 C',
          html_color: '#B0BDB0'
        },
        {
          value: '5665 C',
          html_color: '#BAC5B9'
        },
        {
          value: '567 C',
          html_color: '#173F35'
        },
        {
          value: '568 C',
          html_color: '#006C5B'
        },
        {
          value: '570 C',
          html_color: '#6BCABA'
        },
        {
          value: '571 C',
          html_color: '#98DBCE'
        },
        {
          value: '569 C',
          html_color: '#00816D'
        },
        {
          value: '572 C',
          html_color: '#A5DFD3'
        },
        {
          value: '573 C',
          html_color: '#B5E3D8'
        },
        {
          value: '574 C',
          html_color: '#4E5B31'
        },
        {
          value: '575 C',
          html_color: '#67823A'
        },
        {
          value: '576 C',
          html_color: '#789D4A'
        },
        {
          value: '579 C',
          html_color: '#BCD19B'
        },
        {
          value: '577 C',
          html_color: '#A9C47F'
        },
        {
          value: '578 C',
          html_color: '#B7CE95'
        },
        {
          value: '580 C',
          html_color: '#C4D6A4'
        },
        {
          value: '5743 C',
          html_color: '#3E4827'
        },
        {
          value: '5753 C',
          html_color: '#5E6738'
        },
        {
          value: '5747 C',
          html_color: '#3D441E'
        },
        {
          value: '5763 C',
          html_color: '#737B4C'
        },
        {
          value: '5773 C',
          html_color: '#899064'
        },
        {
          value: '5783 C',
          html_color: '#A3AA83'
        },
        {
          value: '5793 C',
          html_color: '#B3B995'
        },
        {
          value: '5803 C',
          html_color: '#C3C6A8'
        },
        {
          value: '5757 C',
          html_color: '#6D712E'
        },
        {
          value: '5767 C',
          html_color: '#8A8D4A'
        },
        {
          value: '5777 C',
          html_color: '#A2A568'
        },
        {
          value: '5787 C',
          html_color: '#BABD8B'
        },
        {
          value: '5797 C',
          html_color: '#C6C89B'
        },
        {
          value: '5807 C',
          html_color: '#D0D1AB'
        },
        {
          value: '581 C',
          html_color: '#625D20'
        },
        {
          value: '582 C',
          html_color: '#8E8C13'
        },
        {
          value: '583 C',
          html_color: '#B7BF10'
        },
        {
          value: '584 C',
          html_color: '#D2D755'
        },
        {
          value: '585 C',
          html_color: '#DBDE70'
        },
        {
          value: '5825 C',
          html_color: '#89813D'
        },
        {
          value: '5835 C',
          html_color: '#A09958'
        },
        {
          value: '586 C',
          html_color: '#E0E27C'
        },
        {
          value: '587 C',
          html_color: '#E3E48D'
        },
        {
          value: '5815 C',
          html_color: '#555025'
        },
        {
          value: '5845 C',
          html_color: '#AFA96E'
        },
        {
          value: '5855 C',
          html_color: '#C0BB87'
        },
        {
          value: '5865 C',
          html_color: '#CBC793'
        },
        {
          value: '601 C',
          html_color: '#F0E991'
        },
        {
          value: '604 C',
          html_color: '#EADA24'
        },
        {
          value: '602 C',
          html_color: '#F0E87B'
        },
        {
          value: '603 C',
          html_color: '#EDE04B'
        },
        {
          value: '605 C',
          html_color: '#E1CD00'
        },
        {
          value: '5875 C',
          html_color: '#D2CE9E'
        },
        {
          value: '600 C',
          html_color: '#F1EB9C'
        },
        {
          value: '606 C',
          html_color: '#CFB500'
        },
        {
          value: '607 C',
          html_color: '#EBE49A'
        },
        {
          value: '610 C',
          html_color: '#E1D555'
        },
        {
          value: '611 C',
          html_color: '#D7C826'
        },
        {
          value: '614 C',
          html_color: '#DCD59A'
        },
        {
          value: '617 C',
          html_color: '#C0B661'
        },
        {
          value: '616 C',
          html_color: '#D0C883'
        },
        {
          value: '613 C',
          html_color: '#B39B00'
        },
        {
          value: '618 C',
          html_color: '#AC9F3C'
        },
        {
          value: '621 C',
          html_color: '#D1E0D7'
        },
        {
          value: '623 C',
          html_color: '#9AB9AD'
        },
        {
          value: '615 C',
          html_color: '#D6CF8D'
        },
        {
          value: '608 C',
          html_color: '#E9E186'
        },
        {
          value: '609 C',
          html_color: '#E6DE77'
        },
        {
          value: '625 C',
          html_color: '#507F70'
        },
        {
          value: '626 C',
          html_color: '#285C4D'
        },
        {
          value: '627 C',
          html_color: '#13322B'
        },
        {
          value: '619 C',
          html_color: '#9F912A'
        },
        {
          value: '628 C',
          html_color: '#B7DDE1'
        },
        {
          value: '629 C',
          html_color: '#9BD3DD'
        },
        {
          value: '630 C',
          html_color: '#77C5D5'
        },
        {
          value: '612 C',
          html_color: '#C4B000'
        },
        {
          value: '632 C',
          html_color: '#0093B2'
        },
        {
          value: '635 C',
          html_color: '#A4DBE8'
        },
        {
          value: '633 C',
          html_color: '#007396'
        },
        {
          value: '634 C',
          html_color: '#005F83'
        },
        {
          value: '636 C',
          html_color: '#8BD3E6'
        },
        {
          value: '638 C',
          html_color: '#00AFD7'
        },
        {
          value: '639 C',
          html_color: '#0095C8'
        },
        {
          value: '637 C',
          html_color: '#4EC3E0'
        },
        {
          value: '640 C',
          html_color: '#0082BA'
        },
        {
          value: '624 C',
          html_color: '#789F90'
        },
        {
          value: '622 C',
          html_color: '#B7CDC2'
        },
        {
          value: '641 C',
          html_color: '#0067A0'
        },
        {
          value: '642 C',
          html_color: '#D1DDE6'
        },
        {
          value: '643 C',
          html_color: '#C6D6E3'
        },
        {
          value: '646 C',
          html_color: '#5E8AB4'
        },
        {
          value: '644 C',
          html_color: '#9BB8D3'
        },
        {
          value: '647 C',
          html_color: '#236192'
        },
        {
          value: '648 C',
          html_color: '#002E5D'
        },
        {
          value: '649 C',
          html_color: '#DBE2E9'
        },
        {
          value: '620 C',
          html_color: '#8A7B19'
        },
        {
          value: '650 C',
          html_color: '#CED9E5'
        },
        {
          value: '651 C',
          html_color: '#A7BCD6'
        },
        {
          value: '652 C',
          html_color: '#7D9CC0'
        },
        {
          value: '653 C',
          html_color: '#326295'
        },
        {
          value: '654 C',
          html_color: '#003A70'
        },
        {
          value: '655 C',
          html_color: '#002554'
        },
        {
          value: '660 C',
          html_color: '#407EC9'
        },
        {
          value: '656 C',
          html_color: '#DDE5ED'
        },
        {
          value: '657 C',
          html_color: '#C8D8EB'
        },
        {
          value: '658 C',
          html_color: '#B1C9E8'
        },
        {
          value: '659 C',
          html_color: '#7BA4DB'
        },
        {
          value: '661 C',
          html_color: '#003594'
        },
        {
          value: '662 C',
          html_color: '#001A70'
        },
        {
          value: '663 C',
          html_color: '#E5E1E6'
        },
        {
          value: '665 C',
          html_color: '#C6BCD0'
        },
        {
          value: '666 C',
          html_color: '#A192B2'
        },
        {
          value: '668 C',
          html_color: '#614B79'
        },
        {
          value: '670 C',
          html_color: '#EAD3E2'
        },
        {
          value: '669 C',
          html_color: '#3F2A56'
        },
        {
          value: '671 C',
          html_color: '#E6BCD7'
        },
        {
          value: '631 C',
          html_color: '#3EB1C8'
        },
        {
          value: '672 C',
          html_color: '#DFA0C9'
        },
        {
          value: '645 C',
          html_color: '#7DA1C4'
        },
        {
          value: '673 C',
          html_color: '#D986BA'
        },
        {
          value: '675 C',
          html_color: '#AE2573'
        },
        {
          value: '674 C',
          html_color: '#C7579A'
        },
        {
          value: '676 C',
          html_color: '#960051'
        },
        {
          value: '677 C',
          html_color: '#E5CEDB'
        },
        {
          value: '678 C',
          html_color: '#E3C8D8'
        },
        {
          value: '679 C',
          html_color: '#DEBED2'
        },
        {
          value: '680 C',
          html_color: '#C996B6'
        },
        {
          value: '682 C',
          html_color: '#994878'
        },
        {
          value: '664 C',
          html_color: '#E0DBE3'
        },
        {
          value: '685 C',
          html_color: '#DCB6C9'
        },
        {
          value: '686 C',
          html_color: '#D0A1BA'
        },
        {
          value: '687 C',
          html_color: '#BE84A3'
        },
        {
          value: '684 C',
          html_color: '#E4C6D4'
        },
        {
          value: '690 C',
          html_color: '#612141'
        },
        {
          value: '692 C',
          html_color: '#E3BEC3'
        },
        {
          value: '693 C',
          html_color: '#D7A3AB'
        },
        {
          value: '694 C',
          html_color: '#C48490'
        },
        {
          value: '695 C',
          html_color: '#B46B7A'
        },
        {
          value: '696 C',
          html_color: '#984857'
        },
        {
          value: '667 C',
          html_color: '#7C6992'
        },
        {
          value: '697 C',
          html_color: '#893C47'
        },
        {
          value: '698 C',
          html_color: '#F2D4D7'
        },
        {
          value: '699 C',
          html_color: '#F4C3CC'
        },
        {
          value: '700 C',
          html_color: '#F2ACB9'
        },
        {
          value: '701 C',
          html_color: '#E68699'
        },
        {
          value: '702 C',
          html_color: '#D25B73'
        },
        {
          value: '688 C',
          html_color: '#A76389'
        },
        {
          value: '705 C',
          html_color: '#F5DADF'
        },
        {
          value: '706 C',
          html_color: '#F7CED7'
        },
        {
          value: '707 C',
          html_color: '#F8B5C4'
        },
        {
          value: '691 C',
          html_color: '#E9CDD0'
        },
        {
          value: '708 C',
          html_color: '#F891A5'
        },
        {
          value: '709 C',
          html_color: '#EF6079'
        },
        {
          value: '710 C',
          html_color: '#E03E52'
        },
        {
          value: '711 C',
          html_color: '#CB2C30'
        },
        {
          value: '712 C',
          html_color: '#FCC89B'
        },
        {
          value: '713 C',
          html_color: '#FDBE87'
        },
        {
          value: '714 C',
          html_color: '#FDAA63'
        },
        {
          value: '715 C',
          html_color: '#F68D2E'
        },
        {
          value: '717 C',
          html_color: '#D45D00'
        },
        {
          value: '716 C',
          html_color: '#EA7600'
        },
        {
          value: '718 C',
          html_color: '#BE4D00'
        },
        {
          value: '703 C',
          html_color: '#B83A4B'
        },
        {
          value: '719 C',
          html_color: '#EDC8A3'
        },
        {
          value: '721 C',
          html_color: '#DDA46F'
        },
        {
          value: '720 C',
          html_color: '#E7B78A'
        },
        {
          value: '723 C',
          html_color: '#B36924'
        },
        {
          value: '722 C',
          html_color: '#C88242'
        },
        {
          value: '724 C',
          html_color: '#934D11'
        },
        {
          value: '725 C',
          html_color: '#7D4016'
        },
        {
          value: '726 C',
          html_color: '#E0C09F'
        },
        {
          value: '727 C',
          html_color: '#D9B48F'
        },
        {
          value: '728 C',
          html_color: '#CDA177'
        },
        {
          value: '729 C',
          html_color: '#B58150'
        },
        {
          value: '730 C',
          html_color: '#9E652E'
        },
        {
          value: '731 C',
          html_color: '#774212'
        },
        {
          value: '7401 C',
          html_color: '#F5E1A4'
        },
        {
          value: '732 C',
          html_color: '#623412'
        },
        {
          value: '7402 C',
          html_color: '#ECD898'
        },
        {
          value: '7403 C',
          html_color: '#EED484'
        },
        {
          value: '7405 C',
          html_color: '#F2CD00'
        },
        {
          value: '7404 C',
          html_color: '#F4DA40'
        },
        {
          value: '683 C',
          html_color: '#7C2855'
        },
        {
          value: '7407 C',
          html_color: '#CBA052'
        },
        {
          value: '7406 C',
          html_color: '#F1C400'
        },
        {
          value: '7408 C',
          html_color: '#F6BE00'
        },
        {
          value: '7409 C',
          html_color: '#F0B323'
        },
        {
          value: '7410 C',
          html_color: '#FEAD77'
        },
        {
          value: '7412 C',
          html_color: '#D38235'
        },
        {
          value: '7413 C',
          html_color: '#DC8633'
        },
        {
          value: '7411 C',
          html_color: '#E6A65D'
        },
        {
          value: '7414 C',
          html_color: '#C16C18'
        },
        {
          value: '689 C',
          html_color: '#893B67'
        },
        {
          value: '7415 C',
          html_color: '#E6BAA8'
        },
        {
          value: '7416 C',
          html_color: '#E56A54'
        },
        {
          value: '7417 C',
          html_color: '#E04F39'
        },
        {
          value: '7418 C',
          html_color: '#CD545B'
        },
        {
          value: '7420 C',
          html_color: '#9B2242'
        },
        {
          value: '7421 C',
          html_color: '#651C32'
        },
        {
          value: '7422 C',
          html_color: '#F4CDD4'
        },
        {
          value: '7424 C',
          html_color: '#E24585'
        },
        {
          value: '7423 C',
          html_color: '#E06287'
        },
        {
          value: '7425 C',
          html_color: '#B52555'
        },
        {
          value: '704 C',
          html_color: '#9E2B2F'
        },
        {
          value: '7427 C',
          html_color: '#971B2F'
        },
        {
          value: '7426 C',
          html_color: '#A4123F'
        },
        {
          value: '7430 C',
          html_color: '#DCA9BF'
        },
        {
          value: '7431 C',
          html_color: '#C9809E'
        },
        {
          value: '7432 C',
          html_color: '#B55C80'
        },
        {
          value: '7434 C',
          html_color: '#9B3359'
        },
        {
          value: '7435 C',
          html_color: '#872651'
        },
        {
          value: '7436 C',
          html_color: '#EEDAEA'
        },
        {
          value: '681 C',
          html_color: '#B06C95'
        },
        {
          value: '7419 C',
          html_color: '#B04A5A'
        },
        {
          value: '7428 C',
          html_color: '#6A2C3E'
        },
        {
          value: '7437 C',
          html_color: '#CCAED0'
        },
        {
          value: '7443 C',
          html_color: '#DDDAE8'
        },
        {
          value: '7442 C',
          html_color: '#963CBD'
        },
        {
          value: '7445 C',
          html_color: '#A7A2C3'
        },
        {
          value: '7446 C',
          html_color: '#8986CA'
        },
        {
          value: '7441 C',
          html_color: '#9F5CC0'
        },
        {
          value: '7448 C',
          html_color: '#4B384C'
        },
        {
          value: '7429 C',
          html_color: '#E2BCCB'
        },
        {
          value: '7449 C',
          html_color: '#41273B'
        },
        {
          value: '7450 C',
          html_color: '#BDC5DB'
        },
        {
          value: '7451 C',
          html_color: '#89ABE3'
        },
        {
          value: '7453 C',
          html_color: '#7CA6DE'
        },
        {
          value: '7454 C',
          html_color: '#5F8FB4'
        },
        {
          value: '7439 C',
          html_color: '#B288B9'
        },
        {
          value: '7455 C',
          html_color: '#3A5DAE'
        },
        {
          value: '7456 C',
          html_color: '#606EB2'
        },
        {
          value: '7457 C',
          html_color: '#BBDDE6'
        },
        {
          value: '7459 C',
          html_color: '#4298B5'
        },
        {
          value: '7438 C',
          html_color: '#D59ED7'
        },
        {
          value: '7460 C',
          html_color: '#0086BF'
        },
        {
          value: '7461 C',
          html_color: '#007DBA'
        },
        {
          value: '7462 C',
          html_color: '#00558C'
        },
        {
          value: '7463 C',
          html_color: '#002B49'
        },
        {
          value: '7464 C',
          html_color: '#A0D1CA'
        },
        {
          value: '7465 C',
          html_color: '#40C1AC'
        },
        {
          value: '7466 C',
          html_color: '#00B0B9'
        },
        {
          value: '7452 C',
          html_color: '#8194DD'
        },
        {
          value: '7467 C',
          html_color: '#00A3AD'
        },
        {
          value: '7469 C',
          html_color: '#005F86'
        },
        {
          value: '7468 C',
          html_color: '#007398'
        },
        {
          value: '7470 C',
          html_color: '#005A6F'
        },
        {
          value: '7447 C',
          html_color: '#5D4777'
        },
        {
          value: '7473 C',
          html_color: '#279989'
        },
        {
          value: '7471 C',
          html_color: '#7EDDD3'
        },
        {
          value: '7472 C',
          html_color: '#5CB8B2'
        },
        {
          value: '7474 C',
          html_color: '#007681'
        },
        {
          value: '7475 C',
          html_color: '#477A7B'
        },
        {
          value: '7476 C',
          html_color: '#0D5257'
        },
        {
          value: '7477 C',
          html_color: '#244C5A'
        },
        {
          value: '7478 C',
          html_color: '#9BE3BF'
        },
        {
          value: '7479 C',
          html_color: '#26D07C'
        },
        {
          value: '7482 C',
          html_color: '#009F4D'
        },
        {
          value: '7480 C',
          html_color: '#00BF6F'
        },
        {
          value: '7481 C',
          html_color: '#00B74F'
        },
        {
          value: '7485 C',
          html_color: '#D0DEBB'
        },
        {
          value: '7486 C',
          html_color: '#BCE194'
        },
        {
          value: '7484 C',
          html_color: '#00573F'
        },
        {
          value: '7483 C',
          html_color: '#275D38'
        },
        {
          value: '7444 C',
          html_color: '#B6B8DC'
        },
        {
          value: '7487 C',
          html_color: '#8EDD65'
        },
        {
          value: '7491 C',
          html_color: '#79863C'
        },
        {
          value: '7489 C',
          html_color: '#74AA50'
        },
        {
          value: '7488 C',
          html_color: '#78D64B'
        },
        {
          value: '7490 C',
          html_color: '#719949'
        },
        {
          value: '7493 C',
          html_color: '#BBC592'
        },
        {
          value: '7494 C',
          html_color: '#9CAF88'
        },
        {
          value: '7492 C',
          html_color: '#BFCC80'
        },
        {
          value: '7495 C',
          html_color: '#8F993E'
        },
        {
          value: '7496 C',
          html_color: '#76881D'
        },
        {
          value: '7499 C',
          html_color: '#F1E6B2'
        },
        {
          value: '7497 C',
          html_color: '#7A7256'
        },
        {
          value: '7498 C',
          html_color: '#5B6236'
        },
        {
          value: '7500 C',
          html_color: '#DFD1A7'
        },
        {
          value: '7501 C',
          html_color: '#D9C89D'
        },
        {
          value: '7433 C',
          html_color: '#A73A64'
        },
        {
          value: '7502 C',
          html_color: '#CEB888'
        },
        {
          value: '7507 C',
          html_color: '#FCD299'
        },
        {
          value: '7506 C',
          html_color: '#EFDBB2'
        },
        {
          value: '7503 C',
          html_color: '#A89968'
        },
        {
          value: '7504 C',
          html_color: '#94795D'
        },
        {
          value: '7505 C',
          html_color: '#816040'
        },
        {
          value: '7509 C',
          html_color: '#D6A461'
        },
        {
          value: '7511 C',
          html_color: '#B77729'
        },
        {
          value: '7512 C',
          html_color: '#A6631B'
        },
        {
          value: '7508 C',
          html_color: '#E1B87F'
        },
        {
          value: '7513 C',
          html_color: '#E1B7A7'
        },
        {
          value: '7510 C',
          html_color: '#C6893F'
        },
        {
          value: '7440 C',
          html_color: '#A277A6'
        },
        {
          value: '7515 C',
          html_color: '#C58B68'
        },
        {
          value: '7516 C',
          html_color: '#99552B'
        },
        {
          value: '7517 C',
          html_color: '#85431E'
        },
        {
          value: '7518 C',
          html_color: '#6D4F47'
        },
        {
          value: '7514 C',
          html_color: '#D5A286'
        },
        {
          value: '7519 C',
          html_color: '#5D4B3C'
        },
        {
          value: '7520 C',
          html_color: '#EABEB0'
        },
        {
          value: '7527 C',
          html_color: '#D6D2C4'
        },
        {
          value: '7521 C',
          html_color: '#C09C83'
        },
        {
          value: '7522 C',
          html_color: '#B46A55'
        },
        {
          value: '7523 C',
          html_color: '#AB5C57'
        },
        {
          value: '7524 C',
          html_color: '#A45248'
        },
        {
          value: '7525 C',
          html_color: '#9A6A4F'
        },
        {
          value: '7526 C',
          html_color: '#8A391B'
        },
        {
          value: '7458 C',
          html_color: '#71B2C9'
        },
        {
          value: '7528 C',
          html_color: '#C5B9AC'
        },
        {
          value: '7531 C',
          html_color: '#7A6855'
        },
        {
          value: '7532 C',
          html_color: '#63513D'
        },
        {
          value: '7533 C',
          html_color: '#473729'
        },
        {
          value: '7534 C',
          html_color: '#D1CCBD'
        },
        {
          value: '7529 C',
          html_color: '#B7A99A'
        },
        {
          value: '7530 C',
          html_color: '#A39382'
        },
        {
          value: '7535 C',
          html_color: '#B7B09C'
        },
        {
          value: '7543 C',
          html_color: '#98A4AE'
        },
        {
          value: '7541 C',
          html_color: '#D9E1E2'
        },
        {
          value: '7542 C',
          html_color: '#A4BCC2'
        },
        {
          value: '7537 C',
          html_color: '#A7ACA2'
        },
        {
          value: '7538 C',
          html_color: '#949A90'
        },
        {
          value: '7539 C',
          html_color: '#8E9089'
        },
        {
          value: '7540 C',
          html_color: '#4B4F54'
        },
        {
          value: '7536 C',
          html_color: '#A69F88'
        },
        {
          value: '804 C',
          html_color: '#FFAA4D'
        },
        {
          value: '7547 C',
          html_color: '#131E29'
        },
        {
          value: '7544 C',
          html_color: '#768692'
        },
        {
          value: '7545 C',
          html_color: '#425563'
        },
        {
          value: '7546 C',
          html_color: '#253746'
        },
        {
          value: '801 C',
          html_color: '#009ACE'
        },
        {
          value: '802 C',
          html_color: '#44D62C'
        },
        {
          value: '803 C',
          html_color: '#FFE900'
        },
        {
          value: '805 C',
          html_color: '#FF7276'
        },
        {
          value: '807 C',
          html_color: '#EA27C2'
        },
        {
          value: '808 C',
          html_color: '#00B796'
        },
        {
          value: '809 C',
          html_color: '#E3E829'
        },
        {
          value: '811 C',
          html_color: '#FF8F6C'
        },
        {
          value: '806 C',
          html_color: '#FF3EB5'
        },
        {
          value: '810 C',
          html_color: '#FFD635'
        },
        {
          value: '812 C',
          html_color: '#FF5FA2'
        },
        {
          value: '813 C',
          html_color: '#FB48C4'
        },
        {
          value: '814 C',
          html_color: '#8A69D4'
        },
        {
          value: '871 C',
          html_color: '#84754E'
        },
        {
          value: '872 C',
          html_color: '#85714D'
        },
        {
          value: '874 C',
          html_color: '#8B6F4E'
        },
        {
          value: '875 C',
          html_color: '#87674F'
        },
        {
          value: '873 C',
          html_color: '#866D4B'
        },
        {
          value: '876 C',
          html_color: '#8B634B'
        },
        {
          value: '877 C',
          html_color: '#8A8D8F'
        },
        {
          value: '8100 C',
          html_color: '#937E96'
        },
        {
          value: '8201 C',
          html_color: '#67899C'
        },
        {
          value: '8281 C',
          html_color: '#709592'
        },
        {
          value: '8321 C',
          html_color: '#829778'
        },
        {
          value: '8003 C',
          html_color: '#8B8075'
        },
        {
          value: '8021 C',
          html_color: '#9F8170'
        },
        {
          value: '8062 C',
          html_color: '#9F6D79'
        }
      ]
    }
  },
  props: {
    ProductColor: Object,
    parentProColor: Object,
    addColorBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    //处理父组件传来的颜色数据
    handleParentColor() {
      if (this.ProductColor) {
        if (this.ProductColor.pro_color.length === 0) {
          this.colorList = []
        } else {
          let l = []
          this.ProductColor.pro_color.split('|').forEach(el => {
            if (el !== '') {
              l.push(JSON.parse(el))
            }
          })
          this.colorList = l
        }
      }
      // console.log(this.parentProColor.$index)
      // console.log(this.parentProColor.row.pro_color)
      if (this.parentProColor) {
        if (this.parentProColor.row.pro_color === 0) {
          this.colorList = []
        } else {
          let l = []
          this.parentProColor.row.pro_color.split('|').forEach(el => {
            if (el !== '') {
              l.push(JSON.parse(el))
            }
          })
          this.colorList = l
        }
      }
    },
    //隐藏颜色表表头
    colorTableHeader({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'display: none'
      }
    },
    //新增颜色
    addColor() {
      this.colorList.push({
        value: '',
        html_color: ''
      })
    },
    //减少颜色
    rmColor(row, index) {
      let promise = new Promise((resolve, reject) => {
        this.$emit('delProColor', row.value, this.parentProColor.$index)
        resolve()
      }).then(res => {
        this.handleParentColor()
      })
    },
    //搜索颜色
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      setTimeout(() => {
        cb(results)
      }, 1000)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !==
          -1
        )
      }
    },
    //选择搜索后的颜色
    setSelect(item) {
      if (this.ProductColor) {
        let promise = new Promise((resolve, reject) => {
          this.$emit('getProColor', item)
          resolve()
        }).then(res => {
          this.handleParentColor()
        })
      }
      if (this.parentProColor) {
        let promise = new Promise((resolve, reject) => {
          this.$emit('getProColor', item, this.parentProColor.$index)
          resolve()
        }).then(res => {
          this.handleParentColor()
        })
      }
    }
  },
  created() {
    this.handleParentColor()
  }
}
</script>

<style></style>
