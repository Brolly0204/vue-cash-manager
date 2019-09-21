import Vue from 'vue'
import {
  Button,
  Input,
  Form,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  FormItem,
  Select,
  Option,
  Loading,
  Message,
  MessageBox,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  Icon,
  TableColumn,
  Dialog,
  Pagination,
  DatePicker
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Icon)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(DatePicker)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm;
