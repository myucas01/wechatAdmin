<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label="订单号" label-width="80px">
          <el-input placeholder="请输入订单号" clearable v-model="listQuery.orderSn"></el-input>
        </el-form-item>
        <el-form-item label="下单时间" label-width="80px">
          <el-date-picker
            placeholder="选择日期"
            type="datetime"
            v-model="listQuery.begin"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
          <!--            日-->
          <!--            <el-select placeholder="" style="width: 70px;" v-model="listQuery.beginTimer"><el-option v-for="item in timeList" :key="item" :value="item"></el-option></el-select>时-->
          &nbsp;&nbsp;
          <span style="font-weight: bolder;">至</span>&nbsp;&nbsp;
          <el-date-picker
            placeholder="选择日期"
            type="datetime"
            v-model="listQuery.end"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
          <!--          日-->
          <!--          <el-select placeholder="" style="width: 70px;" v-model="listQuery.endTimer"><el-option v-for="item in timeList" :key="item" :value="item"></el-option></el-select>时-->
        </el-form-item>
        <el-form-item label="用户ID" label-width="80px">
          <el-input v-model="listQuery.userId" clearable placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="企业名称" label-width="80px">
          <el-input placeholder="请输入企业名称" v-model="listQuery.companyName" style="margin-right: 10px"></el-input>
        </el-form-item>
        <el-form-item label="订单类型" label-width="80px">
          <el-select v-model="listQuery.type">
            <el-option value label="全部" key></el-option>
            <el-option value="0" label="个人订单" key="0"></el-option>
            <el-option value="1" label="企业订单" key="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态" label-width="80px">
          <el-select v-model="listQuery.orderStatus">
            <el-option value key label="全部"></el-option>
            <el-option value="101" key="101" label="未付款"></el-option>
            <el-option value="102" key="102" label="已取消"></el-option>
            <el-option value="103" key="103" label="已取消(系统)"></el-option>
            <el-option value="104" key="104" label="付款确认中"></el-option>
            <el-option value="201" key="201" label="已付款"></el-option>
            <el-option value="202" key="202" label="订单取消,退款中"></el-option>
            <el-option value="203" key="203" label="已退款"></el-option>
            <el-option value="204" key="204" label="付款失败"></el-option>
            <el-option value="301" key="301" label="已发货"></el-option>
            <el-option value="401" key="401" label="已收货"></el-option>
            <el-option value="402" key="402" label="已收货(系统)"></el-option>
            <el-option value="403" key="403" label="待评价"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            v-permission="['GET /admin/order/list']"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >查找</el-button>
          <el-button v-permission="['GET /admin/order/list']" @click="handleFilterReset">重置</el-button>
          <el-button @click="handleExport" type="success" :loading="dcLoading">导出</el-button>
        </el-form-item>
      </el-form>
      <!--      <el-input v-model="listQuery.userId" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户ID"/>-->
      <!--      <el-input v-model="listQuery.orderSn" clearable class="filter-item" style="width: 200px;" placeholder="请输入订单编号"/>-->
      <!--      <el-select v-model="listQuery.orderStatusArray" multiple style="width: 200px" class="filter-item" placeholder="请选择订单状态">-->
      <!--        <el-option v-for="(key, value) in statusMap" :key="key" :label="key" :value="value"/>-->
      <!--      </el-select>-->
      <!--      <el-button v-permission="['GET /admin/order/list']" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>-->
      <!--      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>-->
    </div>
    <div class="btns_list">
      <el-button type="primary" @click="buttonHandleFilter('')">    全部           ({{allNum.all}})</el-button>
      <el-button type="primary" @click="buttonHandleFilter('101')"> 未付款         ({{allNum.weifukuan}})</el-button>
      <el-button type="primary" @click="buttonHandleFilter('102')"> 已取消         ({{allNum.yiquxiao}})</el-button>
      <el-button type="primary" @click="buttonHandleFilter('103')" >已取消(系统)   ({{allNum.yiquxiaoxitong}})</el-button>
      <el-button type="primary" @click="buttonHandleFilter('104')" >付款确认中     ({{allNum.fukuanquerenzhong}})</el-button>
      <el-button type="primary" @click="buttonHandleFilter('201')"> 已付款         ({{allNum.yifukuan}})</el-button>
      <el-button type="primary" @click="buttonHandleFilter('202')" >订单取消,退款中({{allNum.dingdanquxiao}})</el-button>
      <el-button type="primary" @click="buttonHandleFilter('203')"> 已退款         ({{allNum.yituikuan}})</el-button>
      <el-button type="primary" @click="buttonHandleFilter('204')"> 付款失败       ({{allNum.fukuanshibai}})</el-button>
      <el-button type="primary" @click="buttonHandleFilter('301')"> 已发货         ({{allNum.yifahuo}})</el-button>
      <el-button type="primary" @click="buttonHandleFilter('401')"> 已收货         ({{allNum.yishouhuo}})</el-button>
      <el-button type="primary" @click="buttonHandleFilter('402')" >已收货(系统)   ({{allNum.yishouhuoxitong}})</el-button>
      <el-button type="primary" @click="buttonHandleFilter('403')"> 待评价         ({{allNum.daipingjia}})</el-button>

      <!-- <el-button type="primary" @click="buttonHandleFilter('101')">未付款({{allNum.noPay}})</el-button>
      <el-button type="primary" @click="buttonHandleFilter('201')">待发货({{allNum.noSend}})</el-button>
      <el-button type="primary" @click="buttonHandleFilter('301')">已发货({{allNum.send}})</el-button>
      <el-button type="primary" @click="buttonHandleFilter('401')">已完成({{allNum.finish}})</el-button>-->
    </div>
    <div style="margin-bottom: 15px;">
      <el-button type="primary" plain @click="batchRemarks">批量备注</el-button>
      <el-button type="primary" plain @click="batchSend(2)">批量发货</el-button>
    </div>
    <!-- 查询结果 -->
    <el-table
      ref="table"
      v-loading="listLoading"
      :data="list"
      element-loading-text="正在查询中。。。"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="selection"></el-table-column>

      <el-table-column align="center" label="订单编号" prop="orderSn" width="155" />
      <el-table-column align="center" label="用户ID" prop="userId" />
      <el-table-column align="center" label="企业名称" prop="company" />
      <el-table-column align="center" label="所属企业" prop="company"></el-table-column>
      <el-table-column align="center" label="订单类型">
        <template slot-scope="scope">
          <!-- {{scope.row.type}} -->
          {{scope.row.orderType == "0"?"企业订单":"个人订单"}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态" prop="orderStatus" width="135">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderStatus | orderStatusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付金额" prop="actualPrice" />
      <el-table-column align="center" label="支付渠道" prop="channel" />
      <el-table-column align="center" label="下单时间" prop="addTime" width="155"/>
      <el-table-column align="center" label="支付确认时间" prop="payTime" width="155"/>
      <el-table-column align="center" label="物流单号" prop="shipSn" />
      <el-table-column align="center" label="物流渠道" prop="shipChannel" />
      <el-table-column align="center" label="订单金额" prop="orderPrice" />
      <el-table-column align="center" label="备注" prop="remark"></el-table-column>
      <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-permission="['GET /admin/order/detail']"
            type="primary"
            size="mini"
            @click="handleDetail(scope.row)"
          >详情</el-button>
          <!--          <el-button v-permission="['POST /admin/order/ship']" v-if="scope.row.orderStatus==201" type="primary" size="mini" @click="handleShip(scope.row)">发货</el-button>-->
          <el-button
            v-permission="['POST /admin/order/ship']"
            v-if="scope.row.orderStatus==201"
            type="primary"
            size="mini"
            @click="batchSend(1, scope.row)"
          >发货</el-button>
          <!--          <el-button v-permission="['POST /admin/order/refund']" v-if="scope.row.orderStatus==202" type="primary" size="mini" @click="handleRefund(scope.row)">退款</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <!-- 订单详情对话框 -->
    <el-dialog :visible.sync="orderDialogVisible" title="订单详情" width="800">
      <el-form :data="orderDetail" label-position="left">
        <el-form-item label="订单编号">
          <span>{{ orderDetail.order.orderSn }}</span>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-tag>{{ orderDetail.order.orderStatus | orderStatusFilter }}</el-tag>
        </el-form-item>
        <el-form-item label="平台备注">
          <el-button @click="saveDetailRemarks(orderDetail.order)">编辑修改</el-button>
          <el-button @click="saveDetailRemarksButton(orderDetail.order)">保存</el-button>
          <!--          <el-button>取消</el-button>-->
          <el-input
            clearable
            type="textarea"
            style="margin-top: 10px; width: 60%; display: block;"
            maxlength="100"
            v-if="updateRemarks"
            v-model="orderDetail.order.remark"
          ></el-input>
          <div v-else>{{orderDetail.order.remark}}</div>
        </el-form-item>
        <el-form-item label="订单生涯">
          <el-steps :active="orderDetail.order.active" align-center>
            <el-step title="已下单，未付款" :description="orderDetail.order.addTime"></el-step>
            <el-step title="已付款，待发货" :description="orderDetail.order.payTime"></el-step>
            <el-step title="已发货" description></el-step>
            <el-step title="已签收" description></el-step>
          </el-steps>
        </el-form-item>
        <el-form-item label="商品信息">
          <el-table :data="orderDetail.orderGoods" border fit highlight-current-row>
            <el-table-column align="center" label="商品名称" prop="goodsName" />
            <el-table-column align="center" label="商品编号" prop="goodsSn" />
            <el-table-column align="center" label="货品规格" prop="specifications" />
            <el-table-column align="center" label="货品价格" prop="price" />
            <el-table-column align="center" label="货品数量" prop="number" />
            <el-table-column align="center" label="货品图片" prop="picUrl">
              <template slot-scope="scope">
                <img :src="scope.row.picUrl" width="40" />
              </template>
            </el-table-column>
          </el-table>
          <div class="calculation">
            <div class="count">
              <span>商品金额</span>
              <span class="money">{{orderDetail.order.goodsPrice}}</span>
            </div>
            <span class="set">+</span>
            <div class="count">
              <span>运费</span>
              <span class="money">{{orderDetail.order.freightPrice}}</span>
            </div>
            <span class="set">-</span>
            <div class="count">
              <span>满减优惠</span>
              <span class="money">{{orderDetail.order.integralPrice}}</span>
            </div>
            <span class="set">-</span>
            <div class="count">
              <span>抵用券优惠</span>
              <span class="money">{{orderDetail.order.couponPrice}}</span>
            </div>
            <span class="set">=</span>
            <div class="count">
              <span>实际订单金额</span>
              <span class="money">{{orderDetail.order.actualPrice}}</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="支付信息">
          <div v-if="orderDetail.order.orderStatus === 201">
            <span>微信支付</span>
            <!--          <span>{{ orderDetail.order.payTime }}</span>-->
            <span>{{orderDetail.order.payTime}}</span>
          </div>
        </el-form-item>
        <el-form-item label="收货信息">
          <div>
            <el-button @click="saveSendInfo(orderDetail.order)">编辑修改</el-button>
          </div>
          <!-- <span>（收货人）{{ orderDetail.order.consignee }}</span>
          <span>（手机号）{{ orderDetail.order.mobile }}</span>
          <span>（地址）{{ orderDetail.order.address }}</span>-->
          <div style="padding: 30px;">
            <div class="addressInfo">
              <div>
                <span class="addressTittle">收货人姓名:</span>
                <el-input
                  style="width: 210px;margin-left:10px;margin-bottom:10px"
                  clearable
                  v-if="updateAddressInfo"
                  v-model="orderDetail.order.consignee"
                ></el-input>
                <em v-else>{{orderDetail.order.consignee}}</em>
              </div>
              <div>
                <span class="addressTittle">送货区域:</span>
                <em>暂无数据</em>
              </div>
              <div>
                <span class="addressTittle">送货地址:</span>
                <el-input
                  style="width: 210px;margin-left:10px;margin-bottom:10px"
                  clearable
                  v-if="updateAddressInfo"
                  v-model="orderDetail.order.address"
                ></el-input>
                <em v-else>{{orderDetail.order.address}}</em>
              </div>
              <div>
                <span class="addressTittle">顾客备注:</span>
                <el-input
                  style="width: 210px;margin-left:10px;margin-bottom:10px"
                  clearable
                  v-if="updateAddressInfo"
                  v-model="orderDetail.order.message"
                ></el-input>
                <em v-else>{{orderDetail.order.message}}</em>
              </div>
            </div>
            <div class="addressInfo" style="margin-left: 30px;">
              <div>
                <span class="addressTittle">所属公司:</span>
                <el-input
                  style="width: 210px;margin-left:10px;margin-bottom:10px"
                  clearable
                  v-if="updateAddressInfo"
                  v-model="orderDetail.order.company"
                ></el-input>
                <em v-else>{{orderDetail.order.company}}</em>
              </div>
              <div>
                <span class="addressTittle">收货人手机:</span>
                <el-input
                  style="width: 210px;margin-left:10px;margin-bottom:10px"
                  clearable
                  v-if="updateAddressInfo"
                  v-model="orderDetail.order.mobile"
                ></el-input>
                <em v-else>{{orderDetail.order.mobile}}</em>
              </div>
              <div>
                <span class="addressTittle">固定电话:</span>
                <em>暂无数据</em>
              </div>
            </div>
          </div>
        </el-form-item>
        <!-- <el-form-item label="发票信息">
         <div><el-button>编辑修改</el-button></div>
         &lt;!&ndash;          <span>（收货人）{{ orderDetail.order.consignee }}</span>&ndash;&gt;
         &lt;!&ndash;          <span>（手机号）{{ orderDetail.order.mobile }}</span>&ndash;&gt;
         &lt;!&ndash;          <span>（地址）{{ orderDetail.order.address }}</span>&ndash;&gt;
         <div style="padding: 30px;">
           <div class="addressInfo">
             <span>发票类型: <em>普通发票/增值税发票</em></span>
             <span>发票抬头: <em>个人/公司</em></span>
             <span>公司名称: <em>上海XXXX有限公司</em></span>
             <span>公司电话: <em>021-66668888</em></span>
           </div>
           <div class="addressInfo">
             <span>公司地址: <em>上海市闸北区彭江路602号E座3楼339室</em></span>
             <span>开户银行: <em>上海招商银行 闸北支行</em></span>
             <span>银行账号: <em>0000 0000 0000 0000</em></span>
             <span>公司税号: <em>1234567890</em></span>
           </div>
         </div>
        </el-form-item>-->
        <el-form-item label="快递信息">
          <div>
            <el-button @click="saveDetailSend(orderDetail.order)">编辑修改</el-button>
          </div>
          <div class="shipInfo">
            <div class="a">
              <span class="t">快递公司:</span>
              <!-- 申通，EMS，天天快递，百世汇通，全峰快递，其他 -->
              <el-select v-model="orderDetail.order.shipChannel" clearable >
                <el-option label="顺丰快递    " value="顺丰快递">顺丰快递</el-option>
                <el-option label="中通快递    " value="中通快递">中通快递</el-option>
                <el-option label="圆通快递    " value="圆通快递">圆通快递</el-option>
                <el-option label="厂家直发    " value="厂家直发">厂家直发</el-option>
                <el-option label="申通快递    " value="申通快递">申通快递</el-option>
                <el-option label="EMS快递     " value="EMS快递">EMS快递</el-option>
                <el-option label="天天快递    " value="天天快递">天天快递</el-option>
                <el-option label="百世汇通快递" value="百世汇通快递">百世汇通快递</el-option>
                <el-option label="全峰快递    " value="全峰快递">全峰快递</el-option>
                <el-option label="其它        " value="其它">其它</el-option>
              </el-select>
              <!-- <em v-else>{{orderDetail.order.shipChannel}}</em> -->
             <label v-if="ship_show" for="ship_show_input">请填写: </label> <input v-if="ship_show" id="ship_show_input" class="ship_show_input" type="text" v-model="orderDetail.order.shipChannel">
            </div>
            <div class="a">
              <span class="t">快递单号:</span>
              <el-input
                clearable
                style="width: 200px;"
                v-model="orderDetail.order.shipSn"
              ></el-input>
              <!-- <em v-else>{{orderDetail.order.shipSn}}</em> -->
            </div>
          </div>
          <!--          <span>（快递公司）{{ orderDetail.order.shipChannel }}</span>-->
          <!--          <span>（快递单号）{{ orderDetail.order.shipSn }}</span>-->
          <!--          <span>（发货时间）{{ orderDetail.order.shipTime }}</span>-->
        </el-form-item>
        <el-form-item label="处理记录">
          <el-table :data="logList">
            <el-table-column label="处理人" prop="admin"></el-table-column>
            <el-table-column label="时间" prop="updateTime"></el-table-column>
            <!--<el-table-column label="处理后订单状态"></el-table-column>-->
            <el-table-column label="处理记录" prop="action"></el-table-column>
          </el-table>
          <pagination
            v-show="logListQuery.total>0"
            :total="logListQuery.total"
            :page.sync="logListQuery.page"
            :limit.sync="logListQuery.limit"
            @pagination="detailLogList"
          />
        </el-form-item>
        <el-form-item label="订单处理">
          <el-button
            @click="confirmDetailShip(orderDetail.order)"
            v-if="orderDetail.orderStatus === 201"
          >订单发货</el-button>
          <el-button @click="saveDetail(orderDetail.order)">保存</el-button>
          <el-button @click="orderDialogVisible = false">取消并返回</el-button>
        </el-form-item>
        <!-- <el-form-item label="订单用户">
         <span>{{ orderDetail.user.nickname }}</span>
       </el-form-item>
       <el-form-item label="用户留言">
         <span>{{ orderDetail.order.message }}</span>
       </el-form-item>
       <el-form-item label="费用信息">
         <span>
           (实际费用){{ orderDetail.order.actualPrice }}元 =
           (商品总价){{ orderDetail.order.goodsPrice }}元 +
           (快递费用){{ orderDetail.order.freightPrice }}元 -
           (优惠减免){{ orderDetail.order.couponPrice }}元 -
           (积分减免){{ orderDetail.order.integralPrice }}元
         </span>
       </el-form-item>
       <el-form-item label="收货信息">
         <span>（确认收货时间）{{ orderDetail.order.confirmTime }}</span>
        </el-form-item>-->
      </el-form>
    </el-dialog>
    <!-- 发货对话框
            <el-dialog :visible.sync="shipDialogVisible" title="发货">
          &lt;!&ndash;      <el-form ref="shipForm" :model="shipForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">&ndash;&gt;
          &lt;!&ndash;        <el-form-item label="快递公司" prop="shipChannel">&ndash;&gt;
          &lt;!&ndash;          <el-input v-model="shipForm.shipChannel"/>&ndash;&gt;
          &lt;!&ndash;        </el-form-item>&ndash;&gt;
          &lt;!&ndash;        <el-form-item label="快递编号" prop="shipSn">&ndash;&gt;
          &lt;!&ndash;          <el-input v-model="shipForm.shipSn"/>&ndash;&gt;
          &lt;!&ndash;        </el-form-item>&ndash;&gt;
          &lt;!&ndash;      </el-form>&ndash;&gt;
              <div class="send-info">
                <p class="info-title">填写发货信息</p>
                <div class="info-main">
                  <el-radio label="1">厂家直送</el-radio>
                  <el-radio label="2">快递公司</el-radio>
                </div>
              </div>
              <div class="send-info">
                <p class="info-title">订单号: 123456789</p>
                <div class="info-main">
                  <div>
                    <span>收货信息：</span>: 张三, 13193828281, 上海市-上海市-静安区，万航渡路888号12楼1201室
                  </div>
                  <div>
                    <span>快递公司: </span>
                    <el-select>
                      <el-option>顺丰快递</el-option>
                    </el-select>
                    <span>运单号: </span>
                    <el-input value="123343212313" style="width: 200px;"></el-input>
                    <span>发票: </span>不开发票
                  </div>
                </div>
              </div>
              <div class="send-info">
                <p class="info-title">订单号: 123456789</p>
                <div class="info-main">
                  <div>
                    <span>收货信息：</span>: 张三, 13193828281, 上海市-上海市-静安区，万航渡路888号12楼1201室
                  </div>
                  <div>
                    <span>快递公司: </span>
                    <el-select>
                      <el-option>顺丰快递</el-option>
                    </el-select>
                    <span>运单号: </span>
                    <el-input value="123343212313" style="width: 200px;"></el-input>
                    <span>发票: </span>不开发票
                  </div>
                </div>
              </div>
              <div class="send-info">
                <p class="info-title">订单号: 123456789</p>
                <div class="info-main">
                  <div>
                    <span>收货信息：</span>: 张三, 13193828281, 上海市-上海市-静安区，万航渡路888号12楼1201室
                  </div>
                  <div>
                    <span>快递公司: </span>
                    <el-select>
                      <el-option>顺丰快递</el-option>
                    </el-select>
                    <span>运单号: </span>
                    <el-input value="123343212313" style="width: 200px;"></el-input>
                    <span>发票: </span>不开发票
                  </div>
                </div>
              </div>
              <div class="send-info">
                <p class="info-title">订单号: 123456789</p>
                <div class="info-main">
                  <div>
                    <span>收货信息：</span>: 张三, 13193828281, 上海市-上海市-静安区，万航渡路888号12楼1201室
                  </div>
                  <div>
                    <span>快递公司: </span>
                    <el-select>
                      <el-option>顺丰快递</el-option>
                    </el-select>
                    <span>运单号: </span>
                    <el-input value="123343212313" style="width: 200px;"></el-input>
                    <span>发票: </span>不开发票
                  </div>
                </div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="shipDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmShip">保存并发货</el-button>
              </div>
    </el-dialog>-->
    <!-- 退款对话框 -->
    <el-dialog :visible.sync="refundDialogVisible" title="退款">
      <el-form
        ref="refundForm"
        :model="refundForm"
        status-icon
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="退款金额" prop="refundMoney">
          <el-input v-model="refundForm.refundMoney" :disabled="true" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRefund">确定</el-button>
      </div>
    </el-dialog>
    <!--批量备注-->
    <el-dialog :visible.sync="remarksVisible" title="批量备注">
      <el-input type="textarea" v-model="remarks"></el-input>
      <el-button @click="saveRemarks" type="primary">保存</el-button>
      <el-button @click="remarksVisible = false">关闭</el-button>
    </el-dialog>
    <!--发货、批量发货-->
    <el-dialog :visible.sync="sendVisible" title="发货">
      <div class="send-info">
        <p class="info-title">填写发货信息</p>
        <div class="info-main">
          <el-radio label="1" v-model="shipChannel" @change="changeShipValue">厂家直送</el-radio>
          <el-radio label="2" v-model="shipChannel" @change="changeShipValue">快递公司</el-radio>
        </div>
      </div>
      <div class="send-info" v-for="(item,index) in sendInfoList" :key="index">
        <p class="info-title">订单号: {{item.orderSn}}</p>
        <div class="info-main">
          <div style="margin-bottom: 10px;">
            <p style="color: red;">{{item.shipError}}</p>
            <span>收货信息：</span>
            <span v-if="item.consignee">{{item.consignee}},</span>
            <span v-if="item.mobile">{{item.mobile}},</span>
            <span v-if="item.address">{{item.address}}</span>
          </div>
          <div class="expressInfo">
            <div>快递公司:</div>
            <el-select
              v-model="item.shipChannel"
              :disabled="item.disabled"
              style="margin-left: 10px;"
            >
              <el-option label="顺丰快递" value="顺丰快递">顺丰快递</el-option>
              <el-option label="中通快递" value="中通快递">中通快递</el-option>
              <el-option label="圆通快递" value="圆通快递">圆通快递</el-option>
              <el-option label="厂家直发" value="厂家直发" v-show="shipChannel === '1'">厂家直发</el-option>
            </el-select>
            <div>运单号:</div>
            <el-input style="width: 200px;" :disabled="item.disabled" v-model="item.shipSn"></el-input>
            <div>发票:</div>不开发票
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sendVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmShip">保存并发货</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listOrder,
  shipOrder,
  refundOrder,
  detailOrder,
  remarks,
  ship,
  count,
  update,
  exportExcel
} from "@/api/order";
import { listLog } from "@/api/log";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import checkPermission from "@/utils/permission"; // 权限判断函数
import {
    downMixin
} from '@/utils/mixin'
const statusMap = {
  // 101: "未付款",
  // 102: "用户取消",
  // 103: "系统取消",
  // 104: "付款确认中",
  // 201: "已付款",
  // 202: "申请退款",
  // 203: "已退款",
  // 301: "已发货",
  // 401: "用户收货",
  // 402: "系统收货"
  101 : "未付款         ",
  102 : "已取消         ",
  103 : "已取消(系统)   ",
  104 : "付款确认中     ",
  201 : "已付款         ",
  202 : "订单取消,退款中",
  203 : "已退款         ",
  204 : "付款失败       ",
  301 : "已发货         ",
  401 : "已收货         ",
  402 : "已收货(系统)   ",
  403 : "待评价         "
};

const timeList = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23
];

export default {
  name: "Order",
  mixins: [downMixin],
  components: { Pagination },
  filters: {
    orderStatusFilter(status) {
      return statusMap[status];
    }
  },
  computed:{
    shipChannel_status(){
      // console.log(this.orderDetail.order.shipChannel)
      return this.orderDetail.order.shipChannel
    }
  },
  watch:{
//     顺丰快递    
// 中通快递    
// 圆通快递    
// 厂家直发    
// 申通快递    
// EMS快递     
// 天天快递    
// 百世汇通快递
// 全峰快递    
// 其它        
    shipChannel_status(newData,oldData){
      console.log(newData)
      if(newData == "其它" || newData !== "顺丰快递" && newData !== "中通快递" && newData !== "圆通快递" && newData !== "厂家直发" && newData !== "申通快递" && newData !== "EMS快递" && newData !== "天天快递" && newData !== "百世汇通快递" && newData !== "全峰快递"){
        this.ship_show = true;
      }else{
        this.ship_show = false;
      }
    }
  },
  data() {
    return {
      ship_show: false,
      dcLoading:false,
      list: [],
      logList: [],
      remarksList: [],
      remarks: "",
      sendInfoList: [],
      shipChannel: "1",
      total: 0,
      listLoading: true,
      allNum: {
        all: 0,
        weigukuan: 0, // 101
        yiquxiao: 0, // 102
        yiquxiaoxitong: 0, //103
        fukuanquerenzhong: 0, // 104
        yifukuan: 0, //201
        dingdanquxiao: 0, //202
        yituikuan: 0, //203
        fukuanshibai: 0, //204
        yifahuo: 0, // 301
        yishouhuo: 0, // 401
        yishouhuoxitong: 0, //402
        daipingjia: 0 //403
      },
      listQuery: {
        orderSn: "",
        begin: "",
        end: "",
        companyName: "",
        type: "",
        orderStatus: "",
        page: 1,
        limit: 20,
        id: undefined,
        orderStatusArray: [],
        sort: "add_time",
        order: "desc"
      },
      logListQuery: {
        type: 2,
        page: 1,
        limit: 10,
        total: 0,
        order: "desc"
      },
      statusMap,
      timeList,
      orderDialogVisible: false,
      orderDetail: {
        order: {},
        user: {},
        orderGoods: []
      },
      shipForm: {
        orderId: undefined,
        shipChannel: undefined,
        shipSn: undefined
      },
      shipDialogVisible: false,
      refundForm: {
        orderId: undefined,
        refundMoney: undefined
      },
      refundDialogVisible: false,
      downloadLoading: false,
      remarksVisible: false,
      sendVisible: false,
      updateAddressInfo: false,
      updateSendInfo: false,
      updateRemarks: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleExport(){
      //this.dcLoading=true
      let list = Object.assign({}, this.listQuery);
      const params = this.$qs.stringify(list)
      //console.log('http://192.168.2.90:8077/admin/order/exportOrder?'+params)
      const href_params = process.env.BASE_API+'/order/exportOrder?'+params
      window.location.href=href_params;
      // const res = exportExcel(this.listQuery)
      // .then(res=>{
      //   console.log('res',res)
      // })
      // .catch(err=>{
      //   console.log('err',err)
      // })
      // console.log(res)
      // let fileName = res.headers['content-disposition'].split('filename=')[1];
      // fileName = decodeURI(fileName)
      // this.fileDownload(res, fileName);
      //this.dcLoading=false
    },
    checkPermission,
    getList() {
      this.listLoading = true;
      listOrder(this.listQuery)
        .then(response => {
          this.list = response.data.data.list;
          this.total = response.data.data.total;
          // this.allNum.all = response.data.data.total;
          this.listLoading = false;
        })
        .catch(() => {
          this.list = [];
          this.total = 0;
          this.listLoading = false;
        });
      this.countNum();
    },
    async countNum() {
      let that = this;
      count().then(res => {
        if (res.data.errno === 0) {
          if (res.data.data.length > 0) {
            var countAll = 0;
            res.data.data.forEach(e => {
              countAll += e.count;
              console.log(e);
              // if (e.orderStatus == 101) {
              //   that.allNum.noPay = e.count
              //   console.log(101,"count")
              // }
              // if (e.orderStatus == 102) {
              //   that.allNum.noSend = e.count
              //   console.log(201,"count")

              // }
              // if (e.orderStatus == 103) {
              //   that.allNum.send = e.count
              //   console.log(301,"count")

              // }
              // if (e.orderStatus == 104) {
              //   that.allNum.finish = e.count
              //   console.log(401,"count")

              // }

              if (e.orderStatus == 101) {
                that.allNum.weifukuan = e.count;
                // return "未付款";
              }

              if (e.orderStatus == 102) {
                that.allNum.yiquxiao = e.count;
                // return "已取消";
              }

              if (e.orderStatus == 103) {
                that.allNum.yiquxiaoxitong = e.count;
                // return "已取消(系统)";
              }

              if (e.orderStatus == 104) {
                // 该状态为用户上传了凭证 且 后台财务未审核处理时状态
                that.allNum.fukuanquerenzhong = e.count;
                // return "付款确认中";
              }

              if (e.orderStatus == 201) {
                that.allNum.yifukuan = e.count;
                // return "已付款";
              }

              if (e.orderStatus == 202) {
                that.allNum.dingdanquxiao = e.count;
                // return "订单取消，退款中";
              }

              if (e.orderStatus == 203) {
                that.allNum.yituikuan = e.count;
                // return "已退款";
              }

              if (e.orderStatus == 204) {
                that.allNum.fukuanshibai = e.count;
                // return "付款失败";
              }

              if (e.orderStatus == 301) {
                that.allNum.yifahuo = e.count;
                // return "已发货";
              }

              if (e.orderStatus == 401) {
                that.allNum.yishouhuo = e.count;
                // return "已收货";
              }

              if (e.orderStatus == 402) {
                that.allNum.yishouhuoxitong = e.count;
                // return "已收货(系统)";
              }

              if (e.orderStatus == 403) {
                that.allNum.daipingjia = e.count;
                // return "待评价";
              }
            });
            this.allNum.all = countAll;
          }
        }
      });
      // if (this.list.length > 0) {
      //   this.allNum.all = this.total
      //   this.list.forEach(e => {
      //     if (e.orderStatus === 101) {
      //       this.allNum.noPay += 1
      //     }
      //     if (e.orderStatus === 301) {
      //       this.allNum.send = this.allNum.send+ 1
      //     }
      //   })
      //   console.log(this.allNum.send)
      // }
    },
    batchRemarks() {
      if (this.$refs.table.selection.length === 0) {
        this.$message.error("请至少选择一行数据");
      } else {
        this.remarksVisible = true;
      }
    },
    batchSend(type, data) {
      this.sendInfoList = [];
      this.shipChannel = "1";
      if (type === 2) {
        if (this.$refs.table.selection.length === 0) {
          this.$message.error("请至少选择一行数据");
        } else {
          this.$refs.table.selection.forEach(e => {
            if (e.orderStatus === 201) {
              this.sendInfoList.push({
                id: e.id,
                consignee: e.consignee,
                mobile: e.mobile,
                address: e.address,
                orderSn: e.orderSn,
                shipChannel: "厂家直发",
                shipError: "",
                shipSn: "",
                disabled: true
              });
            }
          });
          if (this.sendInfoList.length > 0) {
            this.sendVisible = true;
          } else {
            this.$message.error("请选择已付款订单");
          }
        }
      }
      if (type === 1) {
        this.sendVisible = true;
        this.sendInfoList.push({
          id: data.id,
          consignee: data.consignee,
          mobile: data.mobile,
          address: data.address,
          orderSn: data.orderSn,
          shipChannel: "厂家直发",
          shipError: "",
          shipSn: "",
          disabled: true
        });
      }
    },
    saveRemarks() {
      this.$refs.table.selection.forEach(e => {
        this.remarksList.push({
          action: "订单管理-批量备注",
          id: e.id,
          remark: this.remarks
        });
      });
      remarks(this.remarksList).then(response => {
        if (response.status === 200) {
          this.$message.success("批量修改备注已成功");
          this.remarksVisible = false;
          this.getList();
        }
      });
    },
    saveDetailRemarks(order) {
      this.updateRemarks = !this.updateRemarks;
    },
    saveDetailRemarksButton(order) {
      this.remarksList = [];
      this.remarksList.push({
        action: "订单详情-修改备注",
        id: order.id,
        remark: order.remark
      });
      remarks(this.remarksList).then(response => {
        if (response.status === 200) {
          this.$message.success("备注修改成功");
          this.updateRemarks = false;
          this.getList();
        }
      });
    },
    saveSendInfo(order) {
      this.updateAddressInfo = !this.updateAddressInfo;
      // let param = {
      //   action: '订单详情-修改收货人信息',
      //   id: order.id,
      //   consignee: order.consignee,
      //   address: order.address,
      //   message: order.message,
      //   company: order.company,
      //   mobile: order.mobile
      // }
      // update(param).then(res => {
      //   console.log(res)
      // })
    },
    changeShipValue() {
      if (this.shipChannel === "1") {
        this.sendInfoList.forEach(e => {
          e.shipChannel = "厂家直发";
          e.shipError = "";
          e.disabled = true;
        });
      } else {
        this.sendInfoList.forEach(e => {
          e.shipChannel = "";
          e.shipError = "";
          e.disabled = false;
        });
      }
    },
    buttonHandleFilter(type) {
      this.listQuery.orderStatus = type;
      this.getList();
    },
    handleFilter() {
      this.getList();
    },
    handleFilterReset() {
      // 重置
      this.listQuery = [];
      this.getList();
    },
    reset() {
      this.listQuery.page = 1;
      this.listQuery.orderSn = "";
      this.listQuery.begin = "";
      this.listQuery.end = "";
      this.listQuery.userId = "";
      this.listQuery.company = "";
      this.listQuery.type = "";
      this.listQuery.orderStatus = "";
      this.getList();
    },
    handleDetail(row) {
      this.updateAddressInfo = false;
      this.updateSendInfo = false;
      detailOrder(row.id, 2).then(response => {
        console.log(response.data.data)
        this.orderDetail = response.data.data;
        if (this.orderDetail.order.orderStatus === 104) {
          this.orderDetail.order.active = 1;
        } else if (this.orderDetail.order.orderStatus === 201) {
          this.orderDetail.order.active = 2;
        } else if (this.orderDetail.order.orderStatus === 301) {
          this.orderDetail.order.active = 3;
        } else if (this.orderDetail.order.orderStatus === 401) {
          this.orderDetail.order.active = 4;
        }
      });
      this.detailLogList();
      this.orderDialogVisible = true;
    },
    detailLogList() {
      listLog(this.logListQuery).then(res => {
        if (res.data.errno === 0) {
          this.logList = res.data.data.list;
          this.logListQuery.total = res.data.data.total;
        }
      });
    },
    handleShip(row) {
      this.shipForm.orderId = row.id;
      this.shipForm.shipChannel = row.shipChannel;
      this.shipForm.shipSn = row.shipSn;

      this.shipDialogVisible = true;
      this.$nextTick(() => {
        this.$refs["shipForm"].clearValidate();
      });
    },
    saveDetailSend(order) {
      this.updateSendInfo = !this.updateSendInfo;
      // this.sendInfoList = []
      // this.sendInfoList.push({id: order.id, shipChannel: order.shipChannel, shipSn: order.shipSn})
      // ship(this.sendInfoList).then(response => {
      //   if (response.errno === 0) {
      //     this.$message.success('修改成功')
      //   } else {
      //     this.$message.error(response.errmsg)
      //   }
      // })
    },
    confirmShip() {
      // 确定发货
      this.sendInfoList.forEach(e => {
        if (e.shipChannel !== 1 && e.shipSn == "") {
          e.shipError = "*运单号不可为空";
        }
        if (e.shipChannel === "") {
          e.shipError = "*请选择快递公司";
        } else {
          e.shipError = "";
          ship(this.sendInfoList)
            .then(response => {
              console.log(response);
              if (response.data.errno === 0) {
                this.sendVisible = false;
                this.$message.success("操作成功");
                // 重新请求列表刷新
                this.getList();
              }
            })
            .catch(error => {
              this.$message.error(error.data.errmsg);
            });
        }
      });
      // ship
      // this.$refs['shipForm'].validate((valid) => {
      //   if (valid) {
      //     shipOrder(this.shipForm).then(response => {
      //       this.shipDialogVisible = false
      //       this.$notify.success({
      //         title: '成功',
      //         message: '确认发货成功'
      //       })
      //       this.getList()
      //     }).catch(response => {
      //       this.$notify.error({
      //         title: '失败',
      //         message: response.data.errmsg
      //       })
      //     })
      //   }
      // })
    },
    handleRefund(row) {
      this.refundForm.orderId = row.id;
      this.refundForm.refundMoney = row.actualPrice;

      this.refundDialogVisible = true;
      this.$nextTick(() => {
        this.$refs["refundForm"].clearValidate();
      });
    },
    confirmRefund() {
      this.$refs["refundForm"].validate(valid => {
        if (valid) {
          refundOrder(this.refundForm)
            .then(response => {
              this.refundDialogVisible = false;
              this.$notify.success({
                title: "成功",
                message: "确认退款成功"
              });
              this.getList();
            })
            .catch(response => {
              this.$notify.error({
                title: "失败",
                message: response.data.errmsg
              });
            });
        }
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "订单ID",
          "订单编号",
          "用户ID",
          "订单状态",
          "是否删除",
          "收货人",
          "收货联系电话",
          "收货地址"
        ];
        const filterVal = [
          "id",
          "orderSn",
          "userId",
          "orderStatus",
          "isDelete",
          "consignee",
          "mobile",
          "address"
        ];
        excel.export_json_to_excel2(tHeader, this.list, filterVal, "订单信息");
        this.downloadLoading = false;
      });
    },
    confirmDetailShip(order) {
      this.sendInfoList = [];
      if (!order.shipChannel) {
        this.$message.error("请选择快递公司");
      } else if (!order.shipSn) {
        this.$message.error("运单号不可为空");
      } else {
        this.sendInfoList.push({
          id: order.id,
          shipChannel: order.shipChannel,
          shipSn: order.shipSn
        });
        ship(this.sendInfoList)
          .then(response => {
            if (response.errno === 0) {
              this.$message.success("发货成功");
              this.orderDialogVisible = false;
              this.getList();
            }
          })
          .catch(error => {
            this.$message.error(error.data.errmsg);
          });
      }
    },
    saveDetail(order) {
      order.action = "订单管理-详情修改";
      update(order).then(res => {
        if (res.data.errno === 0) {
          this.$message.success("保存成功");
          this.orderDialogVisible = false;
          this.updateAddressInfo = false;
          this.updateSendInfo = false;
          this.getList();
        } else {
          this.$message.error(res.data.errmsg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.ship_show_input{
      box-sizing: border-box;
    width: 200px;
    height: 36px;
    border-radius: 3px;
    outline: none;
    border: 1px solid #ddd;
    padding: 0 0 0 10px;
}
.calculation {
  text-align: center;
}
.calculation .count {
  display: inline-block;
  margin: 0px 20px;
}
.calculation .count span {
  display: block;
}
.calculation .count span.money {
  font-weight: bolder;
}
.calculation .set {
  display: inline-block;
  margin: 0px 20px;
  font-weight: bolder;
}
.addressInfo {
  display: inline-block;
  width: 45%;
  height: 46px;
}
.addressInfo div {
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
  margin-top: 10px;
}
.addressInfo div .addressTittle {
  display: block;
  text-align: end;
  width: 80px;
}
.addressInfo div em {
  font-weight: bolder;
  margin-left: 20px;
}
.shipInfo {
  padding: 30px;
}
.shipInfo .a {
  margin-bottom: 20px;
}
.shipInfo .t {
  margin-right: 15px;
}
.send-info {
  border: 1px solid #a6a6a6;
  margin: 10px;
}
.send-info .info-title {
  padding-left: 10px;
  font-weight: bolder;
  background-color: #c0c4cc;
}
.send-info .info-main {
  margin-left: 60px;
  padding: 0 15px 15px 15px;
}
.expressInfo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.expressInfo div {
  margin: 0 5px;
}
.expressInfo div:first-of-type {
  margin: 0;
}
.btns_list{
  button{
    margin-bottom:20px;
    margin-left:0px;
    margin-right:10px;
  }
}
</style>
