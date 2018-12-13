<template>
  <div>
    <div id="app">
      <img src="./assets/logo.png">
      <router-view/>
    </div>

    <div style="margin-top: 20px">
      <el-button @click="addFormVisible= true">新增</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <el-table
    ref="multipleTable"
    :data="tableData"
    border
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        fixed
        prop="date"
        label="日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="location"
        label="所在地"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button 
          type="text"
          size="small"
          @click="handleClick(scope.row)">查看</el-button>
          <el-button 
          type="text"
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
          type="text"
          size="small"
          @click.native.prevent="deleteClick(scope.$index, tableData)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增界面 -->
    <el-dialog
    title="新增"
    v-model="addFormVisible"
    :visible.sync="addFormVisible"
    :close-on-click-model="false">
      <el-form :model="addsForm" label-width="80px" ref="addsForm" :rules="rules" status-icon>
        <el-form-item label="日期" prop="date">
          <el-date-picker 
          type="date" placeholder="选择日期"
          v-model="addsForm.date"
          auto-complete="off"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
          </el-date-picker>
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addsForm.name" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="所在地" prop="location">
          <el-cascader
          :options="options"
          v-model="selectedOptions">
          </el-cascader>
          <!-- <el-select v-model="addsForm.province" placeholder="请选择省份">
            <el-option label="上海" value="上海"></el-option>
            <el-option label="成都" value="成都"></el-option>
          </el-select> -->
				</el-form-item>
        <el-form-item label="地址" prop="address">
					<el-input v-model="addsForm.address" placeholder="请输入地址"></el-input>
				</el-form-item>
				<el-form-item label="邮编" prop="zip">
					<el-input-number v-model="addsForm.zip"></el-input-number>
				</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormFalse('addsForm')">取消</el-button>
				<el-button type="primary" @click.native="addSubmit('addsForm')">提交</el-button>
			</div>
    </el-dialog>
    <!--编辑界面-->
		<el-dialog
    title="编辑"
    v-model="editFormVisible"
    :visible.sync="editFormVisible"
    :close-on-click-model="false">
      <el-form :model="editForm" label-width="80px" ref="editForm" :rules="rules" status-icon>
        <el-form-item label="日期" prop="date">
          <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="editForm.date"
          auto-complete="off"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
          </el-date-picker>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="省份">
          <el-select v-model="editForm.province" placeholder="请选择省份">
            <el-option label="上海" value="上海"></el-option>
            <el-option label="成都" value="成都"></el-option>
          </el-select>
				</el-form-item>
        <el-form-item label="市区">
          <el-select v-model="editForm.city" placeholder="请选择市区">
            <el-option label="普陀区" value="普陀区"></el-option>
            <el-option label="成华区" value="成华区"></el-option>
          </el-select>
				</el-form-item>
        <el-form-item label="地址">
					<el-input v-model="editForm.address"></el-input>
				</el-form-item>
				<el-form-item label="邮编">
					<el-input-number v-model="editForm.zip"></el-input-number>
				</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit">提交</el-button>
			</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'App',

    data() {
      var validatePass = (rule, value, callback) => {
        if(value == '' || value == null) {
          callback(new Error('日期不能为空！'));
        }else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if(value == '' || value == null) {
          callback(new Error('姓名不能为空！'));
        }else {
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if(value == '' || value == null) {
          callback(new Error('地址不能为空！'));
        }else {
          callback();
        }
      };
      var validatePass4 = (rule, value, callback) => {
        if(value == 0) {
          callback(new Error('邮编不能为0！'));
        }else {
          callback();
        }
      };
      var validatePass5 = (rule, value, callback) => {
        if(value == '') {
          callback(new Error('省份不能为空！'));
        }else {
          callback();
        }
      };
      var validatePass6 = (rule, value, callback) => {
        if(value == '') {
          callback(new Error('市区不能为空！'));
        }else {
          callback();
        }
      };
      return {
        options: [{
          value: '北京市',
          label: '北京市',
          children: [
          {
            value: '东城区',
            label: '东城区',
          },
          {
            value: '朝阳区',
            label: '朝阳区',
          },
          {
            value: '丰台区',
            label: '丰台区',
          },
          {
            value: '西城区',
            label: '西城区',
          }
          ]
        },
        {value: '广东省',
          label: '广东省',
          children: [{
            value: '深圳市',
            label: '深圳市',
            children: [
            {
              value: '罗湖区',
              label: '罗湖区',
            },
            {
              value: '宝安区',
              label: '宝安区',
            }]
          },
          {
            value: '佛山市',
            label: '佛山市',
            children: [
            {
              value: '南海区',
              label: '南海区',
            },
            {
              value: '禅城区',
              label: '禅城区',
            }]
          }]
        }],
        selectedOptions: [],



        editFormVisible: false,
        addFormVisible: false,
        editForm: "",
        editLoading: "",
        rules: {
          date: [
            { required: true, message: '输入错误~', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            { required: true, message: '输入错误~', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          address: [
            { required: true, message: '输入错误~', trigger: 'blur' },
            { validator: validatePass3, trigger: 'blur' }
          ],
          zip: [
            { required: true, message: '输入错误~', trigger: 'blur' },
            { validator: validatePass4, trigger: 'blur' }
          ],
          province: [
            { required: true, message: '输入错误~', trigger: 'blur' },
            { validator: validatePass5, trigger: 'blur' }
          ],
          city: [
            { required: true, message: '输入错误~', trigger: 'blur' },
            { validator: validatePass6, trigger: 'blur' }
          ]
        },
        addsForm: {
          index: "",
          date: "",
          name: "",
          location: "",
          address: "",
          zip: ""
        },
        tableData: [{
          date: '2016-05-03',
          name: '王大虎',
          location: '四川省上海市普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          location: '四川省上海市普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          location: '四川省上海市普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          location: '四川省上海市普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    methods: {
     toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleClick(row) {
        console.log(row);
      },
      deleteClick(index, rows) {
        rows.splice(index, 1);
      },
      handleEdit(index, row) {
        this.editFormVisible = true;
        console.log(index, row);
        this.editForm = Object.assign({}, row);
        this.addsForm.index = index;
      },
      editSubmit() {
        this.tableData[this.addsForm.index].name = this.editForm.name;
        this.tableData[this.addsForm.index].address = this.editForm.address;
        this.tableData[this.addsForm.index].zip = this.editForm.zip;
        this.tableData[this.addsForm.index].date = this.editForm.date;
        this.tableData[this.addsForm.index].location = this.editForm.location;
        this.editFormVisible = false;
      },
      addFormFalse(formName) {
        this.addFormVisible = false;
        this.$refs[formName].resetFields(); 
      },
      addSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            console.log(valid);
            alert('submit!');
            this.addFormVisible = false;
            this.$refs[formName].resetFields();
          }else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    multipleSelection: []
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>



