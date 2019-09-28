import Vue from 'vue';
import {Button, Avatar, Alert, Form, Input, Icon,Radio,Select,Divider,Menu,Message,Anchor,Pagination,Modal,Table,Notification} from 'ant-design-vue';
import {LocaleProvider, Layout, Row, Col} from 'ant-design-vue';

import {demandLoad} from '../utils/demandLoad';

let aComponents = [
  Alert,
  Button,
  LocaleProvider,
  Layout,
  Layout.Header,
  Layout.Content,
  Layout.Sider,
  Layout.Footer,
  Avatar,
  Form,
  Form.Item,
  Radio,
  Radio.Group,
  Radio.Button,
  Select,
  Select.Option,
  Menu,
  Menu.Item,
  Menu.SubMenu,
  Message,
  Modal,
  Anchor,
  Anchor.Link,
  Pagination,
  Divider,
  Input,
  Icon,
  Row,
  Col,
  Table,
  Notification
];

demandLoad (Vue, aComponents);
Vue.prototype.$form = Form;
Vue.prototype.$Modal = Modal;
Vue.prototype.$message = Message;
Vue.prototype.$notification = Notification;
